import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import ContactHero from '../components/contact/contacthero';
import ContactFaq from '../components/contact/contactfaq';
import LetsTalk from '../components/contact/letstalk';
import { HomeContent } from '../lib/homeContent';

/** Contact page – src/pages/contact.tsx */
type ContactPageProps = {
  currentPath?: string;
  content?: HomeContent;
  onNavigate?: (path: string) => void;
  onOpenBooking: () => void;
  onOpenLegal: (type: 'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms') => void;
  onOpenConcierge: () => void;
  onOpenTransferModal: () => void;
};

const ContactPage: React.FC<ContactPageProps> = ({
  currentPath = '/contact',
  content,
  onNavigate,
  onOpenBooking,
  onOpenLegal,
  onOpenConcierge,
  onOpenTransferModal,
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
      <ContactHero content={content} />
      <ContactFaq content={content} />
      <LetsTalk content={content} />
    </main>
    <Footer
      onNavigate={onNavigate}
      onOpenLegal={onOpenLegal}
      onOpenBooking={onOpenBooking}
      onOpenTransferModal={onOpenTransferModal}
    />
  </div>
);

export default ContactPage;