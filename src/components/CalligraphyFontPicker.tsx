import React, { useState } from 'react';
import { CalligraphyFont, Language } from '../types';
import { Sparkles, Palette, Type, Check, X, Wand2, Sliders } from 'lucide-react';

interface CalligraphyFontPickerProps {
  currentFont: CalligraphyFont;
  setFont: (font: CalligraphyFont) => void;
  currentLang: Language;
}

export const CALLIGRAPHY_FONTS: {
  id: CalligraphyFont;
  nameUr: string;
  nameEn: string;
  fontClass: string;
  sampleText: string;
  descUr: string;
}[] = [
  {
    id: 'nastaliq',
    nameUr: 'خطِ نستعلیق (اردو شاہکار)',
    nameEn: 'Nastaliq (Classical Urdu)',
    fontClass: 'font-nastaliq',
    sampleText: 'مدرسہ تعلیم القرآن فریال مسجد',
    descUr: 'برصغیر پاک و ہند کا محبوب ترین اور خوبصورت روایتی خط'
  },
  {
    id: 'gulzar',
    nameUr: 'خطِ گلزار (فنکارانہ نستعلیق)',
    nameEn: 'Gulzar (Artistic Nastaliq)',
    fontClass: 'font-gulzar',
    sampleText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    descUr: 'مخصوص خطاطی گلفام انداز برائے عنوانات و کتبات'
  },
  {
    id: 'ruqaa',
    nameUr: 'خطِ رقعہ (شاہکار عربی خطاطی)',
    nameEn: 'Ruqaa (Classical Ottoman Script)',
    fontClass: 'font-ruqaa',
    sampleText: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    descUr: 'تیز رفتار اور وقار سے بھرپور کلاسیکی خطاطی'
  },
  {
    id: 'naskh',
    nameUr: 'خطِ نسخ (قرآنی رسم الخط)',
    nameEn: 'Naskh (Quranic Classical)',
    fontClass: 'font-naskh',
    sampleText: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    descUr: 'مصحفِ عثمانی اور کتبِ احادیث کا مقدس رسم الخط'
  },
  {
    id: 'kufi',
    nameUr: 'خطِ کوفی (قدیم اسلامی خطاطی)',
    nameEn: 'Kufic (Historic Geometric)',
    fontClass: 'font-kufi',
    sampleText: 'لا إله إلا الله محمد رسول الله',
    descUr: 'ابتدائی اسلامی دور کا تاریخی اور ہندسی خط'
  },
  {
    id: 'lateef',
    nameUr: 'خطِ لطیف (نرم و رواں خطاطی)',
    nameEn: 'Lateef (Fluid Sindhi/Urdu)',
    fontClass: 'font-lateef',
    sampleText: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
    descUr: 'نرم، متوازن اور انتہائی صاف پڑھا جانے والا خط'
  },
  {
    id: 'scheherazade',
    nameUr: 'خطِ شہرزاد (روایتی عربی رسم الخط)',
    nameEn: 'Scheherazade (Manuscript)',
    fontClass: 'font-scheherazade',
    sampleText: 'اللَّهُمَّ بَارِكْ لَنَا فِي أَوْقَاتِنَا',
    descUr: 'قدیم مخطوطات اور علمی کتب کا باوقار انداز'
  },
  {
    id: 'qahiri',
    nameUr: 'خطِ قاہری (آرائشی کوفی خط)',
    nameEn: 'Qahiri (Ornamental Kufic)',
    fontClass: 'font-qahiri',
    sampleText: 'مدرسہ تعلیم القرآن فریال مسجد',
    descUr: 'مساجد کے محرابوں اور گنبدوں کی یاد دلانے والا خط'
  },
  {
    id: 'marhey',
    nameUr: 'خطِ مرح (جدید رواں خطاطی)',
    nameEn: 'Marhey (Modern Dynamic)',
    fontClass: 'font-marhey',
    sampleText: 'مدرسہ تعلیم القرآن الکریم',
    descUr: 'جدید اور پرکشش خطاطی کا منفرد انداز'
  }
];

export const CalligraphyFontPicker: React.FC<CalligraphyFontPickerProps> = ({
  currentFont,
  setFont,
  currentLang
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isUrdu = currentLang === 'ur';

  const selectedFontObj = CALLIGRAPHY_FONTS.find(f => f.id === currentFont) || CALLIGRAPHY_FONTS[0];

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-emerald-900/50 hover:scale-105 transition-all cursor-pointer border border-emerald-400/40 animate-pulse-glow"
          title="خطاطی کے فونٹس اور اسٹائل تبدیل کریں"
        >
          <div className="w-7 h-7 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold text-xs animate-spin-slow">
            ✒️
          </div>
          <div className="text-right">
            <span className="block text-xs font-bold font-nastaliq leading-tight">
              {isUrdu ? 'خطاطی فونٹس (۹ اقسام)' : 'Calligraphy (9 Fonts)'}
            </span>
            <span className="block text-[10px] text-emerald-200">
              {isUrdu ? selectedFontObj.nameUr.split(' ')[0] : selectedFontObj.nameEn.split(' ')[0]}
            </span>
          </div>
          <Sparkles className="w-4 h-4 text-amber-300 animate-bounce-subtle" />
        </button>
      </div>

      {/* Font Picker Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden max-h-[85vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-6 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-islamic-pattern"></div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shadow-md">
                  <Type className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-nastaliq">
                    {isUrdu ? 'اسلامی خطاطی کے تمام یونیکوڈ فونٹس' : 'All Unicode Calligraphy & Islamic Fonts'}
                  </h3>
                  <p className="text-xs text-emerald-200">
                    {isUrdu ? 'اپنی پسندیدہ خطاطی کا انتخاب کریں — پوری ویب سائٹ پر فوراً لاگو ہوگی' : 'Select a calligraphy script to apply across the entire website'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Font List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CALLIGRAPHY_FONTS.map((font) => {
                  const isSelected = currentFont === font.id;
                  return (
                    <button
                      key={font.id}
                      onClick={() => {
                        setFont(font.id);
                      }}
                      className={`text-right p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-50/90 border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                          : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full mb-2">
                        <span className="text-xs font-bold text-slate-800">
                          {isUrdu ? font.nameUr : font.nameEn}
                        </span>
                        {isSelected && (
                          <span className="bg-emerald-600 text-white rounded-full p-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {/* Sample Calligraphy Rendering */}
                      <div className="py-2 px-3 bg-slate-100/60 rounded-xl text-center w-full my-1 border border-slate-100">
                        <span className={`text-xl sm:text-2xl text-emerald-950 font-bold ${font.fontClass} block`}>
                          {font.sampleText}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {font.descUr}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-urdu">
                {isUrdu ? 'موجودہ منتخب خطاطی:' : 'Active Script:'} <strong>{selectedFontObj.nameUr}</strong>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl font-bold cursor-pointer transition-colors"
              >
                {isUrdu ? 'محفوظ کریں اور بند کریں' : 'Apply & Close'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
