import React from 'react';
import { Hammer, Phone, ShieldCheck, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';
import { CONTRACTOR_INFO } from '../data/contractorData';

interface FooterProps {
  onOpenEstimate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEstimate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 shadow-md">
                <Hammer className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  BK CONSTRUCTION
                </span>
                <span className="block text-xs font-semibold text-amber-400">
                  Home Improvements & Repairs
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Premier California Licensed General Contractor serving Orange County and Southern California. Delivering luxury kitchens, spa bathrooms, room additions, and custom decks with precision craftsmanship and clean job sites.
            </p>

            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{CONTRACTOR_INFO.licenseNumber} · California General Building Contractor</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Specialized Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Luxury Kitchen Remodeling & Islands
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Spa Master Bathrooms & Curbless Showers
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Room Additions & Permitted ADUs
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Custom Composite & Redwood Decks
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Structural Repairs & Load-Bearing Wall Removal
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-400 transition-colors">
                  2026 Orange County Cost Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contractor Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contractor Direct Line
            </h4>
            <p className="text-xs text-slate-400">
              Speak directly with Ben to discuss your remodel or schedule a free in-home consultation.
            </p>

            <a
              href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-emerald-400 hover:text-emerald-300 font-bold text-sm transition-all"
            >
              <Phone className="w-4 h-4 fill-emerald-400" />
              <span>Call Ben: {CONTRACTOR_INFO.phoneDisplay}</span>
            </a>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>📍 Serving: Anaheim, Irvine, Newport Beach, Huntington Beach, Fullerton, Santa Ana, Costa Mesa, Mission Viejo, & all OC.</p>
              <p>🕒 {CONTRACTOR_INFO.workingHours}</p>
            </div>
          </div>

        </div>

        {/* Legal & CSLB Disclosures */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>
              © {new Date().getFullYear()} BK Construction. All rights reserved. CA Contractors State License #{CONTRACTOR_INFO.licenseNumber.replace('CA Lic. #', '')}.
            </p>
            <p className="mt-1 text-[11px] text-slate-600">
              Contractors are required by law to be licensed and regulated by the Contractors State License Board. Any questions concerning a contractor may be referred to the Registrar, Contractors State License Board.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://www.cslb.ca.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <span>CSLB Verification</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <button
              onClick={onOpenEstimate}
              className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
            >
              Request Free Estimate
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
