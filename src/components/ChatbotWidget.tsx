import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Sun,
  Moon,
  RotateCcw,
  X,
  User,
  Send,
  FileSpreadsheet,
} from 'lucide-react';

interface ChatbotWidgetProps {
  lang: 'ar' | 'en';
  onOpenInquiryModal: () => void;
  onOpenCalendarModal: () => void;
  onNavigateContact: () => void;
}

interface MessageAction {
  type: 'quote' | 'email' | 'contact';
  label: string;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: MessageAction;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  lang,
  onOpenInquiryModal,
  onNavigateContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  const defaultQuestions =
    lang === 'ar'
      ? [
          {
            q: '🌾 ما هي مكونات وجودة علف الكوثر؟',
            key: 'ingredients',
            answer:
              'يتميز علف الكوثر بتركيبة غذائية متوازنة ونقية 100%: نسبة بروتين خام 11% - 13%، ألياف مهضومة، ذرة صفراء، نخالة قمح مدعمة، وكربوهيدرات نقية غنية بالفيتامينات والمعادن الضرورية لصحة ونمو الحيوان دون أي إضافات ضارة.',
          },
          {
            q: '📦 ما هو وزن ونوع العبوة؟',
            key: 'packaging',
            answer:
              'يتوفر علف الكوثر في عبوات متينة ومحكمة الإغلاق بوزن 50 كجم، مصممة خصيصاً لمقاومة الرطوبة وحماية القيمة الغذائية للعلف أثناء النقل والتخزين في مزارع السلطنة.',
          },
          {
            q: '🐐 هل العلف مناسب لجميع أنواع المواشي؟',
            key: 'animals',
            answer:
              'نعم، علف الكوثر هو علف متعدد الاستعمالات للمجترات (Multi-Purpose Ruminant Feed)، ومثالي للأغنام، الماعز، الأبقار، والإبل، لدعم التسمين وإنتاج الحليب والحفاظ على حيوية القطيع.',
          },
          {
            q: '💰 كيف أحصل على أسعار وتوريد لمزرعتي؟',
            key: 'pricing',
            answer:
              'نقدم أسعاراً تنافسية جداً لمزارع الإنتاج ومتاجر التجزئة ومربي الماشية. يمكنك طلب عرض تسعير فوري أو إرسال تفاصيل الكمية وسيقوم فريق المبيعات بالتواصل معكم.',
            action: { type: 'quote' as const, label: 'طلب عرض تسعير الآن' },
          },
          {
            q: '📍 أين يقع المصنع وما هي مناطق التوريد؟',
            key: 'location',
            answer:
              'يقع مصنع بحار الجوبة في ولاية سناو بمحافظة شمال الشرقية، سلطنة عُمان. نقوم بتوريد وتوزيع الشحنات لجميع محافظات السلطنة عبر أسطول نقل مخصص.',
          },
        ]
      : [
          {
            q: '🌾 Feed Composition & Quality?',
            key: 'ingredients',
            answer:
              'Al Kawther general ruminant feed delivers a balanced formula with 11%-13% crude protein, digestible fiber, fortified wheat bran, yellow corn, and vital vitamins and minerals for optimal animal growth and vitality.',
          },
          {
            q: '📦 Bag Size & Packaging?',
            key: 'packaging',
            answer:
              'Al Kawther is supplied in heavy-duty moisture-protected 50 kg woven polypropylene bags designed for harsh climate transport and warehouse durability.',
          },
          {
            q: '🐐 Suitable for which animals?',
            key: 'animals',
            answer:
              'It is a multi-purpose formula engineered for all ruminants including sheep, goats, dairy & beef cattle, and camels.',
          },
          {
            q: '💰 Wholesale Pricing & Supply?',
            key: 'pricing',
            answer:
              'We provide specialized wholesale tiers for farms, commercial traders, and supply contractors. You can request an instant quote online.',
            action: { type: 'quote' as const, label: 'Request Quote Now' },
          },
          {
            q: '📍 Factory Location & Delivery?',
            key: 'location',
            answer:
              'The Bahar Al-Jouba plant is located in Sinaw, North Al Sharqiyah Governorate, Oman, serving all governorates with reliable freight distribution.',
          },
        ];

  const getInitialMessages = (): ChatMessage[] => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text:
        lang === 'ar'
          ? 'مرحباً بك في المساعد الذكي لمصنع بحار الجوبة (أعلاف الكوثر) 🌿\nيسعدني الرد التلقائي على استفساراتك حول المنتج والمواصفات والتوريد.'
          : 'Welcome to Bahar Al-Jouba automated assistant for Al Kawther Feeds 🌿\nI am here to assist you instantly with specifications, bag details, and supply inquiries.',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (messages.length <= 1) {
      setMessages(getInitialMessages());
    }
  }, [lang]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowNotificationBadge(false);
  };

  const handleReset = () => {
    setMessages(getInitialMessages());
  };

  const handleActionClick = (action: MessageAction) => {
    if (action.type === 'quote' && onOpenInquiryModal) {
      onOpenInquiryModal();
    } else if (action.type === 'email') {
      window.location.href =
        'mailto:alkawthercattlefeed@gmail.com?subject=استفسار%20عن%20أعلاف%20الكوثر';
    } else if (onNavigateContact) {
      onNavigateContact();
    }
  };

  const matchAnswer = (query: string): { text: string; action?: MessageAction } => {
    const q = query.toLowerCase();

    if (
      q.includes('بروتين') ||
      q.includes('مكون') ||
      q.includes('خلط') ||
      q.includes('عناصر') ||
      q.includes('طاقة') ||
      q.includes('protein') ||
      q.includes('ingredient')
    ) {
      return {
        text:
          lang === 'ar'
            ? 'علف الكوثر مُعد وفق أعلى المعايير الغذائية: نسبة بروتين خام 11% - 13%، ألياف خام مهضومة، ذرة صفراء، ونخالة قمح نقية مع فيتامينات مخصصة لدعم نمو وصحة المجترات.'
            : 'Al Kawther feed contains 11% - 13% crude protein with balanced digestible energy, natural fiber, fortified wheat bran, and minerals formulated for optimal ruminant health.',
      };
    }

    if (
      q.includes('سعر') ||
      q.includes('أسعار') ||
      q.includes('اسعار') ||
      q.includes('بكم') ||
      q.includes('تكلفة') ||
      q.includes('price') ||
      q.includes('cost') ||
      q.includes('quote')
    ) {
      return {
        text:
          lang === 'ar'
            ? 'نقدم تسعيراً تنافسياً خاصاً بالمزارع والطلبيات التجارية وحزم التوريد الدورية. يمكنك تقديم طلب تسعير فوري لتحديد الكمية المناسبة.'
            : 'We provide competitive wholesale pricing customized by volume and delivery schedule. Click below to submit a quotation request.',
        action: {
          type: 'quote',
          label: lang === 'ar' ? 'طلب تسعير فوري' : 'Request Pricing Quote',
        },
      };
    }

    if (
      q.includes('وزن') ||
      q.includes('كيس') ||
      q.includes('حجم') ||
      q.includes('عبوة') ||
      q.includes('عبوه') ||
      q.includes('50') ||
      q.includes('weight') ||
      q.includes('bag') ||
      q.includes('size')
    ) {
      return {
        text:
          lang === 'ar'
            ? 'العبوة المعتمدة لأعلاف الكوثر هي كيس متين عالي الجودة سعة 50 كجم، مصمم بتغليف عازل للرطوبة يحمي المنتج أثناء التخزين والشحن.'
            : 'Al Kawther feeds are packed in heavy-duty 50 kg moisture-sealed woven bags engineered for farm and commercial handling.',
      };
    }

    if (
      q.includes('سناو') ||
      q.includes('موقع') ||
      q.includes('عنوان') ||
      q.includes('مصنع') ||
      q.includes('مكان') ||
      q.includes('location') ||
      q.includes('sinaw') ||
      q.includes('factory') ||
      q.includes('where')
    ) {
      return {
        text:
          lang === 'ar'
            ? 'موقع المصنع: ولاية سناو، محافظة شمال الشرقية، سلطنة عُمان (مصنع بحار الجوبة). نقوم بتوصيل وتوريد كميات الجملة إلى جميع محافظات السلطنة.'
            : 'Factory location: Sinaw, North Al Sharqiyah Governorate, Sultanate of Oman (Bahar Al-Jouba Factory). We distribute throughout Oman.',
      };
    }

    if (
      q.includes('غنم') ||
      q.includes('ماعز') ||
      q.includes('بقر') ||
      q.includes('ابل') ||
      q.includes('جمال') ||
      q.includes('حيوان') ||
      q.includes('مواشي') ||
      q.includes('sheep') ||
      q.includes('goat') ||
      q.includes('camel') ||
      q.includes('cattle')
    ) {
      return {
        text:
          lang === 'ar'
            ? 'نعم، علف الكوثر مصمم خصيصاً كعلف متعدد الاستعمالات لجميع الحيوانات المجترة (الأغنام، الماعز، الأبقار، والإبل) ويوفر التغذية الكاملة للتسمين وإنتاج الألبان.'
            : 'Yes, Al Kawther is engineered as a multi-purpose feed for all ruminants (sheep, goats, cattle, and camels) supporting healthy weight gain and milk yield.',
      };
    }

    if (
      q.includes('ايميل') ||
      q.includes('بريد') ||
      q.includes('تواصل') ||
      q.includes('email') ||
      q.includes('contact')
    ) {
      return {
        text:
          lang === 'ar'
            ? 'يمكنك التواصل المباشر مع إدارة المصنع والمبيعات عبر البريد الرسمي: alkawthercattlefeed@gmail.com أو عبر تعبئة نموذج الاستفسار بالموقع.'
            : 'You can email our sales desk directly at alkawthercattlefeed@gmail.com or submit the online inquiry form.',
        action: {
          type: 'email',
          label: lang === 'ar' ? 'إرسال بريد رسمي' : 'Send Official Email',
        },
      };
    }

    return {
      text:
        lang === 'ar'
          ? 'شكراً لاستفسارك! علف الكوثر (50 كجم) ينتجه مصنع بحار الجوبة بسناو بأعلى معايير الجودة للمجترات. يمكنك طلب تسعير أو الاستفسار عن التوريد الفوري.'
          : 'Thank you for asking! Al Kawther (50 kg) is manufactured by Bahar Al-Jouba Factory in Sinaw to premium ruminant standards. You can request a quote or contact us anytime.',
      action: {
        type: 'quote',
        label: lang === 'ar' ? 'تقديم طلب تسعير' : 'Submit Pricing Request',
      },
    };
  };

  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = matchAnswer(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        action: response.action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleFaqClick = (faq: { q: string; answer: string; action?: MessageAction }) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: faq.q,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: faq.answer,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        action: faq.action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed bottom-5 start-5 z-40 flex flex-col items-start font-arabic">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className={`mb-3 w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-fadeIn backdrop-blur-md transition-colors ${
            isNightMode
              ? 'bg-[#101426] border-[#2A3152] text-slate-100'
              : 'bg-white border-[#FAD3E1] text-[#1E255E]'
          }`}
        >
          {/* Header */}
          <div
            className={`px-4 py-3.5 flex items-center justify-between border-b transition-colors ${
              isNightMode
                ? 'bg-gradient-to-r from-[#191F38] to-[#251A2E] border-[#2A3152]'
                : 'bg-gradient-to-r from-[#FFF2F6] via-[#FDF0F4] to-[#FCE7EF] border-[#FAD3E1]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#E13B6B] to-[#D8265D] text-white flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="text-start">
                <div className="flex items-center gap-1.5">
                  <h4
                    className={`text-sm font-extrabold ${
                      isNightMode ? 'text-white' : 'text-[#1E255E]'
                    }`}
                  >
                    {lang === 'ar' ? 'مساعد أعلاف الكوثر' : 'Al Kawther Assistant'}
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-[#E13B6B]/15 text-[#E13B6B]">
                    {lang === 'ar' ? 'رد تلقائي' : 'Auto Bot'}
                  </span>
                </div>
                <p
                  className={`text-[11px] ${
                    isNightMode ? 'text-slate-400' : 'text-[#1E255E]/70'
                  }`}
                >
                  {lang === 'ar' ? 'مصنع بحار الجوبة – متاح الآن' : 'Bahar Al-Jouba – Online'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Day / Night Mode toggle */}
              <button
                id="chatbot-theme-toggle"
                onClick={() => setIsNightMode(!isNightMode)}
                className={`p-1.5 rounded-xl transition-all ${
                  isNightMode
                    ? 'bg-[#242C4C] text-amber-300 hover:bg-[#2F3962]'
                    : 'bg-white text-[#D8265D] hover:bg-[#FFEBF1] border border-[#FAD3E1]'
                }`}
                title={
                  isNightMode
                    ? lang === 'ar'
                      ? 'التحويل للمود النهاري'
                      : 'Switch to Day Mode'
                    : lang === 'ar'
                      ? 'التحويل للمود الليلي'
                      : 'Switch to Night Mode'
                }
                aria-label="Toggle Night/Day Mode"
              >
                {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Reset Conversation */}
              <button
                onClick={handleReset}
                className={`p-1.5 rounded-xl transition-colors ${
                  isNightMode
                    ? 'text-slate-400 hover:text-white hover:bg-[#242C4C]'
                    : 'text-[#1E255E]/60 hover:text-[#D8265D] hover:bg-[#FFF2F6]'
                }`}
                title={lang === 'ar' ? 'إعادة ضبط المحادثة' : 'Reset Conversation'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 rounded-xl transition-colors ${
                  isNightMode
                    ? 'text-slate-400 hover:text-white hover:bg-[#242C4C]'
                    : 'text-[#1E255E]/60 hover:text-[#D8265D] hover:bg-[#FFF2F6]'
                }`}
                title={lang === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            id="chatbot-messages-area"
            className={`flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs sm:text-sm text-start transition-colors ${
              isNightMode ? 'bg-[#0E1220]' : 'bg-[#FFF9FB]'
            }`}
          >
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#E13B6B] to-[#D8265D] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                      isBot
                        ? isNightMode
                          ? 'bg-[#1B2138] text-slate-100 border border-[#2D365A]'
                          : 'bg-white text-[#1E255E] border border-[#FAD3E1]'
                        : 'bg-gradient-to-r from-[#E13B6B] to-[#D8265D] text-white font-medium'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                    {msg.action && (
                      <div className="mt-2.5 pt-2 border-t border-current/15">
                        <button
                          onClick={() => msg.action && handleActionClick(msg.action)}
                          className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                            isNightMode
                              ? 'bg-[#E13B6B] hover:bg-[#D8265D] text-white'
                              : 'bg-gradient-to-r from-[#E13B6B] to-[#D8265D] text-white hover:opacity-95'
                          }`}
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>{msg.action.label}</span>
                        </button>
                      </div>
                    )}

                    <div
                      className={`text-[9px] mt-1 text-end ${
                        isBot
                          ? isNightMode
                            ? 'text-slate-400'
                            : 'text-[#1E255E]/50'
                          : 'text-white/80'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-6 h-6 rounded-full bg-[#1E255E] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 justify-start items-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#E13B6B] to-[#D8265D] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div
                  className={`px-3 py-2 rounded-2xl border flex items-center gap-1.5 ${
                    isNightMode
                      ? 'bg-[#1B2138] border-[#2D365A] text-slate-300'
                      : 'bg-white border-[#FAD3E1] text-[#1E255E]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E13B6B] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E13B6B] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E13B6B] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-[#E13B6B] font-medium ms-1">
                    {lang === 'ar' ? 'جاري الرد...' : 'Replying...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Horizontal Chips */}
          <div
            className={`px-3 py-2 border-t overflow-x-auto flex gap-1.5 no-scrollbar ${
              isNightMode
                ? 'bg-[#13182A] border-[#2A3152]'
                : 'bg-[#FFF5F8] border-[#FAD3E1]'
            }`}
          >
            {defaultQuestions.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => handleFaqClick(faq)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors shrink-0 ${
                  isNightMode
                    ? 'bg-[#1E2540] text-slate-300 hover:bg-[#E13B6B] hover:text-white border border-[#2D365A]'
                    : 'bg-white text-[#1E255E] hover:bg-[#FFEBF1] hover:text-[#D8265D] border border-[#FAD3E1]'
                }`}
              >
                {faq.q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className={`p-2.5 border-t flex items-center gap-2 ${
              isNightMode
                ? 'bg-[#161B30] border-[#2A3152]'
                : 'bg-white border-[#FAD3E1]'
            }`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'اكتب استفسارك هنا (مثل: السعر، المكونات، سناو)...'
                  : 'Type your question (e.g. price, protein, Sinaw)...'
              }
              className={`flex-1 px-3 py-2 text-xs rounded-xl outline-none transition-all ${
                isNightMode
                  ? 'bg-[#0E1220] border border-[#2D365A] text-white focus:border-[#E13B6B]'
                  : 'bg-[#FFF5F8] border border-[#FAD3E1] text-[#1E255E] focus:border-[#E13B6B] focus:bg-white'
              }`}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] text-white disabled:opacity-40 transition-all shadow-xs"
              title={lang === 'ar' ? 'إرسال' : 'Send'}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="chatbot-floating-trigger"
        onClick={isOpen ? () => setIsOpen(false) : handleOpenChat}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#E13B6B] to-[#D8265D] hover:from-[#D8265D] hover:to-[#B8194B] text-white shadow-xl shadow-pink-300/50 hover:shadow-2xl transition-all transform hover:scale-105"
        aria-label="Open Al Kawther Automated Chatbot"
      >
        <div className="relative">
          <Bot className="w-5 h-5 fill-current" />
          {showNotificationBadge && !isOpen && (
            <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-white animate-ping" />
          )}
        </div>
        <div className="flex flex-col text-start">
          <span className="text-xs sm:text-sm font-bold tracking-wide">
            {lang === 'ar' ? 'الرد التلقائي والمساعد' : 'Auto Chat Assistant'}
          </span>
          <span className="text-[10px] text-pink-100 hidden sm:inline-block">
            {lang === 'ar' ? 'متاح 24/7 (نهاري وليلي)' : '24/7 (Day & Night Mode)'}
          </span>
        </div>
      </button>
    </div>
  );
};
