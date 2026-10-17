import React from 'react';
import { Language, Announcement } from '../types';
import { Bell, Calendar, Sparkles, AlertCircle } from 'lucide-react';

interface AnnouncementsProps {
  currentLang: Language;
  announcements: Announcement[];
}

export const Announcements: React.FC<AnnouncementsProps> = ({ currentLang, announcements }) => {
  const isUrdu = currentLang === 'ur';

  const t = {
    ur: {
      title: 'اعلانات اور نوٹس بورڈ',
      subtitle: 'مدرسہ تعلیم القرآن فریال مسجد کے اہم اعلانات، امتحانات اور تعطیلات کے نوٹس',
      importantNotice: 'اہم ترین اعلان',
      publishedOn: 'تاریخِ اشاعت:',
    },
    en: {
      title: 'Announcements & Notice Board',
      subtitle: 'Important announcements, examination schedules, and notices from Madrasa Taleem-ul-Quran Faryal Masjid',
      importantNotice: 'Important Notice',
      publishedOn: 'Published:',
    }
  }[currentLang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-amber-100 text-amber-900 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm font-urdu">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'نوٹس بورڈ' : 'Notice Board'}</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-urdu">
          {t.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-urdu">
          {t.subtitle}
        </p>
      </div>

      {/* Announcements List with Hover Lift */}
      <div className="max-w-4xl mx-auto space-y-6">
        {announcements.map((ann) => (
          <div 
            key={ann.id} 
            className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border transition-all space-y-4 hover-lift ${
              ann.isImportant ? 'border-amber-400 bg-gradient-to-br from-amber-50/30 to-white ring-1 ring-amber-300' : 'border-slate-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3.5 py-1 rounded-full font-bold shadow-sm font-urdu ${
                  ann.isImportant ? 'bg-amber-500 text-emerald-950 font-bold' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isUrdu ? ann.categoryUr : ann.categoryEn}
                </span>
                {ann.isImportant && (
                  <span className="flex items-center gap-1 text-xs text-amber-900 font-bold bg-amber-200/70 px-3 py-1 rounded-full">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700 animate-bounce-subtle" />
                    <span className="font-urdu">{t.importantNotice}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span dir="ltr" className="font-mono">{ann.date}</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 font-urdu">
              {isUrdu ? ann.titleUr : ann.titleEn}
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-urdu">
              {isUrdu ? ann.contentUr : ann.contentEn}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
