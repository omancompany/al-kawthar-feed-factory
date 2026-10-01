import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { BrandLogo } from './BrandLogo';
import { MapPin, Mail, Globe, ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
  onOpenContactModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  activeSection,
  onNavigate,
  onOpenContactModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'products', label: t.nav.products },
    { id: 'quality', label: t.nav.quality },
    { id: 'b2b', label: t.nav.b2b },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#F7EFF9] text-[#5D4268] border-b border-[#EBDCF0] text-xs py-1.5 px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#5D4268]">
              <MapPin className="w-3.5 h-3.5 text-[#D9487C] shrink-0" />
              <span>
                {lang === 'ar'
                  ? 'سناو، محافظة شمال الشرقية، سلطنة عمان'
                  : 'Sinaw, North Al Sharqiyah, Oman'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#5D4268]">
              <Mail className="w-3.5 h-3.5 text-[#8E4A96] shrink-0" />
              <a
                href="mailto:alkawthercattlefeed@gmail.com"
                className="hover:text-[#3B1C48] transition-colors"
              >
                alkawthercattlefeed@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#D8265D] font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {lang === 'ar' ? 'خدمة العملاء والتوريد متوفرة' : 'Sales & Supply Inquiries Active'}
              </span>
            </span>
            <span className="text-[#F2BACF]">|</span>
            <span className="text-[#1E255E] font-bold">
              {lang === 'ar' ? 'مصنع بحار الجوبة – سناو' : 'Bahar Al-Jouba Factory – Sinaw'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#FAD3E1] py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-[#FCE7EF] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="focus:outline-none transition-transform hover:scale-[1.01]"
          >
            <BrandLogo lang={lang} />
          </button>

          {/* Desktop Nav Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-[#D8265D] bg-[#FFF2F6] font-bold'
                      : 'text-[#1E255E]/85 hover:text-[#D8265D] hover:bg-[#FFF5F8]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-0.5 bg-gradient-to-r from-[#E13B6B] to-[#D8265D] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher */}
            <button
              id="language-switcher-btn"
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[#1E255E] hover:text-[#D8265D] hover:bg-[#FFF5F8] border border-[#FAD3E1] transition-colors"
              title="Change Language / تغيير اللغة"
            >
              <Globe className="w-4 h-4 text-[#E13B6B]" />
              <span>{t.nav.switchLang}</span>
            </button>

            {/* Quick Quote Button */}
            <button
              id="header-quote-btn"
              onClick={() => {
                if (onOpenContactModal) onOpenContactModal();
                else handleNavClick('contact');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold text-[#D8265D] bg-[#FFF2F6] hover:bg-[#FFE6EE] border border-[#FAD3E1] transition-colors"
              title="Request Wholesale Quote"
            >
              <span>{t.nav.phoneCall}</span>
            </button>

            {/* Direct Contact Button */}
            <button
              id="header-contact-cta"
              onClick={() => {
                if (onOpenContactModal) onOpenContactModal();
                else handleNavClick('contact');
              }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] shadow-sm transition-all shadow-pink-200/50"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1E255E] hover:text-[#D8265D] hover:bg-[#FFF5F8] border border-[#FAD3E1] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden bg-white border-b border-[#FAD3E1] shadow-lg px-4 pt-3 pb-6 animate-fadeIn"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-start px-4 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive ? 'bg-[#FFF2F6] text-[#D8265D] font-bold' : 'text-[#1E255E] hover:bg-[#FFF5F8]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#E13B6B]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#FCE7EF] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenContactModal) onOpenContactModal();
                else handleNavClick('contact');
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-[#E13B6B] to-[#D8265D] text-white font-bold text-sm shadow"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
