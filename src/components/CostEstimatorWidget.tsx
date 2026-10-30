import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, CheckCircle2, Phone, Calendar, ArrowRight, Info } from 'lucide-react';
import { CONTRACTOR_INFO } from '../data/contractorData';

interface CostEstimatorWidgetProps {
  onOpenEstimate: (serviceTitle?: string) => void;
}

export const CostEstimatorWidget: React.FC<CostEstimatorWidgetProps> = ({ onOpenEstimate }) => {
  const [projectType, setProjectType] = useState<'kitchen' | 'bathroom' | 'addition' | 'deck' | 'repair'>('kitchen');
  const [sizeScope, setSizeScope] = useState<'compact' | 'medium' | 'large'>('medium');
  const [sqft, setSqft] = useState(400);
  const [finishGrade, setFinishGrade] = useState<'standard' | 'premium' | 'luxury'>('premium');

  // Calculate estimated range
  const calculateCost = () => {
    let low = 0;
    let high = 0;
    const gradeMult = finishGrade === 'luxury' ? 1.45 : finishGrade === 'premium' ? 1.2 : 1.0;

    if (projectType === 'kitchen') {
      const sizeMult = sizeScope === 'compact' ? 0.75 : sizeScope === 'large' ? 1.4 : 1.0;
      low = 32000 * sizeMult * gradeMult;
      high = 68000 * sizeMult * gradeMult;
    } else if (projectType === 'bathroom') {
      const sizeMult = sizeScope === 'compact' ? 0.7 : sizeScope === 'large' ? 1.5 : 1.0;
      low = 18000 * sizeMult * gradeMult;
      high = 38000 * sizeMult * gradeMult;
    } else if (projectType === 'addition') {
      const rateLow = 275 * gradeMult * 0.9;
      const rateHigh = 430 * gradeMult;
      low = sqft * rateLow;
      high = sqft * rateHigh;
    } else if (projectType === 'deck') {
      const rateLow = 45 * gradeMult;
      const rateHigh = 85 * gradeMult;
      low = sqft * rateLow;
      high = sqft * rateHigh;
    } else {
      low = 4000 * gradeMult;
      high = 16000 * gradeMult;
    }

    return {
      low: Math.round(low / 500) * 500,
      high: Math.round(high / 500) * 500,
    };
  };

  const estimate = calculateCost();

  return (
    <section id="estimator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative architectural grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Orange County Remodeling Cost Calculator
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Get an instant realistic ballpark estimate based on 2026 Southern California building and material rates.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-4xl mx-auto bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Project Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                  1. Select Remodel Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'kitchen', label: 'Kitchen' },
                    { id: 'bathroom', label: 'Bathroom' },
                    { id: 'addition', label: 'Room Addition' },
                    { id: 'deck', label: 'Custom Deck' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setProjectType(item.id as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        projectType === item.id
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Scope or Square Footage */}
              {projectType === 'addition' || projectType === 'deck' ? (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      2. Project Size: <span className="text-amber-400 font-extrabold">{sqft} sq.ft.</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {projectType === 'addition' ? 'Typical room: 350-600 sqft' : 'Typical deck: 250-500 sqft'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1200"
                    step="25"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>100 sq.ft.</span>
                    <span>600 sq.ft.</span>
                    <span>1,200 sq.ft.</span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                    2. Space Scale
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        id: 'compact',
                        label: projectType === 'kitchen' ? 'Condo / Small' : 'Powder Room',
                        detail: projectType === 'kitchen' ? '~120 sqft' : 'Half Bath',
                      },
                      {
                        id: 'medium',
                        label: projectType === 'kitchen' ? 'Standard' : 'Guest / Hall Bath',
                        detail: projectType === 'kitchen' ? '~220 sqft' : 'Full Bath',
                      },
                      {
                        id: 'large',
                        label: projectType === 'kitchen' ? 'Luxury Chef' : 'Master Spa Suite',
                        detail: projectType === 'kitchen' ? '~350+ sqft' : 'Wet Room',
                      },
                    ].map((scope) => (
                      <button
                        key={scope.id}
                        onClick={() => setSizeScope(scope.id as any)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          sizeScope === scope.id
                            ? 'border-amber-400 bg-amber-400/10 text-white'
                            : 'border-slate-700 bg-slate-750 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="text-xs font-bold">{scope.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{scope.detail}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Finish Grade */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                  3. Finish & Material Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', name: 'Quality Standard', desc: 'Durable quartz, semi-custom' },
                    { id: 'premium', name: 'Premium Custom', desc: 'Custom wood, waterfall slabs' },
                    { id: 'luxury', name: 'Ultra Luxury', desc: 'Bookmatched marble, chef grade' },
                  ].map((grade) => (
                    <button
                      key={grade.id}
                      onClick={() => setFinishGrade(grade.id as any)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        finishGrade === grade.id
                          ? 'border-amber-400 bg-amber-400/10 text-white'
                          : 'border-slate-700 bg-slate-750 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="text-xs font-bold">{grade.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{grade.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Estimated Price Card Output */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 rounded-2xl p-6 text-center flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                  Estimated Range (Turn-Key)
                </span>

                <div className="mt-4 mb-2">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Includes labor, licensed supervision, rough materials & standard allowances.
                  </p>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3 text-left my-4 space-y-1.5 text-xs text-slate-300 border border-slate-700">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="font-medium text-slate-200">CA Lic. #1139587 Bonded Protection</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="font-medium text-slate-200">Daily HEPA Clean Job Site Guarantee</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="font-medium text-slate-200">Zero Hidden Change Orders</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onOpenEstimate(`${projectType.toUpperCase()} Remodel`)}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Lock In Free On-Site Quote</span>
                </button>

                <p className="text-[11px] text-slate-400 mt-2">
                  Ben takes laser measurements on site for an exact bid.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
