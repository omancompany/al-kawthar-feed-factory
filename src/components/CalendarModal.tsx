import {useModalFocus} from '../use-modal-focus';
import { demoRequested } from '../demo-preview';
import { submitInquiry,useWhatsApp } from '../inquiries';
import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { CalendarCheck, X, CircleCheckBig, Send } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang];

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'صباحاً (08:00 - 12:00)',
    topic: 'عقود توريد دورية للمجترات',
    notes: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (isOpen) { setIsSuccess(false); setError(''); } }, [isOpen]);

  const modalRef=useModalFocus(isOpen,onClose);
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    try {
      await submitInquiry('consultation', formData.fullName, formData.phone, JSON.stringify(formData, null, 2));
      setIsSuccess(true);
    } catch {
      setError(lang === 'ar' ? 'تعذر تجهيز أو حفظ الطلب. حاول مرة أخرى أو تواصل معنا.' : 'Unable to prepare or save the request. Retry or contact us.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div ref={modalRef} tabIndex={-1}
      id="b2b-calendar-modal"
      role="dialog" aria-modal="true" aria-label={lang === 'ar' ? 'طلب تواصل' : 'Contact request'} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#EBDCF0] overflow-hidden text-start">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#EBDCF0] bg-gradient-to-r from-[#FAF0FA] to-[#FDF5F8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#302578] flex items-center justify-center shrink-0 border border-[#EBDCF0] shadow-2xs">
              <CalendarCheck className="w-5 h-5 text-[#302578]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#302578] heading-font">
                {lang === 'ar'
                  ? 'حجز موعد استشارة وتوريد'
                  : 'Book a Supply Consultation'}
              </h3>
              <p className="text-xs text-[#66627b]">
                {lang === 'ar'
                  ? 'تنسيق مباشر مع فريق مبيعات مصنع بحار الجوبة'
                  : 'Direct coordination with Bahar Al-Jouba sales team'}
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
          {isSuccess ? (
            <div className="py-6 text-center space-y-3">
              <CircleCheckBig className="w-12 h-12 text-[#8d3558] mx-auto" />
              <h4 className="text-lg font-bold text-[#302578]">
                {lang === 'ar' ? (demoRequested() ? 'تمت محاكاة الطلب التجريبي' : (useWhatsApp?'تم تجهيز طلب الموعد في واتساب':'تم حفظ طلب الموعد')) : (demoRequested() ? 'Demo request simulated' : (useWhatsApp?'WhatsApp booking request prepared':'Booking Request Sent'))}
              </h4>
              <p className="text-sm text-[#66627b]">
                {lang === 'ar'
                  ? (demoRequested() ? 'لم يُحفظ موعد حقيقي ولم يُرسل طلب لفريق المبيعات.' : (useWhatsApp?'أرسل الرسالة في واتساب وانتظر تأكيد الفريق للموعد.':'تم حفظ طلبك لفريق المبيعات. الموعد المقترح ينتظر تأكيد الفريق.'))
                  : (demoRequested() ? 'No real appointment was saved or sent to sales.' : (useWhatsApp?'Send the WhatsApp message and await confirmation.':'Your request is saved for the sales team. Your proposed time is pending confirmation.'))}
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
                <label htmlFor="calendarmodal-field-1" className="flex items-start gap-2 text-xs leading-relaxed">
                  <input type="checkbox" required className="mt-1" />
                  <span>{lang === 'ar' ? 'أوافق على حفظ بياناتي للتواصل بخصوص هذا الطلب. ' : 'I agree to store my details to respond to this request. '}<a href="/privacy.html" target="_blank" rel="noreferrer" className="underline">{lang === 'ar' ? 'الخصوصية' : 'Privacy'}</a></span>
                </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#66627b] mb-1">
                    {t.contact.fields.fullName} <span className="text-[#8d3558]">*</span>
                  </label>
                  <input id="calendarmodal-field-1"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t.contact.fields.fullNamePlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="calendarmodal-field-2" className="block text-xs font-bold text-[#66627b] mb-1">
                    {t.contact.fields.companyName} <span className="text-[#8d3558]">*</span>
                  </label>
                  <input id="calendarmodal-field-2"
                    type="text"
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
                  <label htmlFor="calendarmodal-field-3" className="block text-xs font-bold text-[#66627b] mb-1">
                    {t.contact.fields.phone} <span className="text-[#8d3558]">*</span>
                  </label>
                  <input id="calendarmodal-field-3"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+968 XXXXXXXX"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label htmlFor="calendarmodal-field-4" className="block text-xs font-bold text-[#66627b] mb-1">
                    {lang === 'ar' ? 'التاريخ المفضل للموعد' : 'Preferred Date'}
                  </label>
                  <input id="calendarmodal-field-4"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="calendarmodal-field-5" className="block text-xs font-bold text-[#66627b] mb-1">
                  {lang === 'ar' ? 'فترة التواصل المفضلة' : 'Preferred Time'}
                </label>
                <select id="calendarmodal-field-5"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white"
                >
                  <option value="صباحاً (08:00 - 12:00)">
                    {lang === 'ar' ? 'صباحاً (08:00 - 12:00)' : 'Morning (08:00 - 12:00)'}
                  </option>
                  <option value="ظهراً (12:00 - 15:00)">
                    {lang === 'ar' ? 'ظهراً (12:00 - 15:00)' : 'Afternoon (12:00 - 15:00)'}
                  </option>
                  <option value="مساءً (16:00 - 20:00)">
                    {lang === 'ar' ? 'مساءً (16:00 - 20:00)' : 'Evening (16:00 - 20:00)'}
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="calendarmodal-field-6" className="block text-xs font-bold text-[#66627b] mb-1">
                  {lang === 'ar' ? 'ملاحظات إضافية أو متطلبات خاصة' : 'Additional Notes'}
                </label>
                <textarea id="calendarmodal-field-6"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={
                    lang === 'ar'
                      ? 'حدد موقع مزرعتك أو استفسارك حول الكميات المطلوبة...'
                      : 'Specify location or volume needs...'
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#302578] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#302578] bg-white resize-y"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#302578] to-[#302578] hover:from-[#302578] hover:to-[#251b63] shadow-md shadow-pink-200/50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>
                    {lang === 'ar'
                      ? 'تأكيد إرسال طلب الموعد'
                      : 'Confirm Consultation Booking'}
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
