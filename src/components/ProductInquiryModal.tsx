import {useModalFocus} from '../use-modal-focus';
import { demoRequested } from '../demo-preview';
import { submitInquiry,useWhatsApp } from '../inquiries';
import React, { useState, useEffect } from 'react';
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (isOpen) { setIsSubmitted(false); setError(''); } }, [isOpen]);

  const modalRef=useModalFocus(isOpen,onClose);
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    try {
      await submitInquiry('product', fullName, phone, JSON.stringify({ companyName, quantity }, null, 2));
      setIsSubmitted(true);
    } catch {
      setError(lang === 'ar' ? 'تعذر تجهيز أو حفظ الطلب. حاول مرة أخرى أو تواصل معنا.' : 'Unable to prepare or save the request. Retry or contact us.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div ref={modalRef} tabIndex={-1}
      id="product-inquiry-modal"
      role="dialog" aria-modal="true" aria-label={lang === 'ar' ? 'طلب تواصل' : 'Contact request'} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#EBDCF0] overflow-hidden text-start">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#EBDCF0] bg-gradient-to-r from-[#FAF0FA] to-[#FDF5F8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#302578] flex items-center justify-center shrink-0 border border-[#EBDCF0] shadow-2xs">
              <Package className="w-5 h-5 text-[#302578]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#302578] heading-font">
                {lang === 'ar'
                  ? 'طلب معلومات المنتج والتسعير'
                  : 'Product Information & Pricing'}
              </h3>
              <p className="text-xs text-[#66627b]">
                {lang === 'ar'
                  ? 'علف متعدد الاستعمالات للمجترات (50 كجم)'
                  : 'General Ruminant Feed (50 KG)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-3">
              <CircleCheckBig className="w-12 h-12 text-[#8d3558] mx-auto" />
              <h4 className="text-lg font-bold text-[#302578]">
                {lang === 'ar'
                  ? (demoRequested() ? 'تمت محاكاة الطلب التجريبي' : (useWhatsApp?'تم تجهيز رسالة واتساب':'تم حفظ طلبكم بنجاح'))
                  : (demoRequested() ? 'Demo request simulated' : (useWhatsApp?'WhatsApp message prepared':'Request Received Successfully'))}
              </h4>
              <p className="text-sm text-[#66627b]">
                {lang === 'ar'
                  ? (demoRequested() ? 'لم يُحفظ طلب حقيقي ولم تُرسل رسالة لفريق المبيعات.' : (useWhatsApp?'أكمل إرسال الرسالة في واتساب؛ لم يُؤكد وصول الطلب بعد.':'تم حفظ طلبكم لفريق المبيعات لمراجعته.'))
                  : (demoRequested() ? 'No real request was stored or sent to sales.' : (useWhatsApp?'Complete sending in WhatsApp; delivery is not yet confirmed.':'Your request is saved for our sales team to review.'))}
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#302578] to-[#302578] hover:from-[#302578] hover:to-[#251b63] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  {lang === 'ar' ? 'تم، إغلاق النافذة' : 'Done, Close Window'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
                <label className="flex items-start gap-2 text-xs leading-relaxed">
                  <input type="checkbox" required className="mt-1" />
                  <span>{lang === 'ar' ? 'أوافق على حفظ بياناتي للتواصل بخصوص هذا الطلب. ' : 'I agree to store my details to respond to this request. '}<a href="/privacy.html" target="_blank" rel="noreferrer" className="underline">{lang === 'ar' ? 'الخصوصية' : 'Privacy'}</a></span>
                </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="productinquirymodal-field-1" className="block text-xs font-bold text-[#1E255E]/80 mb-1">
                    {t.contact.fields.fullName} <span className="text-[#302578]">*</span>
                  </label>
                  <input id="productinquirymodal-field-1"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.contact.fields.fullNamePlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#FAD3E1] focus:border-[#302578] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-[#1E255E] bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="productinquirymodal-field-2" className="block text-xs font-bold text-[#1E255E]/80 mb-1">
                    {t.contact.fields.phone} <span className="text-[#302578]">*</span>
                  </label>
                  <input id="productinquirymodal-field-2"
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={lang === 'ar' ? 'رقم للتواصل معكم' : 'Your contact number'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#FAD3E1] focus:border-[#302578] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-[#1E255E] bg-white"
                    dir="ltr"
                  />
                </div>
              </div>

              <details className="rounded-xl border border-[#FAD3E1] p-3">
                <summary className="cursor-pointer font-bold">{lang === 'ar' ? 'خيارات إضافية' : 'Additional options'}</summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="productinquirymodal-field-3" className="block text-xs font-bold text-[#1E255E]/80 mb-1">
                    {t.contact.fields.companyName}
                  </label>
                  <input id="productinquirymodal-field-3"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t.contact.fields.companyNamePlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#FAD3E1] focus:border-[#302578] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-[#1E255E] bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="productinquirymodal-field-4" className="block text-xs font-bold text-[#1E255E]/80 mb-1">
                    {t.contact.fields.quantity}
                  </label>
                  <input id="productinquirymodal-field-4"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder={lang === 'ar' ? 'مثال: 200 كيس' : 'e.g. 200 bags'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#FAD3E1] focus:border-[#302578] focus:ring-2 focus:ring-pink-100 outline-none transition-all text-[#1E255E] bg-white"
                  />
                </div>
              </div>

              </details>
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#302578] to-[#302578] hover:from-[#302578] hover:to-[#251b63] shadow-md shadow-pink-200/50 transition-all flex items-center justify-center gap-2"
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
