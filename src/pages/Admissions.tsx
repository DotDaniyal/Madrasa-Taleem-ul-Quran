import React, { useState } from 'react';
import { CalligraphyFont, Language, Program, AdmissionApplication } from '../types';
import { BookOpen, ShieldCheck, CheckCircle2, User, Phone, MapPin, Calendar, AlertCircle, FileText, Check, Sparkles } from 'lucide-react';
import { CALLIGRAPHY_FONTS } from '../components/CalligraphyFontPicker';

interface AdmissionsProps {
  currentLang: Language;
  programs: Program[];
  onAddApplication: (app: AdmissionApplication) => void;
  currentFont: CalligraphyFont;
}

export const Admissions: React.FC<AdmissionsProps> = ({ currentLang, programs, onAddApplication, currentFont }) => {
  const isUrdu = currentLang === 'ur';
  const selectedFontObj = CALLIGRAPHY_FONTS.find(f => f.id === currentFont) || CALLIGRAPHY_FONTS[0];

  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [age, setAge] = useState('');
  const [programId, setProgramId] = useState(programs[0]?.id || 'hifz');
  const [currentLevelUr, setCurrentLevelUr] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [address, setAddress] = useState('');
  const [previousMadrasa, setPreviousMadrasa] = useState('');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = {
    ur: {
      title: 'آن لائن داخلہ اور رجسٹریشن',
      subtitle: 'مدرسہ تعلیم القرآن فریال مسجد میں داخلے کے لیے فارم پُر کریں',
      rulesTitle: 'داخلے کے بنیادی اصول اور طریقہ کار',
      rule1: 'طالب علم کی عمر کم از کم 5 یا 6 سال ہونی چاہیے (پروگرام کے لحاظ سے)۔',
      rule2: 'والد یا سرپرست کا تصدیق شدہ موبائل نمبر درج کرنا لازمی ہے۔',
      rule3: 'داخلے کی تصدیق مدرسہ انتظامیہ کی جانب سے انٹرویو اور ٹیسٹ کے بعد ہوگی۔',
      rule4: 'طالب علم کو مدرسے کے تمام قواعد و ضوابط کی پابندی کرنا ہوگی۔',
      formTitle: 'داخلہ درخواست فارم — آن لائن',
      studentName: 'طالب علم کا پورا نام *',
      fatherName: 'والد کا نام *',
      age: 'عمر (سال میں) *',
      programSelect: 'داخلے کا پروگرام *',
      currentLevel: 'موجودہ قرآنی سطح / تعلیم',
      guardianPhone: 'والد یا سرپرست کا موبائل نمبر (واٹس ایپ) *',
      address: 'رہائشی پتہ *',
      prevMadrasa: 'سابقہ مکتب یا مدرسہ (اگر کوئی ہو)',
      notes: 'کوئی خاص بات یا اضافی معلومات (اختیاری)',
      privacyConsent: 'میں تصدیق کرتا/کرتی ہوں کہ فراہم کردہ تمام معلومات درست ہیں اور میں مدرسے کے قوانین کا پابند ہوں۔ *',
      submitBtn: 'داخلہ درخواست جمع کروائیں',
      successTitle: 'داخلہ درخواست کامیابی سے جمع ہو گئی ہے!',
      successDesc: 'آپ کی درخواست مدرسہ انتظامیہ کو موصول ہو گئی ہے۔ آپ کا ایپلیکیشن آئی ڈی درج ذیل ہے۔ براہ کرم اسے محفوظ رکھیں۔',
      appIdLabel: 'ایپلیکیشن آئی ڈی:',
      submitAnother: 'ایک اور درخواست جمع کروائیں',
      fillRequired: 'براہ کرم تمام لازمی فیلڈز (ستارہ والے) پُر کریں اور رضامندی کے خانے پر نشان لگائیں۔'
    },
    en: {
      title: 'Online Admission & Registration',
      subtitle: 'Fill out the form below to apply for admission at Madrasa Taleem-ul-Quran Faryal Masjid',
      rulesTitle: 'Admission Rules & Procedure',
      rule1: 'Student age should be at least 5 or 6 years (depending on the program).',
      rule2: 'Providing verified parent or guardian mobile number is mandatory.',
      rule3: 'Admission confirmation is subject to interview and test by madrasa administration.',
      rule4: 'Students must strictly adhere to all madrasa rules and regulations.',
      formTitle: 'Online Admission Application Form',
      studentName: 'Student Full Name *',
      fatherName: 'Father Name *',
      age: 'Age (Years) *',
      programSelect: 'Admission Program *',
      currentLevel: 'Current Quranic Level / Education',
      guardianPhone: 'Guardian Mobile / WhatsApp *',
      address: 'Residential Address *',
      prevMadrasa: 'Previous Madrasa / School (If any)',
      notes: 'Additional Notes / Comments (Optional)',
      privacyConsent: 'I confirm that the provided information is accurate and agree to abide by madrasa rules. *',
      submitBtn: 'Submit Admission Application',
      successTitle: 'Admission Application Submitted Successfully!',
      successDesc: 'Your application has been received by the madrasa administration. Your application ID is below. Please save it for reference.',
      appIdLabel: 'Application ID:',
      submitAnother: 'Submit Another Application',
      fillRequired: 'Please fill out all required fields marked with * and check the consent box.'
    }
  }[currentLang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !fatherName || !age || !guardianPhone || !address || !agreed) {
      setErrorMessage(t.fillRequired);
      return;
    }

    setErrorMessage(null);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `TMQ-2026-${randomNum}`;

    const newApp: AdmissionApplication = {
      id: newId,
      studentName,
      fatherName,
      age,
      programId,
      currentLevelUr: currentLevelUr || (isUrdu ? 'ابتدائی' : 'Beginner'),
      guardianPhone,
      address,
      previousMadrasa: previousMadrasa || '',
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddApplication(newApp);
    setSubmittedAppId(newId);
  };

  const handleReset = () => {
    setStudentName('');
    setFatherName('');
    setAge('');
    setCurrentLevelUr('');
    setGuardianPhone('');
    setAddress('');
    setPreviousMadrasa('');
    setNotes('');
    setAgreed(false);
    setSubmittedAppId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-amber-100 text-amber-900 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'داخلے 2026ء' : 'Admissions 2026'}</span>
        </span>
        <h1 className={`text-3xl sm:text-5xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>
          {t.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-urdu">
          {t.subtitle}
        </p>
      </div>

      {/* Rules Grid with Hover Lift */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200 space-y-4 shadow-sm hover-lift">
        <h2 className={`text-xl font-bold text-emerald-900 flex items-center gap-2 ${selectedFontObj.fontClass}`}>
          <ShieldCheck className="w-6 h-6 text-emerald-700 animate-bounce-subtle" />
          <span>{t.rulesTitle}</span>
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-700 font-urdu">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <span>{t.rule1}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <span>{t.rule2}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <span>{t.rule3}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <span>{t.rule4}</span>
          </li>
        </ul>
      </div>

      {/* Success Modal / Screen */}
      {submittedAppId ? (
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce-subtle">
            <Check className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className={`text-2xl sm:text-3xl font-bold text-slate-900 ${selectedFontObj.fontClass}`}>{t.successTitle}</h3>
            <p className="text-sm text-slate-600 font-urdu">{t.successDesc}</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border-2 border-emerald-300 inline-block">
            <p className="text-xs text-emerald-800 font-bold">{t.appIdLabel}</p>
            <p className="text-3xl font-mono font-bold text-emerald-950 tracking-widest mt-1" dir="ltr">{submittedAppId}</p>
          </div>
          <div>
            <button
              onClick={handleReset}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              <span className={selectedFontObj.fontClass}>{t.submitAnother}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Form Card */
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 sm:p-12 max-w-3xl mx-auto hover-lift">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className={`text-2xl font-bold text-slate-900 flex items-center gap-2 ${selectedFontObj.fontClass}`}>
                <FileText className="w-6 h-6 text-emerald-700" />
                <span>{t.formTitle}</span>
              </h2>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-2 font-urdu">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Student Name */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-slate-700 ${selectedFontObj.fontClass}`}>{t.studentName}</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder={isUrdu ? 'مثلاً محمد علی' : 'e.g., Muhammad Ali'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                />
              </div>

              {/* Father Name */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-slate-700 ${selectedFontObj.fontClass}`}>{t.fatherName}</label>
                <input
                  type="text"
                  required
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder={isUrdu ? 'مثلاً احمد خان' : 'e.g., Ahmed Khan'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-slate-700 ${selectedFontObj.fontClass}`}>{t.age}</label>
                <input
                  type="number"
                  required
                  min="4"
                  max="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 8"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                />
              </div>

              {/* Program Selection */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-slate-700 ${selectedFontObj.fontClass}`}>{t.programSelect}</label>
                <select
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {isUrdu ? p.titleUr : p.titleEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Quran Level */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-slate-700 ${selectedFontObj.fontClass}`}>{t.currentLevel}</label>
                <input
                  type="text"
                  value={currentLevelUr}
                  onChange={(e) => setCurrentLevelUr(e.target.value)}
                  placeholder={isUrdu ? 'مثلاً ناظرہ مکمل / قاعدہ' : 'e.g. Completed Qaida'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                />
              </div>

              {/* Guardian Phone */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-slate-700 ${selectedFontObj.fontClass}`}>{t.guardianPhone}</label>
                <input
                  type="text"
                  required
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  placeholder="0300-1234567"
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 text-right sm:text-left shadow-sm"
                />
              </div>

            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className={`text-xs font-bold text-slate-700 ${selectedFontObj.fontClass}`}>{t.address}</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={isUrdu ? 'گلی نمبر، محلہ، علاقہ اور شہر' : 'Street address, area, city'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Previous Madrasa */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-slate-700 ${selectedFontObj.fontClass}`}>{t.prevMadrasa}</label>
                <input
                  type="text"
                  value={previousMadrasa}
                  onChange={(e) => setPreviousMadrasa(e.target.value)}
                  placeholder={isUrdu ? 'اگر کوئی ہو تو لکھیں' : 'If any'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-slate-700 ${selectedFontObj.fontClass}`}>{t.notes}</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isUrdu ? 'کوئی اضافی معلومات' : 'Additional comments'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                />
              </div>
            </div>

            {/* Privacy Consent */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="consent"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="consent" className="text-xs text-slate-600 font-urdu cursor-pointer">
                {t.privacyConsent}
              </label>
            </div>

            {/* Submit Button with Shimmer Animation */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-700/25 transition-all cursor-pointer animate-shimmer hover:scale-[1.01] active:scale-95"
              >
                <span className={`text-base ${selectedFontObj.fontClass}`}>{t.submitBtn}</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
