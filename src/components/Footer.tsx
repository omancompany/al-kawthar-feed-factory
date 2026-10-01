import React from 'react';
import { translations } from '../data/translations';
import { BrandLogo } from './BrandLogo';
import { MapPin, Mail, Building2, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: 'ar' | 'en';
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="bg-gradient-to-b from-[#FAF4FC] via-[#FDF8FC] to-[#F5EBF7] text-[#5A4565] border-t border-[#EBDCF0] pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#EBDCF0] text-start">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo lightMode={false} />
            <p className="text-sm text-[#5A4565] leading-relaxed max-w-sm pt-2">
              {t.footer.desc}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-[#EBDCF0] text-[#8E4A96] shadow-2xs">
                {lang === 'ar' ? 'مصنع بحار الجوبة' : 'Bahar Al-Jouba Factory'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-[#EBDCF0] text-[#D9487C] shadow-2xs">
                {lang === 'ar' ? 'سلطنة عمان' : 'Sultanate of Oman'}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#3B1C48]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-[#5A4565]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#8E4A96] transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#8E4A96] transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#8E4A96] transition-colors"
                >
                  {t.nav.products}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quality')}
                  className="hover:text-[#8E4A96] transition-colors"
                >
                  {t.nav.quality}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('b2b')}
                  className="hover:text-[#8E4A96] transition-colors"
                >
                  {t.nav.b2b}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#8E4A96] transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#3B1C48]">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3 text-sm text-[#5A4565]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D8265D] shrink-0 mt-0.5" />
                <span className="leading-snug text-xs sm:text-sm text-[#1E255E]/80">
                  {lang === 'ar'
                    ? 'سناو، محافظة شمال الشرقية، سلطنة عمان'
                    : 'Sinaw, North Al Sharqiyah Governorate, Oman'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E13B6B] shrink-0" />
                <a
                  href="mailto:alkawthercattlefeed@gmail.com"
                  className="hover:text-[#B8194B] transition-colors text-xs sm:text-sm break-all font-semibold text-[#D8265D]"
                >
                  alkawthercattlefeed@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Building2 className="w-4 h-4 text-[#E13B6B] shrink-0" />
                <span className="text-xs text-[#1E255E]/70 font-medium">
                  {lang === 'ar'
                    ? 'مصنع بحار الجوبة – مبيعات الجملة'
                    : 'Bahar Al-Jouba Factory – Wholesale'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#1E255E]/60">
          <div>
            <p className="font-semibold text-[#1E255E]">{t.footer.copyright}</p>
            <p className="mt-0.5 text-[11px] text-[#1E255E]/70">{t.footer.rightsNote}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white hover:bg-[#FFF2F6] text-[#D8265D] border border-[#FAD3E1] shadow-2xs transition-colors"
              aria-label="Back to Top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
