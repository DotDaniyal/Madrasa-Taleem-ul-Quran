import React, { useState } from 'react';
import { Language, Program, Announcement, GalleryItem } from '../types';
import { WeeklySchedule } from '../components/WeeklySchedule';
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
  Compass,
  Star,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  currentLang: Language;
  setActiveTab: (tab: string) => void;
  programs: Program[];
  announcements: Announcement[];
  gallery: GalleryItem[];
}

export const Home: React.FC<HomeProps> = ({ 
  currentLang, 
  setActiveTab, 
  programs, 
  announcements, 
  gallery
}) => {
  const isUrdu = currentLang === 'ur';

  const t = {
    ur: {
      bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      welcome: 'مدرسہ تعلیم القرآن فریال مسجد میں خوش آمدید',
      title: 'مدرسہ تعلیم القرآن فریال مسجد',
      subtitle: 'قرآنِ کریم کی حفظ، ناظرہ، تجوید اور بنیادی اسلامی تعلیمات کا ایک مستند، باوقار اور پرامن روحانی مرکز۔',
      hadithTitle: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
      hadithTranslation: '”تم میں سے بہترین شخص وہ ہے جو قرآن سیکھے اور سکھائے۔“ (صحیح بخاری)',
      applyBtn: 'آن لائن داخلہ فارم',
      programsBtn: 'تمام تعلیمی پروگرامز',
      scheduleBtn: 'ہفتہ وار شیڈول دیکھیں',
      stats1: 'فارغ التحصیل حفاظ',
      stats2: 'سند یافتہ اساتذہ',
      stats3: 'زیرِ تعلیم طلباء',
      stats4: 'سالہ مسلسل خدمات',
      whyTitle: 'والدین مدرسہ تعلیم القرآن فریال مسجد کا انتخاب کیوں کرتے ہیں؟',
      whyDesc: 'صحیح مخارج، تجوید کی پختگی، اخلاقی تربیت اور ایک پرسکون اسلامی ماحول ہمارے ادارے کی پہچان ہے۔',
      feature1Title: 'سند یافتہ قراء و حفاظ',
      feature1Desc: 'درسِ نظامی اور قراءتِ سبعہ کے ماہر اور شفیق اساتذہ کرام کی زیرِ سرپرستی تعلیم۔',
      feature2Title: 'محفوظ و پرسکون تعلیمی ماحول',
      feature2Desc: 'ہوا دار کلاس رومز، مکمل نظم و ضبط اور بچوں کی باقاعدہ اخلاقی و دینی نگرانی۔',
      feature3Title: 'روزانہ پختہ دہرائی و منزل',
      feature3Desc: 'حفظ کرنے والے طلباء کے لیے منظم دہرائی، سبقی اور منزل کی پختگی کا جامع نظام۔',
      feature4Title: 'والدین کو باقاعدہ رپورٹ',
      feature4Desc: 'طلباء کی ماہانہ کارکردگی، حاضری اور روزانہ اسباق سے والدین کو باخبر رکھنا۔',
      programsTitle: 'ہمارے بنیادی تعلیمی پروگرامز',
      programsDesc: 'حفظِ قرآن سے لے کر نورانی قاعدہ اور تجوید تک، ہر عمر کے بچوں کے لیے متوازن نصاب۔',
      announcementsTitle: 'اہم اعلانات و نوٹس بورڈ',
      viewAll: 'تمام دیکھیں',
      galleryTitle: 'شعبہ جات و تعلیمی سہولیات',
      galleryDesc: 'مدرسہ تعلیم القرآن فریال مسجد کے منظم شعبہ جات اور تعلیمی انتظامات۔',
      ctaTitle: 'اپنے بچے کا مستقبل قرآنِ پاک کی روشنی سے روشن کریں',
      ctaDesc: 'سال 2026ء کے داخلے جاری ہیں۔ محدود نشستوں کے باعث آج ہی اپنی درخواست آن لائن جمع کروائیں۔',
      whatsappContact: 'واٹس ایپ رابطہ',
    },
    en: {
      bismillah: 'In the name of Allah, the Most Gracious, the Most Merciful',
      welcome: 'Welcome to Madrasa Taleem-ul-Quran Faryal Masjid',
      title: 'Madrasa Taleem-ul-Quran Faryal Masjid',
      subtitle: 'A prestigious, authentic, and serene spiritual sanctuary dedicated to Quran memorization, recitation, and Islamic character building.',
      hadithTitle: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
      hadithTranslation: '"The best among you are those who learn the Quran and teach it." (Sahih al-Bukhari)',
      applyBtn: 'Online Admission Form',
      programsBtn: 'Educational Programs',
      scheduleBtn: 'View Weekly Schedule',
      stats1: 'Graduated Huffaz',
      stats2: 'Certified Teachers',
      stats3: 'Enrolled Students',
      stats4: 'Years of Service',
      whyTitle: 'Why Parents Choose Madrasa Taleem-ul-Quran Faryal Masjid',
      whyDesc: 'Precise articulation, mastery of Tajweed, exemplary morals, and a peaceful environment define our institute.',
      feature1Title: 'Certified Huffaz & Scholars',
      feature1Desc: 'Supervised by graduates of Dars-e-Nizami and Qiraat-e-Saba with immense dedication.',
      feature2Title: 'Safe & Pure Atmosphere',
      feature2Desc: 'Well-ventilated classrooms, positive discipline, and moral supervision.',
      feature3Title: 'Rigorous Daily Revision',
      feature3Desc: 'Structured daily Sabaq, Sabqi, and Manzil consolidation system.',
      feature4Title: 'Regular Parent Reports',
      feature4Desc: 'Monthly performance and attendance updates shared with guardians.',
      programsTitle: 'Core Educational Programs',
      programsDesc: 'From Noorani Qaida to full Hifz-ul-Quran and advanced Tajweed.',
      announcementsTitle: 'Important Notices & Announcements',
      viewAll: 'View All',
      galleryTitle: 'Departments & Facilities',
      galleryDesc: 'Structured educational wings and learning environments of the madrasa.',
      ctaTitle: 'Illuminate Your Child’s Future with the Light of the Quran',
      ctaDesc: 'Admissions open for 2026. Limited seats available; apply online today.',
      whatsappContact: 'WhatsApp Chat',
    }
  }[currentLang];

  const stats = [
    { number: '250+', label: t.stats1, icon: Award, color: 'from-amber-600 to-amber-700' },
    { number: '12+', label: t.stats2, icon: Users, color: 'from-emerald-700 to-emerald-800' },
    { number: '300+', label: t.stats3, icon: BookOpen, color: 'from-teal-700 to-teal-800' },
    { number: '15+', label: t.stats4, icon: ShieldCheck, color: 'from-emerald-800 to-emerald-950' },
  ];

  const features = [
    { title: t.feature1Title, desc: t.feature1Desc, icon: Award },
    { title: t.feature2Title, desc: t.feature2Desc, icon: ShieldCheck },
    { title: t.feature3Title, desc: t.feature3Desc, icon: BookOpen },
    { title: t.feature4Title, desc: t.feature4Desc, icon: Users },
  ];

  return (
    <div className="space-y-16 pb-20 overflow-x-hidden">
      
      {/* Hero Section with Islamic Architectural Motifs (No Fake Stock Photos) */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white overflow-hidden py-20 lg:py-24">
        
        {/* Islamic Geometric Arabesque Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-islamic-pattern pointer-events-none"></div>
        
        {/* Subtle Decorative Architectural Rings */}
        <div className="absolute -top-32 -left-32 w-96 h-96 border border-emerald-500/20 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] border border-amber-400/15 rounded-full pointer-events-none"></div>

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
              <div className="inline-flex items-center gap-2.5 bg-emerald-900/80 border border-amber-400/40 px-5 py-2 rounded-full text-amber-300 shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-base sm:text-lg font-bold font-quran tracking-wider">
                  {t.bismillah}
                </span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>

              {/* Official Institution Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-urdu drop-shadow-sm">
                {t.title}
              </h1>

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
                  onClick={() => setActiveTab('programs')}
                  className="w-full sm:w-auto bg-emerald-900/80 hover:bg-emerald-800 text-white border border-emerald-500/50 px-7 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer font-urdu"
                >
                  <BookOpen className="w-5 h-5 text-amber-300" />
                  <span>{t.programsBtn}</span>
                </button>

                <button
                  onClick={() => setActiveTab('schedule')}
                  className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 cursor-pointer font-urdu text-sm"
                >
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{t.scheduleBtn}</span>
                </button>
              </div>

            </motion.div>

            {/* Right Column: Refined Islamic Architectural Crest (Zero Fake Stock Photos) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="bg-gradient-to-br from-emerald-900/90 via-teal-950 to-slate-950 rounded-3xl p-8 border-2 border-amber-400/40 shadow-2xl space-y-6 relative overflow-hidden text-center">
                
                {/* Islamic Arch Motif Header */}
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg text-emerald-950 font-bold">
                  <BookOpen className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="bg-emerald-800/80 text-amber-300 text-xs px-3.5 py-1 rounded-full font-bold border border-emerald-600">
                    {isUrdu ? 'مستند دینی درسگاہ' : 'Verified Islamic Madrasa'}
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
                    <span>{isUrdu ? 'ہفتہ تا جمعرات کلاسز' : 'Sat - Thu Classes'}</span>
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

      {/* Confirmed Weekly Schedule Section (Prominently Highlighted) */}
      <WeeklySchedule currentLang={currentLang} />

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover-lift transition-all"
              >
                <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="w-6 h-6 text-amber-200" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-urdu">{stat.number}</h3>
                  <p className="text-xs text-slate-600 font-medium font-urdu">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-urdu">
              {isUrdu ? 'ادارے کے امتیازات' : 'Why Choose Us'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-urdu">
              {t.whyTitle}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-urdu">
              {t.whyDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:border-emerald-300 hover-lift transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-urdu">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-urdu">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Core Educational Programs */}
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
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-urdu">
                  {t.programsTitle}
                </h2>
                <p className="text-sm text-slate-600 mt-1 font-urdu">
                  {t.programsDesc}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('programs')}
                className="text-emerald-800 hover:text-emerald-900 font-bold text-sm flex items-center gap-1 cursor-pointer bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200"
              >
                <span className="font-urdu">{t.viewAll}</span>
                {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.slice(0, 3).map((prog) => (
                <div 
                  key={prog.id} 
                  className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover-lift transition-all"
                >
                  <div className="p-7 space-y-4">
                    <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-urdu">
                      {isUrdu ? prog.titleUr : prog.titleEn}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 font-urdu">
                      {isUrdu ? prog.descUr : prog.descEn}
                    </p>
                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
                      <div className="flex justify-between font-urdu">
                        <span className="font-bold">{isUrdu ? 'مدتِ کورس:' : 'Duration:'}</span>
                        <span>{isUrdu ? prog.durationUr : prog.durationEn}</span>
                      </div>
                      <div className="flex justify-between font-urdu">
                        <span className="font-bold">{isUrdu ? 'اہلیتِ عمر:' : 'Age Limit:'}</span>
                        <span>{isUrdu ? prog.ageUr : prog.ageEn}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 font-urdu">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{isUrdu ? 'داخلے جاری ہیں' : 'Admissions Open'}</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('admissions')}
                      className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer font-urdu"
                    >
                      {isUrdu ? 'داخلہ لیں' : 'Apply'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Announcements & Facilities Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Announcements Preview */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-urdu">
                {t.announcementsTitle}
              </h2>
              <button
                onClick={() => setActiveTab('announcements')}
                className="text-emerald-800 hover:text-emerald-900 text-sm font-semibold cursor-pointer font-urdu"
              >
                {t.viewAll}
              </button>
            </div>

            <div className="space-y-4">
              {announcements.slice(0, 3).map((ann) => (
                <div 
                  key={ann.id} 
                  className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold font-urdu">
                      {isUrdu ? ann.categoryUr : ann.categoryEn}
                    </span>
                    <span className="text-xs text-slate-400 font-mono" dir="ltr">{ann.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base font-urdu">
                    {isUrdu ? ann.titleUr : ann.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-urdu">
                    {isUrdu ? ann.contentUr : ann.contentEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Departments & Facility Badges (Tasteful Architectural Layout - Zero Stock Photos) */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-urdu">
                  {t.galleryTitle}
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('gallery')}
                className="text-emerald-800 hover:text-emerald-900 text-sm font-semibold cursor-pointer font-urdu"
              >
                {t.viewAll}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.slice(0, 4).map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveTab('gallery')}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 hover-lift transition-all cursor-pointer space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-urdu line-clamp-1">
                    {isUrdu ? item.titleUr : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 font-urdu line-clamp-2 leading-relaxed">
                    {isUrdu ? item.descUr : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA Banner */}
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
