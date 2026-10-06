import React from 'react';
import { translations } from '../data/translations';
import {
  Building2,
  Layers,
  ArrowLeft,
  ArrowRight,
  Calendar,
} from 'lucide-react';

interface AboutSectionProps {
  lang: 'ar' | 'en';
  onNavigate: (id: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  onNavigate,
}) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section id="about" className="py-16 lg:py-20 bg-white border-b border-[#EBDCF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 text-start space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FAF4FC] text-[#7E3E8A] text-xs font-bold border border-[#EBDCF0]">
              <Building2 className="w-3.5 h-3.5 text-[#8E4A96]" />
              <span>{t.about.title}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold heading-font text-[#3B1C48] tracking-tight leading-tight">
              {t.about.subtitle}
            </h2>

            <p className="text-sm sm:text-base text-[#5A4565] leading-relaxed font-normal">
              {t.about.description}
            </p>

            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7698] mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#8E4A96]" />
                <span>{t.about.factsTitle}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.about.facts.map((fact, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-[#FAF5FC] border border-[#F0E2F3] flex flex-col justify-center"
                  >
                    <span className="text-[11px] font-semibold text-[#8C7698]">
                      {fact.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#3B1C48] mt-0.5">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                id="about-learn-products-btn"
                onClick={() => onNavigate('products')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#8E4A96] to-[#D9487C] hover:from-[#7B3A82] hover:to-[#C6346A] shadow-xs transition-all"
              >
                <span>
                  {lang === 'ar'
                    ? 'استعراض مواصفات العلف'
                    : 'Explore Feed Specs'}
                </span>
                <ArrowIcon className="w-4 h-4" />
              </button>
              <button
                id="about-contact-btn"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-[#5A2B66] hover:text-[#3B1C48] bg-[#FAF4FC] hover:bg-[#F4E8F7] border border-[#EBDCF0] transition-colors"
              >
                <span>
                  {lang === 'ar'
                    ? 'تواصل لطلبات التوريد'
                    : 'Contact for Supply'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#EBDCF0] shadow-lg shadow-purple-100/40 group bg-white">
              <img
                src={`${import.meta.env.BASE_URL}assets/feed_supply_logistics.jpg`}
                alt={
                  lang === 'ar'
                    ? 'مركز التوريد والتصنيع والخدمات اللوجستية – مصنع بحار الجوبة'
                    : 'Bahar Al-Jouba Feed Manufacturing & Logistics Facility'
                }
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1133]/90 via-[#2B1133]/25 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white text-start">
                <div className="flex items-center gap-2 text-xs text-[#F2A4C2] font-semibold mb-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar'
                      ? 'مصنع بحار الجوبة للتصنيع والتوريد'
                      : 'Bahar Al-Jouba Manufacturing & Supply'}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white heading-font">
                  {lang === 'ar'
                    ? 'جاهزية لوجستية وتوريد تجاري لكافة المحافظات'
                    : 'Logistics Readiness & Wholesale Supply Across Oman'}
                </h4>
                <p className="text-xs text-purple-100/90 mt-1">
                  {lang === 'ar'
                    ? 'سناو، محافظة شمال الشرقية، سلطنة عمان'
                    : 'Sinaw, North Al Sharqiyah Governorate, Oman'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
