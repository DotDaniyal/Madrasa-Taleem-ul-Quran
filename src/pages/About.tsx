import React from 'react';
import { CalligraphyFont, Language, Teacher } from '../types';
import { BookOpen, ShieldCheck, Award, Users, CheckCircle, Heart, MapPin, Building, Sparkles } from 'lucide-react';
import { CALLIGRAPHY_FONTS } from '../components/CalligraphyFontPicker';

interface AboutProps {
  currentLang: Language;
  teachers: Teacher[];
  currentFont: CalligraphyFont;
}

export const About: React.FC<AboutProps> = ({ currentLang, teachers, currentFont }) => {
  const isUrdu = currentLang === 'ur';
  const selectedFontObj = CALLIGRAPHY_FONTS.find(f => f.id === currentFont) || CALLIGRAPHY_FONTS[0];

  const t = {
    ur: {
      title: 'تعارف — مدرسہ تعلیم القرآن فریال مسجد',
      subtitle: 'قرآن مجید کی تعلیم، حفظ اور اخلاقی تربیت کا ایک روشن مینار',
      historyTitle: 'ادارے کی تاریخ اور پس منظر',
      historyDesc1: 'مدرسہ تعلیم القرآن فریال مسجد محلے اور گردونواح کے لیے دینی و روحانی تعلیم کا مرکز ہے۔ اس ادارے کی بنیاد اس پرخلوص جذبے کے ساتھ رکھی گئی تھی کہ نونہالوں اور نوجوانوں کو قرآنِ پاک کے صحیح تلفظ، حفظ اور ناظرہ سے آراستہ کیا جائے۔',
      historyDesc2: 'الحمدللہ سالوں کی محنت اور اساتذہ کرام کی لگن سے یہاں سے سیکڑوں حفاظِ کرام اور ناظرہ خوان فارغ التحصیل ہو چکے ہیں، جو ملک و بیرونِ ملک دینی خدمات سر انجام دے رہے ہیں۔',
      missionTitle: 'ہمارا مشن اور ویژن',
      mission1: 'قرآنِ مجید کی صحیح اور تجوید کے ساتھ تعلیم عام کرنا۔',
      mission2: 'طلباء میں اخلاقِ حسنہ اور اسلامی اقدار کو فروغ دینا۔',
      mission3: 'محفوظ، پرسکون اور معیاری تعلیمی ماحول فراہم کرنا۔',
      teachersTitle: 'ہمارے قابلِ احترام اساتذہ کرام',
      teachersSubtitle: 'تجربہ کار، سند یافتہ اور شفقت کرنے والے اساتذہ کی زیرِ نگرانی تعلیم۔',
      facilitiesTitle: 'مدرسے کی نمایاں سہولیات',
      facility1: 'ہوا دار اور روشن کلاس رومز',
      facility2: 'موسمی حالات کے مطابق کولنگ اور ہیٹنگ سسٹم',
      facility3: 'محفوظ اور نظم و ضبط سے بھرپور ماحول',
      facility4: 'باقاعدہ والدین کی کونسل اور کارکردگی رپورٹس'
    },
    en: {
      title: 'About Madrasa Taleem-ul-Quran Faryal Masjid',
      subtitle: 'A luminous beacon of Quranic education, Hifz, and moral upbringing',
      historyTitle: 'History & Background',
      historyDesc1: 'Madrasa Taleem-ul-Quran Faryal Masjid serves as a vital spiritual and educational hub for the community. The institution was founded with the sincere dedication to equip youth and children with accurate Quranic recitation, Hifz, and foundational Islamic knowledge.',
      historyDesc2: 'Alhamdulillah, through years of dedicated effort and our esteemed teachers, hundreds of Huffaz and students have graduated from here, serving communities locally and abroad.',
      missionTitle: 'Our Mission & Vision',
      mission1: 'Spreading accurate Quranic education with proper Tajweed.',
      mission2: 'Instilling good morals and Islamic values among students.',
      mission3: 'Providing a safe, peaceful, and quality educational environment.',
      teachersTitle: 'Our Respected Faculty Members',
      teachersSubtitle: 'Learning under the supervision of experienced, certified, and compassionate teachers.',
      facilitiesTitle: 'Key Madrasa Facilities',
      facility1: 'Well-ventilated and well-lit classrooms',
      facility2: 'Climate-controlled comfortable study spaces',
      facility3: 'Safe, disciplined, and structured environment',
      facility4: 'Regular parent meetings and progress updates'
    }
  }[currentLang];

  const facilities = [t.facility1, t.facility2, t.facility3, t.facility4];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner with Calligraphy and Shimmer */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-4 border-2 border-emerald-500/30">
        <div className="absolute inset-0 opacity-10 bg-islamic-pattern"></div>
        <span className="relative z-10 bg-amber-400 text-emerald-950 text-xs px-3.5 py-1 rounded-full font-bold shadow-sm inline-flex items-center gap-1.5 animate-bounce-subtle">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'مستند دینی ادارہ' : 'Trusted Institution'}</span>
        </span>
        <h1 className={`relative z-10 text-3xl sm:text-5xl font-bold ${selectedFontObj.fontClass}`}>
          {t.title}
        </h1>
        <p className="relative z-10 text-slate-200 text-sm sm:text-base max-w-2xl mx-auto font-urdu">
          {t.subtitle}
        </p>
      </div>

      {/* History & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className={`text-2xl sm:text-3xl font-bold text-slate-900 border-r-4 border-emerald-600 pr-3 ${selectedFontObj.fontClass}`}>
              {t.historyTitle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-urdu">
              {t.historyDesc1}
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-urdu">
              {t.historyDesc2}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-200 space-y-3 shadow-sm">
            <h3 className={`font-bold text-emerald-900 text-lg ${selectedFontObj.fontClass}`}>{t.missionTitle}</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-urdu">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.mission1}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.mission2}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.mission3}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
            alt="Madrasa Taleem-ul-Quran Faryal Masjid" 
            className="rounded-3xl shadow-xl w-full h-[400px] object-cover border-4 border-emerald-100 hover-lift"
          />
          <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 rounded-3xl shadow-2xl border-2 border-amber-400 hidden sm:block animate-float">
            <p className={`text-3xl font-bold ${selectedFontObj.fontClass}`}>15+</p>
            <p className="text-xs text-amber-200 font-urdu">{isUrdu ? 'سال کی کامیاب خدمات' : 'Years of Dedicated Service'}</p>
          </div>
        </div>
      </div>

      {/* Facilities with Animated Hover Lift */}
      <div className="space-y-6">
        <h2 className={`text-2xl sm:text-3xl font-bold text-slate-900 text-center ${selectedFontObj.fontClass}`}>
          {t.facilitiesTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Building className="w-6 h-6 animate-bounce-subtle" />
              </div>
              <p className={`text-sm font-bold text-slate-800 mt-2 ${selectedFontObj.fontClass}`}>{fac}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Teachers / Faculty */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className={`text-2xl sm:text-3xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
            {t.teachersTitle}
          </h2>
          <p className="text-slate-600 text-sm font-urdu">
            {t.teachersSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden text-center group hover-lift transition-all">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={teacher.imageUrl} 
                  alt={isUrdu ? teacher.nameUr : teacher.nameEn} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 justify-center">
                  <span className={`bg-amber-400 text-emerald-950 text-xs px-3.5 py-1 rounded-full font-bold shadow-md ${selectedFontObj.fontClass}`}>
                    {isUrdu ? teacher.roleUr : teacher.roleEn}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className={`text-xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
                  {isUrdu ? teacher.nameUr : teacher.nameEn}
                </h3>
                <p className="text-xs text-slate-600 font-urdu">
                  {isUrdu ? teacher.qualificationUr : teacher.qualificationEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
