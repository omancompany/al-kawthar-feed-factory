import React from 'react';
import { translations } from '../data/translations';
import {
  Layers,
  BadgePercent,
  Store,
  Truck,
  Tractor,
  CircleCheck,
  ArrowUpRight,
  CalendarCheck,
  Mail,
} from 'lucide-react';

interface B2BSectionProps {
  lang: 'ar' | 'en';
  onOpenConsultationModal: () => void;
  onNavigateContact: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({
  lang,
  onOpenConsultationModal,
  onNavigateContact,
}) => {
  const t = translations[lang];

  const audienceIcons = [Store, Truck, Tractor];
  const roleBadgeStyles = [
    'bg-purple-50 text-[#8E4A96] border-purple-200',
    'bg-pink-50 text-[#D9487C] border-pink-200',
    'bg-[#FAF0FA] text-[#7E3E8A] border-[#EBDCF0]',
  ];

  return (
    <section
      id="b2b"
      className="py-16 lg:py-20 bg-gradient-to-b from-white to-[#FDF8FC] border-b border-[#EBDCF0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FAF4FC] text-[#7E3E8A] text-xs font-bold mb-3 border border-[#EBDCF0]">
            <Layers className="w-3.5 h-3.5 text-[#8E4A96]" />
            <span>
              {lang === 'ar' ? 'قطاع الأعمال والتوريد B2B' : 'B2B Enterprise Supply'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold heading-font text-[#3B1C48] tracking-tight">
            {t.b2b.title}
          </h2>
          <p className="text-sm text-[#5A4565] mt-1 font-normal">
            {t.b2b.subtitle}
          </p>
        </div>

        {/* Business Message Box */}
        <div
          id="b2b-business-message-box"
          className="relative bg-gradient-to-r from-[#FAF0FA] via-[#FDF5F8] to-[#F5EBF7] text-[#3B1C48] rounded-3xl border border-[#EBDCF0] shadow-md shadow-purple-100/30 mb-12 text-start overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-[#D9487C] text-xs font-bold uppercase tracking-wider">
                  <BadgePercent className="w-4 h-4" />
                  <span>
                    {lang === 'ar' ? 'رؤية الشراكة والتعامل التجاري' : 'Partnership Vision'}
                  </span>
                </div>
                <p className="text-base sm:text-lg md:text-xl font-semibold leading-relaxed text-[#3B1C48]">
                  "{t.b2b.businessMessage}"
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#8C7698]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-[#5A4565]">
                    {lang === 'ar'
                      ? 'جاهزية توريد فورية وشحن لكافة المحافظات'
                      : 'Immediate Supply Readiness Across Oman'}
                  </span>
                </div>
                <span>•</span>
                <span className="text-[#8E4A96] font-semibold">
                  {lang === 'ar' ? 'مصنع بحار الجوبة' : 'Bahar Al-Jouba Factory'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] overflow-hidden border-t lg:border-t-0 lg:border-s border-[#EBDCF0]">
              <img
                src={`${import.meta.env.BASE_URL}assets/feed_supply_logistics.jpg`}
                alt={
                  lang === 'ar'
                    ? 'مركز التوريد والخدمات اللوجستية والشحن – مصنع بحار الجوبة'
                    : 'Feed Supply Logistics and Warehousing Facility'
                }
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E1236]/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 start-3 end-3 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-xs border border-white/50 text-[11px] font-bold text-[#3B1C48] flex items-center justify-between shadow-xs">
                <span>
                  {lang === 'ar'
                    ? 'مركز التعبئة والتحميل والتوزيع'
                    : 'Packaging, Loading & Distribution'}
                </span>
                <span className="text-[#D9487C] font-semibold">
                  {lang === 'ar' ? 'سناو، عمان' : 'Sinaw, Oman'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Audiences Grid */}
        <div className="mb-12">
          <div className="text-start mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#3B1C48] heading-font">
              {t.b2b.audienceTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.b2b.audiences.map((audience, idx) => {
              const AudienceIcon = audienceIcons[idx] || Store;
              const badgeStyle = roleBadgeStyles[idx] || roleBadgeStyles[0];

              return (
                <div
                  key={idx}
                  id={`b2b-audience-${idx}`}
                  className="bg-white rounded-2xl p-6 border border-[#EBDCF0] shadow-sm hover:border-[#D5B2DF] hover:shadow-md hover:shadow-purple-100/30 transition-all text-start flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#FAF4FC] text-[#8E4A96] flex items-center justify-center border border-[#F0E2F3]">
                        <AudienceIcon className="w-5 h-5" />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${badgeStyle}`}>
                        {audience.role}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#3B1C48] heading-font mb-2">
                      {audience.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#5A4565] leading-relaxed mb-5 font-normal">
                      {audience.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#F2E5F5]">
                      {audience.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-[#5A4565] font-medium">
                          <CircleCheck className="w-3.5 h-3.5 text-[#D9487C] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#F2E5F5]">
                    <button
                      onClick={onOpenConsultationModal}
                      className="w-full py-2.5 px-3 rounded-lg text-xs font-bold text-[#7E3E8A] bg-[#FAF4FC] hover:bg-[#F3E5F6] border border-[#EBDCF0] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>
                        {lang === 'ar' ? 'طلب تفاصيل التوريد' : 'Supply Terms Inquiry'}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBDCF0] shadow-md shadow-purple-100/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#3B1C48] heading-font">
              {lang === 'ar'
                ? 'هل تبحث عن عقد توريد مستقر لمنشأتك التجارية؟'
                : 'Looking for a stable supply contract for your business?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#5A4565] mt-1">
              {lang === 'ar'
                ? 'فريق مبيعات مصنع بحار الجوبة جاهز لتقديم أفضل عروض الأسعار وجداول الشحن.'
                : 'Bahar Al-Jouba sales team is ready to provide competitive quotes and delivery schedules.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="b2b-consultation-cta-btn"
              onClick={onOpenConsultationModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] shadow-md shadow-pink-200/50 transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>{t.b2b.cta}</span>
            </button>
            <button
              id="b2b-contact-cta-btn"
              onClick={onNavigateContact}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#D8265D] bg-[#FFF2F6] hover:bg-[#FFE6EE] border border-[#FAD3E1] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D8265D]" />
              <span>{t.b2b.instantContact}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
