import React, { useState } from 'react';
import { CalligraphyFont, Language, GalleryItem } from '../types';
import { Image as ImageIcon, X, Calendar, Search, Sparkles } from 'lucide-react';
import { CALLIGRAPHY_FONTS } from '../components/CalligraphyFontPicker';

interface GalleryProps {
  currentLang: Language;
  gallery: GalleryItem[];
  currentFont: CalligraphyFont;
}

export const Gallery: React.FC<GalleryProps> = ({ currentLang, gallery, currentFont }) => {
  const isUrdu = currentLang === 'ur';
  const selectedFontObj = CALLIGRAPHY_FONTS.find(f => f.id === currentFont) || CALLIGRAPHY_FONTS[0];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const t = {
    ur: {
      title: 'تصویر گیلری اور جھلکیاں',
      subtitle: 'مدرسہ تعلیم القرآن فریال مسجد کے مختلف لمحات اور تعلیمی سرگرمیاں',
      all: 'تمام',
      mosque: 'مسجد',
      classes: 'کلاسیز',
      hifz: 'شعبہ حفظ',
      events: 'تقاریب',
      facilities: 'سہولیات',
    },
    en: {
      title: 'Photo Gallery & Glimpses',
      subtitle: 'Moments and educational activities from Madrasa Taleem-ul-Quran Faryal Masjid',
      all: 'All',
      mosque: 'Mosque',
      classes: 'Classes',
      hifz: 'Hifz Dept',
      events: 'Events',
      facilities: 'Facilities',
    }
  }[currentLang];

  const categories = [
    { id: 'all', label: t.all },
    { id: 'mosque', label: t.mosque },
    { id: 'hifz', label: t.hifz },
    { id: 'classes', label: t.classes },
    { id: 'events', label: t.events },
    { id: 'facilities', label: t.facilities },
  ];

  const filteredGallery = selectedCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-emerald-100 text-emerald-800 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'تصاویر' : 'Gallery'}</span>
        </span>
        <h1 className={`text-3xl sm:text-5xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
          {t.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-urdu">
          {t.subtitle}
        </p>
      </div>

      {/* Category Filters with Hover Animation */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-lg shadow-emerald-800/25 ring-2 ring-emerald-500/40'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className={selectedFontObj.fontClass}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Gallery Grid with Hover Zoom & Lift */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover-lift transition-all"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src={item.imageUrl}
                alt={item.titleUr}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className={`text-white text-base font-bold drop-shadow-md ${selectedFontObj.fontClass}`}>
                  {isUrdu ? item.titleUr : item.titleEn}
                </p>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center bg-white">
              <p className={`text-xs font-semibold text-slate-800 line-clamp-1 ${selectedFontObj.fontClass}`}>
                {isUrdu ? item.titleUr : item.titleEn}
              </p>
              <span className="text-[10px] text-slate-400 font-mono" dir="ltr">{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.titleUr}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className={`text-xl font-bold ${selectedFontObj.fontClass}`}>
                  {isUrdu ? activeImage.titleUr : activeImage.titleEn}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono" dir="ltr">{activeImage.date}</p>
              </div>
              <span className="bg-amber-400 text-emerald-950 text-xs px-3.5 py-1 rounded-full font-bold">
                {activeImage.category.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
