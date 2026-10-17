import React, { useState } from 'react';
import { CalligraphyFont, Language } from '../types';
import { 
  BookOpen, 
  Phone, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  Calendar, 
  Home, 
  Info, 
  GraduationCap, 
  Image as ImageIcon, 
  Bell, 
  MessageSquare,
  Lock,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { CALLIGRAPHY_FONTS } from './CalligraphyFontPicker';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentFont: CalligraphyFont;
  setFont: (font: CalligraphyFont) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentLang, 
  setLang, 
  activeTab, 
  setActiveTab,
  currentFont,
  setFont
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const isUrdu = currentLang === 'ur';

  const selectedFontObj = CALLIGRAPHY_FONTS.find(f => f.id === currentFont) || CALLIGRAPHY_FONTS[0];

  const t = {
    ur: {
      title: 'مدرسہ تعلیم القرآن فریال مسجد',
      subtitle: 'حفظ و ناظرہ و تجوید',
      announcementsList: [
        'داخلے جاری ہیں برائے سال 2026ء — شعبہ حفظ، ناظرہ اور مکتب دینیات میں محدود نشستیں دستیاب ہیں!',
        'محفلِ حسنِ قرات و سالانہ دستار بندی تقریب رواں ماہ کے اختتام پر منعقد ہوگی۔',
        'مدرسہ میں کمپیوٹرائزڈ حاضری اور ہفتہ وار حفظ دہرائی کا منظم نظام فعال ہے۔'
      ],
      home: 'ہوم',
      about: 'تعارف',
      programs: 'پروگرامز',
      admissions: 'داخلہ',
      gallery: 'گیلری',
      announcements: 'اعلانات',
      contact: 'رابطہ',
      admin: 'انتظامیہ',
      applyNow: 'آن لائن داخلہ فارم',
      changeFont: 'خطاطی فونٹ',
      contactUs: 'رابطہ'
    },
    en: {
      title: 'Madrasa Taleem-ul-Quran Faryal Masjid',
      subtitle: 'Quranic Education & Hifz',
      announcementsList: [
        'Admissions Open for 2026 — Limited seats in Hifz, Nazra, and Deeniyat departments!',
        'Annual Qiraat gathering & Dastaarbandi ceremony will be held later this month.',
        'High standard Tajweed, revision monitoring, and moral training system.'
      ],
      home: 'Home',
      about: 'About',
      programs: 'Programs',
      admissions: 'Admissions',
      gallery: 'Gallery',
      announcements: 'Announcements',
      contact: 'Contact',
      admin: 'Admin',
      applyNow: 'Apply Now',
      changeFont: 'Calligraphy',
      contactUs: 'Contact'
    }
  }[currentLang];

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'about', label: t.about, icon: Info },
    { id: 'programs', label: t.programs, icon: GraduationCap },
    { id: 'admissions', label: t.admissions, icon: ShieldCheck },
    { id: 'gallery', label: t.gallery, icon: ImageIcon },
    { id: 'announcements', label: t.announcements, icon: Bell },
    { id: 'contact', label: t.contact, icon: MessageSquare },
    { id: 'admin', label: t.admin, icon: Lock },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      
      {/* Top Animated Announcement Ticker */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-emerald-100 text-xs py-2 px-4 overflow-hidden border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Marquee Container */}
          <div className="flex items-center gap-3 w-full md:w-3/4 overflow-hidden">
            <span className="shrink-0 bg-amber-500 text-emerald-950 text-[10px] px-2.5 py-0.5 rounded-full font-bold shadow-sm animate-pulse flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-spin-slow" />
              <span>{isUrdu ? 'اعلانات' : 'Notices'}</span>
            </span>

            {/* Seamless Animated Marquee Text */}
            <div className="overflow-hidden whitespace-nowrap relative w-full">
              <div className={isUrdu ? "animate-marquee-rtl flex gap-10" : "animate-marquee flex gap-10"}>
                {t.announcementsList.map((ann, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 font-medium">
                    <span className="text-amber-400">✦</span>
                    <span className={selectedFontObj.fontClass}>{ann}</span>
                  </span>
                ))}
                {/* Duplicate for seamless infinite loop */}
                {t.announcementsList.map((ann, idx) => (
                  <span key={`dup-${idx}`} className="inline-flex items-center gap-2 font-medium">
                    <span className="text-amber-400">✦</span>
                    <span className={selectedFontObj.fontClass}>{ann}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions (Calligraphy Dropdown, Call, Language Switcher) */}
          <div className="flex items-center gap-3 text-xs shrink-0 pt-1 md:pt-0">
            
            {/* Quick Calligraphy Script Switcher */}
            <div className="relative">
              <button
                onClick={() => setFontMenuOpen(!fontMenuOpen)}
                className="flex items-center gap-1 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-600/40 transition-colors font-medium cursor-pointer"
                title="خطاطی تبدیل کریں"
              >
                <span>✒️</span>
                <span className="text-[11px] font-bold">{selectedFontObj.nameUr.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-emerald-300" />
              </button>

              {fontMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-2xl shadow-2xl border border-emerald-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    {isUrdu ? 'خطاطی کا انداز منتخب کریں' : 'Choose Calligraphy Script'}
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {CALLIGRAPHY_FONTS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => { setFont(f.id); setFontMenuOpen(false); }}
                        className={`w-full text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 cursor-pointer ${
                          currentFont === f.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span className={f.fontClass}>{f.nameUr}</span>
                        {currentFont === f.id && <span className="text-emerald-600">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Call Link */}
            <a 
              href="tel:+923001234567" 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 animate-bounce-subtle" />
              <span dir="ltr" className="font-mono">+92 300 1234567</span>
            </a>

            {/* Language Switcher */}
            <button 
              onClick={() => { 
                const nextLang = currentLang === 'ur' ? 'en' : 'ur';
                setLang(nextLang); 
                document.documentElement.dir = nextLang === 'ur' ? 'rtl' : 'ltr'; 
                document.documentElement.lang = nextLang; 
              }}
              className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-2.5 py-1 rounded-lg transition-colors font-bold cursor-pointer shadow-sm hover:scale-105 transition-transform"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang === 'ur' ? 'English' : 'اردو'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-emerald-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Brand Logo and Calligraphic Identity */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 flex items-center justify-center text-white shadow-lg shadow-emerald-700/25 group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                  <BookOpen className="w-7 h-7 text-amber-300 animate-float" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-emerald-950">
                  ✦
                </div>
              </div>

              <div>
                <h1 className={`text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight ${selectedFontObj.fontClass}`}>
                  {t.title}
                </h1>
                <p className="text-xs text-emerald-700 font-semibold tracking-wide flex items-center gap-1">
                  <span>{t.subtitle}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-sans">
                    {selectedFontObj.nameUr.split(' ')[0]}
                  </span>
                </p>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                      isActive 
                        ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 font-bold' 
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300 animate-bounce-subtle' : 'text-slate-400'}`} />
                    <span className={selectedFontObj.fontClass}>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons (Apply Now with Shimmer Effect) */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => handleNavClick('admissions')}
                className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-700/25 transition-all flex items-center gap-2 cursor-pointer animate-shimmer hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span className={selectedFontObj.fontClass}>{t.applyNow}</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-700 text-white font-bold shadow-md' 
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span className={selectedFontObj.fontClass}>{item.label}</span>
                </button>
              );
            })}
            
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('admissions')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 animate-shimmer"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <span className={selectedFontObj.fontClass}>{t.applyNow}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
