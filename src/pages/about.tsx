import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import AboutHero from '../components/service/Abouthero';
import WhyChooseUs from '../components/service/whychooseus';
import TeamSection from '../components/service/teamsection';
import type { HomeContent } from '../lib/homeContent';

/** About page – src/pages/about.tsx */
type AboutPageProps = {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking: () => void;
  onOpenLegal: (type: 'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms') => void;
  onOpenConcierge: () => void;
  onOpenTransferModal: () => void;
  content?: HomeContent;
};

const AboutPage: React.FC<AboutPageProps> = ({
  currentPath = '/about',
  onNavigate,
  onOpenBooking,
  onOpenLegal,
  onOpenConcierge,
  onOpenTransferModal,
  content,
}) => (
  <div className="min-h-screen bg-white">
    <Navbar
      currentPath={currentPath}
      onNavigate={onNavigate}
      onOpenBooking={onOpenBooking}
      onOpenLegal={onOpenLegal}
      onOpenConcierge={onOpenConcierge}
    />
    <main>
      <AboutHero content={content} />
      <WhyChooseUs content={content} />
      <TeamSection content={content} />
    </main>
    <Footer
      onNavigate={onNavigate}
      onOpenLegal={onOpenLegal}
      onOpenBooking={onOpenBooking}
      onOpenTransferModal={onOpenTransferModal}
    />
  </div>
);

export default AboutPage;