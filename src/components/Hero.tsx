import React from 'react';
import { translations } from '../data/translations';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Package,
  CircleCheck,
  ShieldCheck,
} from 'lucide-react';

interface HeroProps {
  lang: 'ar' | 'en';
  onNavigate: (id: string) => void;
  onOpenConsultationModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onNavigate,
  onOpenConsultationModal,
}) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#FFF5F8] via-[#FDF0F4] to-[#FCE7EF] text-[#1E255E] overflow-hidden py-16 lg:py-20 border-b border-[#FAD3E1]"
    >
      {/* Background Banner */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img
          src={`${import.meta.env.BASE_URL}assets/factory_banner.jpg`}
          alt={
            lang === 'ar'
              ? 'مصنع بحار الجوبة لتجارة وتوريد أعلاف الكوثر'
              : 'Bahar Al-Jouba Feed Factory'
          }
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Decorative Blur Spheres */}
      <div className="absolute -top-24 -start-24 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -end-24 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start space-y-6">
            {/* Badge */}
            <div
              id="hero-business-badge"
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#FAD3E1] text-[#D8265D] text-xs sm:text-sm font-semibold shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#E13B6B] animate-pulse" />
              <span>{t.hero.badge}</span>
              <span className="text-[#FAD3E1]">•</span>
              <span className="text-[#1E255E]/80 font-medium">{t.hero.factoryBadge}</span>
            </div>

            {/* Headline */}
            <h1
              id="hero-headline"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black heading-font tracking-tight text-[#1E255E] leading-snug text-start"
            >
              {lang === 'ar' ? (
                <>
                  أعلاف متوازنة وعالية الجودة،
                  <span className="block mt-2 text-[#E13B6B]">
                    بأسعار تنافسية تدعم نجاح ونمو أعمالك
                  </span>
                </>
              ) : (
                <>
                  Balanced, High-Quality Feeds,{' '}
                  <span className="block mt-2 text-[#E13B6B]">
                    At Competitive Rates Supporting Your Growth
                  </span>
                </>
              )}
            </h1>

            {/* Supporting Text */}
            <p
              id="hero-supporting-text"
              className="text-base sm:text-lg text-[#1E255E]/80 leading-relaxed font-normal max-w-2xl text-start"
            >
              {t.hero.supporting}
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-[#1E255E]/80">
              <div className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-lg border border-[#FAD3E1] shadow-2xs">
                <Building2 className="w-4 h-4 text-[#E13B6B]" />
                <span>
                  {lang === 'ar'
                    ? 'مصنع بحار الجوبة – سناو'
                    : 'Bahar Al-Jouba Factory – Sinaw'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-lg border border-[#FAD3E1] shadow-2xs">
                <Package className="w-4 h-4 text-[#D8265D]" />
                <span>
                  {lang === 'ar'
                    ? 'علف متعدد الاستعمالات للمجترات'
                    : 'General Ruminant Feed'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-lg border border-[#FAD3E1] shadow-2xs">
                <CircleCheck className="w-4 h-4 text-[#E13B6B]" />
                <span>
                  {lang === 'ar'
                    ? 'عقود توريد وتسهيلات تجارية'
                    : 'Structured Supply Solutions'}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <button
                id="hero-primary-cta"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] shadow-md shadow-pink-200/50 transition-all hover:scale-[1.01]"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
              <button
                id="hero-secondary-cta"
                onClick={() => onNavigate('products')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-[#D8265D] hover:text-[#B8194B] bg-white hover:bg-[#FFF2F6] border border-[#FAD3E1] shadow-xs transition-colors"
              >
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Feature Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div
              id="hero-feature-card"
              className="relative rounded-2xl bg-white/95 border border-[#EBDCF0] p-6 sm:p-7 shadow-xl shadow-purple-100/40 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#F2E5F5]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D9487C]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7E3E8A]">
                    {lang === 'ar' ? 'جاهزية التوريد المنتظم' : 'Active Supply Ready'}
                  </span>
                </div>
                <span className="text-xs text-[#8C7698] font-medium">
                  {lang === 'ar' ? 'سلطنة عمان' : 'Sultanate of Oman'}
                </span>
              </div>

              <div className="space-y-3.5 py-5 text-start">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FAF5FC] border border-[#F2E5F5]">
                  <div className="p-2 rounded-lg bg-white text-[#8E4A96] shadow-2xs shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#3B1C48]">
                      {lang === 'ar' ? 'مصنع بحار الجوبة' : 'Bahar Al-Jouba Factory'}
                    </h3>
                    <p className="text-xs text-[#6F5B7A] mt-0.5">
                      {lang === 'ar' ? 'سناو، محافظة شمال الشرقية' : 'Sinaw, North Al Sharqiyah'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FAF5FC] border border-[#F2E5F5]">
                  <div className="p-2 rounded-lg bg-white text-[#D9487C] shadow-2xs shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#3B1C48]">
                      {lang === 'ar' ? 'علف متعدد الاستعمالات' : 'General Ruminant Feed'}
                    </h3>
                    <p className="text-xs text-[#6F5B7A] mt-0.5">
                      {lang === 'ar'
                        ? 'مناسب للمزارع والموزعين وتجار الجملة'
                        : 'Suitable for farms, distributors & wholesalers'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FAF5FC] border border-[#F2E5F5]">
                  <div className="p-2 rounded-lg bg-white text-[#8E4A96] shadow-2xs shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#3B1C48]">
                      {lang === 'ar'
                        ? 'عقود توريد وتسهيلات للموزعين'
                        : 'Wholesale Supply Contracts'}
                    </h3>
                    <p className="text-xs text-[#6F5B7A] mt-0.5">
                      {lang === 'ar'
                        ? 'استقرار كميات، تسعير جملة، والتزام بالمواعيد'
                        : 'Volume stability, wholesale rates & delivery reliability'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2E5F5]">
                <button
                  id="hero-schedule-consult-btn"
                  onClick={onOpenConsultationModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8E4A96] to-[#D9487C] hover:from-[#7B3A82] hover:to-[#C6346A] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>
                    {lang === 'ar'
                      ? 'طلب تفاصيل التوريد والأسعار'
                      : 'Request Supply Details'}
                  </span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
