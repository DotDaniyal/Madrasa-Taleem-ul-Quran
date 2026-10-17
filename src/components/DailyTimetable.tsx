import React from 'react';
import { Language } from '../types';
import { DAILY_TIMETABLE } from '../data/initialData';
import { Clock, Sun, Moon, BookOpen, Sparkles, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

import { DailyPeriod } from '../types';

interface DailyTimetableProps {
  currentLang: Language;
  timetable?: DailyPeriod[];
}

export const DailyTimetable: React.FC<DailyTimetableProps> = ({ currentLang, timetable }) => {
  const isUrdu = currentLang === 'ur';
  const periods = timetable && timetable.length > 0 ? timetable : DAILY_TIMETABLE;

  const t = {
    ur: {
      tag: 'تعلیمی و تربیتی اوقات',
      title: 'روزانہ کا نظام الاوقات',
      subtitle: 'مدرسہ تعلیم القرآن فریال مسجد میں روزانہ کے چار بنیادی تعلیمی اور تربیتی ادوار',
      teachingTag: 'باقاعدہ تدریسی نشست',
      activityTag: 'دہرائی و تربیتی نشست',
      accuracyNoteTitle: 'اوقات کے حوالے سے ضروری وضاحت:',
      accuracyNoteDesc: 'دوپہر کی نشست 2:30 بجے سے نمازِ عصر تک ہے، جبکہ بعد عصر اور بعد مغرب کے اوقات نماز کے اوقات کے تابع ہیں۔ موسموں کی تبدیلی کے ساتھ نمازوں کے اوقات میں فرق آتا ہے، اس لیے باقی ادوار کے لیے کوئی مصنوعی کلاک ٹائم مقرر نہیں کیا گیا بلکہ نماز کے اوقات ہی معیار ہیں۔',
      periodLabel: 'دورانیہ',
    },
    en: {
      tag: 'Academic & Mentoring Schedule',
      title: 'Daily Madrasa Timetable',
      subtitle: 'The four daily educational and mentoring periods observed at Madrasa Taleem-ul-Quran Faryal Masjid',
      teachingTag: 'Formal Teaching Session',
      activityTag: 'Review & Mentoring Session',
      accuracyNoteTitle: 'Important Clarification on Timings:',
      accuracyNoteDesc: 'The afternoon session runs from 2:30 PM until Asr Prayer. Periods 3 and 4 are strictly defined in relation to prayer times (Asr, Maghrib, and Isha), which naturally shift with seasonal changes. Exact clock times are therefore not fixed arbitrarily.',
      periodLabel: 'Period',
    }
  }[currentLang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return Sun;
      case 'Clock': return Clock;
      case 'BookOpen': return BookOpen;
      case 'Moon': return Moon;
      default: return Clock;
    }
  };

  return (
    <section id="daily-timetable" className="py-12 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="bg-emerald-100 text-emerald-900 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm font-urdu">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.tag}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-urdu">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-urdu">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Periods Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {periods.map((period, idx) => {
            const Icon = getIcon(period.iconName);
            return (
              <motion.div
                key={period.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`bg-white rounded-3xl p-6 sm:p-7 border flex flex-col justify-between shadow-sm hover-lift transition-all relative overflow-hidden group ${
                  period.isTeachingSession 
                    ? 'border-emerald-200 ring-1 ring-emerald-100 hover:border-emerald-400' 
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                {/* Top Corner Ribbon / Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm font-mono border border-emerald-100">
                      0{period.periodNum}
                    </span>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold font-urdu ${
                      period.isTeachingSession 
                        ? 'bg-emerald-100 text-emerald-900' 
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {isUrdu ? period.typeUr : period.typeEn}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-amber-300" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-urdu pt-1">
                      {isUrdu ? period.titleUr : period.titleEn}
                    </h3>
                  </div>

                  {/* Most Prominent Time Range Box */}
                  <div className="p-3.5 bg-gradient-to-br from-slate-50 to-emerald-50/50 rounded-2xl border border-emerald-200/60 space-y-1">
                    <p className="text-xs text-slate-500 font-urdu">{t.periodLabel} {period.periodNum}:</p>
                    <p className="text-lg sm:text-xl font-bold text-emerald-950 font-urdu tracking-tight leading-tight">
                      {isUrdu ? period.timeRangeUr : period.timeRangeEn}
                    </p>
                    <p className="text-[11px] text-slate-600 font-urdu pt-0.5">
                      {isUrdu ? period.subtitleUr : period.subtitleEn}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-urdu pt-1">
                    {isUrdu ? period.descUr : period.descEn}
                  </p>
                </div>

                {/* Session Type Footer Indicator */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-urdu">
                  <span className={`w-2 h-2 rounded-full ${period.isTeachingSession ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  <span>
                    {period.isTeachingSession 
                      ? (isUrdu ? 'کلاس روم اسباق و تدریس' : 'Classroom Lessons') 
                      : (isUrdu ? 'دہرائی و انفرادی نگرانی' : 'Consolidation & Mentorship')}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Accuracy and Prayer Timing Notice */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-5 sm:p-6 flex items-start gap-3.5 text-xs sm:text-sm text-slate-700 font-urdu shadow-sm">
          <AlertCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-emerald-950 text-sm block">{t.accuracyNoteTitle}</strong>
            <p className="leading-relaxed text-slate-700">{t.accuracyNoteDesc}</p>
          </div>
        </div>

      </motion.div>
    </section>
  );
};
