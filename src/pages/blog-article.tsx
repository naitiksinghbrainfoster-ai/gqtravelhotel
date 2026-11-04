import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AiChatConcierge } from '../components/AiChatConcierge';
import { LegalModal } from '../components/LegalModals';
import { blogContentDefaults, HomeContent, homeContentValue } from '../lib/homeContent';
import { fetchPublicBlogArticle, PublicBlogArticle } from '../lib/siteContent';

const setMetaContent = (selector: string, attribute: 'name' | 'property', key: string, value: string) => {
  let tag = document.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.append(tag);
  }
  tag.content = value;
};

const BlogArticlePage: React.FC<{ slug: string; content?: HomeContent }> = ({ slug, content }) => {
  const [article, setArticle] = useState<PublicBlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [legalModalType, setLegalModalType] = useState<
    'terms' | 'imprint' | 'privacy' | 'airport-terms' | 'accra-terms' | null
  >(null);
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setArticle(null);
    void fetchPublicBlogArticle(slug)
      .then((post) => {
        if (active) setArticle(post);
      })
      .catch((caught: unknown) => {
        console.error('Unable to load public blog article from Supabase:', caught);
        if (active) {
          setArticle(null);
          setError(caught instanceof Error ? caught.message : 'Unable to load this article.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    const title = article?.metaTitle
      || homeContentValue(content, 'blog_seo_title', 'Travel Blog | GQ Travel & Hotels');
    const description = article?.metaDescription
      || homeContentValue(content, 'blog_seo_description', 'Explore destination inspiration, travel tips and booking guides from GQ Travel & Hotels.');
    const keywords = article?.metaKeywords
      || homeContentValue(content, 'blog_seo_keywords', 'travel blog, destination guides, travel tips, booking guides, GQ Travel');
    document.title = title;
    setMetaContent('meta[name="description"]', 'name', 'description', description);
    setMetaContent('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaContent('meta[property="og:description"]', 'property', 'og:description', description);
    if (keywords.trim()) {
      setMetaContent('meta[name="keywords"]', 'name', 'keywords', keywords);
    } else {
      document.querySelector('meta[name="keywords"]')?.remove();
    }
  }, [article, content]);

  const whatsappNumber = homeContentValue(content, 'blog_whatsapp_number', blogContentDefaults.blog_whatsapp_number).replace(/\D/g, '');
  const whatsappMessage = homeContentValue(content, 'blog_whatsapp_message', blogContentDefaults.blog_whatsapp_message);
  const openWhatsApp = () =>
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar
        currentPath="/blog"
        onNavigate={navigateTo}
        onOpenBooking={openWhatsApp}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenConcierge={() => setAiConciergeOpen(true)}
      />
      <main className="mx-auto min-h-[55vh] max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <button
          type="button"
          onClick={() => navigateTo('/blog')}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-950"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </button>
        {loading ? (
          <p role="status" className="py-12 text-center text-slate-500">Loading article…</p>
        ) : error ? (
          <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
            <h1 className="text-xl font-bold">This article could not be loaded</h1>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        ) : !article ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h1 className="text-xl font-bold text-slate-900">Article not found</h1>
            <p className="mt-2 text-sm text-slate-600">This article may have been unpublished or removed.</p>
          </div>
        ) : (
          <article>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800">
              {article.category} · {article.date}{article.readTime ? ` · ${article.readTime}` : ''}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{article.excerpt}</p>
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="mt-8 max-h-[34rem] w-full rounded-2xl object-cover"
              />
            )}
            <div className="prose prose-slate mt-8 max-w-none space-y-5 leading-8">
              {article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </article>
        )}
      </main>
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={openWhatsApp}
        onOpenTransferModal={() => window.location.assign('/airport-transfers-saarland')}
      />
      {legalModalType && <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />}
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

export default BlogArticlePage;
