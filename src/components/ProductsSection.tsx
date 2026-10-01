import React from 'react';
import { translations } from '../data/translations';
import { FeedBagVisual } from './FeedBagVisual';
import {
  Package,
  Sparkles,
  Building2,
  MapPin,
  Scale,
  Clock,
  SunMedium,
  Check,
  ArrowUpRight,
  FileSpreadsheet,
} from 'lucide-react';

interface ProductsSectionProps {
  lang: 'ar' | 'en';
  onOpenInquiryModal: () => void;
  onOpenSpecsModal?: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  lang,
  onOpenInquiryModal,
}) => {
  const t = translations[lang];

  return (
    <section id="products" className="py-16 lg:py-24 bg-[#FCF8FD] border-b border-[#EBDCF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FAF4FC] text-[#7E3E8A] text-xs font-bold uppercase tracking-wider mb-3 border border-[#EBDCF0]">
            <Package className="w-3.5 h-3.5 text-[#8E4A96]" />
            <span>{t.products.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold heading-font text-[#3B1C48] tracking-tight">
            {t.products.subtitle}
          </h2>
          <p className="mt-3 text-[#5A4565] text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'المنتج الرئيسي المعتمد من مصنع بحار الجوبة بعبوته الأصلية الوردية المميزة والمخططة، لتلبية الاحتياجات التغذوية المتكاملة لقطعان المجترات.'
              : 'Our flagship verified ruminant feed packaged in the official signature pink bag with dual stripes, formulated for comprehensive herd vitality.'}
          </p>
        </div>

        {/* Confirmed Product Card */}
        <div
          id="confirmed-product-card"
          className="relative bg-white rounded-3xl border border-[#EBDCF0] shadow-xl shadow-purple-100/30 overflow-hidden"
        >
          {/* Top color bar */}
          <div className="h-2 w-full flex">
            <div className="w-1/2 bg-[#8E4A96]" />
            <div className="w-1/4 bg-[#D9487C]" />
            <div className="w-1/4 bg-[#16A34A]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center">
            {/* Bag Visual */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <FeedBagVisual showTechnicalSpecs={true} />
            </div>

            {/* Product Specifications & Details */}
            <div className="lg:col-span-7 text-start space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4FC] text-[#7E3E8A] text-xs font-bold mb-2 border border-[#EBDCF0]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9487C]" />
                  <span>
                    {lang === 'ar'
                      ? 'العلامة التجارية: أعلاف الكوثر'
                      : 'Brand: Al Kawther Feeds'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3B1C48] heading-font">
                  {t.products.productName}
                </h3>
                <div className="text-base sm:text-lg font-bold text-[#8E4A96] mt-1 font-sans">
                  {t.products.productNameEn}
                </div>
              </div>

              {/* Quick specs grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5FC] border border-[#F0E2F3] shadow-2xs">
                  <Building2 className="w-5 h-5 text-[#8E4A96] shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8C7698] font-medium">
                      {lang === 'ar' ? 'جهة الإنتاج' : 'Produced By'}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#3B1C48]">
                      {t.products.producer}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5FC] border border-[#F0E2F3] shadow-2xs">
                  <MapPin className="w-5 h-5 text-[#D9487C] shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8C7698] font-medium">
                      {lang === 'ar' ? 'الموقع' : 'Location'}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#3B1C48]">
                      {t.products.locationTag}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5FC] border border-[#F0E2F3] shadow-2xs">
                  <Scale className="w-5 h-5 text-[#8E4A96] shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8C7698] font-medium">
                      {lang === 'ar' ? 'الوزن والتعبئة' : 'Net Weight'}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#3B1C48]">
                      {t.products.packagingDesc}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5FC] border border-[#F0E2F3] shadow-2xs">
                  <Clock className="w-5 h-5 text-[#D9487C] shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8C7698] font-medium">
                      {lang === 'ar' ? 'صلاحية المنتج' : 'Shelf Life'}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#3B1C48]">
                      {t.products.shelfLife}
                    </div>
                  </div>
                </div>
              </div>

              {/* Storage & Animals Box */}
              <div className="p-4 rounded-xl bg-[#FAF4FC] border border-[#EBDCF0] text-xs sm:text-sm text-[#5A4565] space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#3B1C48]">
                  <SunMedium className="w-4 h-4 text-[#D9487C]" />
                  <span>{t.products.storage}</span>
                </div>
                <div className="text-[#5A4565]">
                  <span className="font-semibold text-[#3B1C48]">
                    {lang === 'ar' ? 'الفئات المستهدفة: ' : 'Target Animals: '}
                  </span>
                  {t.products.targetAnimals}
                </div>
                <div className="text-[#8C7698] font-mono text-xs pt-2 border-t border-[#EBDCF0] flex items-center justify-between">
                  <span>{t.products.bagDimensions}</span>
                  <span className="text-[#8E4A96] font-bold">{t.products.customerService}</span>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2.5 pt-1">
                {t.products.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-[#5A4565] text-xs sm:text-sm leading-relaxed"
                  >
                    <div className="w-5 h-5 rounded-full bg-pink-100 text-[#D9487C] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#F2E5F5]">
                <button
                  id="product-inquire-cta-btn"
                  onClick={onOpenInquiryModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#8E4A96] to-[#D9487C] hover:from-[#7B3A82] hover:to-[#C6346A] shadow-md shadow-pink-200/50 transition-all hover:scale-[1.02] active:scale-[0.99]"
                >
                  <span>{t.products.cta}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  id="product-quote-cta-btn"
                  onClick={onOpenInquiryModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#7E3E8A] bg-white hover:bg-[#FAF4FC] border border-[#EBDCF0] shadow-2xs transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#D9487C]" />
                  <span>{t.products.ctaQuote}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
