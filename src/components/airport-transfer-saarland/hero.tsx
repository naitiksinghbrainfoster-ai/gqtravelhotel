import React from 'react';
import { ArrowRight, Plane, ShieldCheck } from 'lucide-react';
import { HomeContent, airportTransfersContentDefaults, homeContentValue } from '../../lib/homeContent';

interface AirportTransferSaarlandHeroProps {
  onRequestTransfer: () => void;
  content?: HomeContent;
}

const AirportTransferSaarlandHero: React.FC<AirportTransferSaarlandHeroProps> = ({
  onRequestTransfer,
  content,
}) => (
  <section className="relative overflow-hidden bg-teal-950 text-white">
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-800/50 via-teal-950 to-teal-950"
    />
    <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-16">
      <div className="lg:col-span-7">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-white/5 px-4 py-2 text-sm font-semibold text-teal-100">
          <Plane aria-hidden="true" className="h-4 w-4 text-teal-300" />
          {homeContentValue(content, 'airport_transfers_hero_badge', airportTransfersContentDefaults.airport_transfers_hero_badge)}
        </div>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {homeContentValue(content, 'airport_transfers_hero_title', airportTransfersContentDefaults.airport_transfers_hero_title)}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-50">
          {homeContentValue(content, 'airport_transfers_hero_description', airportTransfersContentDefaults.airport_transfers_hero_description)}
        </p>
        <p className="mt-4 max-w-2xl leading-7 text-teal-100/80">
          {homeContentValue(content, 'airport_transfers_hero_secondary', airportTransfersContentDefaults.airport_transfers_hero_secondary)}
        </p>
        <button
          type="button"
          onClick={onRequestTransfer}
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-teal-300 px-6 py-3.5 font-bold text-teal-950 transition-colors hover:bg-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {homeContentValue(content, 'airport_transfers_hero_button', airportTransfersContentDefaults.airport_transfers_hero_button)}
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </button>
        <p className="mt-4 flex items-center gap-2 text-sm text-teal-100/70">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-teal-300" />
          {homeContentValue(content, 'airport_transfers_hero_notice', airportTransfersContentDefaults.airport_transfers_hero_notice)}
        </p>
      </div>
      <div className="lg:col-span-5">
        <img
          src={homeContentValue(content, 'airport_transfers_hero_image', airportTransfersContentDefaults.airport_transfers_hero_image)}
          alt={homeContentValue(content, 'airport_transfers_hero_image_alt', airportTransfersContentDefaults.airport_transfers_hero_image_alt)}
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-teal-200/20 sm:aspect-[16/10] lg:aspect-[4/3]"
        />
      </div>
    </div>
  </section>
);

export default AirportTransferSaarlandHero;
