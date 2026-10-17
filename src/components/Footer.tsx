import React from 'react';
import { Language } from '../types';
import { BookOpen, Phone, Mail, MapPin, Heart, Shield, Award, Clock } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, setActiveTab }) => {
  const isUrdu = currentLang === 'ur';

  const t = {
    ur: {
      title: 'مدرسہ تعلیم القرآن فریال مسجد',
      desc: 'قرآن مجید کی حفظ، ناظرہ، تجوید اور بنیادی دینی تعلیمات کا مستند اور باوقار ادارہ۔',
      quickLinks: 'فوری لنکس',
      home: 'ہوم پیج',
      about: 'تعارف مدرسہ',
      programs: 'تعلیمی پروگرامز',
      schedule: 'ہفتہ وار شیڈول',
      admissions: 'آن لائن داخلہ',
      gallery: 'شعبہ جات و سہولیات',
      announcements: 'اعلانات و نوٹس',
      contact: 'رابطہ کی تفصیلات',
      timings: 'اوقاتِ تعلیم و کار',
      timingVal: 'ہفتہ تا جمعرات: صبح 7:00 بجے تا مغرب',
      holidayNotice: 'جمعہ: ہفتہ وار تعطیل (نمازِ جمعہ)',
      address: 'مدرسہ تعلیم القرآن فریال مسجد، کراچی، پاکستان',
      rights: 'جملہ حقوق محفوظ ہیں۔ مدرسہ تعلیم القرآن فریال مسجد © 2026',
      contactInfo: 'رابطہ نمبر',
    },
    en: {
      title: 'Madrasa Taleem-ul-Quran Faryal Masjid',
      desc: 'An authentic and prestigious institution for Hifz, Nazra, Tajweed, and fundamental Islamic education.',
      quickLinks: 'Quick Links',
      home: 'Home',
      about: 'About Madrasa',
      programs: 'Educational Programs',
      schedule: 'Weekly Schedule',
      admissions: 'Online Admission',
      gallery: 'Departments & Facilities',
      announcements: 'Announcements',
      contact: 'Contact Details',
      timings: 'Academic & Office Timings',
      timingVal: 'Saturday to Thursday: 7:00 AM - Maghrib',
      holidayNotice: 'Friday: Weekly Holiday (Jummah Prayer)',
      address: 'Madrasa Taleem-ul-Quran Faryal Masjid, Karachi, Pakistan',
      rights: 'All rights reserved. Madrasa Taleem-ul-Quran Faryal Masjid © 2026',
      contactInfo: 'Contact Phone',
    }
  }[currentLang];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t-4 border-amber-400 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-islamic-pattern pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-lg animate-pulse-glow shrink-0">
                <BookOpen className="w-6 h-6 text-amber-300 animate-float" />
              </div>
              <h2 className="text-xl font-bold text-white font-urdu">
                {t.title}
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-urdu">
              {t.desc}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium pt-2">
              <Shield className="w-4 h-4" />
              <span className="font-urdu">{isUrdu ? 'تصدیق شدہ اور محفوظ دینی ادارہ' : 'Certified & Trusted Islamic Institute'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2 font-urdu">
              {t.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition-colors cursor-pointer font-urdu">
                  {t.home}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition-colors cursor-pointer font-urdu">
                  {t.about}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('programs'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition-colors cursor-pointer font-urdu">
                  {t.programs}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('schedule'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition-colors cursor-pointer font-urdu">
                  {t.schedule}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('admissions'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition-colors cursor-pointer font-urdu">
                  {t.admissions}
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('announcements'); window.scrollTo(0,0); }} className="hover:text-amber-400 transition-colors cursor-pointer font-urdu">
                  {t.announcements}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2 font-urdu">
              {t.contact}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0 animate-bounce-subtle" />
                <span className="font-urdu text-xs sm:text-sm">{t.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span dir="ltr" className="font-mono text-xs sm:text-sm">+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs sm:text-sm">info@faryalmadrasa.edu.pk</span>
              </li>
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2 font-urdu">
              {t.timings}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-urdu text-xs sm:text-sm">{t.timingVal}</span>
              </div>
              <div className="p-3.5 bg-emerald-950/60 rounded-2xl border border-emerald-800/40 text-xs text-amber-200 font-urdu">
                {t.holidayNotice}
              </div>
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 font-urdu">
                {isUrdu ? 'والدین ملاقات کا وقت: بروز اتوار صبح 9 بجے تا 12 بجے' : 'Parent Visit Hours: Sunday 9:00 AM - 12:00 PM'}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-urdu">
          <p>{t.rights}</p>
          <div className="flex items-center gap-2">
            <span>{isUrdu ? 'خلوصِ نیت اور خدمتِ قرآن' : 'Dedicated to Quranic Education'}</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};
