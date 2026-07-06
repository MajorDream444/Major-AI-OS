import HeroSection from './components/HeroSection';
import ScheduleSection from './components/ScheduleSection';
import FactsSection from './components/FactsSection';
import MethodologySection from './components/MethodologySection';
import RhythmSection from './components/RhythmSection';
import AudienceQuizSection from './components/AudienceQuizSection';
import MeetMajor from './components/MeetMajor';
import RegisterSection from './components/RegisterSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import { useLandingContent } from './content/useLandingContent';

export default function App() {
  const { content } = useLandingContent();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!content) {
    return <div className="min-h-screen bg-brand-black" />;
  }

  return (
    <div className="relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-gold selection:text-brand-black">
      <div className="fixed top-0 inset-x-0 h-1 tribar-line z-50 opacity-90" />
      <main>
        <HeroSection onReserveClick={() => scrollToSection('register')} onExploreClick={() => scrollToSection('abc')} />
        <ScheduleSection content={content.schedule} />
        <FactsSection content={content.facts} />
        <MethodologySection content={content.abc} />
        <RhythmSection content={content.rhythm} />
        <AudienceQuizSection />
        <MeetMajor content={content.meetMajor} />
        <RegisterSection session={content.schedule} />
        <FaqSection content={content.faq} />
      </main>
      <Footer />
    </div>
  );
}
