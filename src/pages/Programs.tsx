import React from 'react';
import { Language, Program } from '../types';
import { BookOpen, Award, CheckCircle, Clock, Users, Calendar, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface ProgramsProps {
  currentLang: Language;
  programs: Program[];
  setActiveTab: (tab: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ currentLang, programs, setActiveTab }) => {
  const isUrdu = currentLang === 'ur';

  const t = {
    ur: {
      title: 'تعلیمی پروگرامز اور نصاب',
      subtitle: 'مدرسہ تعلیم القرآن فریال مسجد میں قرآن مجید اور دینیات کے مختلف درجات کی تفصیل',
      duration: 'دورانیہ:',
      ageLimit: 'عمر کی حد:',
      timings: 'اوقات:',
      keyFeatures: 'نمایاں خصوصیات:',
      applyNow: 'اس پروگرام کے لیے داخلہ لیں',
    },
    en: {
      title: 'Educational Programs & Curriculum',
      subtitle: 'Detailed breakdown of Quranic and Islamic courses offered at Madrasa Taleem-ul-Quran Faryal Masjid',
      duration: 'Duration:',
      ageLimit: 'Age Limit:',
      timings: 'Timings:',
      keyFeatures: 'Key Features:',
      applyNow: 'Apply for this Program',
    }
  }[currentLang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-emerald-100 text-emerald-800 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm font-urdu">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>{isUrdu ? 'نصابِ تعلیم' : 'Curriculum'}</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-urdu">
          {t.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-urdu">
          {t.subtitle}
        </p>
      </div>

      {/* Programs List with Hover Animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map((prog, idx) => (
          <ScrollReveal key={prog.id} variant="fadeUp" delay={idx * 0.1}>
            <div 
              className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-8 flex flex-col justify-between hover-lift transition-all space-y-6 relative overflow-hidden group h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7 text-emerald-700 animate-bounce-subtle" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold border border-emerald-200 font-urdu">
                    {isUrdu ? 'تصدیق شدہ کورس' : 'Verified Course'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-urdu">
                  {isUrdu ? prog.titleUr : prog.titleEn}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-urdu">
                  {isUrdu ? prog.descUr : prog.descEn}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl font-urdu">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>{t.duration}</strong> {isUrdu ? prog.durationUr : prog.durationEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>{t.ageLimit}</strong> {isUrdu ? prog.ageUr : prog.ageEn}</span>
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>{t.timings}</strong> {isUrdu ? prog.timingsUr : prog.timingsEn}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-900 font-urdu">{t.keyFeatures}</h3>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-urdu">
                    {(isUrdu ? prog.featuresUr : prog.featuresEn).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 font-urdu">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>{isUrdu ? 'محدود نشستیں' : 'Limited Seats'}</span>
                </span>
                <button
                  onClick={() => { setActiveTab('admissions'); window.scrollTo(0,0); }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95 animate-shimmer font-urdu"
                >
                  <span>{t.applyNow}</span>
                  {isUrdu ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
};
