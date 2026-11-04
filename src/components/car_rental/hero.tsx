import React from 'react';
import { ArrowRight, Car, Globe2 } from 'lucide-react';
import { HomeContent, carRentalContentDefaults, homeContentValue } from '../../lib/homeContent';

interface CarRentalHeroProps {
  bookingUrl: string;
  content?: HomeContent;
}

const CarRentalHero: React.FC<CarRentalHeroProps> = ({ bookingUrl, content }) => (
  <section className="relative overflow-hidden bg-slate-950 text-white">
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-800/50 via-slate-950 to-slate-950"
    />
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:px-8 lg:py-24">
      <div className="lg:col-span-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-200">
          <Globe2 aria-hidden="true" className="h-4 w-4" />
          {homeContentValue(content, 'car_rental_hero_label', carRentalContentDefaults.car_rental_hero_label)}
        </div>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {homeContentValue(content, 'car_rental_hero_title', carRentalContentDefaults.car_rental_hero_title)}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          {homeContentValue(content, 'car_rental_hero_description', carRentalContentDefaults.car_rental_hero_description)}
        </p>
        <p className="mt-4 max-w-2xl leading-7 text-slate-300">
          {homeContentValue(content, 'car_rental_hero_secondary', carRentalContentDefaults.car_rental_hero_secondary)}
        </p>
        <a
          id="car-rental-booking"
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 font-bold text-slate-950 transition-colors hover:bg-teal-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
        >
          {homeContentValue(content, 'car_rental_hero_button', carRentalContentDefaults.car_rental_hero_button)}
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </a>
        <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
          <Car aria-hidden="true" className="h-4 w-4 text-teal-400" />
          {homeContentValue(content, 'car_rental_hero_note', carRentalContentDefaults.car_rental_hero_note)}
        </p>
      </div>
      <div className="hidden justify-center lg:col-span-4 lg:flex">
        <img
          src={homeContentValue(content, 'car_rental_hero_image', carRentalContentDefaults.car_rental_hero_image)}
          alt={homeContentValue(content, 'car_rental_hero_image_alt', carRentalContentDefaults.car_rental_hero_image_alt)}
          className="aspect-[3/2] w-full rounded-3xl object-cover shadow-xl ring-1 ring-teal-300/20"
        />
      </div>
    </div>
  </section>
);

export default CarRentalHero;
