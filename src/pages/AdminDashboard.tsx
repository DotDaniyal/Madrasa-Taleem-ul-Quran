import React, { useState } from 'react';
import { Language, AdmissionApplication, Announcement, ContactMessage } from '../types';
import { 
  Lock, 
  Unlock, 
  Users, 
  Bell, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Plus, 
  Calendar, 
  Phone, 
  Check, 
  Sparkles 
} from 'lucide-react';

interface AdminDashboardProps {
  currentLang: Language;
  applications: AdmissionApplication[];
  setApplications: React.Dispatch<React.SetStateAction<AdmissionApplication[]>>;
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  messages: ContactMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentLang,
  applications,
  setApplications,
  announcements,
  setAnnouncements,
  messages,
  setMessages
}) => {
  const isUrdu = currentLang === 'ur';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'applications' | 'announcements' | 'messages'>('applications');
  const [passcodeError, setPasscodeError] = useState(false);

  // New announcement form state
  const [newTitleUr, setNewTitleUr] = useState('');
  const [newContentUr, setNewContentUr] = useState('');
  const [newCategory, setNewCategory] = useState('داخلے');
  const [isImportant, setIsImportant] = useState(false);

  const t = {
    ur: {
      loginTitle: 'انتظامی لاگ ان (Admin Portal)',
      passcodePlaceholder: 'پن کوڈ درج کریں (پہلے سے 1234)',
      loginBtn: 'لاگ ان کریں',
      wrongPass: 'غلط پن کوڈ! براہ کرم دوبارہ کوشش کریں (ڈیفالٹ: 1234)',
      portalTitle: 'مدرسہ انتظامی ڈیش بورڈ',
      logout: 'لاگ آؤٹ',
      tabApps: 'داخلہ درخواستیں',
      tabAnn: 'اعلانات مینیجر',
      tabMsg: 'موصولہ پیغامات',
      student: 'طالب علم',
      program: 'پروگرام',
      guardian: 'سرپرست فون',
      status: 'حالت',
      actions: 'اقدامات',
      approved: 'منظور شدہ',
      pending: 'زیرِ غور',
      rejected: 'مسترد',
      approve: 'منظور کریں',
      reject: 'مسترد کریں',
      delete: 'حذف کریں',
      addAnnTitle: 'نیا اعلان شامل کریں',
      annTitleLabel: 'اعلان کا عنوان',
      annContentLabel: 'اعلان کی تفصیل',
      annCatLabel: 'زمرہ',
      importantCheck: 'اہم نوٹس کے طور پر نمایاں کریں',
      publishBtn: 'اعلان شائع کریں',
      noData: 'کوئی ریکارڈ موجود نہیں ہے۔'
    },
    en: {
      loginTitle: 'Administrative Portal Login',
      passcodePlaceholder: 'Enter PIN Code (default: 1234)',
      loginBtn: 'Login',
      wrongPass: 'Incorrect PIN! Please try again (default: 1234)',
      portalTitle: 'Madrasa Administrative Dashboard',
      logout: 'Logout',
      tabApps: 'Admission Applications',
      tabAnn: 'Announcements Manager',
      tabMsg: 'Contact Messages',
      student: 'Student',
      program: 'Program',
      guardian: 'Guardian Phone',
      status: 'Status',
      actions: 'Actions',
      approved: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected',
      approve: 'Approve',
      reject: 'Reject',
      delete: 'Delete',
      addAnnTitle: 'Add New Announcement',
      annTitleLabel: 'Announcement Title',
      annContentLabel: 'Announcement Details',
      annCatLabel: 'Category',
      importantCheck: 'Mark as Important Notice',
      publishBtn: 'Publish Announcement',
      noData: 'No records available.'
    }
  }[currentLang];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234') {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleStatusChange = (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const handleDeleteApp = (id: string) => {
    if (window.confirm(isUrdu ? 'کیا آپ واقعی اس درخواست کو حذف کرنا چاہتے ہیں؟' : 'Are you sure you want to delete this application?')) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleUr || !newContentUr) return;

    const newAnn: Announcement = {
      id: `ANN-${Date.now()}`,
      titleUr: newTitleUr,
      titleEn: newTitleUr,
      contentUr: newContentUr,
      contentEn: newContentUr,
      categoryUr: newCategory,
      categoryEn: newCategory,
      date: new Date().toISOString().split('T')[0],
      isImportant
    };

    setAnnouncements(prev => [newAnn, ...prev]);
    setNewTitleUr('');
    setNewContentUr('');
    setIsImportant(false);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 text-center space-y-6 hover-lift">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto shadow-md animate-bounce-subtle">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 font-urdu">{t.loginTitle}</h2>
            <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'مدرسہ انتظامیہ کے لیے مخصوص پورٹل' : 'Restricted for authorized staff'}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {passcodeError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 font-urdu">
                {t.wrongPass}
              </p>
            )}
            <input
              type="password"
              maxLength={6}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder={t.passcodePlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:border-emerald-600 font-mono shadow-sm"
            />
            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer animate-shimmer font-urdu"
            >
              <span>{t.loginBtn}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Bar with Shimmer */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl border border-emerald-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shadow-lg font-bold">
            <Unlock className="w-6 h-6 animate-bounce-subtle" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-urdu">{t.portalTitle}</h1>
            <p className="text-xs text-emerald-200 font-urdu">{isUrdu ? 'مدرسہ تعلیم القرآن فریال مسجد — انتظامیہ پینل' : 'Madrasa Taleem-ul-Quran Faryal Masjid — Admin Panel'}</p>
          </div>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-emerald-600/40 font-urdu"
        >
          {t.logout}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer hover:scale-105 active:scale-95 font-urdu ${
            activeTab === 'applications'
              ? 'bg-emerald-700 text-white shadow-lg'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.tabApps}</span>
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-mono">{applications.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer hover:scale-105 active:scale-95 font-urdu ${
            activeTab === 'announcements'
              ? 'bg-emerald-700 text-white shadow-lg'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{t.tabAnn}</span>
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-mono">{announcements.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer hover:scale-105 active:scale-95 font-urdu ${
            activeTab === 'messages'
              ? 'bg-emerald-700 text-white shadow-lg'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t.tabMsg}</span>
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-mono">{messages.length}</span>
        </button>
      </div>

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-urdu">{t.tabApps}</h2>
          </div>
          {applications.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm font-urdu">{t.noData}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-xs font-bold border-b border-slate-100 font-urdu">
                    <th className="p-4">ID</th>
                    <th className="p-4">{t.student}</th>
                    <th className="p-4">{t.program}</th>
                    <th className="p-4">{t.guardian}</th>
                    <th className="p-4">{t.status}</th>
                    <th className="p-4">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono text-xs font-bold text-emerald-700" dir="ltr">{app.id}</td>
                      <td className="p-4 font-medium text-slate-900">
                        <span className="font-urdu">{app.studentName}</span>
                        <span className="block text-xs text-slate-400 font-urdu">والد: {app.fatherName} ({app.age} سال)</span>
                      </td>
                      <td className="p-4 text-slate-600 font-urdu">{app.programId.toUpperCase()}</td>
                      <td className="p-4 font-mono text-xs text-slate-600" dir="ltr">{app.guardianPhone}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-urdu ${
                          app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status === 'approved' ? t.approved : app.status === 'rejected' ? t.rejected : t.pending}
                        </span>
                      </td>
                      <td className="p-4 flex items-center gap-2">
                        <button
                          onClick={() => handleStatusChange(app.id, 'approved')}
                          title="Approve"
                          className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(app.id, 'rejected')}
                          title="Reject"
                          className="p-2 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteApp(app.id)}
                          title="Delete"
                          className="p-2 bg-slate-100 text-slate-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Announcements Manager Tab */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Announcement Form */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 font-urdu">{t.addAnnTitle}</h2>
            <form onSubmit={handleAddAnnouncement} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 font-urdu">{t.annTitleLabel}</label>
                <input
                  type="text"
                  required
                  value={newTitleUr}
                  onChange={(e) => setNewTitleUr(e.target.value)}
                  placeholder="عنوان..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 font-urdu">{t.annCatLabel}</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                >
                  <option value="داخلے">داخلے</option>
                  <option value="تقاریب">تقاریب</option>
                  <option value="اطلاعیه">اطلاعیہ</option>
                  <option value="امتحانات">امتحانات</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 font-urdu">{t.annContentLabel}</label>
                <textarea
                  required
                  rows={4}
                  value={newContentUr}
                  onChange={(e) => setNewContentUr(e.target.value)}
                  placeholder="تفصیل..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 font-urdu shadow-sm"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="imp"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 cursor-pointer"
                />
                <label htmlFor="imp" className="text-xs font-bold text-slate-700 cursor-pointer font-urdu">
                  {t.importantCheck}
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-all cursor-pointer animate-shimmer font-urdu"
              >
                <span>{t.publishBtn}</span>
              </button>
            </form>
          </div>

          {/* Announcements List */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-urdu">{t.tabAnn}</h2>
            {announcements.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm font-urdu">{t.noData}</div>
            ) : (
              <div className="space-y-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-start gap-4 hover-lift">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold font-urdu">
                          {ann.categoryUr}
                        </span>
                        {ann.isImportant && (
                          <span className="text-[10px] bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full font-bold font-urdu">
                            اہم
                          </span>
                        )}
                        <span className="text-xs text-slate-400 font-mono" dir="ltr">{ann.date}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 font-urdu">{ann.titleUr}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 font-urdu">{ann.contentUr}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 font-urdu">{t.tabMsg}</h2>
          {messages.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm font-urdu">{t.noData}</div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 hover-lift">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-900">{msg.name}</h3>
                      <span className="text-xs font-mono text-emerald-700" dir="ltr">{msg.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-mono" dir="ltr">{msg.createdAt}</span>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {msg.email && <p className="text-xs text-slate-500 font-mono" dir="ltr">{msg.email}</p>}
                  <p className="text-sm text-slate-700 font-urdu bg-white p-3 rounded-xl border border-slate-100">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
