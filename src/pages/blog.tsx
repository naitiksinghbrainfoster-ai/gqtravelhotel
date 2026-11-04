import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import { FeatureNews } from '../components/home/FeatureNews';
import { blogContentDefaults, HomeContent, homeContentValue } from '../lib/homeContent';
import { NewsArticle } from '../data/travelData';
import { fetchPublicBlogPosts, PublicBlogArticle } from '../lib/siteContent';

const BlogPage: React.FC<{ content?: HomeContent }> = ({ content }) => {
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [articles, setArticles] = useState<PublicBlogArticle[] | undefined>();

  useEffect(() => {
    let active = true;
    void fetchPublicBlogPosts()
      .then((posts) => {
        if (active && posts !== null) setArticles(posts);
      })
      .catch((error: unknown) => {
        console.error('Unable to load public blog articles from Supabase:', error);
        if (active) setArticles(undefined);
      });
    return () => {
      active = false;
    };
  }, []);

  const whatsappNumber = homeContentValue(content, 'blog_whatsapp_number', blogContentDefaults.blog_whatsapp_number).replace(/\D/g, '');
  const whatsappMessage = homeContentValue(content, 'blog_whatsapp_message', blogContentDefaults.blog_whatsapp_message);
  const openWhatsApp = () =>
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/blog"
        onNavigate={(path) => {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={openWhatsApp}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />

      <main>
        <section className="bg-teal-950 px-5 py-12 text-white sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-200">
              {homeContentValue(content, 'blog_hero_label', blogContentDefaults.blog_hero_label)}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {homeContentValue(content, 'blog_hero_title', blogContentDefaults.blog_hero_title)}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-teal-50 sm:text-lg">
              {homeContentValue(content, 'blog_hero_description', blogContentDefaults.blog_hero_description)}
            </p>
          </div>
        </section>
        <FeatureNews
          content={content}
          contentPrefix="blog"
          articles={articles}
          onOpenArticle={(article: NewsArticle) => {
            if (!article.slug) return;
            window.history.pushState({}, '', `/blog/${encodeURIComponent(article.slug)}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </main>

      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={openWhatsApp}
        onOpenTransferModal={() => window.location.assign('/airport-transfers-saarland')}
      />

      {legalModalType && (
        <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
      )}
      <AiChatConcierge
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
        onOpenBooking={() => {
          setAiConciergeOpen(false);
          openWhatsApp();
        }}
        onOpenTransferModal={() => {
          setAiConciergeOpen(false);
          window.location.assign('/airport-transfers-saarland');
        }}
      />
    </div>
  );
};

export default BlogPage;
