import React from 'react';
import { translations } from '../data/translations';
import {
  Factory,
  Sparkles,
  ShieldCheck,
  Truck,
  TrendingUp,
} from 'lucide-react';

interface QualitySectionProps {
  lang: 'ar' | 'en';
}

export const QualitySection: React.FC<QualitySectionProps> = ({ lang }) => {
  const t = translations[lang];

  const blockStyles = [
    {
      id: 'quality-production',
      icon: ShieldCheck,
      color: 'text-[#8E4A96]',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
    {
      id: 'supply-stability',
      icon: Truck,
      color: 'text-[#D9487C]',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
    },
    {
      id: 'economic-value',
      icon: TrendingUp,
      color: 'text-[#8E4A96]',
      bg: 'bg-[#F9EEFA]',
      border: 'border-[#EADBF0]',
    },
  ];

  return (
    <section
      id="quality"
      className="py-16 lg:py-20 bg-gradient-to-b from-[#F9EEFA] via-[#FCF5FD] to-white text-[#3B1C48] relative overflow-hidden border-b border-[#EBDCF0]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/90 text-[#7E3E8A] text-xs font-bold mb-3 border border-[#EBDCF0] shadow-2xs">
            <Factory className="w-3.5 h-3.5 text-[#8E4A96]" />
            <span>{t.quality.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold heading-font tracking-tight text-[#3B1C48]">
            {t.quality.subtitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A4565] leading-relaxed max-w-2xl font-normal">
            {t.quality.mainMessage}
          </p>
        </div>

        {/* Feature Lab Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border border-[#EBDCF0] mb-10 shadow-xl shadow-purple-100/30 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 h-60 sm:h-72 lg:h-80 relative overflow-hidden">
              <img
                src="/assets/feed_quality_lab.jpg"
                alt={
                  lang === 'ar'
                    ? 'مختبر فحص ومطابقة جودة أعلاف الكوثر'
                    : 'Feed Quality Assurance & Laboratory Analysis'
                }
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E1236]/70 via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#FAF5FC] to-white p-6 sm:p-8 flex flex-col justify-center text-start border-t lg:border-t-0 lg:border-s border-[#EBDCF0]">
              <div className="inline-flex items-center gap-2 text-[#D9487C] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>
                  {lang === 'ar' ? 'معايير عمل مسؤولة' : 'Committed Standards'}
                </span>
              </div>
              <div
                id="quality-strong-statement"
                className="text-xl sm:text-2xl font-black heading-font text-[#3B1C48] leading-snug mb-3"
              >
                "{t.quality.strongStatement}"
              </div>
              <p className="text-xs sm:text-sm text-[#5A4565] leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'يرتكز مصنع بحار الجوبة على التزام نوعي بمعايير التعبئة والجودة، موفراً أعلافاً تلبي أعلى درجات الثبات والاعتمادية للتجار والمربين ومنافذ التوزيع.'
                  : 'Bahar Al-Jouba maintains strict commitment to quality packaging and reliability, supplying dependable feeds to merchants and livestock breeders.'}
              </p>
              <div className="mt-5 pt-4 border-t border-[#F0E0F3] flex items-center justify-between text-xs text-[#8C7698]">
                <span className="font-semibold text-[#5A4565]">
                  {lang === 'ar' ? 'مصنع بحار الجوبة' : 'Bahar Al-Jouba'}
                </span>
                <span className="text-[#D9487C] font-semibold">
                  {lang === 'ar' ? 'معايير توريد معتمدة' : 'Reliable Supply'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.quality.blocks.map((block, index) => {
            const style = blockStyles[index] || blockStyles[0];
            const Icon = style.icon;
            return (
              <div
                key={block.id}
                id={`quality-block-${block.id}`}
                className="bg-white rounded-2xl p-6 border border-[#EBDCF0] hover:border-[#D5B2DF] shadow-md shadow-purple-100/20 text-start flex flex-col justify-between transition-all"
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${style.bg} ${style.color} border ${style.border} mb-4`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#3B1C48] heading-font mb-2">
                    {block.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A4565] leading-relaxed font-normal">
                    {block.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#F2E5F5] flex items-center justify-between text-xs text-[#8C7698]">
                  <span>{lang === 'ar' ? 'ركيزة عمل' : 'Core Pillar'}</span>
                  <span className="font-mono text-[#A894B2]">0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
