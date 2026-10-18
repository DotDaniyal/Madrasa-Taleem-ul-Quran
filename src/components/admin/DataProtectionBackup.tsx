import React, { useState } from 'react';
import { FullAdminData } from '../../services/api';
import { exportToExcel, formatDateISO } from '../../utils/excelBiometricEngine';
import { 
  Database, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  FileSpreadsheet, 
  HardDrive 
} from 'lucide-react';

interface DataProtectionBackupProps {
  adminData: FullAdminData;
  onRestoreBackup: (restoredData: FullAdminData) => void;
  isUrdu: boolean;
}

export const DataProtectionBackup: React.FC<DataProtectionBackupProps> = ({
  adminData,
  onRestoreBackup,
  isUrdu
}) => {
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isRestoring, setIsRestoring] = useState<boolean>(false);

  // Download Full JSON Backup
  const handleDownloadJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(adminData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `madrasa_taleem_ul_quran_full_backup_${formatDateISO()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setSuccessMsg(isUrdu ? 'مکمل مدرسہ ڈیجیٹل بیک اپ JSON فائل ڈاؤن لوڈ ہو گئی!' : 'Full Madrasa JSON Backup downloaded successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Restore JSON Backup
  const handleRestoreJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsRestoring(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON data format');
        }

        onRestoreBackup(parsed as FullAdminData);
        setSuccessMsg(isUrdu ? 'مدرسہ ریکارڈز کامیابی سے بحال (Restore) کر دیے گئے!' : 'Madrasa records restored successfully from backup!');
        setTimeout(() => setSuccessMsg(''), 5000);
      } catch (err: any) {
        alert((isUrdu ? 'بیک اپ فائل ڈیکوڈ کرنے میں خرابی: ' : 'Failed to restore JSON backup: ') + err.message);
      } finally {
        setIsRestoring(false);
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  // Export specific module to Excel
  const handleExportModule = (moduleKey: 'students' | 'teachers' | 'payrolls' | 'fees' | 'punches') => {
    if (moduleKey === 'students') {
      const rows = (adminData.students || []).map((s, idx) => ({
        '#': idx + 1,
        'Roll No': s.rollNo || s.id,
        'Student Name': s.fullName || s.name || '',
        'Parent Name': s.parentName || s.fatherName || '',
        'Parent Phone': s.parentPhone || s.guardianPhone || '',
        'Program': s.programId,
        'Monthly Fee': s.monthlyFee || 0,
        'Admission Date': s.admissionDate || s.enrollmentDate || '',
        'Status': s.status
      }));
      exportToExcel('Madrasa_Students_Master', 'Students', rows);
    } else if (moduleKey === 'teachers') {
      const rows = (adminData.teachers || []).map((t, idx) => ({
        '#': idx + 1,
        'Teacher ID': t.id,
        'Biometric ID': t.biometricId || t.id,
        'Full Name': t.fullName,
        'Phone Number': t.phoneNumber,
        'Program': t.programId,
        'Base Monthly Salary': t.baseSalary,
        'Joining Date': t.joiningDate || '',
        'Status': t.status
      }));
      exportToExcel('Madrasa_Teachers_Master', 'Teachers', rows);
    } else if (moduleKey === 'payrolls') {
      const rows = (adminData.payrollRecords || []).map((p, idx) => ({
        '#': idx + 1,
        'Teacher Name': p.teacherName,
        'Biometric ID': p.biometricId,
        'Month': p.month,
        'Base Salary': p.baseSalary || p.baseAmount,
        'Late Penalty': p.latePenaltyDeduction || 0,
        'Absent Deduct': p.absentDeduction || 0,
        'Net Salary': p.netSalary || p.netAmount,
        'Status': p.status.toUpperCase(),
        'Payment Date': p.paymentDate || '',
        'Method': p.paymentMethod || ''
      }));
      exportToExcel('Madrasa_Payroll_Master', 'Payroll', rows);
    } else if (moduleKey === 'fees') {
      const rows = (adminData.feeVouchers || []).map((v, idx) => ({
        '#': idx + 1,
        'Roll No': v.studentRollNo,
        'Student Name': v.studentName,
        'Month': v.month,
        'Fee Amount': v.amount,
        'Status': v.status.toUpperCase(),
        'Paid Date': v.paidDate || '',
        'Receipt No': v.receiptNo || ''
      }));
      exportToExcel('Madrasa_Fee_Ledger_Master', 'Fee_Ledger', rows);
    } else if (moduleKey === 'punches') {
      const rows = (adminData.teacherPunches || []).map((p, idx) => ({
        '#': idx + 1,
        'Biometric ID': p.biometricId,
        'Date': p.date,
        'Check-In': p.checkInTime || '--',
        'Check-Out': p.checkOutTime || '--',
        'Status': p.status.toUpperCase(),
        'Notes': p.adminNotes || ''
      }));
      exportToExcel('Madrasa_Biometric_Punches', 'Attendance_Punches', rows);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-urdu">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span>{isUrdu ? '100% مفت لوکل سٹوریج محفوظ ڈیٹا انجن' : 'Zero-Cloud 100% Free Client-Side Storage'}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-urdu mt-1">
            {isUrdu ? 'ڈیٹا سیفٹی، بیک اپ و ریسٹور سینٹر' : 'Madrasa Data Protection & Excel Backup Center'}
          </h2>
          <p className="text-xs text-slate-500 font-urdu">
            {isUrdu ? 'لوکل ہوسٹ پر مستقل محفوظ ریکارڈز، سنگل کلک بیک اپ اور ایکسل برآمدگی' : 'Export and restore complete madrasa datasets anytime without cloud server costs'}
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 font-urdu text-xs font-bold">
          <HardDrive className="w-5 h-5 text-emerald-700" />
          <span>{isUrdu ? 'لوکل سٹوریج محفوظ ہے' : 'LocalStorage Active'}</span>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl font-bold text-sm flex items-center gap-2 font-urdu animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* JSON Backup & Restore Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-urdu">
        
        {/* Full JSON Download */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 rounded-3xl shadow-lg space-y-4 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-400/20 text-amber-300 rounded-2xl border border-amber-400/30">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold">{isUrdu ? 'مکمل مدرسہ ڈیٹا بیک اپ (JSON)' : 'Download Full JSON Backup'}</h3>
              <p className="text-xs text-emerald-200">{isUrdu ? 'تمام اساتذہ، طلبہ، حاضری لاگز، پے رول اور فیسیں ایک ہی فائل میں' : 'Safeguard all master records in a single restore file'}</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isUrdu 
              ? 'کسی بھی وقت اپنے کمپیوٹر یا موبائل پر بیک اپ ڈاؤن لوڈ کریں۔ براؤزر کیش صاف ہونے کی صورت میں فوری ری سٹور کر سکتے ہیں۔'
              : 'Download complete offline snapshot of all students, teachers, biometric punches, payroll sheets, and fee vouchers.'
            }
          </p>

          <button
            onClick={handleDownloadJSON}
            className="w-full bg-amber-500 hover:bg-amber-400 text-emerald-950 px-6 py-3.5 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Download className="w-5 h-5" />
            <span>{isUrdu ? 'مکمل بیک اپ JSON ڈاؤن لوڈ کریں' : 'Download Complete Backup JSON'}</span>
          </button>
        </div>

        {/* JSON Restore File */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-100 text-slate-800 rounded-2xl">
                <Upload className="w-6 h-6 text-emerald-800" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{isUrdu ? 'بیک اپ ریسٹور کریں (JSON Restore)' : 'Restore Backup from File'}</h3>
                <p className="text-xs text-slate-500">{isUrdu ? 'پہلے سے محفوظ شدہ بیک اپ فائل سے تمام ریکارڈز لوڈ کریں' : 'Import and replace active browser database'}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              {isUrdu 
                ? 'اپنی سابقہ محفوظ شدہ JSON بیک اپ فائل منتخب کریں تاکہ تمام ڈیٹا فوری طور پر ویب سائٹ میں بحال ہو جائے۔'
                : 'Upload a previously generated JSON backup file to instantly populate local storage.'
              }
            </p>
          </div>

          <label className="w-full bg-emerald-900 hover:bg-emerald-800 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md">
            <Upload className="w-5 h-5 text-amber-300" />
            <span>{isRestoring ? (isUrdu ? 'ریسٹور جاری...' : 'Restoring...') : (isUrdu ? 'JSON بیک اپ فائل منتخب کریں' : 'Upload JSON Backup File')}</span>
            <input 
              type="file" 
              accept=".json"
              className="hidden"
              onChange={handleRestoreJSON}
              disabled={isRestoring}
            />
          </label>
        </div>

      </div>

      {/* Module Excel Export Hub */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 font-urdu">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileSpreadsheet className="w-5 h-5 text-emerald-800" />
          <h3 className="text-lg font-extrabold text-slate-900">{isUrdu ? 'انفرادی ایکسل (Excel .xlsx) ایکسپورٹ ہب' : 'Module Excel Export Center'}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <button
            onClick={() => handleExportModule('students')}
            className="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl transition-all text-start flex items-center justify-between cursor-pointer"
          >
            <div>
              <span className="font-extrabold text-slate-900 block">{isUrdu ? 'تمام طلبہ کا مکمل ریکارڈ' : 'Students Master Record'}</span>
              <span className="text-[10px] text-slate-500">{(adminData.students || []).length} {isUrdu ? 'طلبہ' : 'Students'}</span>
            </div>
            <Download className="w-4 h-4 text-emerald-800" />
          </button>

          <button
            onClick={() => handleExportModule('teachers')}
            className="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl transition-all text-start flex items-center justify-between cursor-pointer"
          >
            <div>
              <span className="font-extrabold text-slate-900 block">{isUrdu ? 'اساتذہ کا مکمل ریکارڈ' : 'Teachers Master Record'}</span>
              <span className="text-[10px] text-slate-500">{(adminData.teachers || []).length} {isUrdu ? 'اساتذہ' : 'Teachers'}</span>
            </div>
            <Download className="w-4 h-4 text-emerald-800" />
          </button>

          <button
            onClick={() => handleExportModule('payrolls')}
            className="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl transition-all text-start flex items-center justify-between cursor-pointer"
          >
            <div>
              <span className="font-extrabold text-slate-900 block">{isUrdu ? 'پے رول رجسٹر' : 'Payroll Register'}</span>
              <span className="text-[10px] text-slate-500">{(adminData.payrollRecords || []).length} {isUrdu ? 'ریکارڈز' : 'Records'}</span>
            </div>
            <Download className="w-4 h-4 text-emerald-800" />
          </button>

          <button
            onClick={() => handleExportModule('fees')}
            className="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl transition-all text-start flex items-center justify-between cursor-pointer"
          >
            <div>
              <span className="font-extrabold text-slate-900 block">{isUrdu ? 'فیس رجسٹر چالان' : 'Fee Register'}</span>
              <span className="text-[10px] text-slate-500">{(adminData.feeVouchers || []).length} {isUrdu ? 'ووچرز' : 'Vouchers'}</span>
            </div>
            <Download className="w-4 h-4 text-emerald-800" />
          </button>

          <button
            onClick={() => handleExportModule('punches')}
            className="p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl transition-all text-start flex items-center justify-between cursor-pointer"
          >
            <div>
              <span className="font-extrabold text-slate-900 block">{isUrdu ? 'بائیو میٹرک حاضری پنچ لاگز' : 'Biometric Punch Logs'}</span>
              <span className="text-[10px] text-slate-500">{(adminData.teacherPunches || []).length} {isUrdu ? 'پنچ لاگز' : 'Punches'}</span>
            </div>
            <Download className="w-4 h-4 text-emerald-800" />
          </button>
        </div>
      </div>

    </div>
  );
};
