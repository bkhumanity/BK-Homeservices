import React from 'react';
import { ShieldCheck, Hammer, FileSpreadsheet, Sparkles, Clock, PhoneCall, Star, CheckCircle, ExternalLink } from 'lucide-react';
import { CONTRACTOR_INFO, WHY_CHOOSE_US, TESTIMONIALS } from '../data/contractorData';

interface WhyChooseUsSectionProps {
  onOpenEstimate: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onOpenEstimate }) => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-amber-500" />,
    Hammer: <Hammer className="w-6 h-6 text-amber-500" />,
    FileSpreadsheet: <FileSpreadsheet className="w-6 h-6 text-amber-500" />,
    Sparkles: <Sparkles className="w-6 h-6 text-amber-500" />,
    Clock: <Clock className="w-6 h-6 text-amber-500" />,
    PhoneCall: <PhoneCall className="w-6 h-6 text-amber-500" />,
  };

  return (
    <section id="why-us" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>California General Contractor Credibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Why Orange County Homeowners Choose BK Construction
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Hiring a contractor is about trust, punctuality, and craftsmanship. Ben personally oversees every phase of construction to protect your investment.
          </p>
        </div>

        {/* 6 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl border border-slate-200 hover:border-amber-400/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5 shadow-2xs">
                  {iconMap[item.icon]}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.title.includes('Licensed') && (
                <div className="mt-4 pt-3 border-t border-slate-200/80">
                  <a
                    href="https://www.cslb.ca.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Verify at CSLB California Registry</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CSLB Verification & Protection Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-20 border border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                <span>California State License Board (CSLB)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Official CA Lic. #1139587 Verification
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                BK Construction operates in full compliance with California Business and Professions Code. We carry $2,000,000 in General Liability Insurance, active state surety bonding, and workers' compensation coverage to protect homeowners against all property damage and liability risks.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Active CSLB License
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Fully Bonded & Insured
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Clean Disciplinary Record
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <a
                href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm text-center shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Ben: {CONTRACTOR_INFO.phoneDisplay}</span>
              </a>
              <button
                onClick={onOpenEstimate}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm text-center shadow-md transition-all cursor-pointer"
              >
                Get Free On-Site Estimate
              </button>
            </div>
          </div>
        </div>

        {/* Real Orange County Homeowner Reviews */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              What Orange County Homeowners Say About Ben
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Verified reviews from completed kitchens, baths, decks, and additions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{t.date}</span>
                  </div>

                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.author}</h4>
                    <p className="text-xs text-slate-500">{t.city}</p>
                  </div>
                  <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {t.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
