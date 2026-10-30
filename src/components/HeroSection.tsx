import React, { useState, useEffect } from 'react';
import { Phone, Calendar, ShieldCheck, Star, ChevronLeft, ChevronRight, CheckCircle2, Award, Clock } from 'lucide-react';
import { CONTRACTOR_INFO, HERO_SLIDES } from '../data/contractorData';

interface HeroSectionProps {
  onOpenEstimate: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEstimate }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 5.5 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative bg-slate-50 overflow-hidden border-b border-slate-200">
      {/* Subtle architectural background grid accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e115_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e115_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Responsive Grid: On mobile, column-reverse places image at the top */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT COLUMN: Hero Copy & Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-6 mt-8 lg:mt-0 flex flex-col justify-center">
            
            {/* Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide w-fit shadow-xs mb-5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{CONTRACTOR_INFO.licenseNumber} · Orange County, CA</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-extrabold text-slate-950 tracking-tight leading-[1.12] mb-5">
              BRINGING YOUR <span className="text-amber-600">DREAM HOME</span> TO LIFE
            </h1>

            {/* Clear Subtext */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-8 max-w-xl">
              Orange County’s trusted general contractor for luxury kitchen remodels, spa bathrooms, room additions, and custom decks. Over 15 years of California building experience with pristine job sites, transparent pricing, and direct on-site management from Ben.
            </p>

            {/* Two Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-9">
              {/* Click-to-call Ben */}
              <a
                href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md hover:shadow-lg transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5 fill-white text-white" />
                </div>
                <span>Call Ben: {CONTRACTOR_INFO.phoneDisplay}</span>
              </a>

              {/* Get Free Estimate Modal Trigger */}
              <button
                onClick={onOpenEstimate}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>Get Free Estimate</span>
              </button>
            </div>

            {/* Trust Marks Grid */}
            <div className="pt-6 border-t border-slate-200/90 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">5.0 Star Rated</p>
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium">90+ OC Homeowners</p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-slate-900 mb-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-xs sm:text-sm font-bold text-slate-900">15+ Years</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium">Licensed & Bonded</p>
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium">CA Lic. #1139587</p>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-slate-900 mb-1">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs sm:text-sm font-bold text-slate-900">Guaranteed</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium">On-Time Schedules</p>
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium">Clean Daily Job Sites</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated High-Resolution Image Showcase */}
          {/* Note: ZERO dark gradient overlay covering the photo for 100% crystal-clear visibility */}
          <div 
            className="lg:col-span-6 xl:col-span-6 w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border-4 border-white ring-1 ring-slate-900/10 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11]">
              
              {/* Image Crossfade Stack with Ken Burns subtle animation */}
              {HERO_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center animate-kenburns select-none"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}

              {/* Prev / Next Navigation Arrows */}
              <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 sm:px-4 pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md backdrop-blur-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="pointer-events-auto p-2 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md backdrop-blur-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Project Caption Pill: Clean, floating card without obscuring photo */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-xl p-3 sm:p-4 shadow-lg border border-white/20 flex items-center justify-between pointer-events-auto">
                  <div className="pr-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
                        {activeSlide.tag}
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-300 font-medium">
                        📍 {activeSlide.location}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white truncate max-w-[240px] sm:max-w-md">
                      {activeSlide.title}
                    </p>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {HERO_SLIDES.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentSlideIndex(dotIdx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          dotIdx === currentSlideIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Micro-Thumbnails for Fast Preview */}
            <div className="hidden sm:grid grid-cols-4 gap-2.5 mt-3">
              {HERO_SLIDES.map((slide, thumbIdx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(thumbIdx)}
                  className={`group relative rounded-lg overflow-hidden border-2 text-left transition-all aspect-[16/10] cursor-pointer ${
                    thumbIdx === currentSlideIndex
                      ? 'border-amber-500 ring-2 ring-amber-400/30'
                      : 'border-transparent opacity-70 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors" />
                  <span className="absolute bottom-1 left-1.5 right-1.5 text-[10px] font-bold text-white truncate drop-shadow-md">
                    {slide.tag}
                  </span>
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
