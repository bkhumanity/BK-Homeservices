import React, { useState } from 'react';
import { Check, ShieldCheck, Clock, Layers, Sparkles, ArrowRight, FileText } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/contractorData';

interface ServicesSectionProps {
  onOpenEstimate: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenEstimate }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [activeTab, setActiveTab] = useState<'features' | 'materials' | 'codes'>('features');

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>California General Contractor Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Comprehensive Home Improvements & Repairs
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From precision architectural kitchens to structural room additions, BK Construction delivers turn-key execution with licensed California compliance and obsessive attention to detail.
          </p>
        </div>

        {/* 4 Primary Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICES.map((service) => {
            const isSelected = selectedService.id === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-400/30 bg-slate-50/50 shadow-lg'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-md'
                }`}
              >
                {/* Card Media Preview (100% Clear Image) */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-amber-700 mt-0.5">
                      {service.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {service.typicalTimeline}
                    </span>
                    <span className="text-amber-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Architectural Specifications Deep Dive */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Service Info & Tabs */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedService.badge}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Estimated: {selectedService.typicalTimeline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedService.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                {selectedService.shortDesc}
              </p>

              {/* Sub-Tabs: Features | Materials | Building Codes */}
              <div className="flex items-center gap-2 mt-6 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setActiveTab('features')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'features'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Key Deliverables
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'materials'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Premium Materials
                </button>
                <button
                  onClick={() => setActiveTab('codes')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'codes'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  California Building Codes
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="mt-5 min-h-[140px]">
                {activeTab === 'features' && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-300">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">
                      We source high-grade architectural materials built to withstand Southern California coastal and inland environments:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.materials.map((mat, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 text-xs font-semibold border border-slate-700"
                        >
                          ✦ {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'codes' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">
                      Strict compliance with Orange County and California state structural, electrical, and energy standards:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {selectedService.buildingCodes.map((code, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{code}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Price Guide Note & Estimate Button */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Cost Guide (Orange County Benchmark)
                  </span>
                  <span className="text-sm font-bold text-amber-400">
                    {selectedService.priceGuide}
                  </span>
                </div>

                <button
                  onClick={() => onOpenEstimate(selectedService.title)}
                  className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
                >
                  Request {selectedService.title} Quote
                </button>
              </div>

            </div>

            {/* Right Col: High-Res Crystal-Clear Photo Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl aspect-[4/3]">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 text-xs text-slate-200">
                  <p className="font-semibold text-white">{selectedService.title}</p>
                  <p className="text-[11px] text-amber-400">CA Lic. #1139587 Compliant Execution</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
