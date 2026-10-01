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
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(
      `طلب تسعير جديد من: ${formData.fullName || 'عميل'} - ${formData.companyName || 'نشاط تجاري'}`
    );

    const body = encodeURIComponent(
      `السلام عليكم ورحمة الله وبركاته،

تفاصيل طلب التسعير والتواصل التجاري:
----------------------------------------
• الاسم الكريم: ${formData.fullName}
• اسم المحل / المزرعة / الشركة: ${formData.companyName}
• رقم الهاتف: ${formData.phone}
• البريد الإلكتروني للمرسل: ${formData.email || 'غير محدد'}
• نوع النشاط: ${formData.businessType}
• الكمية التقريبية المطلوبة: ${formData.quantity || 'غير محددة'}
• تفاصيل الرسالة وموقع التوصيل:
${formData.message || 'طلب عرض أسعار وجدول التوريد'}
----------------------------------------
تم إرسال هذا الطلب عبر موقع أعلاف الكوثر.`
    );

    const mailtoUrl = `mailto:alkawthercattlefeed@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FAF4FC] text-[#7E3E8A] text-xs font-bold mb-3 border border-[#EBDCF0]">
            <Mail className="w-3.5 h-3.5 text-[#8E4A96]" />
            <span>{t.contact.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold heading-font text-[#3B1C48] tracking-tight">
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
                  <div className="w-9 h-9 rounded-xl bg-white text-[#E13B6B] flex items-center justify-center shrink-0 border border-[#FAD3E1] shadow-2xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1E255E]/60 font-medium">
                      {t.contact.companyLabel}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#1E255E] mt-0.5">
                      {t.contact.companyValue}
                    </div>
                    <div className="text-xs text-[#D8265D] font-semibold mt-0.5">
                      {t.contact.brandValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#D8265D] flex items-center justify-center shrink-0 border border-[#FAD3E1] shadow-2xs">
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
                  <div className="w-9 h-9 rounded-xl bg-white text-[#E13B6B] flex items-center justify-center shrink-0 border border-[#FAD3E1] shadow-2xs">
                    <CircleCheckBig className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1E255E]/60 font-medium">
                      {t.contact.supportLabel}
                    </div>
                    <div className="text-sm font-bold text-[#D8265D] mt-0.5">
                      {t.contact.supportValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#D8265D] flex items-center justify-center shrink-0 border border-[#FAD3E1] shadow-2xs">
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
                        className="text-sm font-semibold text-[#D8265D] hover:text-[#B8194B] transition-colors break-all"
                      >
                        {t.contact.emailValue}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#FAD3E1] flex flex-col gap-3">
                <a
                  id="contact-mailto-btn"
                  href="mailto:alkawthercattlefeed@gmail.com"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
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
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF4FC] text-[#7E3E8A] text-xs font-bold mb-2 border border-[#EBDCF0]">
                  <Mail className="w-3.5 h-3.5 text-[#8E4A96]" />
                  <span>
                    {lang === 'ar' ? 'يرسل مباشرة إلى الإيميل' : 'Direct Email Delivery'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#3B1C48] heading-font">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A4565] mt-1">
                  {t.contact.formDesc}
                </p>
              </div>

              {isSuccess ? (
                <div className="p-6 rounded-2xl bg-[#FAF4FC] border border-[#EBDCF0] text-start space-y-4">
                  <div className="flex items-center gap-3 text-[#3B1C48]">
                    <CircleCheckBig className="w-6 h-6 text-[#D9487C] shrink-0" />
                    <h4 className="text-base sm:text-lg font-bold">
                      {t.contact.fields.successTitle}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5A4565] leading-relaxed">
                    {t.contact.fields.successMsg}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`mailto:alkawthercattlefeed@gmail.com?subject=${encodeURIComponent(
                        'طلب توريد واستفسار تجاري - أعلاف الكوثر'
                      )}&body=${getEncodedMailBody()}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
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
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-[#7E3E8A] bg-[#FAF4FC] hover:bg-[#F3E5F6] border border-[#EBDCF0] font-semibold text-xs transition-colors"
                    >
                      {lang === 'ar' ? 'إرسال طلب آخر' : 'Send Another Inquiry'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-[#5A4565] mb-1">
                        {t.contact.fields.fullName} <span className="text-[#D9487C]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t.contact.fields.fullNamePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-xs font-bold text-[#5A4565] mb-1">
                        {t.contact.fields.companyName} <span className="text-[#D9487C]">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder={t.contact.fields.companyNamePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-[#5A4565] mb-1">
                        {t.contact.fields.phone} <span className="text-[#D9487C]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.contact.fields.phonePlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-[#5A4565] mb-1">
                        {t.contact.fields.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.fields.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="businessType" className="block text-xs font-bold text-[#5A4565] mb-1">
                        {t.contact.fields.businessType} <span className="text-[#D9487C]">*</span>
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
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
                      >
                        <option value="trader">{t.contact.fields.businessTypes.trader}</option>
                        <option value="distributor">{t.contact.fields.businessTypes.distributor}</option>
                        <option value="farm">{t.contact.fields.businessTypes.farm}</option>
                        <option value="company">{t.contact.fields.businessTypes.company}</option>
                        <option value="other">{t.contact.fields.businessTypes.other}</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="quantity" className="block text-xs font-bold text-[#5A4565] mb-1">
                        {t.contact.fields.quantity}
                      </label>
                      <input
                        type="text"
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder={t.contact.fields.quantityPlaceholder}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-[#5A4565] mb-1">
                      {t.contact.fields.message}
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.fields.messagePlaceholder}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-contact-form-btn"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8E4A96] to-[#D9487C] hover:from-[#7B3A82] hover:to-[#C6346A] disabled:opacity-50 shadow-md shadow-pink-200/50 transition-all flex items-center justify-center gap-2"
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
                    <p className="text-[11px] text-[#8C7698] text-center mt-2">
                      {lang === 'ar'
                        ? 'عند الضغط، سيتم فتح تطبيق البريد لإرسال البيانات مباشرة إلى: alkawthercattlefeed@gmail.com'
                        : 'Submitting will open your email client addressed to: alkawthercattlefeed@gmail.com'}
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
