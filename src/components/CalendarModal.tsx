import React, { useState } from 'react';
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);

    const subject = encodeURIComponent(
      `طلب موعد استشارة وتوريد: ${formData.fullName || 'عميل'} - ${formData.companyName || 'مزرعة/جهة'}`
    );

    const body = encodeURIComponent(
      `السلام عليكم ورحمة الله وبركاته،

طلب موعد استشارة وتوريد أعلاف الكوثر:
• الاسم: ${formData.fullName}
• المنشأة / المزرعة: ${formData.companyName}
• رقم التواصل: ${formData.phone}
• التاريخ المفضل: ${formData.preferredDate || 'في أقرب وقت'}
• الفترة: ${formData.preferredTime}
• الموضوع: ${formData.topic}
• ملاحظات: ${formData.notes || 'لا توجد'}

يرجى تأكيد الموعد المناسب.`
    );

    setTimeout(() => {
      window.location.href = `mailto:alkawthercattlefeed@gmail.com?subject=${subject}&body=${body}`;
    }, 400);
  };

  return (
    <div
      id="b2b-calendar-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#EBDCF0] overflow-hidden text-start">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#EBDCF0] bg-gradient-to-r from-[#FAF0FA] to-[#FDF5F8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#8E4A96] flex items-center justify-center shrink-0 border border-[#EBDCF0] shadow-2xs">
              <CalendarCheck className="w-5 h-5 text-[#8E4A96]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#3B1C48] heading-font">
                {lang === 'ar'
                  ? 'حجز موعد استشارة وتوريد'
                  : 'Book a Supply Consultation'}
              </h3>
              <p className="text-xs text-[#6F5B7A]">
                {lang === 'ar'
                  ? 'تنسيق مباشر مع فريق مبيعات مصنع بحار الجوبة'
                  : 'Direct coordination with Bahar Al-Jouba sales team'}
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
          {isSuccess ? (
            <div className="py-6 text-center space-y-3">
              <CircleCheckBig className="w-12 h-12 text-[#D9487C] mx-auto" />
              <h4 className="text-lg font-bold text-[#3B1C48]">
                {lang === 'ar' ? 'تم تسجيل طلب الموعد' : 'Booking Request Sent'}
              </h4>
              <p className="text-sm text-[#5A4565]">
                {lang === 'ar'
                  ? 'تم تجهيز بيانات الموعد وفتح البريد الإلكتروني. سيتواصل معكم مسؤول التوريد لتأكيد الموعد.'
                  : 'Your booking details are prepared. Our supply specialist will confirm your consultation time.'}
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
                  <label className="block text-xs font-bold text-[#5A4565] mb-1">
                    {t.contact.fields.fullName} <span className="text-[#D9487C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t.contact.fields.fullNamePlaceholder}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5A4565] mb-1">
                    {t.contact.fields.companyName} <span className="text-[#D9487C]">*</span>
                  </label>
                  <input
                    type="text"
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
                  <label className="block text-xs font-bold text-[#5A4565] mb-1">
                    {t.contact.fields.phone} <span className="text-[#D9487C]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+968 XXXXXXXX"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5A4565] mb-1">
                    {lang === 'ar' ? 'التاريخ المفضل للموعد' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5A4565] mb-1">
                  {lang === 'ar' ? 'فترة التواصل المفضلة' : 'Preferred Time'}
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white"
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
                <label className="block text-xs font-bold text-[#5A4565] mb-1">
                  {lang === 'ar' ? 'ملاحظات إضافية أو متطلبات خاصة' : 'Additional Notes'}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={
                    lang === 'ar'
                      ? 'حدد موقع مزرعتك أو استفسارك حول الكميات المطلوبة...'
                      : 'Specify location or volume needs...'
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E5D7E8] focus:border-[#8E4A96] focus:ring-2 focus:ring-purple-100 outline-none transition-all text-[#3B1C48] bg-white resize-y"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] shadow-md shadow-pink-200/50 transition-all flex items-center justify-center gap-2"
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
