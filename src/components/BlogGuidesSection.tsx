import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, ShieldCheck, CheckCircle2, X, Phone } from 'lucide-react';
import { BLOG_ARTICLES, ArticleItem, CONTRACTOR_INFO } from '../data/contractorData';

interface BlogGuidesSectionProps {
  onOpenEstimate: (serviceTitle?: string) => void;
}

export const BlogGuidesSection: React.FC<BlogGuidesSectionProps> = ({ onOpenEstimate }) => {
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  return (
    <section id="guides" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Orange County Remodeling Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            SEO Homeowner Guides & Building Insights
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Essential reading for Southern California homeowners planning kitchens, baths, additions, and outdoor decks in 2026.
          </p>
        </div>

        {/* 5 Practical Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map((article, idx) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className={`bg-white rounded-2xl border border-slate-200 hover:border-amber-400/80 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                {/* Key takeaways bullet preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                  {article.keyTakeaways.slice(0, idx === 0 ? 3 : 2).map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{article.date}</span>
                <span className="inline-flex items-center gap-1 font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Article Full Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
              
              {/* Modal Header */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 relative shrink-0">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full uppercase">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    · {activeArticle.readTime}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {activeArticle.title}
                </h3>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
                
                {/* Key Takeaways Box */}
                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
                  <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Key Contractor Takeaways for Homeowners
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                    {activeArticle.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Article Body Paragraphs */}
                <div className="space-y-4 text-slate-800">
                  {activeArticle.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Contractor Advice Note */}
                <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      Have questions about your specific Orange County home?
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Ben provides free on-site consultations and code evaluations.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>(714) 884-2905</span>
                    </a>
                    <button
                      onClick={() => {
                        const title = activeArticle.title;
                        setActiveArticle(null);
                        onOpenEstimate(title);
                      }}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                    >
                      Request Free Estimate
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
