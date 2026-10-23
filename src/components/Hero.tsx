import { ArrowLeft, ArrowRight, ArrowDown, MapPin, Wheat, ShieldCheck } from 'lucide-react';
import { contact, whatsappUrl } from '../contact-config';
import { translations } from '../data/translations';
import { FeedBagVisual } from './FeedBagVisual';

interface HeroProps {
  lang: 'ar' | 'en';
  onNavigate: (id: string) => void;
  onOpenConsultationModal: () => void;
}

export function Hero({ lang, onNavigate, onOpenConsultationModal }: HeroProps) {
  const t = translations[lang];
  const ar = lang === 'ar';
  const Arrow = ar ? ArrowLeft : ArrowRight;
  return (
    <section id="home" className="hero-section">
      <div className="hero-layout page-width">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span />{ar ? 'من سناو، إلى مزارع سلطنة عمان' : 'From Sinaw, to farms across Oman'}</div>
          <h1 id="hero-headline" className="heading-font">
            {ar ? 'تغذية أفضل.' : 'Better nutrition.'}
            <span>{ar ? 'نمو يستمر.' : 'Lasting growth.'}</span>
          </h1>
          <p id="hero-supporting-text">{t.hero.supporting}</p>
          <div className="hero-actions">
            <button id="hero-primary-cta" className="brand-button" onClick={() => onNavigate('contact')}>{t.hero.primaryCta}<Arrow size={18} /></button>
            <button id="hero-secondary-cta" className="outline-button" onClick={() => onNavigate('products')}>{t.hero.secondaryCta}<ArrowDown size={17} /></button>
          </div>
          <div className="hero-contact-links">
            {contact.phone && <a href={`tel:+${contact.phone}`}>{ar ? 'اتصل بنا' : 'Call us'}</a>}
            {contact.whatsapp && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{ar ? 'واتساب' : 'WhatsApp'}</a>}
          </div>
          <div className="hero-assurances">
            <span><ShieldCheck size={18} />{ar ? 'جودة في كل عبوة' : 'Quality in every bag'}</span>
            <span><Wheat size={18} />{ar ? 'تغذية متوازنة للمجترات' : 'Balanced ruminant nutrition'}</span>
          </div>
          <div className="hero-location"><MapPin size={15} /><span>{ar ? 'مصنع بحار الجوبة · سناو، شمال الشرقية' : 'Bahar Al-Jouba Factory · Sinaw, North Al Sharqiyah'}</span></div>
        </div>
        <div className="hero-showcase">
          <div className="showcase-topline"><span>AL KAWTHER FEEDS</span><span>01 / {ar ? 'منتجاتنا' : 'OUR FEED'}</span></div>
          <div className="showcase-orbit" aria-hidden="true" />
          <div className="hero-bag"><FeedBagVisual showTechnicalSpecs={false} /></div>
          <div className="weight-label"><strong>50</strong><span>{ar ? 'كجم / العبوة' : 'KG / BAG'}</span></div>
          <div className="showcase-caption"><span><Wheat size={20} />{ar ? 'علف متعدد الاستعمالات' : 'General Ruminant Feed'}</span><small>{ar ? 'للأبقار والإبل والأغنام والماعز' : 'For cattle, camels, sheep & goats'}</small></div>
        </div>
      </div>
      <div className="hero-bottom page-width"><span>{ar ? 'شريكك في تغذية القطيع وتوريد الأعلاف' : 'Your partner in herd nutrition and feed supply'}</span><button id="hero-schedule-consult-btn" onClick={onOpenConsultationModal}>{ar ? 'للمزارع والموزعين · تحدث معنا' : 'For farms & distributors · Let’s talk'}<Arrow size={16} /></button></div>
    </section>
  );
}
