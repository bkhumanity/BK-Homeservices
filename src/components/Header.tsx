import React, { useState } from 'react';
import { Phone, ShieldCheck, Menu, X, Hammer, Calendar } from 'lucide-react';
import { CONTRACTOR_INFO } from '../data/contractorData';

interface HeaderProps {
  onOpenEstimate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEstimate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Cost Estimator', href: '#estimator' },
    { label: 'Homeowner Guides', href: '#guides' },
    { label: 'Service Area', href: '#service-area' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Credibility Notification Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded text-[11px] sm:text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              {CONTRACTOR_INFO.licenseNumber}
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="text-slate-300 font-medium hidden md:inline">
              Licensed, Bonded & Insured California General Contractor
            </span>
            <span className="text-slate-300 font-medium md:hidden">
              Bonded & Insured
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs">
            <span className="hidden lg:inline text-slate-400">Serving all of Orange County & SoCal</span>
            <a
              href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold tracking-wide transition-colors"
            >
              <Phone className="w-3.5 h-3.5 fill-amber-400" />
              <span>Call Ben: {CONTRACTOR_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Branding */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-slate-900 flex items-center justify-center text-amber-500 shadow-md group-hover:bg-slate-800 transition-colors">
              <Hammer className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                  BK
                </span>
                <span className="font-semibold text-lg sm:text-xl tracking-tight text-slate-800">
                  CONSTRUCTION
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500 tracking-wider uppercase">
                Home Improvements & Repairs
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-amber-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-500 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-800 hover:text-amber-600 border border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50/50 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{CONTRACTOR_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={onOpenEstimate}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-700 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Get Free Estimate</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenEstimate}
              className="px-3 py-1.5 text-xs font-bold text-white bg-amber-500 rounded-lg"
            >
              Estimate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-base font-medium text-slate-800 hover:bg-slate-100 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <a
              href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              <span>Call Ben: {CONTRACTOR_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimate();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm"
            >
              <Calendar className="w-5 h-5" />
              <span>Get Free Estimate</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
