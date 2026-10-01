/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustIndicators } from './components/TrustIndicators';
import { AboutSection } from './components/AboutSection';
import { ProductsSection } from './components/ProductsSection';
import { QualitySection } from './components/QualitySection';
import { B2BSection } from './components/B2BSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductInquiryModal } from './components/ProductInquiryModal';
import { CalendarModal } from './components/CalendarModal';
import { ChatbotWidget } from './components/ChatbotWidget';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [activeSection, setActiveSection] = useState('home');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'أعلاف الكوثر | Al Kawther Feeds'
        : 'Al Kawther Feeds | General Ruminant Feed';
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'quality', 'b2b', 'contact'];
      const scrollPos = window.scrollY + 180;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6F9] text-[#1E255E] flex flex-col font-arabic selection:bg-pink-200 selection:text-[#B8194B]">
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenContactModal={() => handleNavigate('contact')}
      />

      <main className="flex-grow">
        <Hero
          lang={lang}
          onNavigate={handleNavigate}
          onOpenConsultationModal={() => setIsCalendarModalOpen(true)}
        />
        <TrustIndicators lang={lang} />
        <AboutSection lang={lang} onNavigate={handleNavigate} />
        <ProductsSection
          lang={lang}
          onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        />
        <QualitySection lang={lang} />
        <B2BSection
          lang={lang}
          onOpenConsultationModal={() => setIsCalendarModalOpen(true)}
          onNavigateContact={() => handleNavigate('contact')}
        />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} onNavigate={handleNavigate} />

      <ChatbotWidget
        lang={lang}
        onOpenInquiryModal={() => setIsInquiryModalOpen(true)}
        onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
        onNavigateContact={() => handleNavigate('contact')}
      />

      <ProductInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        lang={lang}
      />

      <CalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
