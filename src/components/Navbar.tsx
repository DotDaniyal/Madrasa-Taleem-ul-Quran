import React, { useState } from 'react';
import { Language } from '../types';
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
  Clock,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentLang, 
  setLang, 
  activeTab, 
  setActiveTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isUrdu = currentLang === 'ur';

  const t = {
    ur: {
      title: 'مدرسہ تعلیم القرآن فریال مسجد',
      subtitle: 'حفظ و ناظرہ و تجوید القرآن',
      scheduleNotice: 'تعلیمی شیڈول: ہفتہ تا جمعرات کلاسز جاری | جمعہ: ہفتہ وار تعطیل (جمعہ مبارک)',
      home: 'ہوم',
      about: 'تعارف',
      programs: 'پروگرامز',
      schedule: 'اوقات و شیڈول',
      admissions: 'داخلہ',
      gallery: 'شعبہ جات',
      announcements: 'اعلانات',
      contact: 'رابطہ',
      admin: 'انتظامیہ',
      applyNow: 'آن لائن داخلہ فارم',
      contactUs: 'رابطہ'
    },
    en: {
      title: 'Madrasa Taleem-ul-Quran Faryal Masjid',
      subtitle: 'Quran Memorization, Recitation & Tajweed',
      scheduleNotice: 'Academic Schedule: Sat - Thu Classes | Friday: Weekly Holiday (Jummah)',
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
      contactUs: 'Contact'
    }
  }[currentLang];

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'about', label: t.about, icon: Info },
    { id: 'programs', label: t.programs, icon: GraduationCap },
    { id: 'schedule', label: t.schedule, icon: Clock },
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
      
      {/* Top Banner with Schedule and Verified Contact */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Confirmed Schedule Notice */}
          <div className="flex items-center gap-2.5 text-center sm:text-right">
            <span className="bg-amber-500 text-emerald-950 text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />
              <span>{isUrdu ? 'اوقات' : 'Schedule'}</span>
            </span>
            <span className="font-medium font-urdu leading-normal">
              {t.scheduleNotice}
            </span>
          </div>

          {/* Quick Actions (Call & Language Switcher) */}
          <div className="flex items-center gap-4 text-xs shrink-0 pt-1 md:pt-0">
            <a 
              href="tel:+923001234567" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
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
              className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg transition-colors font-bold cursor-pointer border border-emerald-700"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang === 'ur' ? 'English' : 'اردو'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Brand Official Identity & Logo (Preserved) */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-amber-300" />
              </div>

              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight font-urdu">
                  {t.title}
                </h1>
                <p className="text-xs text-emerald-700 font-medium">
                  {t.subtitle}
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-emerald-800 text-white shadow-sm font-bold' 
                        : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span className="font-urdu">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons (Apply Now) */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => handleNavClick('admissions')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span className="font-urdu">{t.applyNow}</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-800 text-white font-bold shadow-sm' 
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span className="font-urdu">{item.label}</span>
                </button>
              );
            })}
            
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('admissions')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span className="font-urdu">{t.applyNow}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
