import { Factory, CircleCheck, Wheat, Handshake } from 'lucide-react';
import { translations } from '../data/translations';
const icons = [Factory, CircleCheck, Wheat, Handshake];
export function TrustIndicators({ lang }: { lang: 'ar' | 'en' }) {
  return <section id="trust-indicators" className="trust-section"><div className="page-width trust-grid">{translations[lang].trust.cards.map((card, index) => {
    const Icon = icons[index] ?? Factory;
    return <article key={card.id} id={`trust-card-${card.id}`} className="trust-item"><div className="trust-icon"><Icon size={25} strokeWidth={1.5} /></div><div><h2>{card.title}</h2><p>{card.description}</p></div></article>;
  })}</div></section>;
}
