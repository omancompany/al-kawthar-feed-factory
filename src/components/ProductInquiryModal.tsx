import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Package, X, CircleCheckBig, Send } from 'lucide-react';

interface ProductInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const ProductInquiryModal: React.FC<ProductInquiryModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const subject = encodeURIComponent(
      `طلب تسعير منتج أعلاف الكوثر: ${fullName || 'عميل'} - ${companyName || 'جهة تجارية'}`
    );

    const body = encodeURIComponent(
      `السلام عليكم ورحمة الله وبركاته،

تفاصيل طلب التسعير المباشر:
• المنتج: علف متعدد الاستعمالات (عبوة 50 كجم)
• الاسم: ${fullName}
• الجهة / المتجر: ${companyName || 'غير محدد'}
• رقم التواصل: ${phone}
• الكمية المطلوبة: ${quantity || 'غير محددة'}

يرجى تزويدنا بأفضل سعر وجدول التوريد المتاح.`
    );

    setTimeout(() => {
      window.location.href = `mailto:alkawthercattlefeed@gmail.com?subject=${subject}&body=${body}`;
    }, 400);
  };

  return (
    <div
      id="product-inquiry-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#EBDCF0] overflow-hidden text-start">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#EBDCF0] bg-gradient-to-r from-[#FAF0FA] to-[#FDF5F8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#8E4A96] flex items-center justify-center shrink-0 border border-[#EBDCF0] shadow-2xs">
              <Package className="w-5 h-5 text-[#8E4A96]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#3B1C48] heading-font">
                {lang === 'ar'
                  ? 'طلب معلومات المنتج والتسعير'
                  : 'Product Information & Pricing'}
              </h3>
              <p className="text-xs text-[#6F5B7A]">
                {lang === 'ar'
                  ? 'علف متعدد الاستعمالات للمجترات (50 كجم)'
                  : 'General Ruminant Feed (50 KG)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-3">
              <CircleCheckBig className="w-12 h-12 text-[#D9487C] mx-auto" />
              <h4 className="text-lg font-bold text-[#3B1C48]">
                {lang === 'ar'
                  ? 'تم تسجيل طلبكم بنجاح'
                  : 'Request Received Successfully'}
              </h4>
              <p className="text-sm text-[#5A4565]">
                {lang === 'ar'
                  ? 'سيتواصل معكم مسؤول مبيعات مصنع بحار الجوبة لتزويدكم بالأسعار ومواعيد التسليم.'
                  : 'A Bahar Al-Jouba sales advisor will contact you with pricing and delivery schedules.'}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  {lang === 'ar' ? 'تم، إغلاق النافذة' : 'Done, Close Window'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E255E]/80 mb-1">
                    {t.contact.fields.fullName} <span className="text-[#D8265D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.contact.fields.fullNamePlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#FAD3E1] focus:border-[#E13B6B] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-[#1E255E] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E255E]/80 mb-1">
                    {t.contact.fields.phone} <span className="text-[#D8265D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={lang === 'ar' ? 'رقم للتواصل معكم' : 'Your contact number'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#FAD3E1] focus:border-[#E13B6B] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-[#1E255E] bg-white"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E255E]/80 mb-1">
                    {t.contact.fields.companyName}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t.contact.fields.companyNamePlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#FAD3E1] focus:border-[#E13B6B] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-[#1E255E] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E255E]/80 mb-1">
                    {t.contact.fields.quantity}
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder={lang === 'ar' ? 'مثال: 200 كيس' : 'e.g. 200 bags'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#FAD3E1] focus:border-[#E13B6B] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-[#1E255E] bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] shadow-md shadow-pink-200/50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>
                    {lang === 'ar'
                      ? 'إرسال طلب التسعير المباشر'
                      : 'Submit Direct Quotation Request'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
