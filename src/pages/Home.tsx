import React, { useState } from 'react';
import { CalligraphyFont, Language, Program, Announcement, GalleryItem } from '../types';
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
  Type,
  Volume2,
  Compass,
  Star,
  Check
} from 'lucide-react';
import { CALLIGRAPHY_FONTS } from '../components/CalligraphyFontPicker';

interface HomeProps {
  currentLang: Language;
  setActiveTab: (tab: string) => void;
  programs: Program[];
  announcements: Announcement[];
  gallery: GalleryItem[];
  currentFont: CalligraphyFont;
  setFont: (font: CalligraphyFont) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  currentLang, 
  setActiveTab, 
  programs, 
  announcements, 
  gallery,
  currentFont,
  setFont
}) => {
  const isUrdu = currentLang === 'ur';
  const selectedFontObj = CALLIGRAPHY_FONTS.find(f => f.id === currentFont) || CALLIGRAPHY_FONTS[0];

  // Interactive Calligraphy Live Playground
  const [customCalligraphyInput, setCustomCalligraphyInput] = useState('إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ');
  const [playingAudio, setPlayingAudio] = useState(false);

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
      calligraphySectionTitle: 'اسلامی خطاطی کے شاہکار یونیکوڈ فونٹس',
      calligraphySectionDesc: 'اپنی پسندیدہ خطاطی منتخب کریں اور دیکھیں کہ کلامِ الٰہی مختلف اسلامی رسم الخطوط میں کتنا باوقار اور پرکشش دکھائی دیتا ہے۔',
      fontTestLabel: 'اپنا پسندیدہ جملہ یا آیت لکھ کر تمام خطوط میں دیکھیں:',
      stats1: 'فارغ التحصیل حفاظ',
      stats2: 'سند یافتہ اساتذہ',
      stats3: 'زیرِ تعلیم طلباء',
      stats4: 'سالہ مسلسل خدمات',
      whyTitle: 'والدین مدرسہ تعلیم القرآن فریال مسجد کا انتخاب کیوں کرتے ہیں؟',
      whyDesc: 'صحیح مخارج، تجوید کی پختگی، اخلاقی تربیت اور ایک پرسکون اسلامی ماحول ہمارے ادارے کی پہچان ہے۔',
      feature1Title: 'سند یافتہ قراء و حفاظ',
      feature1Desc: 'درسِ نظامی اور قراءتِ سبعہ کے ماہر اور شفیق اساتذہ کرام۔',
      feature2Title: 'محفوظ و پرسکون تعلیمی ماحول',
      feature2Desc: 'ہوا دار کلاس رومز، نظم و ضبط اور بچوں کی اخلاقی نگرانی۔',
      feature3Title: 'روزانہ پختہ دہرائی و منزل',
      feature3Desc: 'حفظ کرنے والے طلباء کے لیے منظم دہرائی اور ٹیسٹنگ کا نظام۔',
      feature4Title: 'والدین کو باقاعدہ رپورٹ',
      feature4Desc: 'طلباء کی ماہانہ کارکردگی اور حاضری کی تفصیلی رپورٹ۔',
      programsTitle: 'ہمارے بنیادی تعلیمی پروگرامز',
      programsDesc: 'حفظِ قرآن سے لے کر نورانی قاعدہ اور تجوید تک، ہر عمر کے بچوں کے لیے متوازن کورسز۔',
      announcementsTitle: 'اہم اعلانات و نوٹس بورڈ',
      viewAll: 'تمام دیکھیں',
      galleryTitle: 'مدرسہ اور مسجد کی تصویری جھلکیاں',
      ctaTitle: 'اپنے بچے کا مستقبل قرآنِ پاک کی روشنی سے روشن کریں',
      ctaDesc: 'سال 2026ء کے داخلے جاری ہیں۔ محدود نشستوں کے باعث آج ہی اپنی درخواست جمع کروائیں۔',
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
      calligraphySectionTitle: 'Masterpieces of Islamic Calligraphy Fonts',
      calligraphySectionDesc: 'Explore the majesty of the Holy Quran rendered in 9 distinct classical and contemporary Unicode scripts.',
      fontTestLabel: 'Test any Quranic verse or sentence across all calligraphy styles:',
      stats1: 'Graduated Huffaz',
      stats2: 'Certified Teachers',
      stats3: 'Enrolled Students',
      stats4: 'Years of Service',
      whyTitle: 'Why Parents Choose Madrasa Taleem-ul-Quran Faryal Masjid',
      whyDesc: 'Precise articulation, mastery of Tajweed, exemplary morals, and a peaceful environment define our institute.',
      feature1Title: 'Certified Huffaz & Scholars',
      feature1Desc: 'Graduates of Dars-e-Nizami and Qiraat-e-Saba with immense dedication.',
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
      galleryTitle: 'Glimpses of Mosque & Madrasa',
      ctaTitle: 'Illuminate Your Child’s Future with the Light of the Quran',
      ctaDesc: 'Admissions open for 2026. Limited seats available; apply online today.',
      whatsappContact: 'WhatsApp Chat',
    }
  }[currentLang];

  const stats = [
    { number: '250+', label: t.stats1, icon: Award, color: 'from-amber-500 to-amber-700' },
    { number: '12+', label: t.stats2, icon: Users, color: 'from-emerald-500 to-emerald-700' },
    { number: '300+', label: t.stats3, icon: BookOpen, color: 'from-teal-500 to-teal-700' },
    { number: '15+', label: t.stats4, icon: ShieldCheck, color: 'from-emerald-600 to-emerald-800' },
  ];

  const features = [
    { title: t.feature1Title, desc: t.feature1Desc, icon: Award },
    { title: t.feature2Title, desc: t.feature2Desc, icon: ShieldCheck },
    { title: t.feature3Title, desc: t.feature3Desc, icon: BookOpen },
    { title: t.feature4Title, desc: t.feature4Desc, icon: Users },
  ];

  const handleSimulateAudio = () => {
    setPlayingAudio(true);
    setTimeout(() => {
      setPlayingAudio(false);
    }, 4000);
  };

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      
      {/* Hero Section with Layered Animations and Calligraphy */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white overflow-hidden py-20 lg:py-28">
        
        {/* Animated Islamic Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-15 bg-islamic-pattern"></div>
        
        {/* Rotating Geometric Star (Khatim) Elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 border border-emerald-500/20 rounded-full animate-spin-slow pointer-events-none flex items-center justify-center">
          <div className="w-80 h-80 border border-amber-400/20 rotate-45 animate-spin-reverse-slow"></div>
        </div>
        <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] border border-emerald-400/15 rounded-full animate-spin-slow pointer-events-none flex items-center justify-center">
          <div className="w-[26rem] h-[26rem] border border-amber-300/15 rotate-12"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="space-y-6 text-center lg:text-start">
              
              {/* Classical Bismillah Calligraphy Badge with Shimmer & Glow */}
              <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-900/90 via-emerald-800/90 to-teal-900/90 border border-amber-400/40 px-5 py-2 rounded-full text-amber-300 shadow-xl animate-shimmer animate-pulse-glow">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                <span className="text-sm sm:text-base font-bold font-gulzar tracking-wider">
                  {t.bismillah}
                </span>
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin-reverse-slow" />
              </div>

              {/* Main Institution Title with Live Calligraphy Font Class */}
              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight ${selectedFontObj.fontClass} drop-shadow-md`}>
                {t.title}
              </h1>

              <p className={`text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-urdu`}>
                {t.subtitle}
              </p>

              {/* Hadith Sharif Calligraphy Box */}
              <div className="bg-emerald-900/50 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-emerald-500/30 text-emerald-100 shadow-inner space-y-2">
                <p className="text-xl sm:text-2xl font-bold text-amber-300 font-naskh text-center leading-relaxed">
                  « {t.hadithTitle} »
                </p>
                <p className="text-xs sm:text-sm text-slate-300 text-center font-urdu">
                  {t.hadithTranslation}
                </p>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('admissions')}
                  className="w-full sm:w-auto relative group overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-emerald-950 px-8 py-4 rounded-2xl font-bold shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer animate-shimmer hover:scale-105 active:scale-95"
                >
                  <Calendar className="w-5 h-5 text-emerald-950 animate-bounce-subtle" />
                  <span className={selectedFontObj.fontClass}>{t.applyBtn}</span>
                  {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setActiveTab('programs')}
                  className="w-full sm:w-auto bg-emerald-900/80 hover:bg-emerald-800 text-white border border-emerald-500/50 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <BookOpen className="w-5 h-5 text-amber-300" />
                  <span className={selectedFontObj.fontClass}>{t.programsBtn}</span>
                </button>
              </div>

              {/* Audio Demo & Active Font Indicator */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
                <button
                  onClick={handleSimulateAudio}
                  className="flex items-center gap-2 bg-emerald-800/60 hover:bg-emerald-700/80 px-3.5 py-1.5 rounded-full border border-emerald-600/40 transition-colors cursor-pointer"
                >
                  <Volume2 className={`w-4 h-4 ${playingAudio ? 'text-amber-400 animate-pulse' : 'text-emerald-300'}`} />
                  <span>{playingAudio ? (isUrdu ? 'تلاوت سن رہے ہیں...' : 'Recitation Playing...') : (isUrdu ? 'نمونہ قراءت سنیں' : 'Hear Recitation Demo')}</span>
                </button>
                <div className="flex items-center gap-1.5 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800">
                  <span>✒️</span>
                  <span>{isUrdu ? 'موجودہ خط:' : 'Font:'} <strong>{selectedFontObj.nameUr.split(' ')[0]}</strong></span>
                </div>
              </div>

            </div>

            {/* Right Visual Card with Floating Elements & Glowing Minaret */}
            <div className="relative">
              
              {/* Main Mosque Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/40 group hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1564769625393-d0ef116f082e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Madrasa Taleem-ul-Quran Faryal Masjid" 
                  className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Vignette with Calligraphy Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <div className="bg-emerald-950/90 backdrop-blur-md p-5 rounded-2xl border border-amber-400/30 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-amber-400 text-emerald-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {isUrdu ? 'مستند دینی ادارہ' : 'Certified Madrasa'}
                      </span>
                      <span className="text-amber-300 text-xs font-mono">1447 - 2026</span>
                    </div>
                    <h3 className={`font-bold text-xl text-amber-200 ${selectedFontObj.fontClass}`}>
                      مدرسہ تعلیم القرآن فریال مسجد
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 font-urdu">
                      {isUrdu ? 'حفظ القرآن، ناظرہ مع تجوید، اور اخلاقی تربیت کی روشن درسگاہ' : 'Sanctuary for Hifz, Nazra with Tajweed and Islamic Education'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Calligraphy Quality Seal */}
              <div className="absolute -bottom-6 -left-6 sm:left-6 bg-gradient-to-br from-white to-amber-50 text-slate-900 p-4 sm:p-5 rounded-2xl shadow-2xl border-2 border-amber-400 hidden sm:flex items-center gap-3 animate-float">
                <div className="w-12 h-12 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                  ۞
                </div>
                <div>
                  <p className="text-xs text-emerald-800 font-bold">{isUrdu ? '100% مستند اسباق' : 'Authentic Learning'}</p>
                  <p className="text-sm font-bold text-slate-900 font-urdu">{isUrdu ? 'تجوید و حسنِ قراءت' : 'Tajweed Guaranteed'}</p>
                </div>
              </div>

              {/* Floating Star Badge on top right */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-xl animate-spin-slow border-2 border-white">
                ★
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Interactive Calligraphy Unicode Showcase & Test Lab */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white via-emerald-50/40 to-amber-50/40 rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-emerald-200/60 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs px-4 py-1 rounded-full font-bold shadow-sm">
              <Type className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isUrdu ? 'اسلامی خطاطی کے تمام یونیکوڈ فونٹس' : 'All Calligraphy Unicode Fonts'}</span>
            </span>
            <h2 className={`text-2xl sm:text-4xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
              {t.calligraphySectionTitle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-urdu">
              {t.calligraphySectionDesc}
            </p>
          </div>

          {/* Live Text Testing Input */}
          <div className="max-w-2xl mx-auto space-y-2">
            <label className="text-xs font-bold text-slate-700 font-urdu block text-center">
              {t.fontTestLabel}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customCalligraphyInput}
                onChange={(e) => setCustomCalligraphyInput(e.target.value)}
                placeholder="کوئی بھی عبارت یا آیت لکھیں..."
                className="w-full bg-white border-2 border-emerald-300 rounded-2xl px-5 py-3 text-base sm:text-lg focus:outline-none focus:border-emerald-600 font-urdu shadow-sm text-center"
              />
              <button
                onClick={() => setCustomCalligraphyInput('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                title="تسمیہ ری سیٹ کریں"
              >
                بسم اللہ
              </button>
            </div>
          </div>

          {/* Interactive Grid of All 9 Calligraphy Styles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {CALLIGRAPHY_FONTS.map((font) => {
              const isSelected = currentFont === font.id;
              return (
                <div
                  key={font.id}
                  onClick={() => setFont(font.id)}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative group flex flex-col justify-between hover-lift ${
                    isSelected
                      ? 'bg-gradient-to-br from-emerald-900 to-teal-900 text-white border-amber-400 shadow-2xl scale-[1.02]'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isSelected ? 'bg-amber-400 text-emerald-950 font-bold' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isUrdu ? font.nameUr : font.nameEn}
                      </span>
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-[11px] text-amber-300 font-bold">
                          <Check className="w-4 h-4" />
                          <span>{isUrdu ? 'فعال ہے' : 'Active'}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 group-hover:text-emerald-600">
                          {isUrdu ? 'منتخب کریں' : 'Click to Apply'}
                        </span>
                      )}
                    </div>

                    {/* Rendering the text in this specific calligraphy script */}
                    <div className={`p-4 rounded-2xl my-3 text-center transition-colors ${
                      isSelected ? 'bg-black/25 border border-white/10' : 'bg-slate-50 border border-slate-100'
                    }`}>
                      <p className={`text-2xl sm:text-3xl leading-relaxed ${font.fontClass} ${isSelected ? 'text-amber-200' : 'text-slate-900'}`}>
                        {customCalligraphyInput || font.sampleText}
                      </p>
                    </div>
                  </div>

                  <p className={`text-xs mt-2 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                    {font.descUr}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Animated Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-slate-50 border border-emerald-100/60 hover-lift group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-amber-200 animate-bounce-subtle" />
                </div>
                <div>
                  <h3 className={`text-3xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>{stat.number}</h3>
                  <p className="text-xs text-slate-600 font-medium font-urdu">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us with Animated Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-urdu">
            {isUrdu ? 'ادارے کے امتیازات' : 'Why Choose Us'}
          </span>
          <h2 className={`text-2xl sm:text-3xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
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
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-300 hover-lift transition-all space-y-4 group relative overflow-hidden"
              >
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-emerald-700 group-hover:to-teal-800 group-hover:text-amber-300 transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6 animate-float" />
                </div>
                <h3 className={`text-base font-bold text-slate-900 ${selectedFontObj.fontClass}`}>{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-urdu">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Programs with Animated Badge */}
      <section className="bg-gradient-to-b from-emerald-900/5 via-teal-900/10 to-transparent py-16 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h2 className={`text-2xl sm:text-3xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
                {t.programsTitle}
              </h2>
              <p className="text-sm text-slate-600 mt-1 font-urdu">
                {t.programsDesc}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('programs')}
              className="text-emerald-800 hover:text-emerald-900 font-bold text-sm flex items-center gap-1 cursor-pointer bg-white px-4 py-2 rounded-xl shadow-sm border border-emerald-100 hover-lift"
            >
              <span>{t.viewAll}</span>
              {isUrdu ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 3).map((prog) => (
              <div 
                key={prog.id} 
                className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden flex flex-col justify-between hover-lift transition-all group"
              >
                <div className="p-7 space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 animate-bounce-subtle" />
                  </div>
                  <h3 className={`text-2xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
                    {isUrdu ? prog.titleUr : prog.titleEn}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 font-urdu">
                    {isUrdu ? prog.descUr : prog.descEn}
                  </p>
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
                    <div className="flex justify-between">
                      <span className="font-bold">{isUrdu ? 'مدتِ کورس:' : 'Duration:'}</span>
                      <span>{isUrdu ? prog.durationUr : prog.durationEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">{isUrdu ? 'اہلیتِ عمر:' : 'Age Limit:'}</span>
                      <span>{isUrdu ? prog.ageUr : prog.ageEn}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>{isUrdu ? 'داخلے کھلے ہیں' : 'Admissions Open'}</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('admissions')}
                    className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl font-bold transition-colors cursor-pointer shadow-sm hover:scale-105"
                  >
                    {isUrdu ? 'داخلہ فارم' : 'Apply'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements & Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Announcements Preview */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
              {t.announcementsTitle}
            </h2>
            <button
              onClick={() => setActiveTab('announcements')}
              className="text-emerald-700 hover:text-emerald-800 text-sm font-semibold cursor-pointer"
            >
              {t.viewAll}
            </button>
          </div>

          <div className="space-y-4">
            {announcements.slice(0, 3).map((ann) => (
              <div 
                key={ann.id} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-300 hover-lift transition-all space-y-2 group"
              >
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {isUrdu ? ann.categoryUr : ann.categoryEn}
                  </span>
                  <span className="text-xs text-slate-400 font-mono" dir="ltr">{ann.date}</span>
                </div>
                <h3 className={`font-bold text-slate-900 text-lg ${selectedFontObj.fontClass}`}>
                  {isUrdu ? ann.titleUr : ann.titleEn}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-urdu">
                  {isUrdu ? ann.contentUr : ann.contentEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
              {t.galleryTitle}
            </h2>
            <button
              onClick={() => setActiveTab('gallery')}
              className="text-emerald-700 hover:text-emerald-800 text-sm font-semibold cursor-pointer"
            >
              {t.viewAll}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {gallery.slice(0, 4).map((item) => (
              <div 
                key={item.id} 
                onClick={() => setActiveTab('gallery')}
                className="relative rounded-2xl overflow-hidden shadow-sm group cursor-pointer h-40 sm:h-48 hover-lift"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.titleUr} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3.5">
                  <p className={`text-white text-xs sm:text-sm font-semibold line-clamp-1 ${selectedFontObj.fontClass}`}>
                    {isUrdu ? item.titleUr : item.titleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Gold & Emerald Shimmering CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-8 border-2 border-amber-400/40">
          
          <div className="absolute inset-0 opacity-10 bg-islamic-pattern"></div>
          
          <div className="space-y-3 text-center lg:text-start max-w-2xl relative z-10">
            <span className="bg-amber-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full inline-block">
              {isUrdu ? 'محدود نشستیں دستیاب ہیں' : 'Limited Seats Available'}
            </span>
            <h2 className={`text-2xl sm:text-4xl font-bold ${selectedFontObj.fontClass}`}>
              {t.ctaTitle}
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-urdu">
              {t.ctaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
            <button
              onClick={() => setActiveTab('admissions')}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 px-8 py-4 rounded-2xl font-bold shadow-xl transition-all cursor-pointer animate-shimmer hover:scale-105 active:scale-95"
            >
              <span className={selectedFontObj.fontClass}>{t.applyBtn}</span>
            </button>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-800/80 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-500/50 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 text-emerald-300 animate-bounce-subtle" />
              <span className={selectedFontObj.fontClass}>{t.whatsappContact}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
