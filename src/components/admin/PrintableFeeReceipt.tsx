import React from 'react';
import { FeeVoucher, Student } from '../../types';
import { formatPKR } from '../../utils/excelBiometricEngine';
import { Printer, X, Building2, CheckCircle2, Sparkles, Receipt } from 'lucide-react';

interface PrintableFeeReceiptProps {
  voucher: FeeVoucher;
  student?: Student;
  isOpen: boolean;
  onClose: () => void;
  isUrdu: boolean;
  siteNameUr?: string;
  siteNameEn?: string;
}

export const PrintableFeeReceipt: React.FC<PrintableFeeReceiptProps> = ({
  voucher,
  student,
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

  const receiptNo = voucher.receiptNo || `REC-${voucher.month.replace('-', '')}-${voucher.studentRollNo || '1001'}`;
  const studentName = voucher.studentName || student?.fullName || 'طالب علم';
  const rollNo = voucher.studentRollNo || student?.rollNo || '1001';
  const parentName = voucher.parentName || student?.parentName || 'والد محترم';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden print:shadow-none print:w-full print:rounded-none">
        
        {/* Header - Screen Only */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/20 text-amber-300 rounded-xl">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-urdu">
                {isUrdu ? 'سرکاری فی رسید ووچر' : 'Official Student Fee Receipt'}
              </h3>
              <p className="text-xs text-emerald-200 font-mono">
                {receiptNo} | Roll No: {rollNo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md cursor-pointer font-urdu"
            >
              <Printer className="w-4 h-4" />
              <span>{isUrdu ? 'رسید پرنٹ کریں' : 'Print Receipt'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-emerald-800 text-slate-200 rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Dual Copy Receipt Area (Student Copy + Office Copy) */}
        <div className="p-6 space-y-6 print:p-4 bg-slate-100 print:bg-white font-urdu">
          
          {[
            { copyLabel: isUrdu ? 'طالب علم کاپی (Student Copy)' : 'Student Copy' },
            { copyLabel: isUrdu ? 'دفتر کاپی (Office Copy)' : 'Office Copy' }
          ].map((copy, copyIndex) => (
            <div 
              key={copyIndex}
              className="bg-white p-5 rounded-2xl border-2 border-emerald-900/30 shadow-sm relative print:break-inside-avoid space-y-4"
            >
              {/* Top Banner */}
              <div className="flex items-center justify-between border-b-2 border-amber-400 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-800 shrink-0" />
                  <div>
                    <h4 className="text-sm font-extrabold text-emerald-950">
                      {isUrdu ? siteNameUr : siteNameEn}
                    </h4>
                    <p className="text-[10px] text-amber-700 font-bold">
                      {isUrdu ? 'ماہانہ تعلیمی فیس چالان / رسید' : 'Monthly Tuition Fee Voucher'}
                    </p>
                  </div>
                </div>

                <div className="text-end font-mono">
                  <span className="bg-emerald-900 text-white font-bold text-[10px] px-2.5 py-1 rounded-md block">
                    {copy.copyLabel}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold mt-1 block">
                    {receiptNo}
                  </span>
                </div>
              </div>

              {/* Receipt Body Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">{isUrdu ? 'رول نمبر:' : 'Roll No:'}</span>
                  <span className="font-bold font-mono text-emerald-800 text-sm">{rollNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isUrdu ? 'نام طالب علم:' : 'Student Name:'}</span>
                  <span className="font-extrabold text-slate-900">{studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isUrdu ? 'والد کا نام:' : 'Parent Name:'}</span>
                  <span className="font-bold text-slate-800">{parentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">{isUrdu ? 'برائے ماہ:' : 'Fee Month:'}</span>
                  <span className="font-mono font-bold text-slate-800">{voucher.month}</span>
                </div>
              </div>

              {/* Financial Calculation */}
              <div className="flex items-center justify-between bg-emerald-950 text-white p-3 rounded-xl font-mono text-xs">
                <div>
                  <span className="text-[10px] text-amber-300 font-urdu block">{isUrdu ? 'وصول شدہ واجبی رقم:' : 'Amount Received:'}</span>
                  <span className="text-lg font-extrabold text-amber-300">{formatPKR(voucher.amount)}</span>
                </div>
                <div className="text-end font-urdu">
                  <span className="text-[10px] text-emerald-200 block">{isUrdu ? 'طریقہ ادائیگی:' : 'Payment Mode:'}</span>
                  <span className="font-bold bg-amber-400 text-emerald-950 px-2 py-0.5 rounded text-[10px]">
                    {voucher.paymentMethod?.toUpperCase() || 'CASH'}
                  </span>
                </div>
              </div>

              {/* Footer Stamp & Signatures */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                <span>تاریخ ادائیگی: {voucher.paidDate || new Date().toISOString().split('T')[0]}</span>
                <span className="font-bold text-slate-800">{isUrdu ? 'دستخط و مہر کیشئیر: ________________' : 'Cashier Signature & Stamp: ________'}</span>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
