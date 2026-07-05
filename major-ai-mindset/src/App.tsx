/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import HeroSection from './components/HeroSection';
import FactsSection from './components/FactsSection';
import MethodologySection from './components/MethodologySection';
import RhythmSection from './components/RhythmSection';
import AudienceQuizSection from './components/AudienceQuizSection';
import MeetMajor from './components/MeetMajor';
import RegisterSection from './components/RegisterSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  // Smooth scrolls to specific container target IDs
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-gold selection:text-brand-black">
      {/* Absolute Ambient Border Glow lines representing Knicks Energy */}
      <div className="fixed top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-green via-brand-gold to-brand-blue z-50 opacity-80" />

      {/* Main Sections Assembly */}
      <main className="relative">
        {/* Section 1: Portal Hero with Clock & Gravity well Canvas */}
        <HeroSection 
          onReserveClick={() => handleScrollToSection('register')} 
          onExploreClick={() => handleScrollToSection('different')} 
        />

        {/* Section 2: Core Facts Grid */}
        <div id="facts-anchor">
          <FactsSection />
        </div>

        {/* Section 3: Methodology and Prompt Transformer Sandbox */}
        <div id="abc">
          <MethodologySection />
        </div>

        {/* Section 4: Live Session Rhythm */}
        <RhythmSection />

        {/* Section 5: Audience Profile filters & Diagnostic Quiz */}
        <AudienceQuizSection />

        {/* Section 6: Meet the human translator */}
        <MeetMajor />

        {/* Section 7: RSVP Form with Local Storage logger */}
        <RegisterSection />

        {/* Section 8: Interactive Accordion FAQs */}
        <FaqSection />
      </main>

      {/* Section 9: Luxury Sitemap Footer */}
      <Footer />
    </div>
  );
}
