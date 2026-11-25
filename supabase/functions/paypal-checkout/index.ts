import { createClient } from 'npm:@supabase/supabase-js@2';

type JsonRecord = Record<string, unknown>;

class PaymentRequestError extends Error {}

const localDevelopmentOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const normalizeOrigin = (origin: string) => origin.trim().replace(/\/+$/, '');

const allowedOrigins = new Set([
  ...localDevelopmentOrigins,
  ...(Deno.env.get('PAYPAL_ALLOWED_ORIGINS') || '')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean),
]);

function response(
  body: JsonRecord,
  status: number,
  origin: string,
) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Vary: 'Origin',
  });
  const normalizedOrigin = normalizeOrigin(origin);
  if (allowedOrigins.has(normalizedOrigin)) {
    headers.set('Access-Control-Allow-Origin', normalizedOrigin);
    headers.set('Access-Control-Allow-Headers', 'authorization, apikey, content-type, x-client-info, x-supabase-api-version');
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function requiredString(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > maxLength) {
    throw new PaymentRequestError(`Please provide a valid ${field}.`);
  }
  return value.trim();
}

function validDate(value: unknown, field: string): string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new PaymentRequestError(`Please provide a valid ${field} date.`);
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new PaymentRequestError(`Please provide a valid ${field} date.`);
  }
  return value;
}

function getPayPalApiBase(): string {
  const apiBase = Deno.env.get('PAYPAL_API_BASE') || 'https://api-m.sandbox.paypal.com';
  if (!['https://api-m.paypal.com', 'https://api-m.sandbox.paypal.com'].includes(apiBase)) {
    throw new Error('PayPal API configuration is invalid.');
  }
  return apiBase;
}

async function getPayPalAccessToken(apiBase: string): Promise<string> {
  const clientId = Deno.env.get('PAYPAL_CLIENT_ID');
  const clientSecret = Deno.env.get('PAYPAL_CLIENT_SECRET');
  if (!clientId || !clientSecret) {
    throw new Error('PayPal is not configured on the server.');
  }

  const auth = btoa(`${clientId}:${clientSecret}`);
  const result = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!result.ok) {
    console.error('PayPal authentication failed with status', result.status);
    throw new Error('PayPal is temporarily unavailable. Please try again later.');
  }
  const payload = await result.json() as { access_token?: string };
  if (!payload.access_token) throw new Error('PayPal did not return an access token.');
  return payload.access_token;
}

async function paypalRequest<T>(
  apiBase: string,
  accessToken: string,
  path: string,
  method: 'GET' | 'POST',
  body?: JsonRecord,
): Promise<T> {
  const result = await fetch(`${apiBase}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const payload = await result.json().catch(() => ({})) as T;
  if (!result.ok) {
    console.error('PayPal API request failed with status', result.status);
    throw new Error('PayPal could not process this payment. Please try again.');
  }
  return payload;
}

async function hashToken(token: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function roundToCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function amountMatches(amount: unknown, expected: number): boolean {
  return typeof amount === 'string' && Number(amount) === expected;
}

function isSaarbrueckenProperty(property: JsonRecord): boolean {
  const addressText = [property.city, property.address]
    .filter((value): value is string => typeof value === 'string')
    .join(' ')
    .toLowerCase();
  return property.is_saarbruecken === true ||
    addressText.includes('saarbrücken') ||
    addressText.includes('saarbrucken');
}

async function createOrder(body: JsonRecord) {
  const booking = body.booking as JsonRecord | null;
  if (!booking || typeof booking !== 'object') throw new PaymentRequestError('Booking details are required.');

  const propertyId = requiredString(booking.propertyId, 'property', 100);
  const customerName = requiredString(booking.customerName, 'guest name', 150);
  const customerEmail = requiredString(booking.customerEmail, 'email address', 254);
  const customerPhone = requiredString(booking.customerPhone, 'phone number', 50);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) throw new PaymentRequestError('Please provide a valid email address.');

  const checkIn = validDate(booking.checkIn, 'check-in');
  const checkOut = validDate(booking.checkOut, 'check-out');
  const checkInTime = new Date(`${checkIn}T00:00:00.000Z`).getTime();
  const checkOutTime = new Date(`${checkOut}T00:00:00.000Z`).getTime();
  const nights = Math.round((checkOutTime - checkInTime) / 86_400_000);
  if (nights < 1 || checkIn < new Date().toISOString().slice(0, 10)) {
    throw new PaymentRequestError('Please choose valid future check-in and check-out dates.');
  }

  const guests = Number(booking.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) throw new PaymentRequestError('Please select a valid number of guests.');
  const roomType = booking.roomType === 'Superior' ? 'Superior' : booking.roomType === 'Deluxe' ? 'Deluxe' : '';
  if (!roomType) throw new PaymentRequestError('Please select a valid room category.');
  const rateType = ['best_price', 'flexible', 'early_booking'].includes(String(booking.rateType))
    ? String(booking.rateType)
    : '';
  if (!rateType) throw new PaymentRequestError('Please select a valid rate policy.');

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) throw new Error('Booking service is not configured.');
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: property, error: propertyError } = await supabase
    .from('properties')
    .select('id, name, status, city, address, price_per_night, is_saarbruecken, max_guests')
    .eq('id', propertyId)
    .maybeSingle();
  if (propertyError) {
    console.error('Could not load property for PayPal checkout:', propertyError.message);
    throw new Error('Unable to verify this property. Please try again later.');
  }
  if (!property || property.status !== 'published') throw new PaymentRequestError('This property is not available for online booking.');

  const pricePerNight = Number(property.price_per_night);
  const maxGuests = Number(property.max_guests);
  if (!Number.isFinite(pricePerNight) || pricePerNight <= 0) {
    throw new PaymentRequestError('This property does not have an online-booking price yet.');
  }
  if (Number.isFinite(maxGuests) && maxGuests > 0 && guests > maxGuests) {
    throw new PaymentRequestError(`This property allows a maximum of ${maxGuests} guests.`);
  }

  const roomMultiplier = roomType === 'Superior' ? 1.25 : 1;
  const accommodationTotal = pricePerNight * roomMultiplier * nights;
  const serviceCommission = 3.99 * nights;
  const cityTax = isSaarbrueckenProperty(property) ? 0.035 * accommodationTotal : 0;
  const total = roundToCents(accommodationTotal + serviceCommission + cityTax);
  const totalText = total.toFixed(2);
  const bookingNumber = `GQ-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const sessionToken = `${crypto.randomUUID()}${crypto.randomUUID()}`;
  const apiBase = getPayPalApiBase();
  const accessToken = await getPayPalAccessToken(apiBase);

  const order = await paypalRequest<{ id?: string }>(
    apiBase,
    accessToken,
    '/v2/checkout/orders',
    'POST',
    {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: bookingNumber,
        custom_id: bookingNumber,
        invoice_id: bookingNumber,
        description: `Accommodation booking - ${String(property.name || 'GQ Travel & Hotels')}`,
        amount: { currency_code: 'EUR', value: totalText },
      }],
      application_context: {
        brand_name: 'GQ Travel & Hotels',
        user_action: 'PAY_NOW',
        shipping_preference: 'NO_SHIPPING',
      },
    },
  );
  if (!order.id) throw new Error('PayPal did not create a checkout order.');

  const { error: insertError } = await supabase.from('bookings').insert({
    booking_number: bookingNumber,
    property_id: property.id,
    property_name: String(property.name || ''),
    adults: guests,
    children: 0,
    guests,
    check_in: checkIn,
    check_out: checkOut,
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    room_type: roomType,
    rate_type: rateType,
    booking_status: 'pending',
    status: 'pending',
    currency: 'EUR',
    total_price: totalText,
    payment_status: 'pending',
    paypal_order_id: order.id,
    payment_session_token_hash: await hashToken(sessionToken),
  });
  if (insertError) {
    console.error('Could not save PayPal booking:', insertError.message);
    throw new Error('Your booking could not be saved. Please try again or contact us.');
  }

  return { orderId: order.id, sessionToken, bookingNumber, amount: totalText };
}

async function captureOrder(body: JsonRecord) {
  const orderId = requiredString(body.orderId, 'PayPal order', 100);
  const sessionToken = requiredString(body.sessionToken, 'payment session', 100);
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) throw new Error('Booking service is not configured.');
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('id, booking_number, total_price, currency, payment_status, payment_session_token_hash, paypal_capture_id')
    .eq('paypal_order_id', orderId)
    .maybeSingle();
  if (bookingError || !booking) {
    if (bookingError) console.error('Could not load PayPal booking:', bookingError.message);
    throw new PaymentRequestError('This payment session could not be verified.');
  }

  const suppliedTokenHash = await hashToken(sessionToken);
  if (suppliedTokenHash !== booking.payment_session_token_hash) {
    throw new PaymentRequestError('This payment session could not be verified.');
  }
  if (booking.payment_status === 'paid') {
    return {
      bookingNumber: booking.booking_number,
      amount: Number(booking.total_price).toFixed(2),
      currency: booking.currency || 'EUR',
      paymentStatus: 'paid',
    };
  }

  const expectedAmount = Number(booking.total_price);
  const currency = String(booking.currency || 'EUR');
  if (!Number.isFinite(expectedAmount) || expectedAmount <= 0 || currency !== 'EUR') {
    throw new Error('The saved booking amount is invalid.');
  }

  const apiBase = getPayPalApiBase();
  const accessToken = await getPayPalAccessToken(apiBase);
  const existingOrder = await paypalRequest<JsonRecord>(
    apiBase,
    accessToken,
    `/v2/checkout/orders/${encodeURIComponent(orderId)}`,
    'GET',
  );
  const purchaseUnit = Array.isArray(existingOrder.purchase_units)
    ? existingOrder.purchase_units[0] as JsonRecord | undefined
    : undefined;
  const orderAmount = purchaseUnit?.amount as JsonRecord | undefined;
  if (
    !purchaseUnit ||
    purchaseUnit.custom_id !== booking.booking_number ||
    orderAmount?.currency_code !== currency ||
    !amountMatches(orderAmount?.value, expectedAmount)
  ) {
    throw new PaymentRequestError('The PayPal order does not match the saved booking.');
  }

  let completedOrder = existingOrder;
  if (existingOrder.status !== 'COMPLETED') {
    if (existingOrder.status !== 'APPROVED') throw new PaymentRequestError('PayPal has not approved this payment.');
    completedOrder = await paypalRequest<JsonRecord>(
      apiBase,
      accessToken,
      `/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
      'POST',
      {},
    );
  }

  const completedUnit = Array.isArray(completedOrder.purchase_units)
    ? completedOrder.purchase_units[0] as JsonRecord | undefined
    : undefined;
  const payments = completedUnit?.payments as JsonRecord | undefined;
  const captures = Array.isArray(payments?.captures) ? payments.captures : [];
  const capture = captures[0] as JsonRecord | undefined;
  const captureAmount = capture?.amount as JsonRecord | undefined;
  if (
    completedOrder.status !== 'COMPLETED' ||
    capture?.status !== 'COMPLETED' ||
    captureAmount?.currency_code !== currency ||
    !amountMatches(captureAmount?.value, expectedAmount) ||
    typeof capture.id !== 'string'
  ) {
    throw new PaymentRequestError('PayPal has not confirmed the full booking payment.');
  }

  const { data: updatedBooking, error: updateError } = await supabase
    .from('bookings')
    .update({
      payment_status: 'paid',
      paypal_capture_id: capture.id,
      payment_paid_at: new Date().toISOString(),
    })
    .eq('id', booking.id)
    .eq('payment_status', 'pending')
    .select('booking_number, total_price, currency, payment_status')
    .maybeSingle();

  if (updateError) {
    console.error('Could not save PayPal capture status:', updateError.message);
    throw new Error('Payment was received, but booking confirmation is delayed. Please contact us with your booking number.');
  }

  if (updatedBooking) {
    return {
      bookingNumber: updatedBooking.booking_number,
      amount: Number(updatedBooking.total_price).toFixed(2),
      currency: updatedBooking.currency || 'EUR',
      paymentStatus: updatedBooking.payment_status,
    };
  }

  const { data: latestBooking, error: latestError } = await supabase
    .from('bookings')
    .select('booking_number, total_price, currency, payment_status')
    .eq('id', booking.id)
    .maybeSingle();
  if (latestError || latestBooking?.payment_status !== 'paid') {
    throw new Error('Payment was received, but booking confirmation is delayed. Please contact us with your booking number.');
  }

  return {
    bookingNumber: latestBooking.booking_number,
    amount: Number(latestBooking.total_price).toFixed(2),
    currency: latestBooking.currency || 'EUR',
    paymentStatus: latestBooking.payment_status,
  };
}

Deno.serve(async (request) => {
  const origin = request.headers.get('Origin') || '';
  if (request.method === 'OPTIONS') return response({}, 200, origin);
  if (request.method !== 'POST') return response({ error: 'Method not allowed.' }, 405, origin);
  if (!origin || !allowedOrigins.has(normalizeOrigin(origin))) return response({ error: 'Origin is not allowed.' }, 403, origin);

  try {
    const body = await request.json() as JsonRecord;
    const result = body.action === 'create-order'
      ? await createOrder(body)
      : body.action === 'capture-order'
        ? await captureOrder(body)
        : null;
    if (!result) return response({ error: 'Unsupported payment action.' }, 400, origin);
    return response(result, 200, origin);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Payment could not be processed.';
    const clientError = error instanceof PaymentRequestError;
    if (!clientError) console.error('PayPal checkout error:', message);
    return response(
      { error: clientError ? message : 'Payment service is temporarily unavailable. Please try again later.' },
      clientError ? 400 : 500,
      origin,
    );
  }
});
