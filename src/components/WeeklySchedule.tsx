import React from 'react';
import { Language, ScheduleDay } from '../types';
import { WEEKLY_SCHEDULE } from '../data/initialData';
import { Calendar, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { SpecialHoliday } from '../data/cmsInitialData';

interface WeeklyScheduleProps {
  currentLang: Language;
  schedule?: ScheduleDay[];
  specialHolidays?: SpecialHoliday[];
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ currentLang, schedule, specialHolidays }) => {
  const isUrdu = currentLang === 'ur';
  const days = schedule && schedule.length > 0 ? schedule : WEEKLY_SCHEDULE;

  const t = {
    ur: {
      tag: 'ہفتہ وار نظام الاوقات',
      title: 'مدرسے کے تعلیمی ایام اور اوقاتِ کار',
      subtitle: 'مدرسہ تعلیم القرآن فریال مسجد میں ہفتہ تا جمعرات باقاعدگی سے کلاسز جاری رہتی ہیں۔',
      fridayBannerTitle: 'جمعہ مبارک — ہفتہ وار تعطیل',
      fridayBannerDesc: 'جمعہ مبارک — جمعہ کے دن مدرسے میں ہفتہ وار چھٹی ہوتی ہے اور نمازِ جمعہ کا باجماعت اہتمام کیا جاتا ہے۔',
      satToThu: 'ہفتہ تا جمعرات: تمام تعلیمی شعبہ جات کھلے ہیں',
      classActive: 'تعلیم جاری',
      holiday: 'ہفتہ وار چھٹی',
      dayHeader: 'دن',
      statusHeader: 'حیثیت',
      timingsHeader: 'تفصیل',
      noteTitle: 'ضروری نوٹ برائے والدین:',
      noteDesc: 'تمام طلباء کو وقت کی پابندی کی سختی سے ہدایت کی جاتی ہے۔ غیر حاضری کی صورت میں پیشگی اطلاع دینا ضروری ہے۔'
    },
    en: {
      tag: 'Weekly Academic Schedule',
      title: 'Class Days & Operating Schedule',
      subtitle: 'Madrasa Taleem-ul-Quran Faryal Masjid operates regular classes from Saturday through Thursday.',
      fridayBannerTitle: 'Weekly Holiday: Friday (Jummah)',
      fridayBannerDesc: 'Weekly Holiday: Friday (Jummah Mubarak) — The madrasa observes its weekly holiday on Friday with congregational Jummah prayers.',
      satToThu: 'Saturday through Thursday: All academic departments active',
      classActive: 'Classes Active',
      holiday: 'Weekly Holiday',
      dayHeader: 'Day',
      statusHeader: 'Status',
      timingsHeader: 'Details',
      noteTitle: 'Important Note for Parents:',
      noteDesc: 'Students must strictly follow punctuality. In case of leave or absence, prior notification to madrasa administration is mandatory.'
    }
  }[currentLang];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
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

        {/* Prominent Friday Holiday Banner (Requirement #4) */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-6 sm:p-7 text-emerald-950 shadow-lg border-2 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-start">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-amber-300 flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold font-urdu">
                {t.fridayBannerTitle}
              </h3>
              <p className="text-xs sm:text-sm font-medium font-urdu leading-relaxed">
                {t.fridayBannerDesc}
              </p>
            </div>
          </div>
          <div className="bg-emerald-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 font-urdu shadow-sm">
            {isUrdu ? 'جمعہ: مکمل تعطیل' : 'Friday: Full Holiday'}
          </div>
        </div>

        {/* 7-Day Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3.5">
          {days.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl p-4 flex flex-col justify-between transition-all border ${
                item.isHoliday
                  ? 'bg-amber-50 border-amber-300 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white border-slate-200 hover:border-emerald-300 shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-base font-bold font-urdu ${item.isHoliday ? 'text-amber-950' : 'text-slate-900'}`}>
                    {isUrdu ? item.dayUr : item.dayEn}
                  </span>
                  {item.isHoliday ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  )}
                </div>

                <div className="pt-1">
                  <span
                    className={`inline-block text-[11px] px-2.5 py-1 rounded-lg font-bold font-urdu ${
                      item.isHoliday
                        ? 'bg-amber-200 text-amber-950'
                        : 'bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {isUrdu ? item.statusUr : item.statusEn}
                  </span>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 font-urdu leading-tight">
                {isUrdu ? item.timingsUr : item.timingsEn}
              </div>
            </div>
          ))}
        </div>

        {/* Special Holiday Notices */}
        {specialHolidays && specialHolidays.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800 font-urdu flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>{isUrdu ? 'خصوصی تعطیلات و اعلانات' : 'Special Closures & Holiday Dates'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialHolidays.map(hol => (
                <div key={hol.id} className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs font-urdu">
                    <div className="font-bold text-amber-950 text-sm">{isUrdu ? hol.titleUr : hol.titleEn}</div>
                    <div className="text-amber-800 font-semibold">{hol.date} {hol.endDate ? `تا ${hol.endDate}` : ''}</div>
                    <p className="text-slate-600">{isUrdu ? hol.descUr : hol.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Operational Note for Guardians */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-urdu">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong>{t.noteTitle}</strong> {t.noteDesc}
          </div>
        </div>

      </motion.div>
    </section>
  );
};
