import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { NEWS_ARTICLES, NewsArticle } from '../../data/travelData';
import { blogContentDefaults, homeContentValue, HomeContent } from '../../lib/homeContent';
import { HOTEL_EMAIL } from '../../lib/contactChannels';

export const FeatureNews: React.FC<{
  content?: HomeContent;
  contentPrefix?: 'home' | 'blog';
  articles?: NewsArticle[];
  onOpenArticle?: (article: NewsArticle) => void;
}> = ({ content, contentPrefix = 'home', articles, onOpenArticle }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const articleSource = articles ?? NEWS_ARTICLES;
  const sectionKey = (field: string) =>
    contentPrefix === 'home' ? `home_news_${field}` : `blog_news_${field}`;
  const articleKey = (number: number, field: string) =>
    contentPrefix === 'home'
      ? `home_news_${number}_${field}`
      : `blog_article_${number}_${field}`;
  const articleActionKey = (field: string) =>
    contentPrefix === 'home' ? `home_news_${field}` : `blog_article_${field}`;

  return (
    <section id="guides" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screenshot 2 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
              {homeContentValue(content, sectionKey('label'), 'Travel Tips & Booking Guides')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              {homeContentValue(content, sectionKey('title'), 'Feature News & Guides')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {homeContentValue(content, sectionKey('description'), 'Discover expert travel tips, destination insights, and hotel recommendations from our specialists.')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              {homeContentValue(content, sectionKey('curated_label'), 'Curated by our team')}
            </span>
          </div>
        </div>

        {/* 3 News Cards matching Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articleSource.map((defaultArticle, index) => {
            const article = articles ? defaultArticle : {
              ...defaultArticle,
              title: homeContentValue(content, articleKey(index + 1, 'title'), defaultArticle.title),
              excerpt: homeContentValue(content, articleKey(index + 1, 'excerpt'), defaultArticle.excerpt),
              category: homeContentValue(content, articleKey(index + 1, 'category'), defaultArticle.category),
              image: homeContentValue(content, articleKey(index + 1, 'image'), defaultArticle.image),
              date: homeContentValue(content, articleKey(index + 1, 'date'), defaultArticle.date),
              readTime: homeContentValue(content, articleKey(index + 1, 'read_time'), defaultArticle.readTime),
              content: homeContentValue(
                content,
                articleKey(index + 1, 'content'),
                defaultArticle.content.join('\n\n'),
              ).split(/\n\s*\n/).filter(Boolean),
            };
            return (
            <div
              key={article.id}
              className="group flex flex-col rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-teal-700/30 transition-all duration-300"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-slate-800">
                  {article.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    <span>{article.date}</span>
                    <span>·</span>
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenArticle ? onOpenArticle(article) : setSelectedArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>
                      {homeContentValue(content, articleActionKey('read_button'), 'Read Article')}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
          {articles?.length === 0 && (
            <p className="text-sm leading-6 text-slate-600 md:col-span-3">
              {homeContentValue(content, 'blog_news_empty', blogContentDefaults.blog_news_empty)}
            </p>
          )}
        </div>

        {/* Modal for reading full article */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  {selectedArticle.category} · {selectedArticle.date}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedArticle.title}
                </h3>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-16/9 mb-6">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-sm text-slate-700 space-y-3 leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  {homeContentValue(
                    content,
                    contentPrefix === 'blog' ? 'blog_article_contact_prompt' : 'home_news_contact_prompt',
                    'Questions? Reach us at',
                  )}{' '}
                  {homeContentValue(
                    content,
                    contentPrefix === 'blog' ? 'blog_article_contact_email' : 'home_news_contact_email',
                    HOTEL_EMAIL.value,
                  )}
                  </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
                >
                  {homeContentValue(content, articleActionKey('close_button'), 'Close Guide')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
