import React from 'react';
import { Language } from '../types';
import { 
  Award, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  HeartHandshake, 
  ShieldCheck, 
  Calendar,
  Medal,
  Flame,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';

interface PrayerSectionProps {
  currentLang: Language;
}

export const PrayerSection: React.FC<PrayerSectionProps> = ({ currentLang }) => {
  const isUrdu = currentLang === 'ur';

  const t = {
    ur: {
      prayerTag: 'روحانی و اخلاقی تربیت',
      prayerHeading: 'پانچوں نمازوں کی پابندی اور تکبیرِ اولیٰ',
      prayerHeadingEn: 'Five Daily Prayers & Takbeer-e-Ula',
      prayerDesc: 'مدرسہ تعلیم القرآن فریال مسجد میں طلبہ کو پانچوں نمازوں کی پابندی اور تکبیرِ اولیٰ کے ساتھ نماز ادا کرنے کی ترغیب دی جاتی ہے۔ اس تربیتی نظام کا مقصد طلبہ میں نماز کی اہمیت، وقت کی پابندی اور مستقل مزاجی کا جذبہ پیدا کرنا ہے۔',
      takbeerBadge: 'تکبیرِ اولیٰ کی خصوصی ترغیب',
      fajr: 'فجر',
      dhuhr: 'ظہر',
      asr: 'عصر',
      maghrib: 'مغرب',
      isha: 'عشاء',
      prayerNotice: 'طلبہ میں باجماعت نماز اور پہلی صف میں حاضری کی باقاعدہ تربیت دی جاتی ہے۔',
      
      // Competition Section
      compTag: 'ترغیبی سرگرمیاں و اعزازات',
      compHeading: 'نماز کے مقابلے اور طلبہ کی حوصلہ افزائی',
      compHeadingEn: 'Prayer Competitions & Student Motivation',
      compDesc: 'مدرسے میں وقتاً فوقتاً نماز کی پابندی اور تکبیرِ اولیٰ کے حوالے سے مقابلوں کا انعقاد کیا جاتا ہے۔ ان مقابلوں کا مقصد طلبہ میں پانچوں نمازوں کی پابندی، وقت کی اہمیت اور نماز کے ساتھ مستقل تعلق پیدا کرنا ہے۔ مقابلوں کے دوران طلبہ کی کارکردگی اور پابندی کی حوصلہ افزائی کی جاتی ہے۔',
      compIntervalNote: 'اہم وضاحت: یہ مقابلے وقتاً فوقتاً مختلف متغیر وقفوں (مثلاً تقریباً 40 دن، 2 ماہ، 3 ماہ، 4 ماہ یا 6 ماہ) پر منعقد ہوتے ہیں۔ یہ ممکنہ وقفے ہیں، کوئی حتمی یا بندھا ٹائم ٹیبل نہیں، اور حالات کے مطابق وقفہ تبدیل ہو سکتا ہے۔',
      pillar1Title: 'نماز کا باقاعدہ نظم',
      pillar1Desc: 'مسجد میں باجماعت نماز کی پابندی اور پہلی صف میں تکبیرِ اولیٰ کے ساتھ حاضری کی عادت پختہ کرنا۔',
      pillar2Title: 'مستقل مزاجی کی تربیت',
      pillar2Desc: 'روزمرہ معمولات میں نماز کو سب سے مقدم رکھنا اور وقت کی پابندی کا جذبہ پیدا کرنا۔',
      pillar3Title: 'طلبہ کی حوصلہ افزائی',
      pillar3Desc: 'مقابلوں کے ذریعے مثبت مسابقت اور اچھے اعمال میں سبقت لے جانے کی ترغیب۔',
      pillar4Title: 'اعتراف اور اعزاز',
      pillar4Desc: 'محنت اور مسلسل پابندی دکھانے والے طلبہ کی خدمات اور کاوشوں کا دلی اعتراف۔',
      
      // Annual Awards Section
      awardsHeading: 'سالانہ پروگرام میں انعامات',
      awardsHeadingEn: 'Awards at the Annual Program',
      awardsDesc: 'سالانہ امتحانات کے بعد منعقد ہونے والے سالانہ پروگرام میں نماز کی پابندی اور متعلقہ مقابلوں میں نمایاں کارکردگی دکھانے والے طلبہ کی حوصلہ افزائی کی جاتی ہے۔ کامیاب طلبہ کو ان کی کوشش، مستقل مزاجی اور نماز کی پابندی کے اعتراف میں انعامات دیے جاتے ہیں۔',
      annualProgramBadge: 'سالانہ دستار بندی و تقسیمِ انعامات'
    },
    en: {
      prayerTag: 'Spiritual & Moral Upbringing',
      prayerHeading: 'Five Daily Prayers & Takbeer-e-Ula',
      prayerHeadingEn: 'Five Daily Prayers & Takbeer-e-Ula',
      prayerDesc: 'At Madrasa Taleem-ul-Quran Faryal Masjid, students are encouraged to observe all five daily prayers and attend prayers with Takbeer-e-Ula. This initiative aims to develop consistency, punctuality, and a lasting commitment to Salah.',
      takbeerBadge: 'Special Emphasis on Takbeer-e-Ula',
      fajr: 'Fajr',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
      prayerNotice: 'Students are actively mentored in congregational prayer discipline and the sanctity of the first row.',
      
      // Competition Section
      compTag: 'Incentive & Motivation Initiatives',
      compHeading: 'Prayer Competitions & Student Motivation',
      compHeadingEn: 'Prayer Competitions & Student Motivation',
      compDesc: 'The madrasa periodically organizes competitions related to prayer discipline and Takbeer-e-Ula. These competitions encourage students to observe all five daily prayers consistently, value punctuality, and develop a lasting connection with Salah. Students are motivated through recognition and rewards according to the competition rules.',
      compIntervalNote: 'Important note: Competitions take place periodically at flexible intervals (such as approximately 40 days, 2 months, 3 months, 4 months, or 6 months). These indicate possible intervals rather than a fixed recurring schedule, adapting as educational conditions warrant.',
      pillar1Title: 'Prayer Discipline',
      pillar1Desc: 'Cultivating the habit of observing congregational Salah in the mosque with Takbeer-e-Ula.',
      pillar2Title: 'Consistency & Character',
      pillar2Desc: 'Prioritizing daily Salah and building enduring punctuality in daily life.',
      pillar3Title: 'Student Motivation',
      pillar3Desc: 'Inspiring positive emulation and enthusiasm for righteous deeds through supportive contests.',
      pillar4Title: 'Recognition & Honour',
      pillar4Desc: 'Honouring the dedication and perseverance of students who uphold consistent attendance.',
      
      // Annual Awards Section
      awardsHeading: 'Awards at the Annual Program',
      awardsHeadingEn: 'Awards at the Annual Program',
      awardsDesc: 'During the annual program held after the annual examinations, students who perform well in the prayer-related competitions may be recognized for their dedication and consistency. Awards and prizes are presented to encourage continued commitment to Salah.',
      annualProgramBadge: 'Annual Convocation & Prize Distribution'
    }
  }[currentLang];

  const prayers = [
    { id: 'fajr', nameUr: t.fajr, nameEn: 'Fajr', subtitleUr: 'نمازِ فجر مع تکبیرِ اولیٰ', subtitleEn: 'Dawn Congregational Prayer' },
    { id: 'dhuhr', nameUr: t.dhuhr, nameEn: 'Dhuhr', subtitleUr: 'نمازِ ظہر مع تکبیرِ اولیٰ', subtitleEn: 'Midday Congregational Prayer' },
    { id: 'asr', nameUr: t.asr, nameEn: 'Asr', subtitleUr: 'نمازِ عصر مع تکبیرِ اولیٰ', subtitleEn: 'Afternoon Congregational Prayer' },
    { id: 'maghrib', nameUr: t.maghrib, nameEn: 'Maghrib', subtitleUr: 'نمازِ مغرب مع تکبیرِ اولیٰ', subtitleEn: 'Sunset Congregational Prayer' },
    { id: 'isha', nameUr: t.isha, nameEn: 'Isha', subtitleUr: 'نمازِ عشاء مع تکبیرِ اولیٰ', subtitleEn: 'Night Congregational Prayer' },
  ];

  const intervals = [
    { labelUr: 'تقریباً 40 دن', labelEn: 'Approx. 40 Days' },
    { labelUr: '2 ماہ کا دورانیہ', labelEn: '2 Months Period' },
    { labelUr: '3 ماہ کا دورانیہ', labelEn: '3 Months Period' },
    { labelUr: '4 ماہ کا دورانیہ', labelEn: '4 Months Period' },
    { labelUr: '6 ماہ کا دورانیہ', labelEn: '6 Months Period' },
  ];

  const pillars = [
    { icon: ShieldCheck, title: t.pillar1Title, desc: t.pillar1Desc },
    { icon: Clock, title: t.pillar2Title, desc: t.pillar2Desc },
    { icon: Flame, title: t.pillar3Title, desc: t.pillar3Desc },
    { icon: Trophy, title: t.pillar4Title, desc: t.pillar4Desc },
  ];

  return (
    <div className="space-y-16 py-6">
      
      {/* 1. FIVE DAILY PRAYERS & TAKBEER-E-ULA SECTION */}
      <section className="relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
        >
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-emerald-100 text-emerald-900 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm font-urdu">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.prayerTag}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-urdu">
              {t.prayerHeading}
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-urdu">
              {t.prayerDesc}
            </p>
          </div>

          {/* 5 Prayers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {prayers.map((prayer, idx) => (
              <div 
                key={prayer.id}
                className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm hover-lift text-center space-y-3 relative overflow-hidden group hover:border-emerald-300 transition-all"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-urdu">
                    {isUrdu ? prayer.nameUr : prayer.nameEn}
                  </h3>
                  <p className="text-[11px] text-emerald-800 font-medium font-urdu mt-1">
                    {isUrdu ? prayer.subtitleUr : prayer.subtitleEn}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-500 font-urdu">
                    {isUrdu ? 'باجماعت اہتمام' : 'In Congregation'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Subtext Notice */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-center text-xs sm:text-sm text-emerald-950 font-urdu max-w-2xl mx-auto shadow-sm">
            <p>{t.prayerNotice}</p>
          </div>

        </motion.div>
      </section>

      {/* 2. PRAYER COMPETITIONS & STUDENT MOTIVATION SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-amber-400/40 shadow-2xl max-w-7xl mx-auto my-8">
        <div className="absolute inset-0 opacity-10 bg-islamic-pattern pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative z-10 space-y-10"
        >
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-amber-400 text-emerald-950 text-xs px-4 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-md font-urdu">
              <Trophy className="w-3.5 h-3.5 text-emerald-950" />
              <span>{t.compTag}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold text-white font-urdu">
              {t.compHeading}
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-urdu">
              {t.compDesc}
            </p>
          </div>

          {/* Periodic Intervals Timeline (Flexible & Non-rigid) */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider font-urdu">
                {isUrdu ? 'متغیر ترغیبی ادوار (حالات کے مطابق)' : 'Flexible Competition Intervals (Periodic)'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {intervals.map((intv, idx) => (
                <div 
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center space-y-1 hover:border-amber-400/60 transition-colors"
                >
                  <p className="text-xs text-emerald-300 font-mono font-bold">0{idx + 1}</p>
                  <p className="text-sm font-bold text-white font-urdu">
                    {isUrdu ? intv.labelUr : intv.labelEn}
                  </p>
                  <p className="text-[10px] text-slate-300 font-urdu">
                    {isUrdu ? 'ترغیبی جائزہ' : 'Periodic Review'}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-300 text-center font-urdu max-w-3xl mx-auto bg-black/30 p-3 rounded-2xl border border-white/5">
              {t.compIntervalNote}
            </p>
          </div>

          {/* 4 Pillars of Prayer Competitions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-emerald-900/60 border border-emerald-500/30 rounded-2xl p-6 space-y-3 hover-lift transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white font-urdu">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-urdu">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </motion.div>
      </section>

      {/* 3. AWARDS AT THE ANNUAL PROGRAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-amber-500/10 via-emerald-50/60 to-amber-500/10 rounded-3xl p-8 sm:p-12 border-2 border-amber-400/50 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          
          {/* Trophy Illustration Box */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center shadow-xl shrink-0 animate-bounce-subtle">
            <Trophy className="w-12 h-12 sm:w-14 sm:h-14" />
          </div>

          {/* Description */}
          <div className="space-y-3 text-center lg:text-start flex-grow">
            <span className="bg-amber-500 text-emerald-950 text-xs px-3.5 py-1 rounded-full font-bold inline-block font-urdu">
              {t.annualProgramBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-urdu">
              {t.awardsHeading}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-urdu max-w-3xl">
              {t.awardsDesc}
            </p>
          </div>

          {/* Badge / Pill */}
          <div className="shrink-0 text-center bg-white p-5 rounded-2xl border border-amber-300 shadow-sm space-y-1">
            <Award className="w-8 h-8 text-amber-600 mx-auto" />
            <p className="text-xs font-bold text-slate-900 font-urdu">
              {isUrdu ? 'حوصلہ افزائی و انعامات' : 'Merit Recognition'}
            </p>
            <p className="text-[10px] text-slate-500 font-urdu">
              {isUrdu ? 'بعد سالانہ امتحانات' : 'Post Annual Exams'}
            </p>
          </div>

        </motion.div>
      </section>

    </div>
  );
};
