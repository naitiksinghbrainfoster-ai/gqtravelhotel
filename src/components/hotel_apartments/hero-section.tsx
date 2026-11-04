import React from 'react';
import { HomeContent, hotelApartmentsContentDefaults, homeContentValue } from '../../lib/homeContent';

const HeroSection: React.FC<{ content?: HomeContent }> = ({ content }) => (
  <section className="relative isolate flex min-h-[350px] items-center justify-center overflow-hidden bg-slate-950 sm:min-h-[300px] lg:min-h-[500px]">
    <img
      src={homeContentValue(content, 'hotel_apartments_hero_image', hotelApartmentsContentDefaults.hotel_apartments_hero_image)}
      alt={homeContentValue(content, 'hotel_apartments_hero_image_alt', hotelApartmentsContentDefaults.hotel_apartments_hero_image_alt)}
      className="absolute inset-0 z-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 z-10 bg-slate-950/40" />
    <div className="relative z-20 mx-auto flex min-h-[350px] w-full max-w-7xl items-center justify-center px-5 py-20 sm:min-h-[300px] sm:px-8 lg:min-h-[500px] lg:px-10">
      <div className="max-w-4xl text-center text-white">
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-6xl">
          {homeContentValue(content, 'hotel_apartments_hero_title', hotelApartmentsContentDefaults.hotel_apartments_hero_title)}
        </h1>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/15 to-transparent" />
  </section>
);

export default HeroSection;
