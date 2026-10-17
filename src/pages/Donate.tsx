import React, { useState } from 'react';
import { Language, DonationCategory } from '../types';
import { Sparkles, Heart, CreditCard, Landmark, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface DonateProps {
  currentLang: Language;
  categories: DonationCategory[];
}

export const Donate: React.FC<DonateProps> = ({ currentLang, categories }) => {
  const isUrdu = currentLang === 'ur';
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || 'general');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'online'>('bank_transfer');

  const presetAmounts = [500, 1000, 2500, 5000];

  const t = {
    ur: {
      title: 'مدرسہ تعلیم القرآن فریال مسجد کی معاونت کریں',
      desc: 'آپ کا تعاون قرآنِ کریم کی تعلیم، طلبہ، اساتذہ اور مدرسے کی تعلیمی ضروریات میں مددگار ثابت ہو سکتا ہے۔ آپ کا ہر عطیہ ہمارے لیے قابلِ قدر ہے۔',
      amountSelect: 'عطیہ کی رقم منتخب کریں',
      customAmount: 'اپنی رقم درج کریں (PKR)',
      categorySelect: 'عطیہ کی قسم',
      paymentMethod: 'ادائیگی کا طریقہ',
      bankTransfer: 'بینک ٹرانسفر / دیگر',
      onlineGateway: 'آن لائن ادائیگی',
      donateBtn: 'اب عطیہ دیں',
      zakatNotice: 'نوٹ: زکوٰۃ کے لیے براہ کرم انتظامیہ سے تصدیق کریں، یہ صرف اہل مدد کے لیے ہے۔',
    },
    en: {
      title: 'Support Madrasa Taleem-ul-Quran Faryal Masjid',
      desc: 'Your generous contribution can help support Quranic education, our students, teachers, and the ongoing educational needs of Madrasa Taleem-ul-Quran Faryal Masjid. Every contribution is appreciated.',
      amountSelect: 'Select Donation Amount',
      customAmount: 'Enter Custom Amount (PKR)',
      categorySelect: 'Donation Category',
      paymentMethod: 'Payment Method',
      bankTransfer: 'Bank Transfer / Manual',
      onlineGateway: 'Online Payment',
      donateBtn: 'Donate Now',
      zakatNotice: 'Note: For Zakat, please verify with administration; it is only for eligible purposes.',
    }
  }[currentLang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-950 font-urdu">{t.title}</h1>
        <p className="text-slate-600 font-urdu max-w-2xl mx-auto">{t.desc}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
            <h3 className="font-bold mb-4 font-urdu">{t.amountSelect}</h3>
            <div className="grid grid-cols-2 gap-3">
              {presetAmounts.map(amt => (
                <button 
                  key={amt}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                  className={`py-3 rounded-xl font-bold border transition ${selectedAmount === amt && !customAmount ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 hover:bg-emerald-50'}`}
                >
                  Rs. {amt}
                </button>
              ))}
            </div>
            <input 
              type="number"
              placeholder={t.customAmount}
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
              className="w-full mt-4 p-3 rounded-xl border border-slate-200"
            />
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
            <h3 className="font-bold mb-4 font-urdu">{t.categorySelect}</h3>
            <select className="w-full p-3 rounded-xl border border-slate-200" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{isUrdu ? cat.labelUr : cat.labelEn}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 space-y-6">
          <h3 className="font-bold font-urdu">{t.paymentMethod}</h3>
          <div className="flex gap-4">
            <button 
              onClick={() => setPaymentMethod('bank_transfer')}
              className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 border ${paymentMethod === 'bank_transfer' ? 'bg-emerald-50 border-emerald-500' : 'border-slate-200'}`}
            >
              <Landmark className="w-5 h-5" /> {t.bankTransfer}
            </button>
            <button 
              onClick={() => setPaymentMethod('online')}
              className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 border ${paymentMethod === 'online' ? 'bg-emerald-50 border-emerald-500' : 'border-slate-200'}`}
            >
              <CreditCard className="w-5 h-5" /> {t.onlineGateway}
            </button>
          </div>
          
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" /> {t.donateBtn}
          </button>
          
          <div className="text-xs text-slate-500 font-urdu flex items-center gap-2 bg-slate-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            {t.zakatNotice}
          </div>
        </div>
      </div>
    </div>
  );
};
