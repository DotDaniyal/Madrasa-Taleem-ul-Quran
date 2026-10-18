import React from 'react';
import { TeacherPayroll, Teacher } from '../../types';
import { formatPKR } from '../../utils/excelBiometricEngine';
import { Printer, X, Sparkles, Building2, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface PrintableSalarySlipProps {
  payroll: TeacherPayroll;
  teacher?: Teacher;
  isOpen: boolean;
  onClose: () => void;
  isUrdu: boolean;
  siteNameUr?: string;
  siteNameEn?: string;
}

export const PrintableSalarySlip: React.FC<PrintableSalarySlipProps> = ({
  payroll,
  teacher,
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

  const bioId = payroll.biometricId || teacher?.biometricId || teacher?.id || 'T-101';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden print:shadow-none print:w-full print:rounded-none">
        
        {/* Header - Screen Only */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/20 text-amber-300 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-urdu">
                {isUrdu ? 'سرکاری ماہانہ سیلری سلپ (ڈیجیٹل)' : 'Official Monthly Salary Slip'}
              </h3>
              <p className="text-xs text-emerald-200 font-mono">
                {payroll.month} | ID: {bioId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md cursor-pointer font-urdu"
            >
              <Printer className="w-4 h-4" />
              <span>{isUrdu ? 'سلپ پرنٹ کریں' : 'Print Slip'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-emerald-800 text-slate-200 rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Voucher Content */}
        <div className="p-8 space-y-6 font-urdu print:p-6 text-slate-800 bg-slate-50 print:bg-white">
          
          {/* Header Banner */}
          <div className="text-center border-b-2 border-emerald-800 pb-5 space-y-1">
            <div className="inline-flex items-center gap-2 text-emerald-900 font-bold text-xs bg-emerald-100 px-3 py-1 rounded-full">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isUrdu ? siteNameUr : siteNameEn}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 pt-1">
              {isUrdu ? 'ماہانہ تنخواہ سلپ / ووچر' : 'Monthly Salary Slip / Voucher'}
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              برائے ماہ: {payroll.month} | تاریخ اجرا: {payroll.paymentDate || new Date().toISOString().split('T')[0]}
            </p>
          </div>

          {/* Teacher Info Grid */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block">{isUrdu ? 'نام استاد گرامی:' : 'Teacher Name:'}</span>
              <span className="text-sm font-extrabold text-slate-900">{payroll.teacherName || teacher?.fullName}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">{isUrdu ? 'بائیو میٹرک ID:' : 'Biometric ID:'}</span>
              <span className="text-sm font-extrabold text-emerald-800 font-mono">{bioId}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">{isUrdu ? 'فون نمبر:' : 'Phone Number:'}</span>
              <span className="font-mono text-slate-800">{teacher?.phoneNumber || '03001234567'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">{isUrdu ? 'ادائیگی سٹیٹس:' : 'Payment Status:'}</span>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                payroll.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                payroll.status === 'processing' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {payroll.status === 'paid' ? (isUrdu ? 'ادا شدہ (PAID)' : 'PAID') :
                 payroll.status === 'processing' ? (isUrdu ? 'زیرِ عمل (PROCESSING)' : 'PROCESSING') : (isUrdu ? 'واجب الادا (UNPAID)' : 'UNPAID')}
              </span>
            </div>
          </div>

          {/* Detailed Calculations Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-xs">
            <table className="w-full text-start">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 text-start">{isUrdu ? 'تفصیلات تنخواہ' : 'Salary Breakdown'}</th>
                  <th className="p-3 text-end">{isUrdu ? 'شمار / دنوں کی تعداد' : 'Count'}</th>
                  <th className="p-3 text-end">{isUrdu ? 'رقم (PKR)' : 'Amount (PKR)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-semibold text-slate-800">{isUrdu ? 'بنیادی ماہانہ مقررہ تنخواہ' : 'Base Monthly Salary'}</td>
                  <td className="p-3 text-end font-mono">30 Days</td>
                  <td className="p-3 text-end font-bold font-mono">{formatPKR(payroll.baseSalary || payroll.baseAmount)}</td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-700">{isUrdu ? 'کل حاضر ایام (Present Days)' : 'Total Present Days'}</td>
                  <td className="p-3 text-end font-mono font-bold text-emerald-700">{payroll.presentDays || 0} Days</td>
                  <td className="p-3 text-end font-mono text-slate-400">--</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="p-3 text-amber-900">{isUrdu ? 'تاخیر سے آمد کٹوتی (Late Penalties)' : 'Late Arrival Penalty'}</td>
                  <td className="p-3 text-end font-mono text-amber-900 font-bold">{payroll.lateArrivalsCount || 0} Times</td>
                  <td className="p-3 text-end font-mono font-bold text-amber-800">-{formatPKR(payroll.latePenaltyDeduction || 0)}</td>
                </tr>
                <tr className="bg-rose-50/50">
                  <td className="p-3 text-rose-900">{isUrdu ? 'غیر حاضری / رخصت کٹوتی (Absent Deduction)' : 'Unapproved Absent Deduction'}</td>
                  <td className="p-3 text-end font-mono text-rose-900 font-bold">{payroll.absentDaysCount || 0} Days</td>
                  <td className="p-3 text-end font-mono font-bold text-rose-800">-{formatPKR(payroll.absentDeduction || 0)}</td>
                </tr>
                {payroll.bonusAmount ? (
                  <tr className="bg-emerald-50/50">
                    <td className="p-3 text-emerald-900 font-bold">{isUrdu ? 'اضافی بونس / اعزازیہ' : 'Approved Bonus'}</td>
                    <td className="p-3 text-end font-mono text-emerald-900 font-bold">1</td>
                    <td className="p-3 text-end font-mono font-bold text-emerald-800">+{formatPKR(payroll.bonusAmount)}</td>
                  </tr>
                ) : null}
              </tbody>
              <tfoot className="bg-emerald-950 text-white font-bold border-t border-emerald-900 text-sm">
                <tr>
                  <td className="p-4">{isUrdu ? 'خالص قابلِ ادائیگی رقم (NET PAYABLE)' : 'NET PAYABLE AMOUNT'}</td>
                  <td className="p-4 text-end font-mono text-amber-300" colSpan={2}>
                    {formatPKR(payroll.netSalary || payroll.netAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment Mode Details if Paid */}
          {payroll.status === 'paid' && (
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{isUrdu ? 'ادائیگی موصول کی تصدیق' : 'Payment Confirmation'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                <span>طریقہ: {payroll.paymentMethod || 'CASH'}</span>
                <span>تاریخ: {payroll.paymentDate || '2026-10-17'}</span>
                <span>ٹرانزیکشن #: {payroll.referenceNo || 'TXN-987654'}</span>
              </div>
            </div>
          )}

          {/* Signatures & Stamp */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-xs text-center font-bold">
            <div className="space-y-8">
              <div className="border-b-2 border-slate-400 w-3/4 mx-auto"></div>
              <p>{isUrdu ? 'دستخط استادِ گرامی (وصول کنندہ)' : 'Teacher Signature'}</p>
            </div>
            <div className="space-y-8">
              <div className="border-b-2 border-slate-400 w-3/4 mx-auto"></div>
              <p>{isUrdu ? 'دستخط / مہر مہتمم (مدرسہ فریال مسجد)' : 'Principal / Admin Stamp'}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
