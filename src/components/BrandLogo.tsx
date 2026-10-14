interface BrandLogoProps {
  className?: string;
  lightMode?: boolean;
  lang?: 'ar' | 'en';
}

export function BrandLogo({ className = '', lightMode = false, lang = 'ar' }: BrandLogoProps) {
  return (
    <div className={`brand-logo inline-flex items-center gap-3 select-none ${className}`}>
      <span className="brand-logo-image"><img src={`${import.meta.env.BASE_URL}assets/al-kawther-logo.png`} alt="" /></span>
      <span className="flex flex-col text-start">
        <span className={`text-lg sm:text-xl font-extrabold tracking-tight ${lightMode ? 'text-white' : 'text-[#302578]'}`}>{lang === 'ar' ? 'أعلاف الكوثر' : 'Al Kawther Feeds'}</span>
        <span className={`text-[9px] font-semibold tracking-wider mt-1 ${lightMode ? 'text-pink-100' : 'text-[#716897]'}`}>{lang === 'ar' ? 'AL KAWTHER FEEDS' : 'أعلاف الكوثر'}</span>
      </span>
    </div>
  );
}
