import React, { useState } from 'react';
import { Language } from '../types';
import { 
  BookOpen, 
  Phone, 
  Menu, 
  X, 
  Globe, 
  Calendar, 
  Home, 
  Info, 
  GraduationCap, 
  Library, 
  Bell, 
  MessageSquare, 
  Lock,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { SiteSettings, NavItemConfig } from '../data/cmsInitialData';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings?: SiteSettings;
  navItemsConfig?: NavItemConfig[];
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentLang, 
  setLang, 
  activeTab, 
  setActiveTab,
  settings,
  navItemsConfig
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isUrdu = currentLang === 'ur';

  const t = {
    ur: {
      urduTitle: settings?.siteNameUr || 'مدرسہ تعلیم القرآن فریال مسجد',
      englishTitle: settings?.siteNameEn || 'Madrasa Taleem-ul-Quran Faryal Masjid',
      motto: settings?.mottoUr || 'حفظ و ناظرہ مع تجوید • اخلاقی و دینی تربیت کا مستند ادارہ',
      scheduleNotice: settings?.scheduleNoticeUr || 'تعلیمی شیڈول: ہفتہ تا جمعرات تدریسی نشستیں | جمعہ: ہفتہ وار تعطیل (جمعہ مبارک)',
      home: 'ہوم',
      about: 'تعارف',
      programs: 'پروگرامز',
      schedule: 'اوقات و شیڈول',
      admissions: 'آن لائن داخلہ',
      gallery: 'شعبہ جات',
      announcements: 'اعلانات',
      contact: 'رابطہ',
      admin: 'انتظامیہ',
      applyNow: 'داخلہ فارم',
      menuToggle: 'مینو',
      phone: settings?.phone || '+92 300 1234567'
    },
    en: {
      urduTitle: settings?.siteNameUr || 'مدرسہ تعلیم القرآن فریال مسجد',
      englishTitle: settings?.siteNameEn || 'Madrasa Taleem-ul-Quran Faryal Masjid',
      motto: settings?.mottoEn || 'Quran Memorization, Recitation & Tajweed • Certified Islamic Institution',
      scheduleNotice: settings?.scheduleNoticeEn || 'Academic Timetable: Saturday - Thursday Classes | Friday: Weekly Holiday (Jummah)',
      home: 'Home',
      about: 'About',
      programs: 'Programs',
      schedule: 'Schedule',
      admissions: 'Admissions',
      gallery: 'Departments',
      announcements: 'Announcements',
      contact: 'Contact',
      admin: 'Admin',
      applyNow: 'Apply Now',
      menuToggle: 'Menu',
      phone: settings?.phone || '+92 300 1234567'
    }
  }[currentLang];

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'about', label: t.about, icon: Info },
    { id: 'programs', label: t.programs, icon: GraduationCap },
    { id: 'schedule', label: t.schedule, icon: Clock },
    { id: 'admissions', label: t.admissions, icon: FileText },
    { id: 'gallery', label: t.gallery, icon: Library },
    { id: 'announcements', label: t.announcements, icon: Bell },
    { id: 'contact', label: t.contact, icon: MessageSquare },
    { id: 'admin', label: t.admin, icon: Lock },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    const nextLang = currentLang === 'ur' ? 'en' : 'ur';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  return (
    <header className="w-full bg-white text-slate-800 shadow-sm">
      
      {/* 1. TOP UTILITY STRIP (Verified Timetable Notice + Phone + Language Switcher) */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/80">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Confirmed Schedule Notice */}
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0">
              <Clock className="w-3 h-3" />
              <span>{isUrdu ? 'اوقات' : 'Timetable'}</span>
            </span>
            <span className="font-urdu leading-normal text-emerald-200 hidden sm:inline">
              {t.scheduleNotice}
            </span>
            <span className="font-urdu leading-normal text-emerald-200 sm:hidden">
              {isUrdu ? 'ہفتہ تا جمعرات تدریس | جمعہ تعطیل' : 'Sat-Thu Classes | Fri Holiday'}
            </span>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex items-center gap-3.5 text-xs ms-auto">
            {/* Click-to-call Phone Link */}
            <a 
              href={`tel:${t.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 text-emerald-200 hover:text-amber-300 transition-colors font-mono"
              aria-label="Call madrasa phone"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span dir="ltr">{t.phone}</span>
            </a>

            <span className="text-emerald-800">|</span>

            {/* Language Switcher */}
            <button 
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 bg-emerald-900/90 hover:bg-emerald-800 text-amber-200 hover:text-white px-2.5 py-1 rounded-md transition-all text-xs font-semibold cursor-pointer border border-emerald-700/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentLang === 'ur' ? 'English' : 'اردو'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. CENTERED BRANDING SECTION (Center Logo, Urdu Name, English Name) */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-100 bg-gradient-to-b from-emerald-50/40 via-white to-white relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Logo Element - Perfectly Centered, Preserving Official Crest */}
          <button 
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700 rounded-2xl p-1 transition-transform active:scale-95"
            aria-label="Go to Homepage"
          >
            {/* Official Madrasa Logo Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 border-emerald-700/40 flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300 relative overflow-hidden p-1">
              <img 
                src={settings?.logoUrl || '/images/madrasa-logo.jpeg'} 
                alt="مدرسہ تعلیم القرآن فریال مسجد لوگو" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Urdu Institution Name Directly Below Logo */}
            <h1 className="mt-3.5 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors font-urdu tracking-tight leading-relaxed sm:leading-loose">
              {t.urduTitle}
            </h1>

            {/* English Institution Name Neatly Beneath Urdu Name */}
            <p className="mt-1 text-xs sm:text-sm md:text-base font-semibold text-emerald-800 tracking-wide font-sans">
              {t.englishTitle}
            </p>

            {/* Refined Institutional Subtitle / Motto */}
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-300/60 text-emerald-900 text-[11px] sm:text-xs font-urdu font-medium">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>{t.motto}</span>
              <Sparkles className="w-3 h-3 text-amber-600" />
            </div>
          </button>

        </div>
      </div>

      {/* 3. DEDICATED NAVIGATION SECTION (Separate Horizontal Row) */}
      <nav 
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-200/80 shadow-sm"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Desktop Navigation Row */}
          <div className="hidden lg:flex items-center justify-between h-14">
            
            {/* Navigation Links Distributed Evenly */}
            <div className="flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      isActive 
                        ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-900/20' 
                        : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon 
                      className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} 
                      strokeWidth={2}
                    />
                    <span className="font-urdu whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Prominent Admission CTA on Desktop */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('admissions')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <Calendar className="w-4 h-4 text-emerald-950" strokeWidth={2.2} />
                <span className="font-urdu font-bold whitespace-nowrap">{t.applyNow}</span>
              </button>
            </div>

          </div>

          {/* Mobile & Tablet Header Bar */}
          <div className="flex lg:hidden items-center justify-between h-13 py-2">
            
            {/* Active Tab Indicator / Brand Mini Label */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-urdu">
                {navItems.find(i => i.id === activeTab)?.label || t.home}
              </span>
            </div>

            {/* Mobile Actions: CTA + Hamburger Menu Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('admissions')}
                className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm font-urdu cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.applyNow}</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700 inline-flex items-center gap-1.5"
                aria-expanded={mobileMenuOpen}
                aria-label={t.menuToggle}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-emerald-900" />
                ) : (
                  <Menu className="w-5 h-5 text-emerald-900" />
                )}
                <span className="text-xs font-urdu font-medium text-emerald-900">
                  {t.menuToggle}
                </span>
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Slide-Down Menu Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-emerald-100 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-800 text-white font-bold shadow-sm' 
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon 
                    className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} 
                    strokeWidth={2}
                  />
                  <span className="font-urdu text-sm sm:text-base">{item.label}</span>
                </button>
              );
            })}

            {/* Mobile Menu Footer Action */}
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('admissions')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer font-urdu"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>{t.applyNow}</span>
              </button>
            </div>
          </div>
        )}

      </nav>

    </header>
  );
};
