import React from 'react';
import { Teacher, Student } from '../../types';
import { Printer, X, Sparkles, User, GraduationCap, Phone, Calendar, ShieldCheck, QrCode } from 'lucide-react';

interface BiometricCardsModalProps {
  type: 'teacher' | 'student';
  items: (Teacher | Student)[];
  isOpen: boolean;
  onClose: () => void;
  isUrdu: boolean;
  siteNameUr?: string;
  siteNameEn?: string;
}

export const BiometricCardsModal: React.FC<BiometricCardsModalProps> = ({
  type,
  items,
  isOpen,
  onClose,
  isUrdu,
  siteNameUr = 'مدرسہ تعلیم القرآن فریال مسجد',
  siteNameEn = 'Madrasa Taleem-ul-Quran Faryal Masjid'
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden print:max-h-none print:shadow-none print:w-full print:rounded-none">
        
        {/* Header - Screen Only */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400/20 text-amber-300 rounded-xl border border-amber-400/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-urdu">
                {type === 'teacher' 
                  ? (isUrdu ? 'اساتذہ کے جدید بائیو میٹرک شناختی کارڈز' : 'Digital Staff Biometric Cards')
                  : (isUrdu ? 'طلبہ کے بائیو میٹرک شناختی کارڈز' : 'Digital Student ID Cards')
                }
              </h2>
              <p className="text-xs text-emerald-200">
                {isUrdu ? 'پرنٹ کے لیے تیار شاندار شناختی کارڈز' : 'Printable Official Biometric Cards'} ({items.length})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer font-urdu"
            >
              <Printer className="w-4 h-4" />
              <span>{isUrdu ? 'کارڈز پرنٹ کریں' : 'Print Cards'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 bg-emerald-800/80 hover:bg-emerald-700 text-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Cards Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100 print:bg-white print:p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4 print:p-4">
            {items.map((item) => {
              const isTeacher = type === 'teacher';
              const teacher = item as Teacher;
              const student = item as Student;

              const idCode = isTeacher ? (teacher.biometricId || teacher.id) : student.rollNo;
              const name = isTeacher ? teacher.fullName : student.fullName;
              const subTitle = isTeacher ? (teacher.designation || 'استادِ گرامی') : `والد: ${student.parentName}`;
              const phone = isTeacher ? teacher.phoneNumber : student.parentPhone;
              const program = isTeacher ? (teacher.programId === 'hifz' ? 'شعبہ تحفیظ القرآن' : 'شعبہ ناظرہ و تجوید') : (student.programId === 'hifz' ? 'شعبہ حفظ' : 'شعبہ ناظرہ');
              const extraDate = isTeacher ? (teacher.joiningDate || '2024') : (student.admissionDate || '2025');

              return (
                <div
                  key={item.id}
                  className="bg-white border-2 border-emerald-800/20 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between print:break-inside-avoid print:shadow-none print:border-emerald-800/40 relative"
                  style={{ width: '100%', minHeight: '260px' }}
                >
                  {/* Top Decorative Banner */}
                  <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white p-4 relative overflow-hidden flex items-center justify-between border-b-2 border-amber-400">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none"></div>
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-300 text-[10px] font-bold font-urdu tracking-wide">
                        <Sparkles className="w-3 h-3" />
                        <span>{isUrdu ? siteNameUr : siteNameEn}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-white font-urdu mt-0.5">
                        {isTeacher 
                          ? (isUrdu ? 'بائیو میٹرک سٹاف کارڈ' : 'Staff Biometric Card')
                          : (isUrdu ? 'طالب علم شناختی کارڈ' : 'Student Biometric Card')
                        }
                      </h3>
                    </div>
                    <div className="text-end">
                      <span className="bg-amber-400 text-emerald-950 font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-sm font-mono inline-block">
                        ID: {idCode}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex gap-4 items-center flex-1 bg-gradient-to-b from-white to-emerald-50/30">
                    {/* Left/Right Avatar or Photo Box */}
                    <div className="flex flex-col items-center justify-center space-y-2 shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100 border-2 border-emerald-600/30 text-emerald-800 flex items-center justify-center shadow-md">
                        {isTeacher ? <User className="w-10 h-10 text-emerald-800" /> : <GraduationCap className="w-10 h-10 text-emerald-800" />}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md font-urdu">
                        {program}
                      </span>
                    </div>

                    {/* Information */}
                    <div className="flex-1 space-y-1.5">
                      <h4 className="text-lg font-extrabold text-slate-900 font-urdu leading-tight">
                        {name}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-800 font-urdu">
                        {subTitle}
                      </p>

                      <div className="pt-1 space-y-1 text-xs text-slate-700">
                        <div className="flex items-center gap-1.5 font-urdu">
                          <Phone className="w-3.5 h-3.5 text-emerald-700" />
                          <span>رابطہ: {phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-urdu">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                          <span>تاریخ شمولیت: {extraDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="shrink-0 flex flex-col items-center justify-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                      <QrCode className="w-12 h-12 text-slate-800" />
                      <span className="text-[9px] font-mono text-slate-500 mt-1">VERIFIED</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-emerald-900 text-white px-4 py-2 text-[10px] flex items-center justify-between border-t border-emerald-800 font-urdu">
                    <span className="text-amber-300 font-semibold">فریال مسجد، نزد مین روڈ</span>
                    <span className="text-emerald-200">دستخط/مہر مہتمم: ________________</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
