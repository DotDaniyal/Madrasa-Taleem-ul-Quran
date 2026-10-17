import React from 'react';
import { Language, Teacher } from '../types';
import { BookOpen, ShieldCheck, Award, Users, CheckCircle, Heart, MapPin, Building, Sparkles, GraduationCap } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface AboutProps {
  currentLang: Language;
  teachers: Teacher[];
}

export const About: React.FC<AboutProps> = ({ currentLang, teachers }) => {
  const isUrdu = currentLang === 'ur';

  const t = {
    ur: {
      title: 'تعارف — مدرسہ تعلیم القرآن فریال مسجد',
      subtitle: 'قرآن مجید کی تعلیم، حفظ اور اخلاقی تربیت کا ایک روشن مینار',
      historyTitle: 'ادارے کی تاریخ اور پس منظر',
      historyDesc1: 'مدرسہ تعلیم القرآن فریال مسجد علاقے کے نونہالوں اور نوجوانوں کے لیے ایک مستند دینی اور روحانی تعلیمی مرکز ہے۔ اس ادارے کا قیام اس مبارک مقصد کے ساتھ عمل میں لایا گیا تھا کہ قرآنِ پاک کی صحیح تجوید، حفظ اور بنیادی اسلامی اخلاقیات کی پختہ تعلیم عام کی جائے۔',
      historyDesc2: 'الحمدللہ سالوں کی مسلسل محنت اور مخلص اساتذہ کرام کی شفقت کی بدولت یہاں سے باصلاحیت حفاظِ کرام اور ناظرہ خواں فارغ التحصیل ہو چکے ہیں جو دینِ حنیف کی خدمت میں مصروفِ عمل ہیں۔',
      missionTitle: 'ہمارا مشن اور ویژن',
      mission1: 'قرآنِ مجید کی صحیح اور تجوید کے ساتھ تعلیم عام کرنا۔',
      mission2: 'طلباء میں اخلاقِ حسنہ اور اسلامی اقدار کو فروغ دینا۔',
      mission3: 'محفوظ، پرسکون اور معیاری تعلیمی ماحول فراہم کرنا۔',
      teachersTitle: 'ہمارے قابلِ احترام اساتذہ کرام',
      teachersSubtitle: 'تجربہ کار، سند یافتہ اور شفقت کرنے والے اساتذہ کی زیرِ نگرانی تعلیم۔',
      facilitiesTitle: 'مدرسے کی نمایاں سہولیات',
      facility1: 'ہوا دار اور روشن کلاس رومز',
      facility2: 'موسمی حالات کے مطابق مناسب انتظامات',
      facility3: 'محفوظ اور نظم و ضبط سے بھرپور ماحول',
      facility4: 'باقاعدہ والدین کی کونسل اور کارکردگی رپورٹس'
    },
    en: {
      title: 'About Madrasa Taleem-ul-Quran Faryal Masjid',
      subtitle: 'A luminous beacon of Quranic education, Hifz, and moral upbringing',
      historyTitle: 'History & Background',
      historyDesc1: 'Madrasa Taleem-ul-Quran Faryal Masjid serves as a vital spiritual and educational sanctuary for youth and children. The institution was founded with the sincere dedication to equip the next generation with accurate Quranic recitation, memorization, and foundational Islamic character.',
      historyDesc2: 'Alhamdulillah, through years of dedicated service and compassionate faculty, numerous certified Huffaz and students have graduated, serving society with distinction.',
      missionTitle: 'Our Mission & Vision',
      mission1: 'Spreading accurate Quranic education with pristine Tajweed.',
      mission2: 'Instilling exemplary character and noble Islamic values.',
      mission3: 'Providing a safe, tranquil, and structured learning atmosphere.',
      teachersTitle: 'Our Respected Faculty Members',
      teachersSubtitle: 'Learning under the supervision of experienced, certified, and compassionate mentors.',
      facilitiesTitle: 'Key Madrasa Facilities',
      facility1: 'Well-ventilated and well-lit classrooms',
      facility2: 'Comfortable and clean study halls',
      facility3: 'Safe, disciplined, and spiritual atmosphere',
      facility4: 'Regular parent meetings and performance reports'
    }
  }[currentLang];

  const facilities = [t.facility1, t.facility2, t.facility3, t.facility4];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-4 border-2 border-emerald-500/30">
        <div className="absolute inset-0 opacity-10 bg-islamic-pattern"></div>
        <span className="relative z-10 bg-amber-400 text-emerald-950 text-xs px-3.5 py-1 rounded-full font-bold shadow-sm inline-flex items-center gap-1.5 animate-bounce-subtle">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-urdu">{isUrdu ? 'مستند دینی ادارہ' : 'Trusted Islamic Institute'}</span>
        </span>
        <h1 className="relative z-10 text-3xl sm:text-5xl font-bold font-urdu">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 border-r-4 border-emerald-600 pr-3 font-urdu">
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
            <h3 className="font-bold text-emerald-900 text-lg font-urdu">{t.missionTitle}</h3>
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

        {/* Institutional Crest Showcase */}
        <div className="relative">
          <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 rounded-3xl p-8 sm:p-10 border-2 border-amber-400/50 shadow-xl text-center space-y-6 text-white overflow-hidden">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-emerald-950 font-bold shadow-lg">
              <BookOpen className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-urdu">
                {isUrdu ? 'مدرسہ تعلیم القرآن فریال مسجد' : 'Madrasa Taleem-ul-Quran Faryal Masjid'}
              </h3>
              <p className="text-xs text-amber-200 font-urdu">
                {isUrdu ? 'خدمتِ قرآن و سنت کا مستند اور بااعتماد مرکز' : 'Authentic Center for Quranic and Sunnah Education'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 text-center">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <p className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono">15+</p>
                <p className="text-xs text-slate-300 font-urdu mt-1">{isUrdu ? 'سالہ خدمات' : 'Years of Service'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <p className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono">250+</p>
                <p className="text-xs text-slate-300 font-urdu mt-1">{isUrdu ? 'فارغ التحصیل حفاظ' : 'Graduated Huffaz'}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 text-xs text-emerald-200 font-urdu">
              {isUrdu 
                ? 'تمام تعلیمی سرگرمیاں وفاق المدارس اور اسلامی روایات کے عین مطابق منظم ہیں۔' 
                : 'All academic programs adhere strictly to authentic Islamic pedagogy and high moral standards.'}
            </div>
          </div>
        </div>
      </div>

      {/* Facilities with Animated Hover Lift */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center font-urdu">
          {t.facilitiesTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Building className="w-6 h-6 animate-bounce-subtle" />
              </div>
              <p className="text-sm font-bold text-slate-800 mt-2 font-urdu">{fac}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Teachers / Faculty */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-urdu">
            {t.teachersTitle}
          </h2>
          <p className="text-slate-600 text-sm font-urdu">
            {t.teachersSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher, idx) => (
            <ScrollReveal key={teacher.id} variant="fadeUp" delay={idx * 0.1}>
              <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden text-center group hover-lift transition-all flex flex-col justify-between h-full">
                
                {/* Dignified Monogram & Header */}
                <div className="p-8 bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white relative flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-emerald-950 text-2xl font-bold shadow-lg border-2 border-white/20 mb-4 group-hover:scale-105 transition-transform font-urdu">
                    {teacher.monogramUr}
                  </div>
                  <span className="bg-emerald-800/90 text-amber-300 text-xs px-3.5 py-1 rounded-full font-bold border border-emerald-700 font-urdu">
                    {isUrdu ? teacher.roleUr : teacher.roleEn}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 font-urdu">
                    {isUrdu ? teacher.nameUr : teacher.nameEn}
                  </h3>
                  <div className="space-y-1.5 text-xs text-slate-600 font-urdu">
                    <p className="font-semibold text-emerald-800">
                      {isUrdu ? teacher.qualificationUr : teacher.qualificationEn}
                    </p>
                    <p className="text-slate-500">
                      {isUrdu ? teacher.experienceUr : teacher.experienceEn}
                    </p>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

    </div>
  );
};
