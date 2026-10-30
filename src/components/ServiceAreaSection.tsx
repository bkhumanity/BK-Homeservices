import React, { useState } from 'react';
import { MapPin, Phone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { CONTRACTOR_INFO } from '../data/contractorData';

interface ServiceAreaSectionProps {
  onOpenEstimate: (city?: string) => void;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ onOpenEstimate }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Anaheim');

  const cityHighlights: Record<string, { desc: string; popular: string; permitOffice: string }> = {
    'Anaheim': {
      desc: 'Anaheim Hills view homes & classic suburban renovations. Extensive kitchen open-concept remodels & custom hillside decks.',
      popular: 'Luxury Gourmet Kitchens & Redwood Decks',
      permitOffice: 'City of Anaheim Building Division (Quick Electronic Submittals)',
    },
    'Irvine': {
      desc: 'HOA architectural review compliance, high-efficiency Title 24 additions, modern spa bathroom suites, and modern ADUs.',
      popular: 'Master Bath Wet Rooms & Room Additions',
      permitOffice: 'City of Irvine Community Development (Strict HOA Compliance)',
    },
    'Huntington Beach': {
      desc: 'Coastal marine salt air resistant composite decks (Trex/TimberTech), open entertaining kitchens, and outdoor living patios.',
      popular: 'Coastal Composite Decks & Cable Railings',
      permitOffice: 'City of Huntington Beach Building & Safety',
    },
    'Newport Beach': {
      desc: 'Luxury waterfront and Newport Coast high-end residential overhauls, Calacatta marble slab islands, and frameless glass spa baths.',
      popular: 'Chef Gourmet Kitchens & Master Bath Suites',
      permitOffice: 'City of Newport Beach Community Development',
    },
    'Costa Mesa': {
      desc: 'Modern transitional interior reconfigurations, kitchen load-bearing wall removals, and custom accessory dwelling units (ADUs).',
      popular: 'Open Concept Kitchens & Garage ADU Conversions',
      permitOffice: 'City of Costa Mesa Development Services',
    },
    'Fullerton': {
      desc: 'Historic and mid-century home additions, seismic retrofit wall removals, and whole home structural enhancements.',
      popular: 'Master Bedroom Suite Additions',
      permitOffice: 'City of Fullerton Community & Economic Development',
    },
    'Santa Ana': {
      desc: 'Whole home interior and exterior remodeling, bathroom walk-in conversions, and permitted residential expansions.',
      popular: 'Full Bath Renovations & Home Repairs',
      permitOffice: 'City of Santa Ana Planning & Building Agency',
    },
    'Mission Viejo': {
      desc: 'Spacious suburban kitchen expansions, multi-tier composite hillside decks, and master bathroom spa conversions.',
      popular: 'Custom Decks & Kitchen Remodels',
      permitOffice: 'City of Mission Viejo Community Development',
    },
  };

  const currentHighlight = cityHighlights[selectedCity] || {
    desc: 'Full residential remodeling, kitchen transformations, bathroom renovations, and custom decks across this community.',
    popular: 'Kitchens, Baths & Room Additions',
    permitOffice: 'Local Municipal Building Department (Permits Pulled by BK Construction)',
  };

  return (
    <section id="service-area" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Orange County Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Serving All of Orange County & Southern California
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            From the coast to the hills, Ben personally inspects and supervises projects across Orange County with deep knowledge of local municipal building codes.
          </p>
        </div>

        {/* Interactive Coverage Showcase */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: City Selector Chips */}
            <div className="lg:col-span-7">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Select Your Orange County City:
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Click any city to view local remodeling insights and municipal permit handling:
              </p>

              <div className="flex flex-wrap gap-2.5">
                {CONTRACTOR_INFO.cities.map((city) => {
                  const isSelected = selectedCity === city;
                  return (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                      <span>{city}</span>
                    </button>
                  );
                })}
              </div>

              {/* City Highlight Card */}
              <div className="mt-8 p-5 bg-slate-800/90 rounded-2xl border border-slate-700/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {selectedCity}, CA · Project Focus
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active Service Area
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {currentHighlight.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Most Popular Service:</span>
                    <span className="text-white font-bold">{currentHighlight.popular}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Permit & Code Division:</span>
                    <span className="text-white font-bold">{currentHighlight.permitOffice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Direct On-Site Consultation Booking Box */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full mb-4">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Free On-Site Consultation</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  Living in {selectedCity}?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Ben will visit your home in <strong className="text-white">{selectedCity}</strong>, review your architectural goals, evaluate structural walls and electrical panels, and provide a clear, itemized proposal with zero obligation.
                </p>

                <div className="my-5 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium">Call Ben directly:</div>
                    <a
                      href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
                      className="text-sm sm:text-base font-extrabold text-emerald-400 hover:text-emerald-300"
                    >
                      {CONTRACTOR_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onOpenEstimate(selectedCity)}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Schedule Free {selectedCity} Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-slate-400">
                  Licensed, Bonded & Insured · CA Lic. #1139587
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
