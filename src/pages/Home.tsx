import React from 'react';
import { Language, Program, Announcement, GalleryItem } from '../types';
import { WeeklySchedule } from '../components/WeeklySchedule';
import { DailyTimetable } from '../components/DailyTimetable';
import { PrayerSection } from '../components/PrayerSection';
import { AcademicAssessments } from '../components/AcademicAssessments';
import { 
  BookOpen, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Phone,
  MessageCircle,
  Clock,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SiteSettings, PagesContent, Competition, AnnualAward, SpecialHoliday } from '../data/cmsInitialData';
import { DailyPeriod, ScheduleDay } from '../types';

interface HomeProps {
  currentLang: Language;
  setActiveTab: (tab: string) => void;
  programs: Program[];
  announcements: Announcement[];
  gallery: GalleryItem[];
  settings?: SiteSettings;
  pagesContent?: PagesContent;
  timetable?: DailyPeriod[];
  schedule?: ScheduleDay[];
  specialHolidays?: SpecialHoliday[];
  competitions?: Competition[];
  annualAwards?: AnnualAward[];
}

export const Home: React.FC<HomeProps> = ({ 
  currentLang, 
  setActiveTab, 
  programs, 
  announcements, 
  gallery,
  settings,
  pagesContent,
  timetable,
  schedule,
  specialHolidays,
  competitions,
  annualAwards
}) => {
  const isUrdu = currentLang === 'ur';

  const homeContent = pagesContent?.home;
  const t = {
    ur: {
      bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      welcome: 'مدرسہ تعلیم القرآن فریال مسجد میں خوش آمدید',
      title: homeContent?.heroTitleUr || settings?.siteNameUr || 'مدرسہ تعلیم القرآن فریال مسجد',
      subtitle: homeContent?.heroDescUr || 'قرآنِ کریم کی حفظ، ناظرہ، تجوید اور بنیادی اسلامی تعلیمات کا ایک مستند، باوقار اور پرامن روحانی مرکز۔',
      hadithTitle: homeContent?.hadithArabic || 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
      hadithTranslation: homeContent?.hadithUr || '”تم میں سے بہترین شخص وہ ہے جو قرآن سیکھے اور سکھائے۔“ (صحیح بخاری)',
      applyBtn: 'آن لائن داخلہ فارم',
      programsBtn: 'تمام تعلیمی پروگرامز',
      scheduleBtn: 'روزانہ کا نظام الاوقات',
      
      // Core Programs Section
      programsHeading: 'بنیادی تعلیمی پروگرامز',
      programsSubheading: 'شعبہ حفظ القرآن الكريم اور ناظرہ قرآن و تجوید',
      programsDesc: 'مدرسہ تعلیم القرآن فریال مسجد میں قرآنِ پاک کے درست مخارج، تجوید کی پختگی اور منظم دہرائی کے ساتھ دو بنیادی تعلیمی شعبہ جات فعال ہیں:',
      viewAllPrograms: 'تمام کورسز کی تفصیل دیکھیں',
      
      // Announcements & CTA
      announcementsTitle: 'اہم اعلانات و نوٹس بورڈ',
      viewAll: 'تمام دیکھیں',
      ctaTitle: homeContent?.ctaTitleUr || 'اپنے بچے کا مستقبل قرآنِ پاک کی روشنی سے روشن کریں',
      ctaDesc: homeContent?.ctaDescUr || 'سال 2026ء کے داخلے جاری ہیں۔ محدود نشستوں کے باعث آج ہی اپنی درخواست آن لائن جمع کروائیں۔',
      whatsappContact: 'واٹس ایپ رابطہ',
    },
    en: {
      bismillah: 'In the name of Allah, the Most Gracious, the Most Merciful',
      welcome: 'Welcome to Madrasa Taleem-ul-Quran Faryal Masjid',
      title: homeContent?.heroTitleEn || settings?.siteNameEn || 'Madrasa Taleem-ul-Quran Faryal Masjid',
      subtitle: homeContent?.heroDescEn || 'A prestigious, authentic, and serene spiritual sanctuary dedicated to Quran memorization, recitation, and Islamic character building.',
      hadithTitle: homeContent?.hadithArabic || 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
      hadithTranslation: homeContent?.hadithEn || '"The best among you are those who learn the Quran and teach it." (Sahih al-Bukhari)',
      applyBtn: 'Online Admission Form',
      programsBtn: 'Educational Programs',
      scheduleBtn: 'Daily Timetable',

      // Core Programs Section
      programsHeading: 'Core Quranic Education Programs',
      programsSubheading: 'Sho\'ba-e-Hifz-ul-Quran & Nazra-ul-Quran with Tajweed',
      programsDesc: 'At Madrasa Taleem-ul-Quran Faryal Masjid, Quranic recitation and memorization are imparted with precise Makharij, Tajweed mastery, and disciplined daily revision:',
      viewAllPrograms: 'View All Course Details',

      // Announcements & CTA
      announcementsTitle: 'Important Notices & Announcements',
      viewAll: 'View All',
      ctaTitle: homeContent?.ctaTitleEn || 'Illuminate Your Child’s Future with the Light of the Quran',
      ctaDesc: homeContent?.ctaDescEn || 'Admissions open for 2026. Limited seats available; apply online today.',
      whatsappContact: 'WhatsApp Chat',
    }
  }[currentLang];

  // Primary Quranic Programs (Nazra & Hifz)
  const corePrograms = programs.filter(p => p.id === 'hifz' || p.id === 'nazra');
  const displayPrograms = corePrograms.length > 0 ? corePrograms : programs.slice(0, 2);

  return (
    <div className="space-y-16 pb-20 overflow-x-hidden">
      
      {/* 2. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white overflow-hidden py-20 lg:py-24">
        
        {/* Islamic Geometric Arabesque Pattern Background */}
        <div className={`absolute inset-0 opacity-10 bg-islamic-pattern pointer-events-none ${settings?.animations?.enableBackgroundEffects !== false ? 'animate-pulse-glow' : ''}`}></div>
        
        {/* Subtle Decorative Architectural Rings with slow serene rotation */}
        <div className={`absolute -top-32 -left-32 w-96 h-96 border border-emerald-500/20 rounded-full pointer-events-none ${settings?.animations?.enableBackgroundEffects !== false ? 'animate-spin-slow' : ''}`}></div>
        <div className={`absolute -bottom-40 -right-40 w-[28rem] h-[28rem] border border-amber-400/15 rounded-full pointer-events-none ${settings?.animations?.enableBackgroundEffects !== false ? 'animate-spin-reverse-slow' : ''}`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-start"
            >
              
              {/* Bismillah Calligraphy Ribbon */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 bg-emerald-900/80 border border-amber-400/40 px-5 py-2 rounded-full text-amber-300 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-base sm:text-lg font-bold font-quran tracking-wider">
                  {t.bismillah}
                </span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </motion.div>

              {/* Official Institution Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-urdu drop-shadow-sm"
              >
                {t.title}
              </motion.h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-urdu">
                {t.subtitle}
              </p>

              {/* Hadith Sharif Box */}
              <div className="bg-emerald-900/60 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-emerald-500/30 text-emerald-100 space-y-2">
                <p className="text-xl sm:text-2xl font-bold text-amber-300 font-quran text-center leading-relaxed">
                  « {t.hadithTitle} »
                </p>
                <p className="text-xs sm:text-sm text-slate-200 text-center font-urdu">
                  {t.hadithTranslation}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('admissions')}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-emerald-950 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer font-urdu"
                >
                  <Calendar className="w-5 h-5 text-emerald-950" />
                  <span>{t.applyBtn}</span>
                  {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('daily-timetable');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setActiveTab('schedule');
                    }
                  }}
                  className="w-full sm:w-auto bg-emerald-900/80 hover:bg-emerald-800 text-white border border-emerald-500/50 px-7 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer font-urdu"
                >
                  <Clock className="w-5 h-5 text-amber-300" />
                  <span>{t.scheduleBtn}</span>
                </button>

                <button
                  onClick={() => setActiveTab('programs')}
                  className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 cursor-pointer font-urdu text-sm"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>{t.programsBtn}</span>
                </button>
              </div>

            </motion.div>

            {/* Right Column: Preserved Official Logo & Crest */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-gradient-to-br from-emerald-900/90 via-teal-950 to-slate-950 rounded-3xl p-8 border-2 border-amber-400/40 shadow-2xl space-y-6 relative overflow-hidden text-center">
                
                {/* Official Logo Image */}
                <div className="w-24 h-24 mx-auto rounded-2xl bg-white flex items-center justify-center shadow-xl p-1.5 border-2 border-amber-400">
                  <img 
                    src="/images/madrasa-logo.jpeg" 
                    alt="مدرسہ تعلیم القرآن فریال مسجد لوگو" 
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <span className="bg-emerald-800/80 text-amber-300 text-xs px-3.5 py-1 rounded-full font-bold border border-emerald-600 font-urdu">
                    {isUrdu ? 'مستند دینی ادارہ' : 'Verified Islamic Madrasa'}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-urdu pt-1">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-urdu leading-relaxed">
                    {isUrdu 
                      ? 'حفظِ قرآن، ناظرہ مع تجوید اور اخلاقی تربیت کی روشن درسگاہ'
                      : 'Structured Quranic Education, Tajweed Mastery & Moral Upbringing'}
                  </p>
                </div>

                {/* Classical Quranic Inscription Emblem */}
                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                  <p className="text-lg text-amber-200 font-quran leading-relaxed">
                    « وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا »
                  </p>
                  <p className="text-[11px] text-slate-400 font-urdu">
                    {isUrdu ? 'اور قرآن کو خوب ٹھہر ٹھہر کر (تجوید سے) پڑھو۔' : 'And recite the Quran with measured recitation.'}
                  </p>
                </div>

                {/* Confirmed Schedule Summary Pill */}
                <div className="bg-emerald-950/80 rounded-2xl p-3.5 border border-amber-400/30 flex items-center justify-between text-xs text-emerald-200 font-urdu">
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{isUrdu ? 'ہفتہ تا جمعرات تدریس' : 'Sat - Thu Academic Days'}</span>
                  </span>
                  <span className="bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded-lg text-[11px]">
                    {isUrdu ? 'جمعہ تعطیل' : 'Fri Holiday'}
                  </span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. PROMINENT STATISTICS: 22 TEACHERS & 400+ STUDENTS (Immediately after Hero) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Card 1: 22 Teachers */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-emerald-100 hover:border-emerald-300 hover-lift transition-all flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-start relative overflow-hidden group">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-800 to-teal-900 text-amber-300 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline justify-center sm:justify-start gap-2.5">
                <span className="text-5xl sm:text-6xl font-extrabold text-emerald-950 font-mono tracking-tight" dir="ltr">
                  <AnimatedCounter 
                    value={settings?.statsTeachers || '22'} 
                    enabled={settings?.animations?.enableCounters !== false}
                    duration={1600}
                  />
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-urdu">
                  {isUrdu ? 'اساتذہ' : 'Teachers'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-urdu">
                {isUrdu ? (settings?.statsTeachersLabelUr || 'اساتذہ کرام') : (settings?.statsTeachersLabelEn || 'Teachers')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-urdu">
                {isUrdu 
                  ? (settings?.statsTeachersDescUr || 'قرآنِ کریم کی تعلیم کے لیے 22 اساتذہ کرام خدمات انجام دے رہے ہیں۔') 
                  : (settings?.statsTeachersDescEn || 'A dedicated team of 22 teachers serving Quranic education.')}
              </p>
            </div>
          </div>

          {/* Card 2: 400+ Students */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-amber-200/80 hover:border-amber-400 hover-lift transition-all flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-start relative overflow-hidden group">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 text-emerald-950 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <BookOpen className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline justify-center sm:justify-start gap-2.5">
                <span className="text-5xl sm:text-6xl font-extrabold text-amber-700 font-mono tracking-tight" dir="ltr">
                  <AnimatedCounter 
                    value={settings?.statsStudents || '400+'} 
                    enabled={settings?.animations?.enableCounters !== false}
                    duration={2000}
                  />
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-urdu">
                  {isUrdu ? 'طلبہ' : 'Students'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-urdu">
                {isUrdu ? (settings?.statsStudentsLabelUr || 'طلبہ کرام') : (settings?.statsStudentsLabelEn || 'Students')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-urdu">
                {isUrdu 
                  ? (settings?.statsStudentsDescUr || 'تقریباً 400 طلبہ مدرسے کے تعلیمی ماحول سے مستفید ہو رہے ہیں۔') 
                  : (settings?.statsStudentsDescEn || 'Approximately 400 students benefit from the madrasa\'s educational environment.')}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. DAILY MADRASA TIMETABLE (4 Periods) */}
      <DailyTimetable currentLang={currentLang} timetable={timetable} />

      {/* 5. CORE QURANIC EDUCATION PROGRAMS: NAZRA-UL-QURAN & SHO'BA-E-HIFZ-UL-QURAN */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="bg-emerald-100 text-emerald-900 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm font-urdu mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.programsHeading}</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-urdu">
                  {t.programsSubheading}
                </h2>
                <p className="text-sm text-slate-600 mt-1 font-urdu max-w-2xl">
                  {t.programsDesc}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('programs')}
                className="text-emerald-800 hover:text-emerald-900 font-bold text-sm flex items-center gap-1.5 cursor-pointer bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200 hover-lift transition-all"
              >
                <span className="font-urdu">{t.viewAllPrograms}</span>
                {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Spotlighting the 2 Core Programs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayPrograms.map((prog) => (
                <div 
                  key={prog.id} 
                  className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover-lift transition-all p-8 space-y-6 group hover:border-emerald-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <BookOpen className="w-7 h-7 text-emerald-700" />
                      </div>
                      <span className="bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold border border-emerald-200 font-urdu">
                        {isUrdu ? 'بنیادی تعلیمی شعبہ' : 'Core Quranic Wing'}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 font-urdu">
                      {isUrdu ? prog.titleUr : prog.titleEn}
                    </h3>
                    
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-urdu">
                      {isUrdu ? prog.descUr : prog.descEn}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl font-urdu">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>{isUrdu ? 'مدتِ کورس:' : 'Duration:'}</strong> {isUrdu ? prog.durationUr : prog.durationEn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>{isUrdu ? 'اہلیتِ عمر:' : 'Age Limit:'}</strong> {isUrdu ? prog.ageUr : prog.ageEn}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-bold text-slate-800 font-urdu">{isUrdu ? 'نمایاں خصوصیات:' : 'Key Highlights:'}</p>
                      <ul className="space-y-1.5 text-xs text-slate-600 font-urdu">
                        {(isUrdu ? prog.featuresUr : prog.featuresEn).map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 font-urdu">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>{isUrdu ? 'داخلے جاری ہیں' : 'Admissions Open'}</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('admissions')}
                      className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold transition-colors cursor-pointer font-urdu shadow-sm"
                    >
                      {isUrdu ? 'آن لائن داخلہ لیں' : 'Apply Online'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6, 7, 8. PRAYER SECTION: FIVE DAILY PRAYERS, PRAYER COMPETITIONS & ANNUAL AWARDS */}
      <PrayerSection currentLang={currentLang} />

      {/* 9. MONTHLY ASSESSMENTS & ANNUAL EXAMINATIONS */}
      <AcademicAssessments currentLang={currentLang} />

      {/* 10. FRIDAY WEEKLY HOLIDAY INFORMATION & ACADEMIC DAYS */}
      <WeeklySchedule currentLang={currentLang} schedule={schedule} specialHolidays={specialHolidays} />

      {/* 11. ANNOUNCEMENTS PREVIEW & CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-urdu mb-1 inline-block">
                {isUrdu ? 'تازہ ترین نوٹس' : 'Latest Notices'}
              </span>
              <h2 className="text-xl sm:text-3xl font-bold text-slate-900 font-urdu">
                {t.announcementsTitle}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('announcements')}
              className="text-emerald-800 hover:text-emerald-900 text-sm font-semibold cursor-pointer font-urdu"
            >
              {t.viewAll}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.slice(0, 3).map((ann) => (
              <div 
                key={ann.id} 
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold font-urdu">
                      {isUrdu ? ann.categoryUr : ann.categoryEn}
                    </span>
                    <span className="text-xs text-slate-400 font-mono" dir="ltr">{ann.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base font-urdu">
                    {isUrdu ? ann.titleUr : ann.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-urdu">
                    {isUrdu ? ann.contentUr : ann.contentEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row justify-between items-center gap-8 border border-emerald-800"
        >
          <div className="space-y-3 text-center lg:text-start max-w-2xl">
            <span className="bg-amber-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full inline-block font-urdu">
              {isUrdu ? 'محدود نشستیں دستیاب ہیں' : 'Limited Seats Available'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-urdu">
              {t.ctaTitle}
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-urdu">
              {t.ctaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('admissions')}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-emerald-950 px-8 py-4 rounded-2xl font-bold shadow-md transition-all cursor-pointer font-urdu"
            >
              <span>{t.applyBtn}</span>
            </button>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-700 font-urdu"
            >
              <MessageCircle className="w-5 h-5 text-emerald-300" />
              <span>{t.whatsappContact}</span>
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
