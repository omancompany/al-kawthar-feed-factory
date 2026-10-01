import React from 'react';

interface FeedBagVisualProps {
  className?: string;
  showTechnicalSpecs?: boolean;
}

export const FeedBagVisual: React.FC<FeedBagVisualProps> = ({
  className = '',
  showTechnicalSpecs = true,
}) => {
  return (
    <div id="feed-bag-visual-container" className={`relative flex flex-col items-center select-none ${className}`}>
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden border-2 border-slate-300/80 bg-[#E64375] transition-transform duration-300 hover:scale-[1.01]">
        {/* Weave texture overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.12) 2px, rgba(255,255,255,0.12) 4px)',
          }}
        />

        {/* Side Stripes (Red & Green) */}
        <div className="absolute top-0 bottom-0 end-4 sm:end-5 flex gap-1.5 z-10">
          <div className="w-3 sm:w-3.5 h-full bg-[#E11D48] shadow-sm" />
          <div className="w-3 sm:w-3.5 h-full bg-[#16A34A] shadow-sm" />
        </div>

        {/* Sack Content */}
        <div className="relative z-20 h-full flex flex-col justify-between p-4 sm:p-5 pe-12 sm:pe-14 text-center font-arabic">
          {/* Header & Logo */}
          <div className="pt-2 flex flex-col items-center">
            <div className="text-[#1E255E] text-2xl sm:text-3xl font-black tracking-wider mb-1 font-arabic">
              أعــــلاف
            </div>
            <div className="w-28 sm:w-32 h-24 sm:h-28 relative flex flex-col items-center justify-center">
              <svg viewBox="0 0 160 140" className="w-full h-full text-[#1E255E]" fill="currentColor">
                <path
                  d="M 20 100 A 60 60 0 0 1 140 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                />
                <path
                  d="M 80 40 Q 80 25 80 20 M 80 30 Q 65 25 55 30 M 80 30 Q 95 25 105 30 M 80 38 Q 60 40 50 48 M 80 38 Q 100 40 110 48"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <ellipse cx="50" cy="28" rx="6" ry="3" transform="rotate(-20 50 28)" />
                <ellipse cx="110" cy="28" rx="6" ry="3" transform="rotate(20 110 28)" />
                <ellipse cx="45" cy="48" rx="6" ry="3" transform="rotate(-15 45 48)" />
                <ellipse cx="115" cy="48" rx="6" ry="3" transform="rotate(15 115 48)" />
                <ellipse cx="80" cy="18" rx="4" ry="7" />
                <path d="M 38 88 L 38 78 Q 42 74 48 74 L 54 75 Q 58 73 60 77 L 60 88 L 57 88 L 57 82 L 44 82 L 44 88 Z" />
                <path d="M 64 88 L 64 80 Q 68 76 74 76 L 78 77 Q 82 76 84 80 L 84 88 L 81 88 L 81 83 L 68 83 L 68 88 Z" />
                <path d="M 88 88 L 88 78 Q 92 76 96 76 L 100 77 L 102 79 L 102 88 L 99 88 L 99 82 L 91 82 L 91 88 Z" />
                <path d="M 106 88 L 106 75 Q 110 68 116 70 Q 120 72 122 75 L 126 80 L 126 88 L 122 88 L 122 81 L 110 81 L 110 88 Z" />
                <line x1="25" y1="89" x2="135" y2="89" stroke="currentColor" strokeWidth="4" />
                <path
                  d="M 28 89 L 32 94 M 40 89 L 44 94 M 52 89 L 56 94 M 64 89 L 68 94 M 76 89 L 80 94 M 88 89 L 92 94 M 100 89 L 104 94 M 112 89 L 116 94 M 124 89 L 128 94"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M 15 102 L 145 102 L 138 122 L 22 122 Z" fill="currentColor" />
                <text
                  x="80"
                  y="118"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="18"
                  fontWeight="900"
                  fontFamily="Cairo, sans-serif"
                >
                  الــكــوثــر
                </text>
                <rect x="26" y="125" width="108" height="14" rx="2" fill="currentColor" />
                <text
                  x="80"
                  y="136"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="8.5"
                  fontWeight="800"
                  letterSpacing="1"
                  fontFamily="sans-serif"
                >
                  AL KAWTHER FEEDS
                </text>
              </svg>
            </div>
          </div>

          {/* Animals silhouettes */}
          <div className="py-2 px-2 flex items-center justify-around text-[#059669]">
            {/* Cow */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 48 36" className="w-11 sm:w-14 h-8 sm:h-10 fill-current">
                <path d="M 6 28 L 6 16 Q 10 12 18 12 L 32 13 Q 38 10 42 14 L 42 18 L 38 20 L 38 28 L 34 28 L 34 22 L 12 22 L 12 28 Z" />
                <circle cx="22" cy="17" r="3" fill="#F4A0B5" />
                <circle cx="30" cy="18" r="2.5" fill="#F4A0B5" />
              </svg>
            </div>
            {/* Camel */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 40 32" className="w-9 sm:w-11 h-7 sm:h-9 fill-current">
                <path d="M 5 26 L 5 16 Q 9 11 18 11 L 28 12 Q 33 11 35 15 L 35 20 L 32 21 L 32 26 L 28 26 L 28 20 L 10 20 L 10 26 Z" />
              </svg>
            </div>
            {/* Sheep */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 36 32" className="w-8 sm:w-10 h-7 sm:h-9 fill-current">
                <path d="M 4 26 L 4 14 Q 8 10 16 11 L 24 12 L 28 10 L 29 16 L 26 26 L 22 26 L 22 19 L 9 19 L 9 26 Z" />
              </svg>
            </div>
            {/* Goat */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 44 40" className="w-10 sm:w-13 h-9 sm:h-11 fill-current">
                <path d="M 6 34 L 6 20 Q 8 16 12 18 Q 16 12 22 14 Q 26 12 30 18 L 36 12 L 39 15 L 35 24 L 35 34 L 30 34 L 30 25 L 14 25 L 14 34 Z" />
              </svg>
            </div>
          </div>

          {/* Product Title */}
          <div className="py-1">
            <h4 className="text-[#1E255E] text-xl sm:text-2xl font-black tracking-tight leading-tight">
              علف متعدد الإستعمالات
            </h4>
            <div className="text-[#1E255E] text-sm sm:text-base font-extrabold tracking-wide mt-0.5">
              General Ruminant
            </div>
          </div>

          {/* Producer details */}
          <div className="text-[#1E255E] text-[11px] sm:text-xs font-bold leading-tight space-y-0.5 border-t border-b border-[#1E255E]/20 py-1.5">
            <div className="flex justify-between items-center px-1">
              <span className="font-semibold text-[10px] text-[#1E255E]/80">Produced by :</span>
              <span className="font-bold">: إنتاج</span>
            </div>
            <div className="text-xs sm:text-sm font-black">مصنع بحار الجوبة</div>
            <div className="text-[10px] sm:text-[11px] tracking-wider font-extrabold">BAHAR AL-JOUBA FACTORY</div>
            <div className="text-[9px] sm:text-[10px] opacity-90">SINAW, NORTH AL SHARQIA, SULTANATE OF OMAN</div>
            <div className="text-[9px] sm:text-[10px] font-mono">Email: alkawthercattlefeed@gmail.com</div>
            <div className="text-[10px] sm:text-[11px] font-bold">
              CUSTOMER SERVICE : <span className="font-sans">ONLINE SUPPORT</span>
            </div>
          </div>

          {/* Production date table, Net weight, Shelf life */}
          <div className="text-[#1E255E] space-y-1">
            <div className="border border-[#1E255E] text-[7px] sm:text-[8px] font-bold overflow-hidden rounded">
              <div className="grid grid-cols-8 divide-x divide-y divide-[#1E255E] bg-[#1E255E]/5 text-center">
                <span className="col-span-2 py-0.5 font-black">PRO. DATE</span>
                <span className="py-0.5">JAN</span>
                <span className="py-0.5">FEB</span>
                <span className="py-0.5">MAR</span>
                <span className="py-0.5">APR</span>
                <span className="py-0.5">MAY</span>
                <span className="py-0.5">JUN</span>
                <span className="py-0.5">JUL</span>
                <span className="py-0.5">AUG</span>
                <span className="py-0.5">SEP</span>
                <span className="py-0.5">OCT</span>
                <span className="py-0.5">NOV</span>
                <span className="py-0.5">DEC</span>
                <span className="py-0.5 font-bold">2024</span>
                <span className="py-0.5 font-bold">2025</span>
              </div>
            </div>

            <div className="text-[10px] sm:text-[11px] font-bold text-[#1E255E]">
              صالح لمدة ٦ أشهر من تاريخ الإنتاج
            </div>

            {/* Net Weight */}
            <div className="flex items-center justify-between px-2 text-[10px] sm:text-xs font-black text-[#1E255E]">
              <div className="text-start leading-tight">
                <div>NET WEIGHT</div>
                <div className="text-sm sm:text-base font-black">50 KG</div>
                <div className="text-[8px] sm:text-[9px] font-normal">AT PACKING</div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#16A34A]/20 flex items-center justify-center text-[#16A34A] text-xs font-bold">
                ✓
              </div>
              <div className="text-end leading-tight">
                <div>الوزن الصافي</div>
                <div className="text-sm sm:text-base font-black">٥٠ كيلو جرام</div>
                <div className="text-[8px] sm:text-[9px] font-normal">عند التعبئة</div>
              </div>
            </div>

            {/* Storage note */}
            <div className="text-[8px] sm:text-[9px] font-bold text-[#1E255E] pt-0.5 leading-tight">
              <div>يحفظ في مكان جاف بارد بعيداً عن أشعة الشمس</div>
              <div className="uppercase tracking-tight text-[7px] sm:text-[8px]">
                STORE IN A COOL, DRY PLACE AWAY FROM SUNLIGHT
              </div>
            </div>
          </div>
        </div>

        {/* Technical dimension bar */}
        {showTechnicalSpecs && (
          <div className="absolute bottom-0 inset-x-0 bg-slate-900 text-white text-[8px] sm:text-[9px] py-1 px-3 flex items-center justify-between z-30 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#1E255E] inline-block border border-white/40" />
              <span className="w-2.5 h-2.5 bg-[#16A34A] inline-block border border-white/40" />
              <span className="w-2.5 h-2.5 bg-[#E11D48] inline-block border border-white/40" />
            </div>
            <span>Bag: 60x110 cm | Print: 40x75 cm</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>تصميم العبوة الأصلية المعتمدة (50 كجم)</span>
      </div>
    </div>
  );
};
