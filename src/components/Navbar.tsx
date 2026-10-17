import React, { useState, useEffect } from 'react';
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
  FileText,
  Heart
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isUrdu = currentLang === 'ur';

  // Monitor scroll for permanent sticky nav styling & progress bar with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 50);

          const winHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;
          const maxScroll = docHeight - winHeight;

          if (maxScroll > 0) {
            const progress = Math.min(Math.max((scrollY / maxScroll) * 100, 0), 100);
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      donate: 'عطیہ',
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
      donate: 'Donate',
      admin: 'Admin',
      applyNow: 'Apply Now',
      menuToggle: 'Menu',
      phone: settings?.phone || '+92 300 1234567'
    }
  }[currentLang];

  const defaultNavItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'about', label: t.about, icon: Info },
    { id: 'programs', label: t.programs, icon: GraduationCap },
    { id: 'schedule', label: t.schedule, icon: Clock },
    { id: 'admissions', label: t.admissions, icon: FileText },
    { id: 'gallery', label: t.gallery, icon: Library },
    { id: 'announcements', label: t.announcements, icon: Bell },
    { id: 'contact', label: t.contact, icon: MessageSquare },
    { id: 'donate', label: t.donate, icon: Heart },
    { id: 'admin', label: t.admin, icon: Lock },
  ];

  const navItems = defaultNavItems;

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

  const showProgressBar = settings?.animations?.enableScrollProgressBar !== false;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. BRANDING HEADER (Top Utility Strip + Large Centered Institutional Crest) */}
      {/* ========================================================================= */}
      <header className="w-full bg-white text-slate-800 border-b border-slate-100">
        
        {/* 1.1 TOP UTILITY STRIP (Timetable Notice + Click-to-call Phone + Language Switcher) */}
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

        {/* 1.2 CENTERED GRAND BRANDING SECTION */}
        <div className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50/40 via-white to-white relative">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            
            {/* Official Madrasa Logo Element */}
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

      </header>

      {/* ========================================================================= */}
      {/* 2. DEDICATED PERMANENT FIXED / STICKY NAVIGATION BAR                     */}
      {/* Stays firmly pinned at the top of the browser viewport during all scroll   */}
      {/* ========================================================================= */}
      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-emerald-950/10 border-b border-emerald-300' 
            : 'bg-white/98 backdrop-blur-sm shadow-xs border-b border-emerald-200/80'
        }`}
        style={{ position: 'sticky', top: 0, zIndex: 50 }}
        aria-label="Main Navigation"
      >
        {/* Subtle Scroll Progress Indicator Bar at Very Top of Nav */}
        {showProgressBar && (
          <div 
            className="h-[2.5px] bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Scroll Progress"
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ----------------- Desktop Navigation Row ----------------- */}
          <div className="hidden lg:flex items-center justify-between h-14">
            
            {/* Scrolled Mini-Brand: Reveals smoothly when user scrolls down */}
            <div 
              className={`transition-all duration-300 flex items-center gap-2.5 overflow-hidden shrink-0 ${
                isScrolled 
                  ? 'max-w-[280px] opacity-100 me-3' 
                  : 'max-w-0 opacity-0 pointer-events-none'
              }`}
            >
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 cursor-pointer text-start group py-1"
                title={t.urduTitle}
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-emerald-600/50 p-0.5 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <img
                    src={settings?.logoUrl || '/images/madrasa-logo.jpeg'}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="truncate max-w-[200px]">
                  <span className="block text-xs font-bold text-emerald-950 font-urdu truncate leading-tight group-hover:text-emerald-700">
                    {settings?.siteNameUr || 'مدرسہ تعلیم القرآن'}
                  </span>
                  <span className="block text-[10px] text-emerald-800 font-sans truncate leading-none">
                    {settings?.siteNameEn || 'Madrasa Taleem-ul-Quran'}
                  </span>
                </div>
              </button>
            </div>

            {/* Navigation Links Distributed Evenly */}
            <div className="flex items-center gap-1 xl:gap-2 overflow-x-auto no-scrollbar py-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600 hover-lift-subtle ${
                      isActive 
                        ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-900/20' 
                        : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/80 nav-link-underline'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon 
                      className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} 
                      strokeWidth={2}
                    />
                    <span className="font-urdu whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Prominent Admission CTA on Desktop */}
            <div className="flex items-center gap-2 shrink-0 ms-2">
              <button
                type="button"
                onClick={() => handleNavClick('admissions')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-emerald-950" strokeWidth={2.2} />
                <span className="font-urdu font-bold whitespace-nowrap">{t.applyNow}</span>
              </button>
            </div>

          </div>

          {/* ----------------- Mobile & Tablet Header Bar ----------------- */}
          <div className="flex lg:hidden items-center justify-between h-14 py-2">
            
            {/* Mobile Brand / Active Indicator */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-white border border-emerald-600/50 p-0.5 shrink-0 shadow-xs">
                  <img
                    src={settings?.logoUrl || '/images/madrasa-logo.jpeg'}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 font-urdu truncate max-w-[140px]">
                  {navItems.find(i => i.id === activeTab)?.label || t.home}
                </span>
              </button>
            </div>

            {/* Mobile Actions: CTA + Hamburger Menu Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('admissions')}
                className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm font-urdu cursor-pointer active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.applyNow}</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700 inline-flex items-center gap-1.5 active:scale-95"
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

        {/* ----------------- Mobile Slide-Down Menu Panel ----------------- */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-emerald-100 px-4 pt-3 pb-6 space-y-1.5 shadow-xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
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
    </>
  );
};
