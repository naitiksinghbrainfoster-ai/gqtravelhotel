import React from 'react';

interface GlobalFlightBookingPortalProps {
  bookingUrl: string;
}

const GlobalFlightBookingPortal: React.FC<GlobalFlightBookingPortalProps> = ({ bookingUrl }) => (
  <section id="global-flight-booking" className="scroll-mt-24 bg-white px-5 py-6 sm:px-8 sm:py-8">
    <div className="mx-auto max-w-7xl">
      <iframe
        title="Global flight booking"
        src={bookingUrl}
        className="h-[min(80vh,760px)] min-h-[620px] w-full border-0 bg-white"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  </section>
);

export default GlobalFlightBookingPortal;
