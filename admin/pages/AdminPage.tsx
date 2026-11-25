

import React, { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, BedDouble, Check, ChevronDown, LoaderCircle, LogOut, Menu, Plus, Search, X } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../src/lib/supabase';
import { websiteContentDefaults } from '../../src/lib/homeContent';

import { InlineAlert } from '../components/AdminFeedback';
import { BookingDetail } from '../components/BookingDetails';
import AdminLoginPage from '../../supabase/login/AdminLoginPage';
import { signInAdmin } from '../../supabase/login/supabaseAuth';
import BookingsPage from './BookingsPage';
import DashboardPage from './DashboardPage';
import EnquiriesPage from './EnquiriesPage';
import PropertiesPage, { PropertyEditor } from './PropertiesPage';
import WebsiteContentPage from './WebsiteContentPage';
import { type AdminSection, type DataRow, type PropertyDraft, asText, emptyDraft, filterRows, getErrorMessage, navigation, propertyId, propertyImageStoragePath, sectionDescription, websiteContentPages } from '../utils';

const legacyRoomTypes = [
  ['single', 'Single room'],
  ['double', 'Double room'],
  ['triple', 'Triple room'],
  ['apartment_triple', 'Apartment triple room'],
] as const;

function roomPricingFromValue(value: unknown): PropertyDraft['room_pricing'] | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const pricing = value as Record<string, unknown>;
  if (Array.isArray(pricing.columns) && Array.isArray(pricing.rows)) {
    const columns = pricing.columns.map(asText);
    return {
      columns,
      rows: pricing.rows
        .filter(Array.isArray)
        .map((row) => columns.map((_, index) => asText(row[index]))),
    };
  }

  const rows = legacyRoomTypes.flatMap(([category, label]) => {
    const value = pricing[category];
    if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
    const rates = value as Record<string, unknown>;
    if (!['standard', 'comfort', 'extra_person'].some((key) => key in rates)) return [];
    return [[label, asText(rates.standard), asText(rates.comfort), asText(rates.extra_person)]];
  });
  return rows.length
    ? { columns: [...emptyDraft.room_pricing.columns], rows }
    : null;
}

function parseRoomPricing(value: unknown): PropertyDraft['room_pricing'] {
  const pricing = roomPricingFromValue(value);
  return pricing ?? {
    columns: [...emptyDraft.room_pricing.columns],
    rows: emptyDraft.room_pricing.rows.map((row) => [...row]),
  };
}

function parseExtraRoomPricing(value: unknown): PropertyDraft['extra_room_pricing'] {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const pricing = (value as Record<string, unknown>).extra_room_pricing;
    if (pricing && typeof pricing === 'object' && !Array.isArray(pricing)) {
      const table = pricing as Record<string, unknown>;
      if (Array.isArray(table.columns) && Array.isArray(table.rows)) {
        const columns = table.columns.map(asText);
        return {
          columns,
          rows: table.rows
            .filter(Array.isArray)
            .map((row) => columns.map((_, index) => asText(row[index]))),
        };
      }
    }
  }
  return {
    columns: [...emptyDraft.extra_room_pricing.columns],
    rows: emptyDraft.extra_room_pricing.rows.map((row) => [...row]),
  };
}

function hasRoomPricing(value: unknown) {
  const pricing = roomPricingFromValue(value);
  return Boolean(
    pricing
    && pricing.columns.length > 0
    && pricing.rows.some((row) => row.some((cell) => cell.trim().length > 0)),
  );
}

function hasExtraRoomPricing(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const pricing = (value as Record<string, unknown>).extra_room_pricing;
  if (!pricing || typeof pricing !== 'object' || Array.isArray(pricing)) return false;
  const table = pricing as Record<string, unknown>;
  return Array.isArray(table.columns)
    && table.columns.length > 0
    && Array.isArray(table.rows)
    && table.rows.some((row) => Array.isArray(row) && row.some((cell) => asText(cell).trim().length > 0));
}

function getWebsiteContentError(error: unknown) {
  const message = getErrorMessage(error);
  return message.includes('site_content.key') && message.toLowerCase().includes('does not exist')
    ? `${message}. Run supabase/website_content_migration.sql in the Supabase SQL Editor, then refresh this page.`
    : message;
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const roleCheckRef = useRef(0);
  const [roleState, setRoleState] = useState<'loading' | 'admin' | 'denied' | 'error'>('loading');
  const [roleError, setRoleError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [section, setSection] = useState<AdminSection>('overview');
  const [selectedWebsitePageId, setSelectedWebsitePageId] = useState('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dashboard, setDashboard] = useState({ properties: 0, bookings: 0, pending: 0, enquiries: 0 });
  const [properties, setProperties] = useState<DataRow[]>([]);
  const [bookings, setBookings] = useState<DataRow[]>([]);
  const [enquiries, setEnquiries] = useState<DataRow[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');
  const [propertyEditorOpen, setPropertyEditorOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<DataRow | null>(null);
  const [draft, setDraft] = useState<PropertyDraft>(emptyDraft);
  const [featuredFile, setFeaturedFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<DataRow[]>([]);
  const [removedGallery, setRemovedGallery] = useState<DataRow[]>([]);
  const [bookingDetails, setBookingDetails] = useState<DataRow | null>(null);
  const [contentSaving, setContentSaving] = useState(false);

  const verifyRole = useCallback(async (nextSession: Session | null) => {
    const requestId = ++roleCheckRef.current;
    setSession(nextSession);
    setRoleError('');
    if (!nextSession) {
      setRoleState('denied');
      return;
    }

    setRoleState('loading');
    try {
      const { data, error: profileError } = await supabase!
        .from('profiles')
        .select('role')
        .eq('id', nextSession.user.id)
        .maybeSingle();
      if (requestId !== roleCheckRef.current) return;

      if (profileError) {
        setRoleError(`Could not verify your admin role: ${profileError.message}`);
        setRoleState('error');
      } else if (data?.role === 'admin' || data?.role === 'super_admin') {
        setRoleState('admin');
      } else {
        setRoleState('denied');
      }
    } catch (caught) {
      if (requestId !== roleCheckRef.current) return;
      setRoleError(`Could not verify your admin role: ${getErrorMessage(caught)}`);
      setRoleState('error');
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    void supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) {
        setRoleError(`Could not read the current session: ${sessionError.message}`);
        setRoleState('error');
        return;
      }
      void verifyRole(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) void verifyRole(nextSession);
    });
    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, [verifyRole]);

  const fetchAdminData = useCallback(async () => {
    if (!supabase || roleState !== 'admin') return;
    setBusy(true);
    setError('');
    try {
      if (section === 'overview') {
        const [propertiesResult, bookingsResult, pendingResult, enquiriesResult, recentResult] = await Promise.all([
          supabase.from('properties').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('booking_status', 'pending'),
          supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
          supabase.from('bookings').select('*, properties(name, property_code)').order('created_at', { ascending: false }).limit(5),
        ]);
        const firstError = propertiesResult.error || bookingsResult.error || pendingResult.error || enquiriesResult.error || recentResult.error;
        if (firstError) throw firstError;
        setDashboard({
          properties: propertiesResult.count ?? 0,
          bookings: bookingsResult.count ?? 0,
          pending: pendingResult.count ?? 0,
          enquiries: enquiriesResult.count ?? 0,
        });
        setBookings((recentResult.data ?? []) as DataRow[]);
      } else if (section === 'properties') {
        const { data, error: queryError } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
        if (queryError) throw queryError;
        setProperties((data ?? []) as DataRow[]);
      } else if (section === 'bookings') {
        const { data, error: queryError } = await supabase.from('bookings').select('*, properties(name, property_code)').order('created_at', { ascending: false });
        if (queryError) throw queryError;
        setBookings((data ?? []) as DataRow[]);
      } else if (section === 'enquiries') {
        const { data, error: queryError } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (queryError) throw queryError;
        setEnquiries((data ?? []) as DataRow[]);
      } else {
        const { data, error: queryError } = await supabase.from('site_content').select('key, value');
        if (queryError) throw queryError;
        const fetchedContent = Object.fromEntries(
          (data ?? []).flatMap((row) =>
            typeof row.key === 'string' && typeof row.value === 'string'
              ? [[row.key, row.value]]
              : [],
          ),
        );
        const contentWithDefaults = { ...websiteContentDefaults, ...fetchedContent };
        for (const [key, fallback] of Object.entries(websiteContentDefaults)) {
          if (!fetchedContent[key]?.trim()) contentWithDefaults[key] = fallback;
        }
        setContent(contentWithDefaults);
      }
    } catch (caught) {
      setError(section === 'content' ? getWebsiteContentError(caught) : getErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  }, [roleState, section]);

  useEffect(() => {
    void fetchAdminData();
  }, [fetchAdminData]);

  const login = async (email: string, password: string) => {
    setLoginLoading(true);
    setLoginError('');
    try {
      await signInAdmin(email, password);
    } catch (caught) {
      setLoginError(getErrorMessage(caught));
    } finally {
      setLoginLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) setError(`Sign out failed: ${signOutError.message}`);
    } catch (caught) {
      setError(`Sign out failed: ${getErrorMessage(caught)}`);
    }
  };

  const filteredProperties = useMemo(() => filterRows(properties, search, ['name', 'slug', 'property_type', 'city', 'country']), [properties, search]);
  const filteredBookings = useMemo(() => filterRows(bookings, search, ['id', 'customer_name', 'customer_email', 'booking_status', 'payment_status']), [bookings, search]);
  const filteredEnquiries = useMemo(() => filterRows(enquiries, search, ['name', 'email', 'subject', 'message']), [enquiries, search]);

  const startEditProperty = async (property?: DataRow) => {
    setPropertyEditorOpen(true);
    setEditingProperty(property ?? null);
    setError('');
    setExistingGallery([]);
    setRemovedGallery([]);
    setDraft(property
      ? {
          name: asText(property.name),
          slug: asText(property.slug),
          property_type: ['Hotel', 'Apartment', 'Villa', 'Resort'].includes(asText(property.property_type))
            ? asText(property.property_type) as PropertyDraft['property_type']
            : 'Hotel',
          short_description: asText(property.short_description),
          description: asText(property.description),
          country: asText(property.country),
          city: asText(property.city),
          address: asText(property.address),
          postal_code: asText(property.postal_code),
          price_per_night: asText(property.price_per_night),
          max_adults: asText(property.max_adults ?? '2'),
          max_children: asText(property.max_children ?? '0'),
          featured_image: asText(property.featured_image),
          featured: Boolean(property.featured),
          status: property.status === 'published' ? 'published' : 'draft',
          amenities: [],
          room_pricing_enabled: hasRoomPricing(property.room_pricing),
          room_pricing: parseRoomPricing(property.room_pricing),
          extra_room_pricing_enabled: hasExtraRoomPricing(property.room_pricing),
          extra_room_pricing: parseExtraRoomPricing(property.room_pricing),
        }
      : emptyDraft);
    setFeaturedFile(null);
    setGalleryFiles([]);
    if (!property || !supabase) return;

    setBusy(true);
    try {
      const id = propertyId(property);
      const [imagesResult, amenitiesResult] = await Promise.all([
        supabase.from('property_images').select('id, image_url, sort_order').eq('property_id', id).order('sort_order'),
        supabase.from('property_amenities').select('amenity_name').eq('property_id', id),
      ]);
      if (imagesResult.error) throw imagesResult.error;
      if (amenitiesResult.error) throw amenitiesResult.error;
      setExistingGallery((imagesResult.data ?? []) as DataRow[]);
      setDraft((current) => ({
        ...current,
        amenities: (amenitiesResult.data ?? [])
          .map((item) => item.amenity_name)
          .filter((name): name is string => typeof name === 'string'),
      }));
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  };

  const uploadImage = async (file: File, propertyIdValue: string, imageType: 'featured' | 'gallery') => {
    if (!supabase) throw new Error('Supabase is not configured.');
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      throw new Error(`${file.name} is not a supported image format.`);
    }
    if (file.size > 10 * 1024 * 1024) throw new Error(`${file.name} is larger than 10 MB.`);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `properties/${propertyIdValue}/${imageType}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from('property-images').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (uploadError) throw uploadError;
    return supabase.storage.from('property-images').getPublicUrl(path).data.publicUrl;
  };

  const saveProperty = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const propertyData = {
        title: draft.name.trim(),
        name: draft.name.trim(),
        slug: draft.slug.trim(),
        property_type: draft.property_type,
        short_description: draft.short_description.trim(),
        description: draft.description.trim(),
        country: draft.country.trim(),
        city: draft.city.trim(),
        address: draft.address.trim(),
        postal_code: draft.postal_code.trim(),
        price_per_night: Number(draft.price_per_night),
        max_adults: Number(draft.max_adults) || 1,
        max_children: Number(draft.max_children) || 0,
        max_guests: (Number(draft.max_adults) || 1) + (Number(draft.max_children) || 0),
        featured_image: draft.featured_image.trim(),
        featured: draft.featured,
        status: draft.status,
        currency: 'EUR',
        room_pricing: draft.room_pricing_enabled || draft.extra_room_pricing_enabled
          ? {
              columns: draft.room_pricing_enabled ? draft.room_pricing.columns : [],
              rows: draft.room_pricing_enabled ? draft.room_pricing.rows : [],
              ...(draft.extra_room_pricing_enabled
                ? { extra_room_pricing: draft.extra_room_pricing }
                : {}),
            }
          : {},
      };

      let saved: DataRow;
      if (editingProperty) {
        const { data, error: updateError } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', propertyId(editingProperty))
          .select('id')
          .single();
        if (updateError) throw updateError;
        saved = data as DataRow;
      } else {
        const { data, error: insertError } = await supabase
          .from('properties')
          .insert(propertyData)
          .select('id')
          .single();
        if (insertError) throw insertError;
        saved = data as DataRow;
      }

      const savedId = propertyId(saved);
      if (featuredFile) {
        const featuredUrl = await uploadImage(featuredFile, savedId, 'featured');
        const { error: featuredError } = await supabase.from('properties').update({ featured_image: featuredUrl }).eq('id', savedId);
        if (featuredError) throw featuredError;
      }

      const removedIds = removedGallery.map((image) => asText(image.id)).filter(Boolean);
      if (removedIds.length) {
        const { error: removeError } = await supabase
          .from('property_images')
          .delete()
          .eq('property_id', savedId)
          .in('id', removedIds);
        if (removeError) throw removeError;
        const storagePaths = removedGallery.map((image) => propertyImageStoragePath(image.image_url)).filter(Boolean);
        if (storagePaths.length) {
          const { error: storageError } = await supabase.storage.from('property-images').remove(storagePaths);
          if (storageError) throw storageError;
        }
      }

      const newGalleryRows: { property_id: string; image_url: string; sort_order: number }[] = [];
      for (const [index, file] of galleryFiles.entries()) {
        newGalleryRows.push({
          property_id: savedId,
          image_url: await uploadImage(file, savedId, 'gallery'),
          sort_order: existingGallery.length + index,
        });
      }
      if (newGalleryRows.length) {
        const { error: galleryError } = await supabase.from('property_images').insert(newGalleryRows);
        if (galleryError) throw galleryError;
      }

      const { data: currentAmenities, error: readAmenitiesError } = await supabase
        .from('property_amenities')
        .select('id, amenity_name')
        .eq('property_id', savedId);
      if (readAmenitiesError) throw readAmenitiesError;
      const selectedAmenities = new Set(draft.amenities);
      const removedAmenityIds = (currentAmenities ?? [])
        .filter((item) => typeof item.amenity_name === 'string' && !selectedAmenities.has(item.amenity_name))
        .map((item) => item.id);
      if (removedAmenityIds.length) {
        const { error: removeAmenitiesError } = await supabase
          .from('property_amenities')
          .delete()
          .eq('property_id', savedId)
          .in('id', removedAmenityIds);
        if (removeAmenitiesError) throw removeAmenitiesError;
      }
      const currentAmenityNames = new Set((currentAmenities ?? []).map((item) => item.amenity_name));
      const newAmenityRows = draft.amenities
        .filter((amenity) => !currentAmenityNames.has(amenity))
        .map((amenity) => ({ property_id: savedId, amenity_name: amenity }));
      if (newAmenityRows.length) {
        const { error: addAmenitiesError } = await supabase.from('property_amenities').insert(newAmenityRows);
        if (addAmenitiesError) throw addAmenitiesError;
      }

      setNotice(editingProperty ? 'Property updated successfully.' : 'Property created successfully.');
      setPropertyEditorOpen(false);
      setEditingProperty(null);
      setDraft(emptyDraft);
      setFeaturedFile(null);
      setGalleryFiles([]);
      setExistingGallery([]);
      setRemovedGallery([]);
      await fetchAdminData();
    } catch (caught) {
      const message = getErrorMessage(caught);
      setError(
        message.toLowerCase().includes('schema cache') && message.includes("'properties'")
          ? `${message}. In Supabase SQL Editor, run supabase/property_management_migration.sql, then refresh this page.`
          : message,
      );
    } finally {
      setBusy(false);
    }
  };

  const deleteProperty = async (property: DataRow) => {
    if (!supabase || !window.confirm(`Delete "${asText(property.name)}"? Properties linked to rates, units, or bookings will be archived instead.`)) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const id = propertyId(property);
      const [bookingResult, unitResult, rateResult, imageResult, amenityResult] = await Promise.all([
        supabase.from('bookings').select('id').eq('property_id', id).limit(1),
        supabase.from('property_units').select('id').eq('property_id', id).limit(1),
        supabase.from('property_rates').select('id').eq('property_id', id).limit(1),
        supabase.from('property_images').select('id, image_url').eq('property_id', id),
        supabase.from('property_amenities').select('id').eq('property_id', id),
      ]);
      const readError = bookingResult.error || unitResult.error || rateResult.error || imageResult.error || amenityResult.error;
      if (readError) throw readError;

      if ((bookingResult.data?.length ?? 0) || (unitResult.data?.length ?? 0) || (rateResult.data?.length ?? 0)) {
        const { error: archiveError } = await supabase.from('properties').update({ status: 'draft' }).eq('id', id);
        if (archiveError) throw archiveError;
        setNotice('This property has linked bookings, units, or rates, so it was safely archived instead of deleted.');
        await fetchAdminData();
        return;
      }

      if (imageResult.data?.length) {
        const { error: imageDeleteError } = await supabase.from('property_images').delete().eq('property_id', id);
        if (imageDeleteError) throw imageDeleteError;
      }
      if (amenityResult.data?.length) {
        const { error: amenityDeleteError } = await supabase.from('property_amenities').delete().eq('property_id', id);
        if (amenityDeleteError) throw amenityDeleteError;
      }
      const { error: deleteError } = await supabase.from('properties').delete().eq('id', id).select('id').single();
      if (deleteError) throw deleteError;
      const storagePaths = Array.from(new Set([
        property.featured_image,
        ...(imageResult.data ?? []).map((image) => image.image_url),
      ].map(propertyImageStoragePath).filter(Boolean)));
      if (storagePaths.length) {
        const { error: storageError } = await supabase.storage.from('property-images').remove(storagePaths);
        if (storageError) {
          setError(`Property was deleted, but some stored images could not be removed: ${getErrorMessage(storageError)}`);
          await fetchAdminData();
          return;
        }
      }
      setNotice('Property deleted.');
      await fetchAdminData();
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  };

  const togglePropertyStatus = async (property: DataRow) => {
    if (!supabase) return;
    setBusy(true);
    setError('');
    setNotice('');
    const nextStatus = property.status === 'published' ? 'draft' : 'published';
    try {
      const { error: updateError } = await supabase
        .from('properties')
        .update({ status: nextStatus })
        .eq('id', propertyId(property));
      if (updateError) throw updateError;
      setNotice(nextStatus === 'published' ? 'Property published.' : 'Property unpublished.');
      await fetchAdminData();
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  };

  const updateBookingStatus = async (booking: DataRow, status: string) => {
    if (!supabase) return;
    setBusy(true);
    setError('');
    try {
      const { error: updateError } = await supabase.from('bookings').update({ booking_status: status }).eq('id', asText(booking.id));
      if (updateError) throw updateError;
      setNotice('Booking status updated.');
      await fetchAdminData();
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setBusy(false);
    }
  };

  const saveContent = async (event: FormEvent, keys: string[]) => {
    event.preventDefault();
    if (!supabase) return;
    setContentSaving(true);
    setError('');
    setNotice('');
    try {
      const page = websiteContentPages.find((item) => item.id === selectedWebsitePageId);
      if (!page) throw new Error('Select a valid website content page before saving.');
      const rows = keys.map((key) => ({
        page_key: selectedWebsitePageId,
        page_title: page.label,
        key,
        value: content[key] ?? '',
      }));
      const { error: saveError } = await supabase.from('site_content').upsert(rows, { onConflict: 'key' });
      if (saveError) throw saveError;
      window.dispatchEvent(new CustomEvent('gq-site-content-updated', { detail: content }));
      setNotice('Website content saved.');
    } catch (caught) {
      setError(getWebsiteContentError(caught));
    } finally {
      setContentSaving(false);
    }
  };

  const uploadContentImage = async (file: File, key: string) => {
    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      setError(`${file.name} is not a supported image format.`);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(`${file.name} is larger than 10 MB.`);
      return;
    }

    setError('');
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const path = `website-content/${key}/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from('property-images').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (uploadError) throw uploadError;
      const publicUrl = supabase.storage.from('property-images').getPublicUrl(path).data.publicUrl;
      setContent((current) => ({ ...current, [key]: publicUrl }));
    } catch (caught) {
      setError(`Image upload failed: ${getErrorMessage(caught)}`);
    }
  };

  if (!supabase) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <section className="w-full max-w-xl rounded-2xl border border-amber-200 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Supabase configuration required</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your local environment, then restart the app.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Review the existing Supabase schema and policies before applying a migration. Do not rerun <code>supabase/admin_setup.sql</code> against an existing project.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (roleState === 'loading') {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-600">
        <span className="flex items-center gap-3"><LoaderCircle className="h-5 w-5 animate-spin text-teal-800" /> Checking admin access…</span>
      </main>
    );
  }

  if (roleState === 'error') {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-4">
        <section className="w-full max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Admin access could not be verified</h1>
          <InlineAlert message={roleError} />
          <button type="button" onClick={() => void verifyRole(session)} className="rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white">Try again</button>
        </section>
      </main>
    );
  }

  if (!session) {
    return <AdminLoginPage onLogin={login} error={loginError} loading={loginLoading} />;
  }

  if (roleState === 'denied') {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-4">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-rose-600"><AlertCircle className="h-6 w-6" /></span>
          <h1 className="mt-4 text-xl font-semibold text-slate-900">Admin access required</h1>
          <p className="mt-2 text-sm text-slate-500">This account is signed in, but it does not have the admin role.</p>
          <button type="button" onClick={() => void signOut()} className="mt-6 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Sign out</button>
        </section>
      </main>
    );
  }

  const selectedWebsitePage = websiteContentPages.find((page) => page.id === selectedWebsitePageId) ?? websiteContentPages[0];
  const currentPageTitle = section === 'content'
    ? `Website content - ${selectedWebsitePage.label}`
    : navigation.find((item) => item.id === section)?.label ?? 'Overview';

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-800">
      {mobileNavOpen && <button aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-800 text-white"><BedDouble className="h-5 w-5" /></span>
          <div>
            <p className="font-display text-sm font-bold text-slate-900">GQ Travel & Hotels</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-400">Admin workspace</p>
          </div>
          <button className="ml-auto rounded-lg p-2 text-slate-400 lg:hidden" onClick={() => setMobileNavOpen(false)} aria-label="Close menu"><X className="h-4 w-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-7">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">Workspace</p>
          <nav className="mt-3 space-y-1">
            {navigation.map(({ id, label, icon: Icon }) => (
              <div key={id}>
                <button
                  type="button"
                  aria-expanded={id === 'content' ? section === 'content' : undefined}
                  onClick={() => { setSection(id); setSearch(''); if (id !== 'content') setMobileNavOpen(false); setError(''); setNotice(''); }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${section === id ? 'bg-teal-50 text-teal-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <Icon className={`h-[18px] w-[18px] ${section === id ? 'text-teal-800' : 'text-slate-400'}`} />
                  {label}
                  {id === 'bookings' && dashboard.pending > 0 && <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">{dashboard.pending}</span>}
                  {id === 'content' && <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${section === 'content' ? 'rotate-180' : ''}`} />}
                </button>
                {id === 'content' && section === 'content' && (
                  <div className="ml-5 mt-1 max-h-[45vh] space-y-1 overflow-y-auto border-l border-slate-200 pl-3">
                    {websiteContentPages.map((page) => (
                      <button
                        key={page.id}
                        type="button"
                        aria-current={selectedWebsitePageId === page.id ? 'page' : undefined}
                        onClick={() => {
                          setSelectedWebsitePageId(page.id);
                          setError('');
                          setNotice('');
                          setMobileNavOpen(false);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition ${
                          selectedWebsitePageId === page.id
                            ? 'bg-teal-50 text-teal-900'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {page.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-100 text-xs font-bold uppercase text-teal-900">
              {(session.user.email ?? 'A').slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-800">{session.user.email}</p>
              <p className="mt-0.5 text-[10px] font-medium text-emerald-700">Administrator</p>
            </div>
            <button type="button" title="Sign out" onClick={() => void signOut()} className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-slate-800"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-7">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setMobileNavOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">GQ Travel & Hotels</p>
              <h1 className="mt-0.5 font-display text-lg font-semibold text-slate-900">{currentPageTitle}</h1>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Supabase connected</span>
            <button type="button" onClick={() => void signOut()} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"><LogOut className="h-3.5 w-3.5" /> Sign out</button>
          </div>
        </header>

        <main className="mx-auto max-w-[1480px] px-4 py-7 sm:px-7 sm:py-9">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
                {section === 'overview' ? 'Good to see you' : currentPageTitle}
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">
                {section === 'overview' ? 'Here is what is happening with your travel business today.' : sectionDescription(section)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {['properties', 'bookings', 'enquiries'].includes(section) && (
                <label className="flex h-10 w-full min-w-[190px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 sm:w-[230px]">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400" />
                </label>
              )}
              {section === 'properties' && (
                <button type="button" onClick={() => startEditProperty()} className="flex h-10 items-center gap-2 rounded-xl bg-teal-800 px-3.5 text-sm font-semibold text-white hover:bg-teal-900"><Plus className="h-4 w-4" /><span className="hidden sm:inline">Add property</span></button>
              )}
            </div>
          </div>

          {error && <div className="mb-5"><InlineAlert message={error} /></div>}
          {notice && <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"><Check className="h-4 w-4" />{notice}</div>}
          {busy && <div className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-400"><LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Syncing with Supabase…</div>}

          {section === 'overview' && (
            <DashboardPage
              dashboard={dashboard}
              bookings={bookings}
              onViewBookings={() => setSection('bookings')}
              onBookingClick={setBookingDetails}
            />
          )}
          {section === 'properties' && (
            <PropertiesPage properties={filteredProperties} busy={busy} onEdit={startEditProperty} onDelete={deleteProperty} onToggleStatus={togglePropertyStatus} />
          )}
          {section === 'bookings' && (
            <BookingsPage bookings={filteredBookings} busy={busy} onOpen={setBookingDetails} onUpdateStatus={updateBookingStatus} />
          )}
          {section === 'enquiries' && <EnquiriesPage enquiries={filteredEnquiries} busy={busy} />}
          {section === 'content' && (
            <WebsiteContentPage
              content={content}
              selectedPageId={selectedWebsitePageId}
              onChange={(key, value) => setContent((current) => ({ ...current, [key]: value }))}
              onSubmit={(event, keys) => void saveContent(event, keys)}
              onUpload={uploadContentImage}
              saving={contentSaving}
            />
          )}
        </main>
      </div>

      {propertyEditorOpen && section === 'properties' && (
        <PropertyEditor
          editing={Boolean(editingProperty)}
          draft={draft}
          setDraft={setDraft}
          featuredFile={featuredFile}
          galleryFiles={galleryFiles}
          existingGallery={existingGallery}
          onFeaturedFile={setFeaturedFile}
          onGalleryFiles={setGalleryFiles}
          onRemoveExistingGallery={(image) => {
            setExistingGallery((current) => current.filter((entry) => entry.id !== image.id));
            setRemovedGallery((current) => [...current, image]);
          }}
          onRemoveGalleryFile={(index) => setGalleryFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))}
          onFileError={setError}
          error={error}
          onClose={() => { setPropertyEditorOpen(false); setEditingProperty(null); setDraft(emptyDraft); setFeaturedFile(null); setGalleryFiles([]); setExistingGallery([]); setRemovedGallery([]); }}
          onSubmit={saveProperty}
          saving={busy}
        />
      )}
      {bookingDetails && <BookingDetail booking={bookingDetails} onClose={() => setBookingDetails(null)} />}
    </div>
  );
}
