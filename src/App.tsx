/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { CostEstimatorWidget } from './components/CostEstimatorWidget';
import { ProjectGallerySection } from './components/ProjectGallerySection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { BlogGuidesSection } from './components/BlogGuidesSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DualFloatingCircles } from './components/DualFloatingCircles';
import { ChatAssistantModal } from './components/ChatAssistantModal';
import { FreeEstimateModal } from './components/FreeEstimateModal';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [defaultEstimateService, setDefaultEstimateService] = useState('Kitchen Remodel');

  const handleOpenEstimate = (serviceTitle?: string) => {
    if (serviceTitle) {
      if (serviceTitle.toLowerCase().includes('kitchen')) {
        setDefaultEstimateService('Kitchen Remodel');
      } else if (serviceTitle.toLowerCase().includes('bath')) {
        setDefaultEstimateService('Bathroom Renovation');
      } else if (serviceTitle.toLowerCase().includes('addition')) {
        setDefaultEstimateService('Home Addition');
      } else if (serviceTitle.toLowerCase().includes('deck')) {
        setDefaultEstimateService('Custom Deck');
      } else {
        setDefaultEstimateService('Whole Home Repair');
      }
    }
    setIsEstimateModalOpen(true);
  };

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Top Header & Sticky Navigation */}
      <Header onOpenEstimate={() => handleOpenEstimate()} />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* 1. Side-by-Side Widescreen Hero Showcase (100% Clear Images) */}
        <HeroSection onOpenEstimate={() => handleOpenEstimate()} />

        {/* 2. Specialized Services Detail Grid with Specs & Building Codes */}
        <ServicesSection onOpenEstimate={handleOpenEstimate} />

        {/* 3. Interactive Project Estimator / Ballpark Calculator */}
        <CostEstimatorWidget onOpenEstimate={handleOpenEstimate} />

        {/* 4. High-Resolution Project Gallery & Before/After Comparisons */}
        <ProjectGallerySection onOpenEstimate={handleOpenEstimate} />

        {/* 5. Why Choose Us: CA Lic. #1139587 Credibility & Reviews */}
        <WhyChooseUsSection onOpenEstimate={() => handleOpenEstimate()} />

        {/* 6. SEO Homeowner Guides & Practical Articles */}
        <BlogGuidesSection onOpenEstimate={handleOpenEstimate} />

        {/* 7. Orange County Coverage & Service Area Map */}
        <ServiceAreaSection onOpenEstimate={handleOpenEstimate} />

        {/* 8. Contact & Direct Connection to Ben */}
        <ContactSection />
      </main>

      {/* Footer & CSLB Legal Disclosures */}
      <Footer onOpenEstimate={() => handleOpenEstimate()} />

      {/* Dual Floating Action Circles:
          - Bottom-Right: round green call button with ONLY a phone icon linking to (714) 884-2905
          - Bottom-Left: circular dark navy button with sparkles icon and live green dot
      */}
      <DualFloatingCircles
        onToggleChat={handleToggleChat}
        isChatOpen={isChatOpen}
      />

      {/* Smart AI Assistant Modal (Title: "Chat") */}
      <ChatAssistantModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenEstimate={() => handleOpenEstimate()}
      />

      {/* Interactive Free Estimate / Quote Request Modal */}
      <FreeEstimateModal
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
        defaultProjectType={defaultEstimateService}
      />

    </div>
  );
}
