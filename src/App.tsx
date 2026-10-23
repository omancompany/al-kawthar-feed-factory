import {contact} from './contact-config';
import { DemoBar, DemoUnavailable, demoRequested, demoEnabled, blockDemoExternal } from './demo-preview';
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

  const publicContactOnly = contact.inquiryChannel === 'unavailable';
  const openInquiry = () => publicContactOnly ? handleNavigate('contact') : setIsInquiryModalOpen(true);
  const openCalendar = () => publicContactOnly ? handleNavigate('contact') : setIsCalendarModalOpen(true);
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

  if (demoRequested() && !demoEnabled()) return <DemoUnavailable/>;

  return (
    <div onClickCapture={blockDemoExternal} className="min-h-screen bg-[#FFF9FA] text-[#1E255E] flex flex-col font-arabic selection:bg-pink-200 selection:text-[#B8194B]">
      <DemoBar lang={lang}/>
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenContactModal={() => handleNavigate('contact')}
      />

      <a href="#home" className="skip-link">{lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
      <main className="flex-grow">
        <Hero
          lang={lang}
          onNavigate={handleNavigate}
          onOpenConsultationModal={openCalendar}
        />
        <TrustIndicators lang={lang} />
        <AboutSection lang={lang} onNavigate={handleNavigate} />
        <ProductsSection
          lang={lang}
          onOpenInquiryModal={openInquiry}
        />
        <QualitySection lang={lang} />
        <B2BSection
          lang={lang}
          onOpenConsultationModal={openCalendar}
          onNavigateContact={() => handleNavigate('contact')}
        />
        {publicContactOnly ? <section id="contact" className="mx-auto w-full max-w-5xl px-6 py-16"><h2 className="text-3xl font-bold">{lang==='ar'?'تواصل معنا':'Contact us'}</h2><p className="my-5">{lang==='ar'?contact.addressAr:contact.addressEn}</p><a className="font-bold underline" href={'mailto:'+contact.email}><bdi>{contact.email}</bdi></a></section> : <ContactSection lang={lang} />}
      </main>

      <Footer lang={lang} onNavigate={handleNavigate} />

      {!publicContactOnly && <ChatbotWidget
        lang={lang}
        onOpenInquiryModal={openInquiry}
        onOpenCalendarModal={openCalendar}
        onNavigateContact={() => handleNavigate('contact')}
      />}

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
