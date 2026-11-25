import { useEffect, useRef, useState } from 'react';

interface PayPalButtonActions {
  resolve: () => void;
  reject: () => void;
}

interface PayPalButtonOptions {
  style: {
    layout: 'vertical';
    color: 'gold';
    shape: 'rect';
    label: 'paypal';
  };
  onClick: (_data: unknown, actions: PayPalButtonActions) => Promise<void>;
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onCancel: () => void;
  onError: (error: unknown) => void;
}

interface PayPalButtonsInstance {
  render: (container: HTMLElement) => Promise<void>;
  close: () => Promise<void> | void;
}

interface PayPalNamespace {
  Buttons: (options: PayPalButtonOptions) => PayPalButtonsInstance;
}

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

interface PayPalCheckoutProps {
  clientId: string;
  onValidate: () => boolean;
  onCreateOrder: () => Promise<string>;
  onCapture: (orderId: string) => Promise<void>;
  onCancel: () => void;
  onError: (error: unknown) => void;
}

let paypalSdkPromise: Promise<PayPalNamespace> | null = null;

function loadPayPalSdk(clientId: string): Promise<PayPalNamespace> {
  if (window.paypal) return Promise.resolve(window.paypal);
  if (paypalSdkPromise) return paypalSdkPromise;

  paypalSdkPromise = new Promise<PayPalNamespace>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-paypal-sdk]');
    const script = existingScript || document.createElement('script');

    script.addEventListener('load', () => {
      if (window.paypal) resolve(window.paypal);
      else reject(new Error('PayPal checkout could not be loaded.'));
    }, { once: true });
    script.addEventListener('error', () => reject(new Error('PayPal checkout could not be loaded.')), { once: true });

    if (!existingScript) {
      script.dataset.paypalSdk = 'true';
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=EUR&intent=capture`;
      script.async = true;
      document.head.appendChild(script);
    }
  }).catch((error: unknown) => {
    paypalSdkPromise = null;
    throw error;
  });

  return paypalSdkPromise;
}

export function PayPalCheckout(props: PayPalCheckoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const latestProps = useRef(props);
  const [loadError, setLoadError] = useState('');
  latestProps.current = props;

  useEffect(() => {
    if (!props.clientId) {
      setLoadError('PayPal Live checkout is not configured yet. Please contact us to complete your booking.');
      return;
    }

    let active = true;
    let buttons: PayPalButtonsInstance | undefined;

    loadPayPalSdk(props.clientId)
      .then((paypal) => {
        if (!active || !containerRef.current) return;

        buttons = paypal.Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
          onClick: async (_data, actions) => {
            if (!latestProps.current.onValidate()) {
              actions.reject();
              return;
            }
            actions.resolve();
          },
          createOrder: async () => {
            try {
              return await latestProps.current.onCreateOrder();
            } catch (error) {
              latestProps.current.onError(error);
              throw error;
            }
          },
          onApprove: async ({ orderID }) => {
            try {
              await latestProps.current.onCapture(orderID);
            } catch (error) {
              latestProps.current.onError(error);
              throw error;
            }
          },
          onCancel: () => latestProps.current.onCancel(),
          onError: (error) => latestProps.current.onError(error),
        });

        return buttons.render(containerRef.current);
      })
      .catch((error: unknown) => {
        if (active) setLoadError(error instanceof Error ? error.message : 'PayPal checkout could not be loaded.');
      });

    return () => {
      active = false;
      void buttons?.close();
    };
  }, [props.clientId]);

  return (
    <div>
      {loadError ? (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
          {loadError}
        </p>
      ) : (
        <div ref={containerRef} aria-label="PayPal checkout" />
      )}
    </div>
  );
}
