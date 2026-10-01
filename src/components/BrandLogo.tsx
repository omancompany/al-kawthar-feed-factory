import React from 'react';

interface BrandLogoProps {
  className?: string;
  lightMode?: boolean;
  lang?: 'ar' | 'en';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  lightMode = false,
}) => (
  <div id="brand-logo-container" className={`inline-flex items-center gap-3 select-none ${className}`}>
    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center p-1 transition-transform group-hover:scale-105">
      <svg viewBox="0 0 160 140" className="w-full h-full" fill="currentColor">
        <path
          d="M 20 100 A 60 60 0 0 1 140 100"
          fill="none"
          stroke={lightMode ? '#FFFFFF' : '#7B3B82'}
          strokeWidth="8"
        />
        <path
          d="M 80 40 Q 80 25 80 20 M 80 30 Q 65 25 55 30 M 80 30 Q 95 25 105 30 M 80 38 Q 60 40 50 48 M 80 38 Q 100 40 110 48"
          stroke={lightMode ? '#fda4af' : '#D9487C'}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 38 88 L 38 78 Q 42 74 48 74 L 54 75 Q 58 73 60 77 L 60 88 L 57 88 L 57 82 L 44 82 L 44 88 Z"
          fill={lightMode ? '#FFFFFF' : '#7B3B82'}
        />
        <path
          d="M 64 88 L 64 80 Q 68 76 74 76 L 78 77 Q 82 76 84 80 L 84 88 L 81 88 L 81 83 L 68 83 L 68 88 Z"
          fill={lightMode ? '#FFFFFF' : '#7B3B82'}
        />
        <path
          d="M 88 88 L 88 78 Q 92 76 96 76 L 100 77 L 102 79 L 102 88 L 99 88 L 99 82 L 91 82 L 91 88 Z"
          fill={lightMode ? '#FFFFFF' : '#7B3B82'}
        />
        <path
          d="M 106 88 L 106 75 Q 110 68 116 70 Q 120 72 122 75 L 126 80 L 126 88 L 122 88 L 122 81 L 110 81 L 110 88 Z"
          fill={lightMode ? '#FFFFFF' : '#7B3B82'}
        />
        <line
          x1="25"
          y1="89"
          x2="135"
          y2="89"
          stroke={lightMode ? '#FFFFFF' : '#7B3B82'}
          strokeWidth="4"
        />
        <path
          d="M 15 102 L 145 102 L 138 122 L 22 122 Z"
          fill={lightMode ? '#e11d48' : '#D9487C'}
        />
        <text
          x="80"
          y="117"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="17"
          fontWeight="800"
          fontFamily="Cairo, sans-serif"
        >
          الــكــوثــر
        </text>
        <rect x="26" y="125" width="108" height="14" rx="2" fill="#7B3B82" />
        <text
          x="80"
          y="136"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="1"
          fontFamily="sans-serif"
        >
          AL KAWTHER FEEDS
        </text>
      </svg>
      <div className="absolute -bottom-1 -end-1 flex items-center gap-0.5">
        <span className="w-2 h-2 rounded-full bg-[#D9487C] ring-1 ring-white" />
        <span className="w-2 h-2 rounded-full bg-[#8E4A96] ring-1 ring-white" />
      </div>
    </div>
    <div className="flex flex-col text-start">
      <div className="flex items-center gap-1.5">
        <span
          className={`text-lg sm:text-xl font-extrabold font-arabic tracking-tight transition-colors ${
            lightMode ? 'text-white' : 'text-[#3B1C48]'
          }`}
        >
          أعلاف الكوثر
        </span>
      </div>
      <span
        className={`text-[10px] font-bold uppercase tracking-wider leading-tight transition-colors ${
          lightMode ? 'text-slate-300' : 'text-[#8E4A96]'
        }`}
      >
        AL KAWTHER FEEDS
      </span>
      <span
        className={`text-[9px] font-medium leading-none mt-0.5 transition-colors ${
          lightMode ? 'text-slate-400' : 'text-[#8C7698]'
        }`}
      >
        بحار الجوبة للتجارة • سناو
      </span>
    </div>
  </div>
);
