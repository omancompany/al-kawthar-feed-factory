import {contact} from '../contact-config';
import { demoRequested } from '../demo-preview';
import { submitInquiry,useWhatsApp } from '../inquiries';
import React, { useState } from 'react';
import { translations } from '../data/translations';
import {
  Mail,
  Building2,
  MapPin,
  CircleCheckBig,
  Clock,
  Send,
} from 'lucide-react';

interface ContactSectionProps {
  lang: 'ar' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    businessType: 'trader' as const,
    quantity: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    try {
      await submitInquiry('quote', formData.fullName, formData.phone, JSON.stringify(formData, null, 2));
      setIsSuccess(true);
    } catch {
      setError(lang === 'ar' ? 'تعذر تجهيز أو حفظ الطلب. حاول مرة أخرى أو تواصل معنا.' : 'Unable to prepare or save the request. Retry or contact us.');
    } finally { setIsSubmitting(false); }
  };

  const getEncodedMailBody = () => {
    const text = `السلام عليكم، أود الاستفسار عن أعلاف الكوثر:
الاسم: ${formData.fullName || 'غير محدد'}
الجهة: ${formData.companyName || 'غير محدد'}
الهاتف: ${formData.phone || 'غير محدد'}
الكمية التقريبية: ${formData.quantity || 'غير محدد'}
الرسالة: ${formData.message || 'طلب تسعير'}`;
    return encodeURIComponent(text);
  };

  return (
    <section id="contact" className="py-16 lg:py-20 bg-white border-b border-[#EBDCF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFF5F7] text-[#302578] text-xs font-bold mb-3 border border-[#EBDCF0]">
            <Mail className="w-3.5 h-3.5 text-[#302578]" />
            <span>{t.contact.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold heading-font text-[#302578] tracking-tight">
            {t.contact.subtitle}
          </h2>
        </div>

        {/* Grid: Left info / Right form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Direct info card */}
          <div className="lg:col-span-5 text-start">
            <div className="bg-gradient-to-br from-[#FFF5F8] via-[#FDF0F4] to-[#FCE7EF] text-[#1E255E] rounded-3xl p-6 sm:p-8 shadow-md shadow-pink-100/40 border border-[#FAD3E1] flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold heading-font text-[#1E255E]">
                    {lang === 'ar' ? 'بيانات التواصل والتوريد' : 'Contact & Commercial Inquiries'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1E255E]/80 mt-1">
                    {lang === 'ar'
                      ? 'يسعدنا خدمتكم واستقبال طلبات عروض الأسعار والتوريد عبر البريد المباشر ومساعد الموقع.'
                      : 'We welcome your quotation inquiries and supply agreements via email and online support.'}
                  </p>
                </div>

                <div className="flex items-start gap-3.5 pt-2">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#302578] flex items-center justify-center shrink-0 border border-[#FAD3E1] shadow-2xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1E255E]/60 font-medium">
                      {t.contact.companyLabel}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#1E255E] mt-0.5">
                      {t.contact.companyValue}
                    </div>
                    <div className="text-xs text-[#302578] font-semibold mt-0.5">
                      {t.contact.brandValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#302578] flex items-center justify-center shrink-0 border border-[#FAD3E1] shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1E255E]/60 font-medium">
                      {t.contact.addressLabel}
                    </div>
                    <div className="text-sm font-medium text-[#1E255E]/80 mt-0.5 leading-relaxed">
                      {t.contact.addressValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#302578] flex items-center justify-center shrink-0 border border-[#FAD3E1] shadow-2xs">
                    <CircleCheckBig className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1E255E]/60 font-medium">
                      {t.contact.supportLabel}
                    </div>
                    <div className="text-sm font-bold text-[#302578] mt-0.5">
                      {t.contact.supportValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#302578] flex items-center justify-center shrink-0 border border-[#FAD3E1] shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1E255E]/60 font-medium">
                      {t.contact.emailLabel}
                    </div>
                    <div className="mt-0.5">
                      <a
                        id="contact-email-link"
                        href="mailto:alkawthercattlefeed@gmail.com"
                        className="text-sm font-semibold text-[#302578] hover:text-[#251b63] transition-colors break-all"
                      >
                        {t.contact.emailValue}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-sm">
                <a className="font-bold underline" href={'tel:+'+contact.phone}><bdi>{'+'+contact.phone}</bdi></a>
                <p>{lang === 'ar' ? 'بحار الجوبه للتجارة ش.م.م • سجل تجاري 1219471' : 'Bahar Aljba Trading LLC • CR 1219471'}</p>
                <p>{lang === 'ar' ? 'رقم التعريف الضريبي: 1383870' : 'Tax identification number: 1383870'}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-[#FAD3E1] flex flex-col gap-3">
                <a
                  id="contact-mailto-btn"
                  href="mailto:alkawthercattlefeed@gmail.com"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#302578] to-[#302578] hover:from-[#302578] hover:to-[#251b63] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>
                    {lang === 'ar' ? 'إرسال بريد رسمي مباشر' : 'Send Official Email'}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Quote Form */}
          <div className="lg:col-span-7 text-start">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCF0] shadow-md shadow-purple-100/20">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF5F7] text-[#302578] text-xs font-bold mb-2 border border-[#EBDCF0]">
                  <Mail className="w-3.5 h-3.5 text-[#302578]" />
                  <span>
                    {lang === 'ar' ? (useWhatsApp?'طلب عبر واتساب':'طلب محفوظ لفريق المبيعات') : (useWhatsApp?'WhatsApp inquiry':'Saved request for our sales team')}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#302578] heading-font">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#66627b] mt-1">
                  {t.contact.formDesc}
                </p>
              </div>

              {isSuccess ? (
                <div className="p-6 rounded-2xl bg-[#FFF5F7] border border-[#EBDCF0] text-start space-y-4">
                  <div className="flex items-center gap-3 text-[#302578]">
                    <CircleCheckBig className="w-6 h-6 text-[#B8577B] shrink-0" />
                    <h4 className="text-base sm:text-lg font-bold">
                      {demoRequested() ? (lang === 'ar' ? 'تمت محاكاة الطلب التجريبي' : 'Demo request simulated') : useWhatsApp?(lang==='ar'?'تم تجهيز رسالة واتساب':'WhatsApp message prepared'):t.contact.fields.successTitle}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66627b] leading-relaxed">
                    {demoRequested() ? (lang === 'ar' ? 'لم يُحفظ طلب حقيقي ولم تُرسل رسالة لفريق المبيعات.' : 'No real request was stored or sent to sales.') : useWhatsApp?(lang==='ar'?'أرسل الرسالة في واتساب؛ وصولها وتأكيدها مسؤولية فريق المبيعات.':'Send the WhatsApp message and await sales confirmation.'):t.contact.fields.successMsg}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`mailto:alkawthercattlefeed@gmail.com?subject=${encodeURIComponent(
                        'طلب توريد واستفسار تجاري - أعلاف الكوثر'
                      )}&body=${getEncodedMailBody()}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#302578] to-[#302578] hover:from-[#302578] hover:to-[#251b63] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
                    >
                      <Mail className="w-4 h-4 text-white" />
                      <span>
                        {lang === 'ar' ? 'فتح في تطبيق البريد' : 'Open in Email Client'}
                      </span>
                    </a>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          fullName: '',
                          companyName: '',
                          phone: '',
                          email: '',
                          businessType: 'trader',
                          quantity: '',
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-[#302578] bg-[#FFF5F7] hover:bg-[#F3E5F6] border border-[#EBDCF0] font-semibold text-xs transition-colors"
                    >
                      {lang === 'ar' ? 'إرسال طلب آخر' : 'Send Another Inquiry'}
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
                      <label htmlFor="fullName" className="block text-xs font-bold text-[#66627b] mb-1">
                        {t.contact.fields.fullName} <span className="text-[#B8577B]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t.contact.fields.fullNamePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-xs font-bold text-[#66627b] mb-1">
                        {t.contact.fields.companyName} <span className="text-[#B8577B]">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder={t.contact.fields.companyNamePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-[#66627b] mb-1">
                        {t.contact.fields.phone} <span className="text-[#B8577B]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.contact.fields.phonePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-[#66627b] mb-1">
                        {t.contact.fields.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.fields.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="businessType" className="block text-xs font-bold text-[#66627b] mb-1">
                        {t.contact.fields.businessType} <span className="text-[#B8577B]">*</span>
                      </label>
                      <select
                        id="businessType"
                        value={formData.businessType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessType: e.target.value as any,
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                      >
                        <option value="trader">{t.contact.fields.businessTypes.trader}</option>
                        <option value="distributor">{t.contact.fields.businessTypes.distributor}</option>
                        <option value="farm">{t.contact.fields.businessTypes.farm}</option>
                        <option value="company">{t.contact.fields.businessTypes.company}</option>
                        <option value="other">{t.contact.fields.businessTypes.other}</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="quantity" className="block text-xs font-bold text-[#66627b] mb-1">
                        {t.contact.fields.quantity}
                      </label>
                      <input
                        type="text"
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder={t.contact.fields.quantityPlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-[#66627b] mb-1">
                      {t.contact.fields.message}
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.fields.messagePlaceholder}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-contact-form-btn"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#302578] to-[#B8577B] hover:from-[#251b63] hover:to-[#302578] disabled:opacity-50 shadow-md shadow-pink-200/50 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>{t.contact.fields.submitting}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{t.contact.fields.submit}</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-[#827b98] text-center mt-2">
                      {lang === 'ar'
                        ? (useWhatsApp?'تُجهز الرسالة في واتساب؛ أكمل إرسالها بنفسك.':'يُحفظ طلبك لفريق المبيعات بعد تأكيد الإرسال.')
                        : (useWhatsApp?'A WhatsApp message is prepared; complete sending it yourself.':'Your request is saved for our sales team after confirmation.')}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
