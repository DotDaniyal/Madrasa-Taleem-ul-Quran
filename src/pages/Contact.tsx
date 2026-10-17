import React, { useState } from 'react';
import { Language, ContactMessage } from '../types';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ContactProps {
  currentLang: Language;
  onAddMessage: (msg: ContactMessage) => void;
}

export const Contact: React.FC<ContactProps> = ({ currentLang, onAddMessage }) => {
  const isUrdu = currentLang === 'ur';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = {
    ur: {
      title: 'رابطہ کریں',
      subtitle: 'مدرسہ تعلیم القرآن فریال مسجد سے رابطہ کے لیے معلومات اور فارم',
      contactInfo: 'رابطے کی معلومات',
      addressTitle: 'مدرسہ و مسجد کا پتہ',
      addressVal: 'مدرسہ تعلیم القرآن فریال مسجد، کراچی، پاکستان',
      phoneTitle: 'فون نمبر / واٹس ایپ',
      phoneVal: '+92 300 1234567',
      emailTitle: 'ای میل ایڈریس',
      emailVal: 'info@faryalmadrasa.edu.pk',
      hoursTitle: 'اوقاتِ کار',
      hoursVal: 'ہفتہ تا جمعرات: صبح 7:00 بجے تا مغرب (جمعہ تعطیل)',
      formTitle: 'ہمیں پیغام بھیجیں',
      nameLabel: 'آپ کا نام *',
      phoneLabel: 'موبائل نمبر *',
      emailLabel: 'ای میل (اختیاری)',
      msgLabel: 'پیغام یا سوال *',
      submitBtn: 'پیغام روانہ کریں',
      successMsg: 'آپ کا پیغام کامیابی سے موصول ہو گیا ہے! انتظامیہ جلد آپ سے رابطہ کرے گی۔',
      fillRequired: 'براہ کرم لازمی فیلڈز پُر کریں۔',
      whatsappChat: 'واٹس ایپ پر چیٹ کریں'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with Madrasa Taleem-ul-Quran Faryal Masjid',
      contactInfo: 'Contact Information',
      addressTitle: 'Address',
      addressVal: 'Madrasa Taleem-ul-Quran Faryal Masjid, Karachi, Pakistan',
      phoneTitle: 'Phone / WhatsApp',
      phoneVal: '+92 300 1234567',
      emailTitle: 'Email Address',
      emailVal: 'info@faryalmadrasa.edu.pk',
      hoursTitle: 'Working Hours',
      hoursVal: 'Saturday to Thursday: 7:00 AM - Maghrib (Friday Holiday)',
      formTitle: 'Send Us a Message',
      nameLabel: 'Your Name *',
      phoneLabel: 'Mobile Number *',
      emailLabel: 'Email (Optional)',
      msgLabel: 'Message or Inquiry *',
      submitBtn: 'Send Message',
      successMsg: 'Your message has been successfully received! Administration will contact you soon.',
      fillRequired: 'Please fill out all required fields.',
      whatsappChat: 'Chat on WhatsApp'
    }
  }[currentLang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      setError(t.fillRequired);
      return;
    }

    setError(null);
    const newMsg: ContactMessage = {
      id: `MSG-${Date.now()}`,
      name,
      phone,
      email: email || '',
      message,
      createdAt: new Date().toISOString().split('T')[0],
      isRead: false
    };

    onAddMessage(newMsg);
    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-emerald-100 text-emerald-800 text-xs px-3.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 shadow-sm font-urdu">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>{isUrdu ? 'رابطہ' : 'Contact'}</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 font-urdu">
          {t.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-urdu">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Information Cards */}
        <div className="space-y-6">
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 space-y-6 hover-lift">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 font-urdu">
              {t.contactInfo}
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 animate-bounce-subtle" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 font-urdu">{t.addressTitle}</p>
                  <p className="text-slate-600 text-xs mt-0.5 font-urdu">{t.addressVal}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 animate-bounce-subtle" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 font-urdu">{t.phoneTitle}</p>
                  <p className="text-slate-600 text-xs mt-0.5 font-mono" dir="ltr">{t.phoneVal}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5 animate-bounce-subtle" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 font-urdu">{t.emailTitle}</p>
                  <p className="text-slate-600 text-xs mt-0.5 font-mono">{t.emailVal}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-5 h-5 animate-bounce-subtle" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 font-urdu">{t.hoursTitle}</p>
                  <p className="text-slate-600 text-xs mt-0.5 font-urdu">{t.hoursVal}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white py-4 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 animate-shimmer font-urdu"
              >
                <MessageCircle className="w-5 h-5 text-amber-300" />
                <span>{t.whatsappChat}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 hover-lift">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce-subtle">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-urdu">{t.successMsg}</h3>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-3 rounded-xl text-sm font-bold cursor-pointer transition-colors font-urdu"
              >
                {isUrdu ? 'نیا پیغام بھیجیں' : 'Send Another'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 font-urdu">
                {t.formTitle}
              </h2>

              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-red-200 font-urdu">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 font-urdu">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isUrdu ? 'آپ کا نام' : 'Your Name'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 font-urdu">{t.phoneLabel}</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    dir="ltr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 text-right sm:text-left shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 font-urdu">{t.emailLabel}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 text-left shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 font-urdu">{t.msgLabel}</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isUrdu ? 'اپنا سوال یا پیغام یہاں لکھیں...' : 'Write your question or message here...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-700/25 transition-all flex items-center gap-2 cursor-pointer animate-shimmer hover:scale-105 active:scale-95 font-urdu"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{t.submitBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
