import React from 'react';
import { Language } from '../types';
import { 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Award, 
  Clock, 
  Calendar, 
  GraduationCap,
  Sparkles,
  ArrowUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { SiteSettings, FooterConfig } from '../data/cmsInitialData';

interface FooterProps {
  currentLang: Language;
  setActiveTab: (tab: string) => void;
  settings?: SiteSettings;
  footerConfig?: FooterConfig;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, setActiveTab, settings, footerConfig }) => {
  const isUrdu = currentLang === 'ur';
  const currentYear = new Date().getFullYear();

  const t = {
    ur: {
      urduTitle: settings?.siteNameUr || 'مدرسہ تعلیم القرآن فریال مسجد',
      englishTitle: settings?.siteNameEn || 'Madrasa Taleem-ul-Quran Faryal Masjid',
      desc: footerConfig?.aboutTextUr || 'حفظِ قرآن کریم، ناظرہ مع تجوید اور اخلاقی و دینی تربیت کا مستند اور باوقار ادارہ۔ تقریباً 400 طلبہ زیرِ تعلیم اور 22 اساتذہ کرام کی زیرِ نگرانی معیاری تدریس۔',
      quickLinks: footerConfig?.quickLinksTitleUr || 'فوری روابط',
      home: 'ہوم پیج',
      about: 'تعارفِ مدرسہ',
      programs: 'تعلیمی پروگرامز',
      hifz: 'شعبہ حفظ القرآن',
      nazra: 'ناظرہ مع تجوید',
      schedule: 'اوقات و شیڈول',
      admissions: 'آن لائن داخلہ',
      gallery: 'شعبہ جات و سہولیات',
      announcements: 'اعلانات و نوٹس',
      contact: footerConfig?.contactTitleUr || 'رابطہ کی تفصیلات',
      contactInfo: 'رابطہ و معلومات',
      phone: settings?.phone || '+92 300 1234567',
      email: settings?.email || 'contact@madrasataleemulquran.edu.pk',
      address: settings?.addressUr || 'فریال مسجد، کراچی، پاکستان',
      scheduleTitle: 'تعلیمی اوقات و تعطیل',
      teachingDays: 'ہفتہ تا جمعرات: باقاعدہ تدریسی نشستیں',
      morningSession: 'صبح کی نشست: 7:30 بجے تا 12:00 بجے دوپہر',
      afternoonSession: 'بعد دوپہر: 2:30 بجے تا نمازِ عصر',
      holiday: 'جمعہ: ہفتہ وار تعطیل (نمازِ جمعہ)',
      prayerDiscipline: 'پنج وقتہ نماز باجماعت تکبیرِ اولیٰ کا اہتمام',
      rights: footerConfig?.copyrightUr || `جملہ حقوق محفوظ ہیں۔ مدرسہ تعلیم القرآن فریال مسجد © ${currentYear}`,
      motto: 'خلوصِ نیت اور خدمتِ قرآن',
      backToTop: 'اوپر جائیں'
    },
    en: {
      urduTitle: settings?.siteNameUr || 'مدرسہ تعلیم القرآن فریال مسجد',
      englishTitle: settings?.siteNameEn || 'Madrasa Taleem-ul-Quran Faryal Masjid',
      desc: footerConfig?.aboutTextEn || 'An authentic Islamic institution dedicated to Quran memorization (Hifz), recitation with Tajweed, and character building. Approximately 400 students guided by 22 qualified teachers.',
      quickLinks: footerConfig?.quickLinksTitleEn || 'Quick Links',
      home: 'Home',
      about: 'About Madrasa',
      programs: 'Academic Programs',
      hifz: 'Hifz Department',
      nazra: 'Nazra with Tajweed',
      schedule: 'Schedule & Timetable',
      admissions: 'Online Admissions',
      gallery: 'Departments & Facilities',
      announcements: 'Notices & Board',
      contact: footerConfig?.contactTitleEn || 'Contact Details',
      contactInfo: 'Get in Touch',
      phone: settings?.phone || '+92 300 1234567',
      email: settings?.email || 'contact@madrasataleemulquran.edu.pk',
      address: settings?.addressEn || 'Faryal Masjid, Karachi, Pakistan',
      scheduleTitle: 'Academic Timetable & Recess',
      teachingDays: 'Saturday to Thursday: Classes in Session',
      morningSession: 'Morning Session: 7:30 AM – 12:00 PM',
      afternoonSession: 'Afternoon Session: 2:30 PM – Asr Prayer',
      holiday: 'Friday: Weekly Holiday (Jummah)',
      prayerDiscipline: 'Congregational Prayer with Takbeer-e-Ula',
      rights: footerConfig?.copyrightEn || `All Rights Reserved. Madrasa Taleem-ul-Quran Faryal Masjid © ${currentYear}`,
      motto: 'Devotion & Service to the Holy Quran',
      backToTop: 'Back to Top'
    }
  }[currentLang];

  const handleLinkClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t-4 border-amber-400 relative overflow-hidden" aria-label="Madrasa Footer">
      
      {/* Decorative Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-repeat bg-center pointer-events-none" style={{ backgroundImage: "radial-gradient(#f59e0b 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        
        {/* Main 4-Column Grid Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12"
        >
          
          {/* Column 1: Institutional Branding Area */}
          <div className="space-y-4">
            
            {/* Centered / Aligned Logo Crest & Title */}
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white border border-amber-400/60 flex items-center justify-center shadow-md shadow-emerald-950 shrink-0 mt-1 overflow-hidden p-0.5">
                <img 
                  src={settings?.logoUrl || '/images/madrasa-logo.jpeg'} 
                  alt="Madrasa Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white font-urdu leading-snug">
                  {t.urduTitle}
                </h2>
                <p className="text-xs text-amber-300/90 font-medium font-sans mt-0.5">
                  {t.englishTitle}
                </p>
              </div>
            </div>

            {/* Verified Description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-urdu">
              {t.desc}
            </p>

            {/* Verified Statistics Badge */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-urdu font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{isUrdu ? 'تقریباً 400 طلبہ' : '~400 Students'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-urdu font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{isUrdu ? '22 اساتذہ کرام' : '22 Asatizah'}</span>
              </span>
            </div>

          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 pb-2 border-b border-slate-800 font-urdu flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.quickLinks}</span>
            </h3>
            
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  type="button"
                  onClick={() => handleLinkClick('home')} 
                  className="hover:text-amber-400 text-slate-300 transition-colors cursor-pointer font-urdu inline-flex items-center gap-2 focus:outline-none focus:text-amber-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{t.home}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => handleLinkClick('about')} 
                  className="hover:text-amber-400 text-slate-300 transition-colors cursor-pointer font-urdu inline-flex items-center gap-2 focus:outline-none focus:text-amber-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{t.about}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => handleLinkClick('programs')} 
                  className="hover:text-amber-400 text-slate-300 transition-colors cursor-pointer font-urdu inline-flex items-center gap-2 focus:outline-none focus:text-amber-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{t.programs} ({t.hifz} / {t.nazra})</span>
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => handleLinkClick('schedule')} 
                  className="hover:text-amber-400 text-slate-300 transition-colors cursor-pointer font-urdu inline-flex items-center gap-2 focus:outline-none focus:text-amber-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{t.schedule}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => handleLinkClick('admissions')} 
                  className="hover:text-amber-400 text-slate-300 transition-colors cursor-pointer font-urdu inline-flex items-center gap-2 focus:outline-none focus:text-amber-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{t.admissions}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => handleLinkClick('gallery')} 
                  className="hover:text-amber-400 text-slate-300 transition-colors cursor-pointer font-urdu inline-flex items-center gap-2 focus:outline-none focus:text-amber-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{t.gallery}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => handleLinkClick('contact')} 
                  className="hover:text-amber-400 text-slate-300 transition-colors cursor-pointer font-urdu inline-flex items-center gap-2 focus:outline-none focus:text-amber-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{t.contact}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 pb-2 border-b border-slate-800 font-urdu flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{t.contactInfo}</span>
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm">
              
              {/* Working Click-to-Call Link */}
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400 font-urdu">
                    {isUrdu ? 'دفتری رابطہ نمبر:' : 'Official Phone:'}
                  </span>
                  <a 
                    href={`tel:${t.phone.replace(/\s+/g, '')}`} 
                    className="font-mono text-emerald-300 hover:text-amber-300 transition-colors font-semibold"
                    dir="ltr"
                    aria-label="Call madrasa phone"
                  >
                    {t.phone}
                  </a>
                </div>
              </li>

              {/* Verified Email */}
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400 font-urdu">
                    {isUrdu ? 'ای میل برائے معلومات:' : 'Inquiry Email:'}
                  </span>
                  <a 
                    href={`mailto:${t.email}`} 
                    className="font-mono text-emerald-300 hover:text-amber-300 transition-colors text-xs break-all"
                  >
                    {t.email}
                  </a>
                </div>
              </li>

              {/* Verified Physical Address */}
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400 font-urdu">
                    {isUrdu ? 'مقام و پتہ:' : 'Location:'}
                  </span>
                  <span className="font-urdu text-slate-300 leading-normal">
                    {t.address}
                  </span>
                </div>
              </li>

            </ul>
          </div>

          {/* Column 4: Verified Weekly Schedule */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 pb-2 border-b border-slate-800 font-urdu flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{t.scheduleTitle}</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              
              {/* Saturday to Thursday */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="font-urdu font-bold text-emerald-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t.teachingDays}</span>
                </p>
                <p className="font-urdu text-slate-300 text-[11px]">
                  • {t.morningSession}
                </p>
                <p className="font-urdu text-slate-300 text-[11px]">
                  • {t.afternoonSession}
                </p>
              </div>

              {/* Friday Holiday Notice */}
              <div className="p-3 bg-emerald-950/70 rounded-xl border border-emerald-800/60 font-urdu text-amber-200">
                <p className="font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t.holiday}</span>
                </p>
              </div>

              {/* Daily Prayer Discipline */}
              <div className="px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-urdu flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.prayerDiscipline}</span>
              </div>

            </div>
          </div>

        </motion.div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-800/90 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-urdu">
          
          <p className="text-center sm:text-start">
            {t.rights}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Heart className="w-3.5 h-3.5 fill-amber-400" />
              <span>{t.motto}</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer text-[11px]"
              aria-label={t.backToTop}
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.backToTop}</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
