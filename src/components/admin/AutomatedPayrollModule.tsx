import React, { useState, useEffect } from 'react';
import { Teacher, BiometricPunch, TeacherPayroll, BiometricSettings } from '../../types';
import { 
  calculateTeacherPayroll, 
  DEFAULT_BIOMETRIC_SETTINGS, 
  formatPKR, 
  exportToExcel 
} from '../../utils/excelBiometricEngine';
import { PrintableSalarySlip } from './PrintableSalarySlip';
import { 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Printer, 
  Download, 
  ArrowRight, 
  Filter, 
  Search, 
  RefreshCw, 
  ShieldCheck, 
  Plus, 
  Edit3 
} from 'lucide-react';

interface AutomatedPayrollModuleProps {
  teachers: Teacher[];
  punches: BiometricPunch[];
  payrolls: TeacherPayroll[];
  settings?: BiometricSettings;
  onSavePayrolls: (updatedPayrolls: TeacherPayroll[]) => void;
  isUrdu: boolean;
}

export const AutomatedPayrollModule: React.FC<AutomatedPayrollModuleProps> = ({
  teachers,
  punches = [],
  payrolls = [],
  settings = DEFAULT_BIOMETRIC_SETTINGS,
  onSavePayrolls,
  isUrdu
}) => {
  const currentMonthISO = new Date().toISOString().slice(0, 7); // e.g. "2026-10"
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthISO);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Printable slip state
  const [activeSlipPayroll, setActiveSlipPayroll] = useState<TeacherPayroll | null>(null);

  // Status Change Modal
  const [modalPayroll, setModalPayroll] = useState<TeacherPayroll | null>(null);
  const [newStatus, setNewStatus] = useState<TeacherPayroll['status']>('paid');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'jazzcash' | 'easypaisa' | 'cash'>('cash');
  const [refNo, setRefNo] = useState<string>('');
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Recalculate payroll sheet whenever selected month, teachers, or punches change
  useEffect(() => {
    const freshPayrolls = calculateTeacherPayroll(selectedMonth, teachers, punches, payrolls, settings);
    // Only update if there's a difference or new teachers
    const updatedMap = new Map(payrolls.map(p => [`${p.teacherId}_${p.month}`, p]));
    freshPayrolls.forEach(fp => {
      const key = `${fp.teacherId}_${fp.month}`;
      if (!updatedMap.has(key)) {
        updatedMap.set(key, fp);
      } else {
        // preserve status & payment details, but keep calculations up to date if unpaid
        const existing = updatedMap.get(key)!;
        if (existing.status === 'unpaid') {
          updatedMap.set(key, { ...fp, id: existing.id });
        }
      }
    });

    onSavePayrolls(Array.from(updatedMap.values()));
  }, [selectedMonth, teachers.length, punches.length]);

  // Filter payrolls for selected month
  const monthPayrolls = payrolls.filter(p => p.month === selectedMonth);

  // Display filtered list
  const displayPayrolls = monthPayrolls.filter(p => {
    const teacher = teachers.find(t => t.id === p.teacherId);
    const name = p.teacherName || teacher?.fullName || '';
    const bioId = p.biometricId || teacher?.biometricId || p.teacherId;

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bioId.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  // Calculate Summary Totals
  const totalBaseSalary = monthPayrolls.reduce((sum, p) => sum + (p.baseSalary || p.baseAmount || 0), 0);
  const totalDeductions = monthPayrolls.reduce((sum, p) => sum + (p.deductions || 0), 0);
  const totalNetPayable = monthPayrolls.reduce((sum, p) => sum + (p.netSalary || p.netAmount || 0), 0);

  const unpaidCount = monthPayrolls.filter(p => p.status === 'unpaid').length;
  const processingCount = monthPayrolls.filter(p => p.status === 'processing').length;
  const paidCount = monthPayrolls.filter(p => p.status === 'paid').length;

  // Handle Status Update
  const handleUpdateStatus = () => {
    if (!modalPayroll) return;

    const updated = payrolls.map(p => {
      if (p.id === modalPayroll.id) {
        return {
          ...p,
          status: newStatus,
          paymentMethod: newStatus === 'paid' ? paymentMethod : undefined,
          referenceNo: newStatus === 'paid' ? (refNo || `TXN-${Date.now().toString().slice(-6)}`) : undefined,
          paymentDate: newStatus === 'paid' ? paymentDate : undefined
        };
      }
      return p;
    });

    onSavePayrolls(updated);
    setModalPayroll(null);
  };

  // Export Sheet to Excel
  const handleExportExcel = () => {
    const exportRows = monthPayrolls.map((p, idx) => {
      const teacher = teachers.find(t => t.id === p.teacherId);
      return {
        '#': idx + 1,
        'Teacher Name': p.teacherName || teacher?.fullName,
        'Biometric ID': p.biometricId || teacher?.biometricId || p.teacherId,
        'Base Salary': p.baseSalary || p.baseAmount,
        'Working Days': p.workingDays || 30,
        'Present Days': p.presentDays || 0,
        'Late Count': p.lateArrivalsCount || 0,
        'Late Penalty': p.latePenaltyDeduction || 0,
        'Absent Days': p.absentDaysCount || 0,
        'Absent Deduction': p.absentDeduction || 0,
        'Bonus': p.bonusAmount || 0,
        'Net Payable': p.netSalary || p.netAmount,
        'Status': p.status.toUpperCase(),
        'Payment Date': p.paymentDate || '',
        'Payment Method': p.paymentMethod || '',
        'Ref No': p.referenceNo || ''
      };
    });

    exportToExcel(`Madrasa_Payroll_${selectedMonth}`, 'Payroll_Sheet', exportRows);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Quick Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-urdu">
            <DollarSign className="w-5 h-5 text-amber-500" />
            <span>{isUrdu ? 'خودکار ماہانہ پے رول و سیلری کٹوتی سسٹم' : 'Automated Penalty Payroll Engine'}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-urdu mt-1">
            {isUrdu ? 'اساتذہ ماہانہ تنخواہ و پے رول شیت' : 'Teacher Monthly Payroll Register'}
          </h2>
          <p className="text-xs text-slate-500 font-urdu">
            {isUrdu ? 'بائیو میٹرک تاخیر اور غیر حاضری کٹوتیوں کا خودکار حتمی پے رول ووچر' : 'Calculates exact net payable salaries after late & absent deductions'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Month Picker */}
          <div className="bg-emerald-950 text-white p-2 px-3 rounded-2xl flex items-center gap-2 text-xs font-bold font-urdu shadow-sm">
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>{isUrdu ? 'ماہ:' : 'Month:'}</span>
            <input 
              type="month" 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white/10 border border-emerald-500/40 text-white rounded-xl px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-300 font-mono"
            />
          </div>

          {/* Export Excel Button */}
          <button
            onClick={handleExportExcel}
            className="bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer font-urdu shadow-md shadow-emerald-900/10"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>{isUrdu ? 'پے رول شیت (Excel)' : 'Export Payroll Excel'}</span>
          </button>
        </div>
      </div>

      {/* Live Financial Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-500 font-urdu">{isUrdu ? 'کل بنیادی تنخواہ بجٹ' : 'Total Base Salary'}</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">{formatPKR(totalBaseSalary)}</h3>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm">
          <span className="text-xs font-bold text-rose-800 font-urdu">{isUrdu ? 'کل کٹوتیاں (تاخیر + غیر حاضری)' : 'Total Deductions'}</span>
          <h3 className="text-2xl font-extrabold text-rose-700 mt-1 font-mono">-{formatPKR(totalDeductions)}</h3>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-sm bg-gradient-to-br from-white to-emerald-50/50">
          <span className="text-xs font-bold text-emerald-900 font-urdu">{isUrdu ? 'خالص قابلِ ادائیگی رقم' : 'Net Salary Burden'}</span>
          <h3 className="text-2xl font-extrabold text-emerald-800 mt-1 font-mono">{formatPKR(totalNetPayable)}</h3>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1 text-xs font-urdu font-bold">
            <div className="text-emerald-700">{isUrdu ? `ادا شدہ: ${paidCount}` : `Paid: ${paidCount}`}</div>
            <div className="text-amber-700">{isUrdu ? `زیرِ عمل: ${processingCount}` : `Processing: ${processingCount}`}</div>
            <div className="text-rose-700">{isUrdu ? `واجب الادا: ${unpaidCount}` : `Unpaid: ${unpaidCount}`}</div>
          </div>
          <div className="p-3 bg-slate-100 rounded-2xl text-slate-700 font-extrabold text-sm font-mono">
            {monthPayrolls.length} {isUrdu ? 'اساتذہ' : 'Staff'}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isUrdu ? 'استاد یا ID سے تلاش کریں...' : 'Search teacher name or ID...'}
            className="w-full ps-9 pe-4 py-2 border border-slate-200 rounded-xl text-xs font-urdu focus:outline-none focus:ring-2 focus:ring-emerald-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto font-urdu text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-600">{isUrdu ? 'فلٹر سٹیٹس:' : 'Status Filter:'}</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-800"
          >
            <option value="all">{isUrdu ? 'تمام سٹیٹس' : 'All Statuses'}</option>
            <option value="unpaid">{isUrdu ? 'واجب الادا (Unpaid)' : 'Unpaid'}</option>
            <option value="processing">{isUrdu ? 'زیرِ عمل (Processing)' : 'Processing'}</option>
            <option value="paid">{isUrdu ? 'ادا شدہ (Paid)' : 'Paid'}</option>
          </select>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs text-slate-700">
            <thead className="bg-emerald-950 text-white font-urdu">
              <tr>
                <th className="p-4 text-start">#</th>
                <th className="p-4 text-start">{isUrdu ? 'استاد گرامی' : 'Teacher Name'}</th>
                <th className="p-4 text-start">{isUrdu ? 'بنیادی تنخواہ' : 'Base Salary'}</th>
                <th className="p-4 text-start">{isUrdu ? 'حاضر دن' : 'Present'}</th>
                <th className="p-4 text-start">{isUrdu ? 'لیٹ آمد (جرمانہ)' : 'Late Penalty'}</th>
                <th className="p-4 text-start">{isUrdu ? 'غیر حاضری (کٹوتی)' : 'Absent Deduct'}</th>
                <th className="p-4 text-start">{isUrdu ? 'خالص تنخواہ' : 'Net Salary'}</th>
                <th className="p-4 text-start">{isUrdu ? 'سٹیٹس' : 'Status'}</th>
                <th className="p-4 text-center">{isUrdu ? 'ایکشن' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-urdu">
              {displayPayrolls.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400 font-urdu">
                    {isUrdu ? 'اس ماہ کے لیے کوئی پے رول ریکارڈ نہیں ملا' : 'No payroll records found for selected month.'}
                  </td>
                </tr>
              ) : (
                displayPayrolls.map((p, index) => {
                  const teacher = teachers.find(t => t.id === p.teacherId);
                  const name = p.teacherName || teacher?.fullName || 'استاد';
                  const bioId = p.biometricId || teacher?.biometricId || p.teacherId;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-400">{index + 1}</td>
                      <td className="p-4">
                        <div className="font-extrabold text-slate-900">{name}</div>
                        <div className="text-[10px] text-emerald-800 font-mono font-bold">ID: {bioId}</div>
                      </td>
                      <td className="p-4 font-mono font-bold">{formatPKR(p.baseSalary || p.baseAmount)}</td>
                      <td className="p-4 font-mono font-bold text-emerald-700">{p.presentDays || 0} / 30</td>
                      <td className="p-4 font-mono text-amber-800 font-semibold">
                        -{formatPKR(p.latePenaltyDeduction || 0)}
                        <span className="text-[10px] text-slate-400 block font-urdu">({p.lateArrivalsCount || 0} بار)</span>
                      </td>
                      <td className="p-4 font-mono text-rose-800 font-semibold">
                        -{formatPKR(p.absentDeduction || 0)}
                        <span className="text-[10px] text-slate-400 block font-urdu">({p.absentDaysCount || 0} دن)</span>
                      </td>
                      <td className="p-4 font-mono font-extrabold text-emerald-900 text-sm">
                        {formatPKR(p.netSalary || p.netAmount)}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            setModalPayroll(p);
                            setNewStatus(p.status);
                            setPaymentMethod(p.paymentMethod || 'cash');
                            setRefNo(p.referenceNo || '');
                          }}
                          className={`px-3 py-1 rounded-full text-[11px] font-extrabold cursor-pointer border transition-all ${
                            p.status === 'paid' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                            p.status === 'processing' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                            'bg-rose-100 text-rose-800 border-rose-300'
                          }`}
                        >
                          {p.status === 'paid' ? (isUrdu ? 'ادا شدہ (Paid)' : 'Paid') :
                           p.status === 'processing' ? (isUrdu ? 'زیرِ عمل (In Process)' : 'Processing') :
                           (isUrdu ? 'واجب الادا (Unpaid)' : 'Unpaid')}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setActiveSlipPayroll(p)}
                          className="bg-emerald-900 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer mx-auto shadow-sm"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-300" />
                          <span>{isUrdu ? 'سلپ پرنٹ' : 'Print Slip'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Transition Modal */}
      {modalPayroll && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 font-urdu">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">
                {isUrdu ? 'تنخواہ ادائیگی سٹیٹس تبدیل کریں' : 'Update Payment Status'}
              </h3>
              <button onClick={() => setModalPayroll(null)} className="text-slate-400">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'مستقبل سٹیٹس:' : 'New Status:'}</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-urdu text-xs"
                >
                  <option value="unpaid">{isUrdu ? 'واجب الادا (Unpaid)' : 'Unpaid'}</option>
                  <option value="processing">{isUrdu ? 'زیرِ عمل (In Process)' : 'In Process'}</option>
                  <option value="paid">{isUrdu ? 'ادا شدہ (Paid)' : 'Paid'}</option>
                </select>
              </div>

              {newStatus === 'paid' && (
                <>
                  <div>
                    <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'ادائیگی کا ذریعہ:' : 'Payment Method:'}</label>
                    <select 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-urdu"
                    >
                      <option value="cash">{isUrdu ? 'کیش / نقد' : 'Cash'}</option>
                      <option value="bank_transfer">{isUrdu ? 'بینک ٹرانسفر' : 'Bank Transfer'}</option>
                      <option value="easypaisa">{isUrdu ? 'ایزی پیسہ (Easypaisa)' : 'Easypaisa'}</option>
                      <option value="jazzcash">{isUrdu ? 'جاز کیش (JazzCash)' : 'JazzCash'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'ٹرانزیکشن ریفرنس نمبر:' : 'Transaction Reference / Receipt No:'}</label>
                    <input 
                      type="text" 
                      value={refNo}
                      onChange={(e) => setRefNo(e.target.value)}
                      placeholder="e.g. TXN-123456"
                      className="w-full border border-slate-200 rounded-xl p-2.5 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'تاریخ ادائیگی:' : 'Payment Date:'}</label>
                    <input 
                      type="date" 
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-2.5 font-mono text-xs"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 font-urdu">
              <button 
                onClick={() => setModalPayroll(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold"
              >
                {isUrdu ? 'منسوخ' : 'Cancel'}
              </button>
              <button 
                onClick={handleUpdateStatus}
                className="px-5 py-2 bg-emerald-900 text-white rounded-xl font-bold"
              >
                {isUrdu ? 'سٹیٹس محفوظ کریں' : 'Save Status'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Salary Slip Modal */}
      {activeSlipPayroll && (
        <PrintableSalarySlip
          payroll={activeSlipPayroll}
          teacher={teachers.find(t => t.id === activeSlipPayroll.teacherId)}
          isOpen={!!activeSlipPayroll}
          onClose={() => setActiveSlipPayroll(null)}
          isUrdu={isUrdu}
        />
      )}

    </div>
  );
};
