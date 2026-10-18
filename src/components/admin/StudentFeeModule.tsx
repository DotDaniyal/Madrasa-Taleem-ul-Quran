import React, { useState, useEffect } from 'react';
import { Student, FeeVoucher } from '../../types';
import { 
  generateMonthlyFeeVouchers, 
  formatPKR, 
  exportToExcel 
} from '../../utils/excelBiometricEngine';
import { PrintableFeeReceipt } from './PrintableFeeReceipt';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Calendar, 
  UserCheck, 
  Sparkles, 
  Receipt, 
  X 
} from 'lucide-react';

interface StudentFeeModuleProps {
  students: Student[];
  vouchers: FeeVoucher[];
  onSaveVouchers: (updatedVouchers: FeeVoucher[]) => void;
  isUrdu: boolean;
}

export const StudentFeeModule: React.FC<StudentFeeModuleProps> = ({
  students,
  vouchers = [],
  onSaveVouchers,
  isUrdu
}) => {
  const currentMonthISO = new Date().toISOString().slice(0, 7); // "2026-10"
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthISO);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDefaultersOnly, setShowDefaultersOnly] = useState<boolean>(false);

  // Active printable receipt modal
  const [activeReceiptVoucher, setActiveReceiptVoucher] = useState<FeeVoucher | null>(null);

  // Collect Fee Modal
  const [collectVoucher, setCollectVoucher] = useState<FeeVoucher | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [receiptNo, setReceiptNo] = useState<string>('');

  // Auto-generate vouchers for selected month
  useEffect(() => {
    const updated = generateMonthlyFeeVouchers(selectedMonth, students, vouchers);
    onSaveVouchers(updated);
  }, [selectedMonth, students.length]);

  // Filter vouchers for selected month
  const monthVouchers = vouchers.filter(v => v.month === selectedMonth);

  // Filter display
  const displayVouchers = monthVouchers.filter(v => {
    const student = students.find(s => s.id === v.studentId);
    const name = v.studentName || student?.fullName || '';
    const roll = v.studentRollNo || student?.rollNo || '';

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          roll.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (showDefaultersOnly) {
      return v.status === 'unpaid';
    }

    if (statusFilter === 'all') return true;
    return v.status === statusFilter;
  });

  // Calculate Financial Summaries
  const totalExpected = monthVouchers.reduce((sum, v) => sum + (v.amount || 0), 0);
  const totalCollected = monthVouchers.filter(v => v.status === 'paid').reduce((sum, v) => sum + (v.amount || 0), 0);
  const totalRemaining = totalExpected - totalCollected;

  const paidCount = monthVouchers.filter(v => v.status === 'paid').length;
  const unpaidCount = monthVouchers.filter(v => v.status === 'unpaid').length;
  const waivedCount = monthVouchers.filter(v => v.status === 'waived').length;

  // Record Fee Payment
  const handleConfirmPayment = () => {
    if (!collectVoucher) return;

    const autoReceipt = receiptNo || `REC-${selectedMonth.replace('-', '')}-${collectVoucher.studentRollNo || '1001'}`;

    const updated = vouchers.map(v => {
      if (v.id === collectVoucher.id) {
        return {
          ...v,
          status: 'paid' as const,
          paidDate: paymentDate,
          paymentMethod,
          receiptNo: autoReceipt
        };
      }
      return v;
    });

    onSaveVouchers(updated);
    
    // Automatically trigger receipt print
    const paidVoucher = updated.find(v => v.id === collectVoucher.id);
    setCollectVoucher(null);
    if (paidVoucher) {
      setActiveReceiptVoucher(paidVoucher);
    }
  };

  // Toggle Waived status
  const handleToggleWaived = (vId: string) => {
    const updated = vouchers.map(v => {
      if (v.id === vId) {
        return {
          ...v,
          status: v.status === 'waived' ? ('unpaid' as const) : ('waived' as const)
        };
      }
      return v;
    });
    onSaveVouchers(updated);
  };

  // Export Fee Register to Excel
  const handleExportExcel = () => {
    const exportRows = monthVouchers.map((v, idx) => {
      const student = students.find(s => s.id === v.studentId);
      return {
        '#': idx + 1,
        'Roll No': v.studentRollNo || student?.rollNo,
        'Student Name': v.studentName || student?.fullName,
        'Parent Name': v.parentName || student?.parentName,
        'Month': v.month,
        'Fee Amount': v.amount,
        'Status': v.status.toUpperCase(),
        'Payment Date': v.paidDate || '',
        'Payment Method': v.paymentMethod || '',
        'Receipt No': v.receiptNo || ''
      };
    });

    exportToExcel(`Madrasa_Student_Fees_${selectedMonth}`, 'Fee_Ledger', exportRows);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Action Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-urdu">
            <CreditCard className="w-5 h-5 text-amber-500" />
            <span>{isUrdu ? 'طلبہ ماہانہ فیس و چالان انتظامیہ' : 'Student Fee Management Engine'}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-urdu mt-1">
            {isUrdu ? 'ماہانہ فیس ریکارڈ و ڈیجیٹل رسیدیں' : 'Student Monthly Fee Register & Receipts'}
          </h2>
          <p className="text-xs text-slate-500 font-urdu">
            {isUrdu ? 'خودکار چالان اجرا، فیس وصولی، ڈیجیٹل چالان رسیدیں اور نا دہندگان لسٹ' : 'Auto-generated fee vouchers, quick collection, printable receipts & defaulter lists'}
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

          {/* Export Fee Register to Excel */}
          <button
            onClick={handleExportExcel}
            className="bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer font-urdu shadow-md"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>{isUrdu ? 'فیس رجسٹر (Excel)' : 'Export Fee Excel'}</span>
          </button>
        </div>
      </div>

      {/* Summary Financial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-urdu">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-500">{isUrdu ? 'کل متوقع ماہانہ فیس' : 'Expected Fee Collection'}</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">{formatPKR(totalExpected)}</h3>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-sm bg-gradient-to-br from-white to-emerald-50/50">
          <span className="text-xs font-bold text-emerald-900">{isUrdu ? 'وصول شدہ فیس' : 'Fee Collected'}</span>
          <h3 className="text-2xl font-extrabold text-emerald-800 mt-1 font-mono">{formatPKR(totalCollected)}</h3>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm">
          <span className="text-xs font-bold text-rose-800">{isUrdu ? 'بقیہ / نا دہندگان فیس' : 'Remaining Fee Defaulters'}</span>
          <h3 className="text-2xl font-extrabold text-rose-700 mt-1 font-mono">{formatPKR(totalRemaining)}</h3>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div className="space-y-1 text-xs font-bold">
            <div className="text-emerald-700">{isUrdu ? `وصول شدہ: ${paidCount}` : `Paid: ${paidCount}`}</div>
            <div className="text-rose-700">{isUrdu ? `غیر ادا شدہ: ${unpaidCount}` : `Unpaid: ${unpaidCount}`}</div>
            <div className="text-amber-700">{isUrdu ? `معاف / مستحق: ${waivedCount}` : `Waived: ${waivedCount}`}</div>
          </div>
          <button
            onClick={() => setShowDefaultersOnly(!showDefaultersOnly)}
            className={`px-3 py-2 rounded-2xl text-xs font-bold cursor-pointer transition-all border ${
              showDefaultersOnly ? 'bg-rose-600 text-white border-rose-700' : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
            }`}
          >
            {showDefaultersOnly ? (isUrdu ? 'تمام طلبہ دکھائیں' : 'Show All') : (isUrdu ? 'فیس نادہندگان فلٹر' : 'Fee Defaulters Filter')}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 font-urdu text-xs">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isUrdu ? 'طالب علم کا نام یا رول نمبر تلاش کریں...' : 'Search student name or roll no...'}
            className="w-full ps-9 pe-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-600">{isUrdu ? 'سٹیٹس فلٹر:' : 'Status:'}</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setShowDefaultersOnly(false);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-800"
          >
            <option value="all">{isUrdu ? 'تمام سٹیٹس' : 'All'}</option>
            <option value="paid">{isUrdu ? 'وصول شدہ (Paid)' : 'Paid'}</option>
            <option value="unpaid">{isUrdu ? 'غیر ادا شدہ (Unpaid)' : 'Unpaid'}</option>
            <option value="waived">{isUrdu ? 'معاف / مستحق (Waived)' : 'Waived'}</option>
          </select>
        </div>
      </div>

      {/* Fee Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs text-slate-700">
            <thead className="bg-emerald-950 text-white font-urdu">
              <tr>
                <th className="p-4 text-start">#</th>
                <th className="p-4 text-start">{isUrdu ? 'رول نمبر' : 'Roll No'}</th>
                <th className="p-4 text-start">{isUrdu ? 'طالب علم' : 'Student Name'}</th>
                <th className="p-4 text-start">{isUrdu ? 'والد کا نام' : 'Parent Name'}</th>
                <th className="p-4 text-start">{isUrdu ? 'ماہانہ فیس' : 'Fee Amount'}</th>
                <th className="p-4 text-start">{isUrdu ? 'سٹیٹس' : 'Status'}</th>
                <th className="p-4 text-start">{isUrdu ? 'تاریخ و رسید #' : 'Date & Receipt'}</th>
                <th className="p-4 text-center">{isUrdu ? 'ایکشن' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-urdu">
              {displayVouchers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400 font-urdu">
                    {isUrdu ? 'منتخب فلٹر کے مطابق کوئی فیس ووچر نہیں ملا' : 'No fee vouchers found for selected filters.'}
                  </td>
                </tr>
              ) : (
                displayVouchers.map((v, index) => {
                  const student = students.find(s => s.id === v.studentId);
                  const name = v.studentName || student?.fullName || 'طالب علم';
                  const roll = v.studentRollNo || student?.rollNo || '--';
                  const parent = v.parentName || student?.parentName || '--';

                  return (
                    <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-400">{index + 1}</td>
                      <td className="p-4 font-mono font-bold text-emerald-800">{roll}</td>
                      <td className="p-4 font-extrabold text-slate-900">{name}</td>
                      <td className="p-4 font-semibold text-slate-700">{parent}</td>
                      <td className="p-4 font-mono font-extrabold text-emerald-900">{formatPKR(v.amount)}</td>
                      <td className="p-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-extrabold ${
                          v.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                          v.status === 'waived' ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {v.status === 'paid' ? (isUrdu ? 'وصول شدہ (Paid)' : 'Paid') :
                           v.status === 'waived' ? (isUrdu ? 'معاف (Waived)' : 'Waived') : (isUrdu ? 'غیر ادا شدہ (Unpaid)' : 'Unpaid')}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-slate-600">
                        {v.paidDate ? `${v.paidDate} (${v.receiptNo || 'REC'})` : '--'}
                      </td>
                      <td className="p-4 text-center space-x-2">
                        {v.status !== 'paid' ? (
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setCollectVoucher(v);
                                setPaymentDate(new Date().toISOString().split('T')[0]);
                                setReceiptNo(`REC-${selectedMonth.replace('-', '')}-${roll}`);
                              }}
                              className="bg-emerald-900 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-xl font-bold text-[11px] cursor-pointer shadow-sm"
                            >
                              {isUrdu ? 'فیس وصول کریں' : 'Collect Fee'}
                            </button>
                            <button
                              onClick={() => handleToggleWaived(v.id)}
                              className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-2 py-1.5 rounded-xl font-bold text-[10px] cursor-pointer"
                            >
                              {v.status === 'waived' ? (isUrdu ? 'ان ویو' : 'Unwaive') : (isUrdu ? 'معاف کریں' : 'Waive')}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setActiveReceiptVoucher(v)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-xl font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5 text-emerald-800" />
                            <span>{isUrdu ? 'رسید پرنٹ' : 'Print Receipt'}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Fee Modal */}
      {collectVoucher && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 font-urdu">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">
                {isUrdu ? 'طالب علم فیس وصولی اندارج' : 'Record Student Fee Collection'}
              </h3>
              <button onClick={() => setCollectVoucher(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-1 text-xs">
              <span className="text-slate-500 font-semibold block">{collectVoucher.studentName} (رول نمبر: {collectVoucher.studentRollNo})</span>
              <span className="text-lg font-extrabold text-emerald-950 font-mono block">{formatPKR(collectVoucher.amount)}</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'طریقہ ادائیگی:' : 'Payment Method:'}</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-urdu"
                >
                  <option value="cash">{isUrdu ? 'کیش / نقد' : 'Cash'}</option>
                  <option value="easypaisa">{isUrdu ? 'ایزی پیسہ (Easypaisa)' : 'Easypaisa'}</option>
                  <option value="jazzcash">{isUrdu ? 'جاز کیش (JazzCash)' : 'JazzCash'}</option>
                  <option value="bank_transfer">{isUrdu ? 'بینک ٹرانسفر' : 'Bank Transfer'}</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'رسید / چالان نمبر:' : 'Receipt Number:'}</label>
                <input 
                  type="text" 
                  value={receiptNo}
                  onChange={(e) => setReceiptNo(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">{isUrdu ? 'تاریخ وصولی:' : 'Collection Date:'}</label>
                <input 
                  type="date" 
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 font-urdu">
              <button 
                onClick={() => setCollectVoucher(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold"
              >
                {isUrdu ? 'منسوخ' : 'Cancel'}
              </button>
              <button 
                onClick={handleConfirmPayment}
                className="px-5 py-2 bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5"
              >
                <Receipt className="w-4 h-4 text-amber-300" />
                <span>{isUrdu ? 'فیس وصول کریں اور رسید بنائیں' : 'Confirm & Generate Receipt'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Fee Receipt Modal */}
      {activeReceiptVoucher && (
        <PrintableFeeReceipt
          voucher={activeReceiptVoucher}
          student={students.find(s => s.id === activeReceiptVoucher.studentId)}
          isOpen={!!activeReceiptVoucher}
          onClose={() => setActiveReceiptVoucher(null)}
          isUrdu={isUrdu}
        />
      )}

    </div>
  );
};
