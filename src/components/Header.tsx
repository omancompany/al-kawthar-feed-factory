import { useEffect, useState } from 'react';
import { Globe, Menu, X, ArrowUpRight, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { translations } from '../data/translations';

interface HeaderProps {
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
  onOpenContactModal?: () => void;
}

export function Header({ lang, onToggleLang, activeSection, onNavigate, onOpenContactModal }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const t = translations[lang];
  const links = ['home', 'about', 'products', 'quality', 'b2b', 'contact'] as const;
  const navigate = (id: string) => { onNavigate(id); setOpen(false); };
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header id="main-header" className="site-header">
      <div className="utility-bar"><div className="page-width"><span><MapPin size={13} />{lang === 'ar' ? 'صناعة عمانية · سناو، شمال الشرقية' : 'Made in Oman · Sinaw, North Al Sharqiyah'}</span><a href="mailto:alkawthercattlefeed@gmail.com">alkawthercattlefeed@gmail.com</a></div></div>
      <div className="navigation-bar page-width">
        <button id="nav-logo-btn" aria-label={lang === 'ar' ? 'أعلاف الكوثر، الرئيسية' : 'Al Kawther Feeds, home'} onClick={() => navigate('home')}><BrandLogo lang={lang} /></button>
        <nav id="desktop-nav" aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>{links.map(id => <button key={id} id={`nav-link-${id}`} aria-current={activeSection === id ? 'location' : undefined} className={activeSection === id ? 'is-active' : ''} onClick={() => navigate(id)}>{t.nav[id]}</button>)}</nav>
        <div className="nav-actions">
          <button id="language-switcher-btn" className="language-button" onClick={() => { onToggleLang(); setOpen(false); }} aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}><Globe size={17} /><span>{t.nav.switchLang}</span></button>
          <button id="header-contact-cta" className="brand-button nav-cta" onClick={() => { setOpen(false); if (onOpenContactModal) onOpenContactModal(); else navigate('contact'); }}>{t.nav.cta}<ArrowUpRight size={16} /></button>
          <button id="mobile-menu-toggle-btn" className="menu-button" aria-expanded={open} aria-controls="mobile-drawer" aria-label={lang === 'ar' ? 'قائمة التنقل' : 'Navigation menu'} onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav id="mobile-drawer" className="mobile-navigation" aria-label={lang === 'ar' ? 'التنقل على الجوال' : 'Mobile navigation'}>{links.map(id => <button key={id} aria-current={activeSection === id ? 'location' : undefined} onClick={() => navigate(id)}>{t.nav[id]}<span>{activeSection === id ? '•' : ''}</span></button>)}</nav>}
    </header>
  );
}
