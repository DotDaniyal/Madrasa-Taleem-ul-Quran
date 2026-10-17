import React, { useState } from 'react';
import { Language, GalleryItem } from '../types';
import { BookOpen, Award, Building, Sparkles, GraduationCap, Library, X, Calendar, Search } from 'lucide-react';

interface GalleryProps {
  currentLang: Language;
  gallery: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ currentLang, gallery }) => {
  const isUrdu = currentLang === 'ur';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const t = {
    ur: {
      title: 'شعبہ جات اور تعلیمی جھلکیاں',
      subtitle: 'مدرسہ تعلیم القرآن فریال مسجد کے منظم شعبہ جات اور تعلیمی سہولیات',
      all: 'تمام شعبہ جات',
      curriculum: 'نصاب و تدریس',
      hifz: 'شعبہ حفظ',
      events: 'تقاریب و اسناد',
      facilities: 'سہولیات و عمارت',
      viewDetails: 'تفصیلات دیکھیں',
      close: 'بند کریں'
    },
    en: {
      title: 'Departments & Highlights',
      subtitle: 'Structured educational wings and learning facilities of Madrasa Taleem-ul-Quran Faryal Masjid',
      all: 'All Wings',
      curriculum: 'Curriculum & Study',
      hifz: 'Hifz Department',
      events: 'Events & Awards',
      facilities: 'Facilities & Campus',
      viewDetails: 'View Details',
      close: 'Close'
    }
  }[currentLang];

  const categories = [
    { id: 'all', label: t.all },
    { id: 'hifz', label: t.hifz },
    { id: 'curriculum', label: t.curriculum },
    { id: 'facilities', label: t.facilities },
    { id: 'events', label: t.events },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return BookOpen;
      case 'Award': return Award;
      case 'Building': return Building;
      case 'Sparkles': return Sparkles;
      case 'GraduationCap': return GraduationCap;
      case 'Library': return Library;
      default: return BookOpen;
    }
  };

  const filteredGallery = selectedCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-emerald-100 text-emerald-800 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm font-urdu">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>{isUrdu ? 'شعبہ جات' : 'Departments'}</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-urdu">
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
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 font-urdu ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-lg shadow-emerald-800/25 ring-2 ring-emerald-500/40'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Showcase Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item, idx) => {
          const Icon = getIcon(item.iconName);
          return (
            <ScrollReveal key={item.id} variant="fadeUp" delay={idx * 0.05}>
              <div
                onClick={() => setActiveItem(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover-lift transition-all flex flex-col justify-between h-full"
              >
                <div className="p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-emerald-700" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100" dir="ltr">
                      {item.date}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors font-urdu">
                      {isUrdu ? item.titleUr : item.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-urdu">
                      {isUrdu ? item.descUr : item.descEn}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 font-urdu">
                    {isUrdu ? 'مدرسہ تعلیم القرآن فریال مسجد' : 'Madrasa Taleem-ul-Quran'}
                  </span>
                  <span className="text-xs text-amber-700 font-semibold font-urdu group-hover:underline">
                    {t.viewDetails}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-100 p-8 space-y-6">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex items-center justify-center shadow-md">
                {React.createElement(getIcon(activeItem.iconName), { className: 'w-8 h-8 text-amber-300' })}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full font-urdu">
                  {activeItem.category.toUpperCase()}
                </span>
                <p className="text-xs text-slate-400 font-mono mt-1" dir="ltr">{activeItem.date}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900 font-urdu">
                {isUrdu ? activeItem.titleUr : activeItem.titleEn}
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-urdu">
                {isUrdu ? activeItem.descUr : activeItem.descEn}
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-urdu">
              {isUrdu 
                ? 'مدرسہ تعلیم القرآن فریال مسجد میں جدید اور معیاری تعلیمی سہولیات کی فراہمی کو اولیت دی جاتی ہے۔' 
                : 'Madrasa Taleem-ul-Quran Faryal Masjid prioritizes high educational standards in a secure environment.'}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer font-urdu"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
