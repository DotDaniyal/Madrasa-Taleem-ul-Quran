import React from 'react';
import { Language } from '../types';
import { Calendar, Award, CheckCircle2, BookOpen, Sparkles, FileText, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

interface AcademicAssessmentsProps {
  currentLang: Language;
}

export const AcademicAssessments: React.FC<AcademicAssessmentsProps> = ({ currentLang }) => {
  const isUrdu = currentLang === 'ur';

  const t = {
    ur: {
      tag: 'تعلیمی نظام و تشخیص',
      title: 'ماہانہ جائزے اور سالانہ امتحانات',
      subtitle: 'طلبہ کی قرآنی و دینی پیش رفت، تجوید کی پختگی اور سالانہ تعلیمی کارکردگی کا جامع جائزہ نظام',
      
      monthlyTitle: 'ماہانہ جائزے',
      monthlySubtitle: 'Monthly Assessments',
      monthlyDesc: 'مدرسے میں ہر ماہ طلبہ کے اسباق، حفظ، ناظرہ اور تجوید کی جانچ کے لیے باقاعدہ ماہانہ جائزے منعقد کیے جاتے ہیں۔ یہ جائزے اساتذہ اور والدین دونوں کو طالب علم کی تعلیمی رفتار اور پیش رفت سے آگاہ رکھتے ہیں۔',
      monthlyPoint1: 'روزانہ نیا سبق، سبقی اور منزل کی پختگی کا جائزہ',
      monthlyPoint2: 'قواعدِ تجوید اور مخارج کی عملی درستگی کی جانچ',
      monthlyPoint3: 'طلبہ کی انفرادی صلاحیتوں اور کمزوریوں کی بروقت اصلاح',
      monthlyPoint4: 'والدین کو پیش رفت سے باخبر رکھنے کا مربوط نظام',

      annualTitle: 'سالانہ امتحانات',
      annualSubtitle: 'Annual Examinations',
      annualDesc: 'تعلیمی سال کے اختتام پر طلبہ کی سال بھر کی مسلسل محنت، حفظ اور قرآنی تعلیمات کا جامع سالانہ امتحان لیا جاتا ہے۔ یہ امتحانات طلبہ کی مجموعی تعلیمی قابلیت کا تفصیلی احاطہ کرتے ہیں، جس کے بعد سالانہ پروگرام میں کامیاب طلبہ کو اعزازات اور انعامات سے نوازا جاتا ہے۔',
      annualPoint1: 'پورے تعلیمی سال کے نصاب اور حفظ کا مکمل و مستند امتحان',
      annualPoint2: 'ممتاز اساتذہ اور قراء کرام کی زیرِ نگرانی غیر جانبدارانہ جائزہ',
      annualPoint3: 'اگلی جماعت یا اگلے پارے میں ترقی کی بنیاد',
      annualPoint4: 'سالانہ پروگرام میں نمازی و تعلیمی مقابلوں کے انعامات کی بنیاد',
    },
    en: {
      tag: 'Academic Evaluation & Progression',
      title: 'Monthly Assessments & Annual Examinations',
      subtitle: 'A structured evaluation system ensuring Quranic mastery, Tajweed fluency, and steady academic progression',

      monthlyTitle: 'Monthly Assessments',
      monthlySubtitle: 'ماہانہ جائزے',
      monthlyDesc: 'Regular monthly assessments are conducted to review each student’s ongoing progress in Quranic memorization, recitation, and Tajweed. These assessments keep mentors and parents closely informed about the student’s learning pace.',
      monthlyPoint1: 'Continuous review of daily Sabaq, Sabqi, and Manzil retention',
      monthlyPoint2: 'Evaluation of Tajweed rules application and phonetics precision',
      monthlyPoint3: 'Timely guidance to strengthen individual areas of improvement',
      monthlyPoint4: 'Regular progress updates communicated to guardians',

      annualTitle: 'Annual Examinations',
      annualSubtitle: 'سالانہ امتحانات',
      annualDesc: 'At the conclusion of the academic year, comprehensive annual examinations evaluate the student’s cumulative progress over the year. These examinations lead directly into the Annual Program, where successful and diligent students receive certificates and prizes.',
      annualPoint1: 'Rigorous assessment covering the complete academic year’s curriculum',
      annualPoint2: 'Evaluated under the supervision of senior qualified teachers and Huffaz',
      annualPoint3: 'Determines progression to subsequent levels and Quranic chapters',
      annualPoint4: 'Provides the foundation for awards presented during the Annual Program',
    }
  }[currentLang];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="bg-emerald-100 text-emerald-900 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm font-urdu">
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.tag}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-urdu">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-urdu">
            {t.subtitle}
          </p>
        </div>

        {/* Two Distinct Evaluation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Monthly Assessments */}
          <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm hover-lift space-y-6 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-emerald-700" />
              </div>
              <span className="bg-emerald-100 text-emerald-900 text-xs px-3.5 py-1 rounded-full font-bold font-urdu">
                {isUrdu ? 'ماہانہ جائزہ' : 'Monthly Review'}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 font-urdu">
                {t.monthlyTitle}
              </h3>
              <p className="text-xs text-emerald-700 font-medium font-urdu">
                {t.monthlySubtitle}
              </p>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed font-urdu">
              {t.monthlyDesc}
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-urdu pt-2 border-t border-slate-100">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.monthlyPoint1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.monthlyPoint2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.monthlyPoint3}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.monthlyPoint4}</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Annual Examinations */}
          <div className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-sm hover-lift space-y-6 relative overflow-hidden group ring-1 ring-amber-300/40">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-amber-700" />
              </div>
              <span className="bg-amber-100 text-amber-900 text-xs px-3.5 py-1 rounded-full font-bold font-urdu">
                {isUrdu ? 'سالانہ امتحانات' : 'Annual Exams'}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 font-urdu">
                {t.annualTitle}
              </h3>
              <p className="text-xs text-amber-800 font-medium font-urdu">
                {t.annualSubtitle}
              </p>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed font-urdu">
              {t.annualDesc}
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-urdu pt-2 border-t border-slate-100">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{t.annualPoint1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{t.annualPoint2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{t.annualPoint3}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{t.annualPoint4}</span>
              </li>
            </ul>
          </div>

        </div>

      </motion.div>
    </section>
  );
};
