import React, { useState } from 'react';
import { Teacher, Student } from '../../types';
import { 
  parseTeachersFile, 
  parseStudentsFile, 
  downloadTeacherSampleTemplate, 
  downloadStudentSampleTemplate 
} from '../../utils/excelBiometricEngine';
import { Upload, Download, FileSpreadsheet, CheckCircle2, AlertCircle, X, Sparkles, UserCheck } from 'lucide-react';

interface BulkImporterModalProps {
  type: 'teacher' | 'student';
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (imported: (Teacher | Student)[]) => void;
  isUrdu: boolean;
}

export const BulkImporterModal: React.FC<BulkImporterModalProps> = ({
  type,
  isOpen,
  onClose,
  onImportSuccess,
  isUrdu
}) => {
  if (!isOpen) return null;

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const isTeacher = type === 'teacher';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg('');

    try {
      if (isTeacher) {
        const parsedTeachers = await parseTeachersFile(file);
        if (parsedTeachers.length === 0) {
          throw new Error(isUrdu ? 'فائل سے کوئی درست استاد کا ریکارڈ نہیں ملا' : 'No valid teacher profiles found in file');
        }
        onImportSuccess(parsedTeachers as Teacher[]);
      } else {
        const parsedStudents = await parseStudentsFile(file);
        if (parsedStudents.length === 0) {
          throw new Error(isUrdu ? 'فائل سے کوئی درست طالب علم کا ریکارڈ نہیں ملا' : 'No valid student profiles found in file');
        }
        onImportSuccess(parsedStudents as Student[]);
      }
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error processing Excel file');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 font-urdu">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {isTeacher 
                  ? (isUrdu ? 'اساتذہ بلک امپورٹ انجن (Excel / CSV)' : 'Teachers Bulk Excel Import')
                  : (isUrdu ? 'طلبہ بلک امپورٹ انجن (Excel / CSV)' : 'Students Bulk Excel Import')
                }
              </h3>
              <p className="text-xs text-slate-500">
                {isTeacher 
                  ? (isUrdu ? 'ایکسل فائل سے اساتذہ کے پروفائلز اور بائیو میٹرک شناختی کارڈز بنائیں' : 'Auto-create teacher profiles and biometric ID cards')
                  : (isUrdu ? 'ایکسل فائل سے طلبہ کا ریکارڈ، فیس ووچر اور شناختی کارڈز اپلوڈ کریں' : 'Auto-create student profiles, fee vouchers and student ID cards')
                }
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Instructions & Template Buttons */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
          <div className="font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isUrdu ? 'مطلوبہ کالمز کی فہرست:' : 'Required Excel Headers:'}</span>
          </div>

          <p className="font-mono text-[11px] bg-white p-2.5 rounded-xl border border-slate-200 text-emerald-900">
            {isTeacher 
              ? 'Teacher_ID, Full_Name, Phone_Number, Department_Program, Base_Monthly_Salary, Joining_Date'
              : 'Roll_No, Full_Name, Parent_Name, Parent_Phone, Program, Monthly_Fee, Admission_Date'
            }
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-slate-500 text-[11px]">{isUrdu ? 'نمونہ ایکسل ٹیمپلیٹ ڈاؤن لوڈ کریں:' : 'Download sample format:'}</span>
            <button
              onClick={() => isTeacher ? downloadTeacherSampleTemplate() : downloadStudentSampleTemplate()}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-3.5 py-1.5 rounded-xl font-extrabold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'ٹیمپلیٹ (Excel)' : 'Sample Excel Template'}</span>
            </button>
          </div>
        </div>

        {/* File Upload Box */}
        <label className="border-2 border-dashed border-emerald-600/40 hover:border-emerald-600 bg-emerald-50/40 hover:bg-emerald-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all space-y-2">
          <Upload className="w-10 h-10 text-emerald-800" />
          <span className="text-sm font-extrabold text-slate-900">
            {isUploading ? (isUrdu ? 'پروسیسنگ جاری ہے...' : 'Processing File...') : (isUrdu ? 'ایکسل (.xlsx / .csv) فائل منتخب کریں' : 'Click to Upload Excel (.xlsx / .csv) File')}
          </span>
          <span className="text-xs text-slate-500">
            {isUrdu ? 'فائل خودکار طریقے سے ریکارڈز اور بائیو میٹرک کارڈز تیار کرے گی' : 'Records and printable ID cards will be generated automatically'}
          </span>
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            className="hidden" 
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-bold text-xs"
          >
            {isUrdu ? 'منسوخ' : 'Cancel'}
          </button>
        </div>

      </div>
    </div>
  );
};
