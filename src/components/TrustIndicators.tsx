import React from 'react';
import { translations } from '../data/translations';
import { Factory, CircleCheck, Wheat, Handshake } from 'lucide-react';

interface TrustIndicatorsProps {
  lang: 'ar' | 'en';
}

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ lang }) => {
  const t = translations[lang];

  const visualStyles = [
    {
      id: 'omani-industry',
      icon: Factory,
      color: 'text-[#8E4A96]',
      bg: 'bg-purple-50',
      border: 'border-purple-200/80',
    },
    {
      id: 'production-quality',
      icon: CircleCheck,
      color: 'text-[#D9487C]',
      bg: 'bg-pink-50',
      border: 'border-pink-200/80',
    },
    {
      id: 'balanced-nutrition',
      icon: Wheat,
      color: 'text-[#8E4A96]',
      bg: 'bg-[#F9EEFA]',
      border: 'border-[#EADBF0]',
    },
    {
      id: 'longterm-partnerships',
      icon: Handshake,
      color: 'text-[#D9487C]',
      bg: 'bg-rose-50',
      border: 'border-rose-200/80',
    },
  ];

  return (
    <section
      id="trust-indicators"
      className="py-12 lg:py-16 bg-gradient-to-b from-white to-[#FDF8FC] border-b border-[#EBDCF0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.trust.cards.map((card, index) => {
            const style = visualStyles[index] || visualStyles[0];
            const Icon = style.icon;
            return (
              <div
                key={card.id}
                id={`trust-card-${card.id}`}
                className="group relative rounded-2xl p-6 bg-white/90 hover:bg-white border border-[#EBDCF0] hover:border-[#D5B2DF] hover:shadow-lg hover:shadow-purple-100/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.bg} ${style.color} border ${style.border} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#7E3E8A] bg-[#FAF4FC] px-2.5 py-1 rounded-full border border-[#EBDCF0]">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#3B1C48] heading-font mb-2 group-hover:text-[#8E4A96] transition-colors text-start">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#5A4565] leading-relaxed text-start">
                    {card.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#F2E5F5] flex items-center justify-between text-xs text-[#8C7698]">
                  <span className="font-semibold text-[#6F5B7A]">
                    {lang === 'ar' ? 'أعلاف الكوثر' : 'Al Kawther Feeds'}
                  </span>
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
