import React, { useState, useEffect } from 'react';
import { 
  Language, 
  AdmissionApplication, 
  Announcement, 
  ContactMessage, 
  Program, 
  DailyPeriod, 
  ScheduleDay, 
  Teacher 
} from '../types';
import {
  FullAdminData,
  fetchAdminData,
  saveAdminModule,
  loginAdmin,
  logoutAdmin,
  getStoredToken,
  getStoredAdminUser,
  uploadMediaAsset,
  deleteMediaAsset,
  downloadCSV,
  restoreDatabaseBackup,
  resetDatabaseSeeds,
  getDefaultAdminData
} from '../services/api';
import {
  Student,
  Competition,
  CompetitionResult,
  Assessment,
  Examination,
  AnnualAward,
  SpecialHoliday,
  MediaItem,
  NavItemConfig,
  FooterConfig,
  PageSeo,
  AdminUser,
  AuditLog
} from '../data/cmsInitialData';
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
  Sparkles,
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Clock,
  Award,
  Trophy,
  FileText,
  FileCheck,
  Image,
  Menu,
  Sliders,
  Settings,
  Shield,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Edit,
  Save,
  X,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Globe,
  Share2,
  Database,
  History,
  AlertTriangle,
  Info
} from 'lucide-react';

interface AdminDashboardProps {
  currentLang: Language;
  onDataUpdated?: (newData: FullAdminData) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentLang, onDataUpdated }) => {
  const isUrdu = currentLang === 'ur';

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!getStoredToken());
  const [currentUser, setCurrentUser] = useState<any>(() => getStoredAdminUser());
  const [passcode, setPasscode] = useState('');
  const [username, setUsername] = useState('admin');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active module navigation (28 modules supported!)
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [sidebarSearch, setSidebarSearch] = useState('');

  // Full Admin Data state
  const [adminData, setAdminData] = useState<FullAdminData>(getDefaultAdminData());
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Search and filter states inside modules
  const [studentSearch, setStudentSearch] = useState('');
  const [studentProgramFilter, setStudentProgramFilter] = useState('all');
  const [admissionSearch, setAdmissionSearch] = useState('');
  const [admissionStatusFilter, setAdmissionStatusFilter] = useState('all');
  const [mediaSearch, setMediaSearch] = useState('');

  // Modals and editing states
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [viewingAdmission, setViewingAdmission] = useState<AdmissionApplication | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [editingTimetablePeriod, setEditingTimetablePeriod] = useState<DailyPeriod | null>(null);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);
  const [editingExam, setEditingExam] = useState<Examination | null>(null);
  const [editingAward, setEditingAward] = useState<AnnualAward | null>(null);
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  // Page Editor active page
  const [editorPage, setEditorPage] = useState<'home' | 'about' | 'programs' | 'schedule' | 'admissions' | 'contact'>('home');
  const [showLivePreview, setShowLivePreview] = useState(true);

  // Show toast notification
  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Load data on mount or after login
  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated) {
      setIsLoading(true);
      fetchAdminData()
        .then(data => {
          if (!isMounted) return;
          setAdminData(data);
          if (onDataUpdated) {
            setTimeout(() => {
              if (isMounted) onDataUpdated(data);
            }, 0);
          }
        })
        .catch(err => {
          console.error('Error fetching admin data:', err);
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, onDataUpdated]);

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');
    try {
      const res = await loginAdmin(passcode, username);
      if (res.success && res.user) {
        setIsAuthenticated(true);
        setCurrentUser(res.user);
        setPasscode('');
        showToast(isUrdu ? `خوش آمدید، ${res.user.name}` : `Welcome, ${res.user.name}`);
      } else {
        setAuthError(res.error || (isUrdu ? 'غلط معلومات' : 'Invalid login credentials'));
      }
    } catch {
      setAuthError(isUrdu ? 'لاگ ان کے دوران خرابی پیش آئی' : 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Universal save helper for any module
  const handleSaveModule = async (moduleName: keyof FullAdminData, updatedData: any, successNotice?: string) => {
    try {
      const res = await saveAdminModule(moduleName, updatedData);
      if (res.success) {
        setAdminData(prev => {
          const next = { ...prev, [moduleName]: updatedData };
          if (onDataUpdated) {
            setTimeout(() => {
              onDataUpdated(next);
            }, 0);
          }
          return next;
        });
        showToast(successNotice || (isUrdu ? 'تبدیلیاں محفوظ ہو گئیں۔' : 'Changes saved successfully!'));
      } else {
        showToast(res.error || (isUrdu ? 'محفوظ نہیں ہو سکا' : 'Save failed'), 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving changes', 'error');
    }
  };

  // -------------------------------------------------------------
  // Admissions Actions: Approve, Reject, Convert to Student
  // -------------------------------------------------------------
  const handleUpdateAdmissionStatus = async (appId: string, status: 'approved' | 'rejected' | 'pending') => {
    const updated = adminData.admissions.map(a => a.id === appId ? { ...a, status } : a);
    await handleSaveModule('admissions', updated, isUrdu ? `درخواست کی حیثیت "${status}" کر دی گئی۔` : `Status updated to ${status}`);
    if (viewingAdmission && viewingAdmission.id === appId) {
      setViewingAdmission({ ...viewingAdmission, status });
    }
  };

  const handleConvertAdmissionToStudent = async (app: AdmissionApplication) => {
    // Check if student already exists with this phone or ID
    const exists = adminData.students.some(s => s.guardianPhone === app.guardianPhone && s.name === app.studentName);
    if (exists) {
      showToast(isUrdu ? 'یہ طالب علم پہلے ہی رجسٹرڈ ہے!' : 'Student record already exists!', 'error');
      return;
    }

    const newStudent: Student = {
      id: `STU-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      name: app.studentName,
      fatherName: app.fatherName,
      guardianPhone: app.guardianPhone,
      programId: app.programId,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      academicNotes: `داخلہ درخواست #${app.id} سے خودکار منتقل شدہ۔ پچھلا مدرسہ: ${app.previousMadrasa || 'کوئی نہیں'}`,
      age: app.age || '7',
      address: app.address || ''
    };

    const updatedStudents = [newStudent, ...adminData.students];
    const updatedAdmissions = adminData.admissions.map(a => a.id === app.id ? { ...a, status: 'approved' as const } : a);

    await handleSaveModule('students', updatedStudents);
    await handleSaveModule('admissions', updatedAdmissions);
    showToast(isUrdu ? `طالب علم کا باقاعدہ ریکارڈ کامیابی سے بن گیا (ID: ${newStudent.id})` : `Converted into permanent student record #${newStudent.id}`);
  };

  // -------------------------------------------------------------
  // Media Upload Handler
  // -------------------------------------------------------------
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMedia(true);
    try {
      const res = await uploadMediaAsset(file, file.name, file.name);
      if (res.success && res.mediaItem) {
        setAdminData(prev => ({
          ...prev,
          mediaLibrary: [res.mediaItem!, ...prev.mediaLibrary]
        }));
        showToast(isUrdu ? 'تصویر میڈیا لائبریری میں شامل کر دی گئی۔' : 'Image added to media library!');
      } else {
        showToast(res.error || 'Upload failed', 'error');
      }
    } catch {
      showToast('Upload error', 'error');
    } finally {
      setIsUploadingMedia(false);
      e.target.value = '';
    }
  };

  // -------------------------------------------------------------
  // If Not Authenticated -> Show Premium Login Portal
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-emerald-800/40 space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-700"></div>

          {/* Institutional Crest & Title */}
          <div className="text-center space-y-3">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white border-2 border-emerald-600/50 shadow-md p-1 overflow-hidden">
              <img 
                src={adminData.settings.logoUrl || '/images/madrasa-logo.jpeg'} 
                alt="Madrasa Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-urdu leading-snug">
                {adminData.settings.siteNameUr}
              </h1>
              <p className="text-xs font-semibold text-emerald-800 tracking-wide font-sans mt-0.5">
                {adminData.settings.siteNameEn}
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200">
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isUrdu ? 'مرکزی ایڈمن پورٹل لاگ ان' : 'Administrative Control Center'}</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-urdu">
                {isUrdu ? 'صارف نام (Username)' : 'Username'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-urdu">
                {isUrdu ? 'پاس ورڈ یا پن کوڈ (Password / PIN)' : 'Password or PIN Code'}
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder={isUrdu ? 'ڈیفالٹ پن: 1234' : 'Default PIN: 1234'}
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-sans"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-urdu flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold font-urdu transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-amber-300" />
              <span>{isLoggingIn ? (isUrdu ? 'لاگ ان ہو رہا ہے...' : 'Verifying...') : (isUrdu ? 'لاگ ان کریں' : 'Access Control Center')}</span>
            </button>
          </form>

          {/* Quick Guidance */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-urdu leading-relaxed space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{isUrdu ? 'فوری رسائی کی معلومات:' : 'Quick Access Note:'}</span>
            </p>
            <p>{isUrdu ? 'ابتدائی سپر ایڈمن کے لیے پن کوڈ 1234 مقرر ہے۔ بعد میں آپ ایڈمن مینیجر سے پاس ورڈ تبدیل کر سکتے ہیں۔' : 'Default Super Admin PIN is 1234. Role permissions and passwords can be configured inside settings.'}</p>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Navigation Menu Categories for 28 Modules
  // -------------------------------------------------------------
  const moduleCategories = [
    {
      categoryUr: 'مرکزی ڈیش بورڈ',
      categoryEn: 'Overview',
      items: [
        { id: 'dashboard', labelUr: 'ڈیش بورڈ جائزہ', labelEn: 'Dashboard Overview', icon: LayoutDashboard }
      ]
    },
    {
      categoryUr: 'طلبہ، اساتذہ و داخلے',
      categoryEn: 'Students & Faculty',
      items: [
        { id: 'students', labelUr: 'طلبہ کرام مینجمنٹ', labelEn: 'Students Directory', icon: GraduationCap, badge: adminData.students.length },
        { id: 'teachers', labelUr: 'اساتذہ کرام مینجمنٹ', labelEn: 'Teachers Directory', icon: Users, badge: adminData.teachers.length },
        { id: 'admissions', labelUr: 'آن لائن داخلہ درخواستیں', labelEn: 'Online Admissions', icon: FileCheck, badge: adminData.admissions.filter(a => a.status === 'pending').length }
      ]
    },
    {
      categoryUr: 'تعلیمی نظام و امتحانات',
      categoryEn: 'Academics & Exams',
      items: [
        { id: 'programs', labelUr: 'تعلیمی پروگرامز و کورسز', labelEn: 'Programs & Courses', icon: BookOpen },
        { id: 'timetable', labelUr: 'روزانہ کا نظام الاوقات', labelEn: 'Daily Timetable', icon: Clock },
        { id: 'schedule', labelUr: 'ہفتہ وار شیڈول و چھٹیاں', labelEn: 'Weekly Schedule & Holidays', icon: Calendar },
        { id: 'competitions', labelUr: 'نماز کے مقابلے', labelEn: 'Prayer Competitions', icon: Trophy, badge: adminData.competitions.length },
        { id: 'results', labelUr: 'مقابلوں کے نتائج و انعامات', labelEn: 'Competition Results', icon: Award },
        { id: 'assessments', labelUr: 'ماہانہ جائزے (Assessments)', labelEn: 'Monthly Assessments', icon: FileText },
        { id: 'examinations', labelUr: 'سالانہ امتحانات', labelEn: 'Annual Examinations', icon: GraduationCap },
        { id: 'annual-awards', labelUr: 'سالانہ تقریب و دستار بندی', labelEn: 'Annual Program & Awards', icon: Sparkles }
      ]
    },
    {
      categoryUr: 'ویب سائٹ مواد و CMS',
      categoryEn: 'Website CMS & Design',
      items: [
        { id: 'website-editor', labelUr: 'مکمل ویب سائٹ ایڈیٹر', labelEn: 'Website Page Editor', icon: Edit },
        { id: 'home-sections', labelUr: 'ہوم پیج سیکشنز کنٹرول', labelEn: 'Homepage Sections', icon: Sliders },
        { id: 'branding', labelUr: 'ادارہ جاتی برانڈنگ و عنوانات', labelEn: 'Header & Institution Branding', icon: Sparkles },
        { id: 'logo', labelUr: 'لوگو مینیجر (Logo Crest)', labelEn: 'Logo Manager', icon: Image },
        { id: 'media', labelUr: 'میڈیا و تصاویر لائبریری', labelEn: 'Media & Image Library', icon: Image, badge: adminData.mediaLibrary.length },
        { id: 'navigation', labelUr: 'نیویگیشن مینو ایڈیٹر', labelEn: 'Navigation Menu Editor', icon: Menu },
        { id: 'footer', labelUr: 'فوٹر ایڈیٹر و روابط', labelEn: 'Footer Editor', icon: LayoutDashboard },
        { id: 'announcements', labelUr: 'اعلانات و نوٹس بورڈ', labelEn: 'Announcements & Notices', icon: Bell, badge: adminData.announcements.length },
        { id: 'animations', labelUr: 'اینیمیشنز و موشن سیٹنگز', labelEn: 'Animations & Motion Settings', icon: Sparkles }
      ]
    },
    {
      categoryUr: 'رابطہ، پیغامات و SEO',
      categoryEn: 'Contact & SEO',
      items: [
        { id: 'contact-info', labelUr: 'رابطہ کی معلومات و پتہ', labelEn: 'Contact Information', icon: Phone },
        { id: 'messages', labelUr: 'موصولہ پیغامات', labelEn: 'Contact Inquiries', icon: MessageSquare, badge: adminData.messages.filter(m => !m.isRead).length },
        { id: 'social-links', labelUr: 'سوشل میڈیا روابط', labelEn: 'Social Media Links', icon: Share2 },
        { id: 'seo', labelUr: 'SEO و پیج میٹا ڈیٹا', labelEn: 'SEO & Page Metadata', icon: Globe }
      ]
    },
    {
      categoryUr: 'سسٹم، سیکیورٹی و بیک اپ',
      categoryEn: 'System & Security',
      items: [
        { id: 'reports', labelUr: 'رپورٹس و CSV ڈاؤن لوڈ', labelEn: 'Reports & CSV Exports', icon: Download },
        { id: 'admin-users', labelUr: 'ایڈمن اکاؤنٹس و اختیارات', labelEn: 'Admin Accounts & Roles', icon: Shield },
        { id: 'activity-logs', labelUr: 'آڈٹ لاگز (Audit Trail)', labelEn: 'Activity & Audit Logs', icon: History },
        { id: 'backup', labelUr: 'ڈیٹا بیس بیک اپ و ری اسٹور', labelEn: 'Database Backup & Restore', icon: Database },
        { id: 'global-settings', labelUr: 'گلوبل ویب سائٹ سیٹنگز', labelEn: 'Global Website Settings', icon: Settings }
      ]
    }
  ];

  // Filter modules based on search
  const filteredCategories = moduleCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.labelUr.toLowerCase().includes(sidebarSearch.toLowerCase()) || 
      item.labelEn.toLowerCase().includes(sidebarSearch.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans" dir={isUrdu ? 'rtl' : 'ltr'}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 z-50 px-6 py-3 rounded-2xl shadow-xl font-urdu text-sm flex items-center gap-3 transition-all animate-bounce ${
          isUrdu ? 'left-4' : 'right-4'
        } ${
          toastMessage.type === 'success' 
            ? 'bg-emerald-900 text-white border border-emerald-700' 
            : 'bg-red-800 text-white border border-red-600'
        }`}>
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-amber-300" /> : <XCircle className="w-5 h-5 text-red-200" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Admin Control Bar */}
      <header className="bg-emerald-950 text-white px-4 sm:px-6 py-3.5 border-b border-emerald-900 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-md">
        
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white p-0.5 shrink-0 overflow-hidden shadow-sm">
            <img 
              src={adminData.settings.logoUrl || '/images/madrasa-logo.jpeg'} 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base font-urdu flex items-center gap-2">
              <span>{adminData.settings.siteNameUr}</span>
              <span className="bg-amber-500 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full font-sans">
                CONTROL CENTER
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 font-medium">
              {adminData.settings.siteNameEn} • CMS & Database Control
            </p>
          </div>
        </div>

        {/* User Badge, Quick Links & Logout */}
        <div className="flex items-center gap-3 ms-auto text-xs">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-900/80 border border-emerald-800">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="font-urdu text-emerald-100 font-semibold">{currentUser?.name || 'سپر ایڈمن'}</span>
            <span className="bg-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono uppercase text-amber-300">{currentUser?.role || 'super_admin'}</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-100 font-urdu transition-colors cursor-pointer"
          >
            {isUrdu ? 'اوپر جائیں' : 'Top'}
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 font-urdu transition-colors border border-red-900 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-red-400" />
            <span>{isUrdu ? 'لاگ آؤٹ' : 'Logout'}</span>
          </button>
        </div>

      </header>

      {/* Main Admin Workspace: Sidebar + Content Panel */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Sidebar: 28 Modules Navigation */}
        <aside className="w-full lg:w-72 bg-white border-e border-slate-200 p-4 shrink-0 flex flex-col gap-4">
          
          {/* Quick Module Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute top-2.5 start-3 pointer-events-none" />
            <input
              type="text"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              placeholder={isUrdu ? 'ماڈیولز تلاش کریں...' : 'Search modules...'}
              className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-urdu focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Categorized Module List */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-140px)] pe-1">
            {filteredCategories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 font-urdu">
                  {isUrdu ? cat.categoryUr : cat.categoryEn}
                </div>
                <div className="space-y-0.5">
                  {cat.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveModule(item.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-urdu transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-emerald-800 text-white font-bold shadow-sm' 
                            : 'text-slate-700 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                          <span>{isUrdu ? item.labelUr : item.labelEn}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            isActive ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          
          {/* ========================================================= */}
          {/* 1. DASHBOARD OVERVIEW */}
          {/* ========================================================= */}
          {activeModule === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Welcome Header */}
              <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-3 relative overflow-hidden">
                <div className="space-y-1">
                  <span className="bg-amber-400 text-emerald-950 text-xs px-3 py-0.5 rounded-full font-bold font-urdu">
                    {isUrdu ? 'مرکزی کنٹرول پینل' : 'Master Control Center'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-urdu">
                    {isUrdu ? 'مدرسہ انتظامی ڈیش بورڈ میں خوش آمدید' : 'Welcome to Madrasa Control Center'}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 font-urdu max-w-2xl leading-relaxed">
                    {isUrdu 
                      ? 'یہاں سے آپ طلبہ، اساتذہ، داخلہ فارم، امتحانات، نماز کے مقابلے، اوقاتِ کار اور پوری ویب سائٹ کے تمام صفحات و مواد کو بغیر کوڈنگ کے تبدیل اور کنٹرول کر سکتے ہیں۔' 
                      : 'Manage every student record, faculty member, admissions, timetable, competitions, exams, and website pages dynamically with real database persistence.'}
                  </p>
                </div>
              </div>

              {/* High-Level Institutional Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* 22 Teachers verified card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-500 font-urdu">{isUrdu ? 'تصدیق شدہ اساتذہ' : 'Verified Teachers'}</span>
                    <div className="text-3xl font-extrabold text-emerald-900 font-mono">{adminData.settings.statsTeachers}</div>
                    <span className="text-[11px] text-emerald-700 font-urdu font-medium">{isUrdu ? `${adminData.teachers.length} پروفائلز درج ہیں` : `${adminData.teachers.length} profiles entered`}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                {/* 400+ Students verified card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-500 font-urdu">{isUrdu ? 'طلبہ کرام تعداد' : 'Students Enrolled'}</span>
                    <div className="text-3xl font-extrabold text-amber-700 font-mono">{adminData.settings.statsStudents}</div>
                    <span className="text-[11px] text-amber-800 font-urdu font-medium">{isUrdu ? `${adminData.students.length} ریکارڈز ایکٹو` : `${adminData.students.length} active records`}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                </div>

                {/* Pending Admissions card */}
                <div 
                  onClick={() => setActiveModule('admissions')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-500 font-urdu">{isUrdu ? 'نئی داخلہ درخواستیں' : 'Pending Admissions'}</span>
                    <div className="text-3xl font-extrabold text-blue-900 font-mono">
                      {adminData.admissions.filter(a => a.status === 'pending').length}
                    </div>
                    <span className="text-[11px] text-blue-700 font-urdu font-medium">{isUrdu ? 'جائزہ لیں' : 'Review queue'}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <FileCheck className="w-6 h-6" />
                  </div>
                </div>

                {/* Active Competitions & Notices */}
                <div 
                  onClick={() => setActiveModule('competitions')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-500 font-urdu">{isUrdu ? 'نماز کے مقابلے' : 'Active Competitions'}</span>
                    <div className="text-3xl font-extrabold text-purple-900 font-mono">
                      {adminData.competitions.filter(c => c.status === 'active' || c.status === 'upcoming').length}
                    </div>
                    <span className="text-[11px] text-purple-700 font-urdu font-medium">{isUrdu ? 'سرگرم ایونٹس' : 'Scheduled events'}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Trophy className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Quick Actions Shortcuts */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-urdu flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  <span>{isUrdu ? 'فوری اقدامات و کنٹرول' : 'Quick Actions'}</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <button 
                    onClick={() => { setActiveModule('students'); setIsAddingStudent(true); }}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-center font-urdu transition-all cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Plus className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-slate-800">{isUrdu ? 'نیا طالب علم' : 'Add Student'}</span>
                  </button>

                  <button 
                    onClick={() => { setActiveModule('announcements'); setIsAddingAnnouncement(true); }}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-center font-urdu transition-all cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Bell className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-slate-800">{isUrdu ? 'نیا اعلان' : 'Add Notice'}</span>
                  </button>

                  <button 
                    onClick={() => setActiveModule('website-editor')}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-center font-urdu transition-all cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Edit className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-slate-800">{isUrdu ? 'پیج ایڈیٹر' : 'Page Editor'}</span>
                  </button>

                  <button 
                    onClick={() => setActiveModule('timetable')}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-center font-urdu transition-all cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Clock className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-slate-800">{isUrdu ? 'ٹائم ٹیبل' : 'Timetable'}</span>
                  </button>

                  <button 
                    onClick={() => setActiveModule('logo')}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-center font-urdu transition-all cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Image className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-slate-800">{isUrdu ? 'لوگو کنٹرول' : 'Logo Control'}</span>
                  </button>

                  <button 
                    onClick={() => setActiveModule('backup')}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-center font-urdu transition-all cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Database className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs font-bold text-slate-800">{isUrdu ? 'بیک اپ' : 'Backup DB'}</span>
                  </button>
                </div>
              </div>

              {/* Recent Audit Activity Log Preview */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 font-urdu flex items-center gap-2">
                    <History className="w-5 h-5 text-emerald-700" />
                    <span>{isUrdu ? 'حالیہ ایڈمن آڈٹ لاگز' : 'Recent Activity Logs'}</span>
                  </h3>
                  <button
                    onClick={() => setActiveModule('activity-logs')}
                    className="text-xs text-emerald-800 font-bold hover:underline font-urdu cursor-pointer"
                  >
                    {isUrdu ? 'تمام لاگز دیکھیں' : 'View All Logs'}
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {adminData.activityLogs.slice(0, 5).map(log => (
                    <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 font-urdu">{log.details}</div>
                        <div className="text-slate-500 font-urdu flex items-center gap-2 text-[11px]">
                          <span>{log.adminName}</span>
                          <span>•</span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded font-mono">{log.action}</span>
                        </div>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px] shrink-0">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 2. STUDENTS MANAGEMENT MODULE */}
          {/* ========================================================= */}
          {activeModule === 'students' && (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">
                    {isUrdu ? 'طلبہ کرام ریکارڈ مینیجر' : 'Students Management'}
                  </h2>
                  <p className="text-xs text-slate-500 font-urdu">
                    {isUrdu ? 'تمام زیرِ تعلیم طلبہ کے مستند ریکارڈز اور تعلیمی پیش رفت' : 'Student records, enrollment programs and academic notes'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCSV('students')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold font-urdu flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-600" />
                    <span>{isUrdu ? 'CSV ایکسپورٹ' : 'Export CSV'}</span>
                  </button>

                  <button
                    onClick={() => { setIsAddingStudent(true); setEditingStudent(null); }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold font-urdu flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4 text-amber-300" />
                    <span>{isUrdu ? 'نیا طالب علم درج کریں' : 'Add New Student'}</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center justify-between">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="w-4 h-4 text-slate-400 absolute top-2.5 start-3 pointer-events-none" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder={isUrdu ? 'نام، والد کا نام یا فون نمبر سے تلاش کریں...' : 'Search by name, father, phone...'}
                    className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-urdu focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <select
                  value={studentProgramFilter}
                  onChange={(e) => setStudentProgramFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-urdu focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="all">{isUrdu ? 'تمام پروگرامز' : 'All Programs'}</option>
                  <option value="hifz">{isUrdu ? 'شعبہ حفظ القرآن' : 'Hifz'}</option>
                  <option value="nazra">{isUrdu ? 'شعبہ ناظرہ مع تجوید' : 'Nazra'}</option>
                  <option value="deeniyat">{isUrdu ? 'مکتب دینیات' : 'Deeniyat'}</option>
                </select>
              </div>

              {/* Students Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-start text-xs font-urdu">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <tr>
                        <th className="p-3.5 text-start">ID</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'طالب علم کا نام' : 'Student Name'}</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'والد کا نام' : 'Father Name'}</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'شعبہ' : 'Program'}</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'سرپرست فون' : 'Guardian Phone'}</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'حالت' : 'Status'}</th>
                        <th className="p-3.5 text-center">{isUrdu ? 'اقدامات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {adminData.students
                        .filter(s => {
                          const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                                               s.fatherName.toLowerCase().includes(studentSearch.toLowerCase()) || 
                                               s.guardianPhone.includes(studentSearch);
                          const matchesProg = studentProgramFilter === 'all' || s.programId === studentProgramFilter;
                          return matchesSearch && matchesProg;
                        })
                        .map(s => (
                          <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5 font-mono text-emerald-800 font-bold">{s.id}</td>
                            <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                            <td className="p-3.5 text-slate-600">{s.fatherName}</td>
                            <td className="p-3.5">
                              <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold text-[11px]">
                                {s.programId === 'hifz' ? 'حفظ القرآن' : s.programId === 'nazra' ? 'ناظرہ قرآن' : 'دینیات'}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono text-slate-600" dir="ltr">{s.guardianPhone}</td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                s.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {s.status === 'active' ? 'فعال' : 'فارغ التحصیل'}
                              </span>
                            </td>
                            <td className="p-3.5 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setEditingStudent(s)}
                                  className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                                  title="Edit student"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={async () => {
                                    if (confirm(isUrdu ? 'کیا آپ واقعی اس طالب علم کا ریکارڈ حذف کرنا چاہتے ہیں؟' : 'Delete this student record?')) {
                                      const updated = adminData.students.filter(item => item.id !== s.id);
                                      await handleSaveModule('students', updated, isUrdu ? 'طالب علم حذف کر دیا گیا' : 'Student deleted');
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Delete student"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add / Edit Student Modal */}
              {(isAddingStudent || editingStudent) && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-900 font-urdu text-base">
                        {editingStudent ? (isUrdu ? 'طالب علم معلومات میں ترمیم' : 'Edit Student') : (isUrdu ? 'نیا طالب علم درج کریں' : 'Add New Student')}
                      </h3>
                      <button onClick={() => { setIsAddingStudent(false); setEditingStudent(null); }} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const sName = formData.get('name') as string;
                      const fName = formData.get('fatherName') as string;
                      const phone = formData.get('phone') as string;
                      const prog = formData.get('programId') as string;
                      const notes = formData.get('academicNotes') as string;
                      const age = formData.get('age') as string;
                      const addr = formData.get('address') as string;

                      if (editingStudent) {
                        const updated = adminData.students.map(s => s.id === editingStudent.id ? {
                          ...s,
                          name: sName,
                          fatherName: fName,
                          guardianPhone: phone,
                          programId: prog,
                          academicNotes: notes,
                          age,
                          address: addr
                        } : s);
                        await handleSaveModule('students', updated, isUrdu ? 'معلومات محفوظ ہو گئیں۔' : 'Student record updated');
                      } else {
                        const newStu: Student = {
                          id: `STU-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
                          name: sName,
                          fatherName: fName,
                          guardianPhone: phone,
                          programId: prog,
                          enrollmentDate: new Date().toISOString().split('T')[0],
                          status: 'active',
                          academicNotes: notes,
                          age,
                          address: addr
                        };
                        await handleSaveModule('students', [newStu, ...adminData.students], isUrdu ? 'نیا طالب علم درج ہو گیا۔' : 'Student added');
                      }
                      setIsAddingStudent(false);
                      setEditingStudent(null);
                    }} className="space-y-3 text-xs font-urdu">
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{isUrdu ? 'طالب علم کا نام *' : 'Student Name *'}</label>
                          <input name="name" defaultValue={editingStudent?.name} required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{isUrdu ? 'والد کا نام *' : 'Father Name *'}</label>
                          <input name="fatherName" defaultValue={editingStudent?.fatherName} required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{isUrdu ? 'سرپرست فون نمبر *' : 'Phone *'}</label>
                          <input name="phone" defaultValue={editingStudent?.guardianPhone} required className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono" dir="ltr" />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{isUrdu ? 'تعلیمی شعبہ' : 'Program'}</label>
                          <select name="programId" defaultValue={editingStudent?.programId || 'hifz'} className="w-full px-3 py-2 rounded-xl border border-slate-200">
                            <option value="hifz">{isUrdu ? 'شعبہ حفظ القرآن الكريم' : 'Hifz'}</option>
                            <option value="nazra">{isUrdu ? 'ناظرہ قرآن و تجوید' : 'Nazra'}</option>
                            <option value="deeniyat">{isUrdu ? 'مکتب دینیات' : 'Deeniyat'}</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{isUrdu ? 'عمر (سال)' : 'Age'}</label>
                          <input name="age" defaultValue={editingStudent?.age} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-1">{isUrdu ? 'رہائشی پتہ' : 'Address'}</label>
                          <input name="address" defaultValue={editingStudent?.address} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">{isUrdu ? 'تعلیمی پیش رفت اور نجی نوٹس' : 'Academic Notes'}</label>
                        <textarea name="academicNotes" defaultValue={editingStudent?.academicNotes} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                        <button type="button" onClick={() => { setIsAddingStudent(false); setEditingStudent(null); }} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600">
                          {isUrdu ? 'منسوخ' : 'Cancel'}
                        </button>
                        <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-800 text-white font-bold">
                          {isUrdu ? 'محفوظ کریں' : 'Save Record'}
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* 3. TEACHERS MANAGEMENT MODULE */}
          {/* ========================================================= */}
          {activeModule === 'teachers' && (
            <div className="space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">
                    {isUrdu ? 'اساتذہ کرام مینجمنٹ' : 'Faculty & Teachers Directory'}
                  </h2>
                  <p className="text-xs text-slate-500 font-urdu">
                    {isUrdu ? 'مدرسے کے تصدیق شدہ 22 اساتذہ کرام کے اعداد و شمار اور انفرادی پروفائلز' : 'Verified institutional statistic of 22 teachers and individual mentor profiles'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCSV('teachers')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold font-urdu flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-600" />
                    <span>{isUrdu ? 'CSV ایکسپورٹ' : 'Export CSV'}</span>
                  </button>

                  <button
                    onClick={() => { setIsAddingTeacher(true); setEditingTeacher(null); }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold font-urdu flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4 text-amber-300" />
                    <span>{isUrdu ? 'نیا استاد درج کریں' : 'Add Teacher'}</span>
                  </button>
                </div>
              </div>

              {/* Verified Institutional Stat Indicator */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
                    22
                  </div>
                  <div className="text-xs font-urdu space-y-0.5">
                    <div className="font-bold text-emerald-950">{isUrdu ? 'تصدیق شدہ مجموعی تدریسی عملہ: 22 اساتذہ کرام' : 'Verified Institutional Count: 22 Teachers'}</div>
                    <div className="text-emerald-800">{isUrdu ? 'ویب سائٹ کے ہوم پیج پر یہ مصدقہ اعداد و شمار نمایاں طور پر ظاہر ہوتے ہیں۔' : 'This verified metric is highlighted prominently on the public homepage.'}</div>
                  </div>
                </div>
              </div>

              {/* Teachers Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {adminData.teachers.map(t => (
                  <div key={t.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-amber-300 flex items-center justify-center font-bold font-urdu text-lg shadow-sm">
                          {t.monogramUr || 'قاری'}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 font-urdu text-base">{t.nameUr}</h4>
                          <p className="text-xs text-emerald-800 font-medium">{t.nameEn}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs font-urdu text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div><strong>{isUrdu ? 'عہدہ:' : 'Role:'}</strong> {t.roleUr}</div>
                        <div><strong>{isUrdu ? 'قابلیت:' : 'Qualification:'}</strong> {t.qualificationUr}</div>
                        <div><strong>{isUrdu ? 'تجربہ:' : 'Experience:'}</strong> {t.experienceUr}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => setEditingTeacher(t)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-emerald-800 text-xs font-bold font-urdu cursor-pointer"
                      >
                        {isUrdu ? 'ترمیم کریں' : 'Edit'}
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(isUrdu ? 'کیا آپ اس استاد کو آرکائیو کرنا چاہتے ہیں؟' : 'Archive this teacher profile?')) {
                            const updated = adminData.teachers.filter(item => item.id !== t.id);
                            await handleSaveModule('teachers', updated, isUrdu ? 'استاد کا ریکارڈ آرکائیو ہو گیا' : 'Teacher archived');
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                        title="Archive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add / Edit Teacher Modal */}
              {(isAddingTeacher || editingTeacher) && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-900 font-urdu text-base">
                        {editingTeacher ? (isUrdu ? 'استاد کی معلومات میں ترمیم' : 'Edit Teacher') : (isUrdu ? 'نیا استاد درج کریں' : 'Add Teacher')}
                      </h3>
                      <button onClick={() => { setIsAddingTeacher(false); setEditingTeacher(null); }} className="p-1 text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const nameUr = formData.get('nameUr') as string;
                      const nameEn = formData.get('nameEn') as string;
                      const roleUr = formData.get('roleUr') as string;
                      const roleEn = formData.get('roleEn') as string;
                      const qualUr = formData.get('qualUr') as string;
                      const expUr = formData.get('expUr') as string;
                      const mono = formData.get('monogramUr') as string;

                      if (editingTeacher) {
                        const updated = adminData.teachers.map(item => item.id === editingTeacher.id ? {
                          ...item,
                          nameUr,
                          nameEn,
                          roleUr,
                          roleEn,
                          qualificationUr: qualUr,
                          qualificationEn: qualUr,
                          experienceUr: expUr,
                          experienceEn: expUr,
                          monogramUr: mono
                        } : item);
                        await handleSaveModule('teachers', updated);
                      } else {
                        const newTeach: Teacher = {
                          id: `t-${Date.now()}`,
                          nameUr,
                          nameEn,
                          roleUr,
                          roleEn,
                          qualificationUr: qualUr,
                          qualificationEn: qualUr,
                          experienceUr: expUr,
                          experienceEn: expUr,
                          monogramUr: mono || 'قاری'
                        };
                        await handleSaveModule('teachers', [...adminData.teachers, newTeach]);
                      }
                      setIsAddingTeacher(false);
                      setEditingTeacher(null);
                    }} className="space-y-3 text-xs font-urdu">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'نام (اردو) *' : 'Name (Urdu) *'}</label>
                          <input name="nameUr" defaultValue={editingTeacher?.nameUr} required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'نام (انگلش) *' : 'Name (English) *'}</label>
                          <input name="nameEn" defaultValue={editingTeacher?.nameEn} required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'عہدہ (اردو)' : 'Role (Urdu)'}</label>
                          <input name="roleUr" defaultValue={editingTeacher?.roleUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'عہدہ (انگلش)' : 'Role (English)'}</label>
                          <input name="roleEn" defaultValue={editingTeacher?.roleEn} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'تعلیمی اسناد و قابلیت' : 'Qualifications'}</label>
                        <input name="qualUr" defaultValue={editingTeacher?.qualificationUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'تدریسی تجربہ' : 'Experience'}</label>
                          <input name="expUr" defaultValue={editingTeacher?.experienceUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'مونوگرام لفظ (مثلاً شیخ، عالم)' : 'Monogram Badge'}</label>
                          <input name="monogramUr" defaultValue={editingTeacher?.monogramUr} maxLength={6} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                        <button type="button" onClick={() => { setIsAddingTeacher(false); setEditingTeacher(null); }} className="px-4 py-2 border rounded-xl">
                          {isUrdu ? 'منسوخ' : 'Cancel'}
                        </button>
                        <button type="submit" className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl">
                          {isUrdu ? 'محفوظ کریں' : 'Save'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* 4. ONLINE ADMISSIONS MODULE */}
          {/* ========================================================= */}
          {activeModule === 'admissions' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">
                    {isUrdu ? 'آن لائن داخلہ درخواستیں مینیجر' : 'Online Admission Applications'}
                  </h2>
                  <p className="text-xs text-slate-500 font-urdu">
                    {isUrdu ? 'والدین کی طرف سے جمع کروائی گئی درخواستیں، فیصلہ جات اور طالب علم ریکارڈ میں منتقلی' : 'Manage student applications, status reviews, and conversion to permanent student records'}
                  </p>
                </div>

                <button
                  onClick={() => downloadCSV('admissions')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold font-urdu flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>{isUrdu ? 'CSV ایکسپورٹ' : 'Export CSV'}</span>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center justify-between">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="w-4 h-4 text-slate-400 absolute top-2.5 start-3 pointer-events-none" />
                  <input
                    type="text"
                    value={admissionSearch}
                    onChange={(e) => setAdmissionSearch(e.target.value)}
                    placeholder={isUrdu ? 'درخواست گزار کا نام یا فون تلاش کریں...' : 'Search applications...'}
                    className="w-full ps-9 pe-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-urdu focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <select
                  value={admissionStatusFilter}
                  onChange={(e) => setAdmissionStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-urdu"
                >
                  <option value="all">{isUrdu ? 'تمام حالتیں' : 'All Statuses'}</option>
                  <option value="pending">{isUrdu ? 'زیرِ غور (Pending)' : 'Pending'}</option>
                  <option value="approved">{isUrdu ? 'منظور شدہ (Approved)' : 'Approved'}</option>
                  <option value="rejected">{isUrdu ? 'مسترد (Rejected)' : 'Rejected'}</option>
                </select>
              </div>

              {/* Admission Applications Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-start text-xs font-urdu">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <tr>
                        <th className="p-3.5 text-start">Application ID</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'طالب علم' : 'Student'}</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'والد کا نام' : 'Father'}</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'شعبہ' : 'Program'}</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'سرپرست فون' : 'Phone'}</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'تاریخ' : 'Date'}</th>
                        <th className="p-3.5 text-start">{isUrdu ? 'حالت' : 'Status'}</th>
                        <th className="p-3.5 text-center">{isUrdu ? 'اقدامات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {adminData.admissions
                        .filter(a => {
                          const matches = a.studentName.toLowerCase().includes(admissionSearch.toLowerCase()) || 
                                          a.guardianPhone.includes(admissionSearch);
                          const matchesStatus = admissionStatusFilter === 'all' || a.status === admissionStatusFilter;
                          return matches && matchesStatus;
                        })
                        .map(a => (
                          <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5 font-mono text-emerald-800 font-bold">{a.id}</td>
                            <td className="p-3.5 font-bold text-slate-900">{a.studentName}</td>
                            <td className="p-3.5 text-slate-600">{a.fatherName}</td>
                            <td className="p-3.5">
                              <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold text-[11px]">
                                {a.programId === 'hifz' ? 'حفظ القرآن' : a.programId === 'nazra' ? 'ناظرہ قرآن' : 'دینیات'}
                              </span>
                            </td>
                            <td className="p-3.5 font-mono text-slate-600" dir="ltr">{a.guardianPhone}</td>
                            <td className="p-3.5 font-mono text-slate-400">{a.createdAt}</td>
                            <td className="p-3.5">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                a.status === 'approved' 
                                  ? 'bg-green-100 text-green-800 border border-green-300' 
                                  : a.status === 'rejected' 
                                  ? 'bg-red-100 text-red-800 border border-red-300' 
                                  : 'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}>
                                {a.status === 'approved' ? 'منظور شدہ' : a.status === 'rejected' ? 'مسترد' : 'زیرِ غور'}
                              </span>
                            </td>
                            <td className="p-3.5 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setViewingAdmission(a)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-[11px] cursor-pointer"
                                >
                                  {isUrdu ? 'تفصیل' : 'Details'}
                                </button>
                                {a.status !== 'approved' && (
                                  <button
                                    onClick={() => handleUpdateAdmissionStatus(a.id, 'approved')}
                                    className="p-1 rounded-lg text-green-700 hover:bg-green-50 cursor-pointer"
                                    title="Approve"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                )}
                                {a.status !== 'rejected' && (
                                  <button
                                    onClick={() => handleUpdateAdmissionStatus(a.id, 'rejected')}
                                    className="p-1 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                                    title="Reject"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* View Admission Details Modal */}
              {viewingAdmission && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-800">{viewingAdmission.id}</span>
                        <h3 className="font-bold text-slate-900 font-urdu text-base">{viewingAdmission.studentName}</h3>
                      </div>
                      <button onClick={() => setViewingAdmission(null)} className="p-1 text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-2 text-xs font-urdu text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div><strong>{isUrdu ? 'والد کا نام:' : 'Father Name:'}</strong> {viewingAdmission.fatherName}</div>
                      <div><strong>{isUrdu ? 'سرپرست فون:' : 'Phone:'}</strong> <span dir="ltr" className="font-mono">{viewingAdmission.guardianPhone}</span></div>
                      <div><strong>{isUrdu ? 'عمر:' : 'Age:'}</strong> {viewingAdmission.age || '—'} سال</div>
                      <div><strong>{isUrdu ? 'مطلوبہ شعبہ:' : 'Requested Program:'}</strong> {viewingAdmission.programId === 'hifz' ? 'شعبہ حفظ القرآن' : 'ناظرہ مع تجوید'}</div>
                      <div><strong>{isUrdu ? 'موجودہ قابلیت:' : 'Current Level:'}</strong> {viewingAdmission.currentLevelUr || '—'}</div>
                      <div><strong>{isUrdu ? 'پتہ:' : 'Address:'}</strong> {viewingAdmission.address || '—'}</div>
                      <div><strong>{isUrdu ? 'پچھلا ادارہ:' : 'Previous Madrasa:'}</strong> {viewingAdmission.previousMadrasa || 'کوئی نہیں'}</div>
                      <div><strong>{isUrdu ? 'نوٹس:' : 'Notes:'}</strong> {viewingAdmission.notes || '—'}</div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateAdmissionStatus(viewingAdmission.id, 'approved')}
                          className="px-3 py-1.5 rounded-xl bg-green-700 text-white font-bold text-xs font-urdu cursor-pointer"
                        >
                          {isUrdu ? 'منظور کریں' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleUpdateAdmissionStatus(viewingAdmission.id, 'rejected')}
                          className="px-3 py-1.5 rounded-xl bg-red-700 text-white font-bold text-xs font-urdu cursor-pointer"
                        >
                          {isUrdu ? 'مسترد کریں' : 'Reject'}
                        </button>
                      </div>

                      <button
                        onClick={() => handleConvertAdmissionToStudent(viewingAdmission)}
                        className="px-4 py-1.5 rounded-xl bg-emerald-800 text-amber-300 font-bold text-xs font-urdu cursor-pointer shadow-sm flex items-center gap-1.5"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>{isUrdu ? 'طالب علم ریکارڈ میں منتقل کریں' : 'Convert to Permanent Student'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* 5. PROGRAMS AND COURSES MODULE */}
          {/* ========================================================= */}
          {activeModule === 'programs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'تعلیمی پروگرامز و کورسز' : 'Programs & Courses'}</h2>
                  <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'حفظِ قرآن، ناظرہ مع تجوید اور دیگر کورسز کے نصاب، اوقات اور خصوصیات میں ترمیم' : 'Manage core Quran memorization and recitation courses'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {adminData.programs.map(prog => (
                  <div key={prog.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">{prog.id}</span>
                        <h3 className="text-lg font-bold text-slate-900 font-urdu mt-1">{prog.titleUr}</h3>
                        <p className="text-xs text-emerald-800 font-semibold">{prog.titleEn}</p>
                      </div>
                      <button
                        onClick={() => setEditingProgram(prog)}
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 font-urdu leading-relaxed">{prog.descUr}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs font-urdu bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div><strong>{isUrdu ? 'دورانیہ:' : 'Duration:'}</strong> {prog.durationUr}</div>
                      <div><strong>{isUrdu ? 'عمر کی حد:' : 'Age:'}</strong> {prog.ageUr}</div>
                      <div className="col-span-2"><strong>{isUrdu ? 'اوقات:' : 'Timings:'}</strong> {prog.timingsUr}</div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-500 font-urdu">{isUrdu ? 'نمایاں خصوصیات:' : 'Key Features:'}</span>
                      <ul className="text-xs text-slate-600 font-urdu space-y-1">
                        {prog.featuresUr.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Program Modal */}
              {editingProgram && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-900 font-urdu text-base">{isUrdu ? 'پروگرام معلومات میں ترمیم' : 'Edit Program'}</h3>
                      <button onClick={() => setEditingProgram(null)} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                    </div>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const titleUr = formData.get('titleUr') as string;
                      const titleEn = formData.get('titleEn') as string;
                      const descUr = formData.get('descUr') as string;
                      const durationUr = formData.get('durationUr') as string;
                      const timingsUr = formData.get('timingsUr') as string;

                      const updated = adminData.programs.map(p => p.id === editingProgram.id ? {
                        ...p,
                        titleUr,
                        titleEn,
                        descUr,
                        durationUr,
                        timingsUr
                      } : p);

                      await handleSaveModule('programs', updated, isUrdu ? 'پروگرام کامیابی سے اپ ڈیٹ ہو گیا۔' : 'Program updated');
                      setEditingProgram(null);
                    }} className="space-y-3 text-xs font-urdu">
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'عنوان (اردو) *' : 'Title (Urdu) *'}</label>
                        <input name="titleUr" defaultValue={editingProgram.titleUr} required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'عنوان (انگلش) *' : 'Title (English) *'}</label>
                        <input name="titleEn" defaultValue={editingProgram.titleEn} required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'تفصیل (اردو)' : 'Description (Urdu)'}</label>
                        <textarea name="descUr" defaultValue={editingProgram.descUr} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'دورانیہ' : 'Duration'}</label>
                          <input name="durationUr" defaultValue={editingProgram.durationUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'اوقات' : 'Timings'}</label>
                          <input name="timingsUr" defaultValue={editingProgram.timingsUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                        <button type="button" onClick={() => setEditingProgram(null)} className="px-4 py-2 border rounded-xl">{isUrdu ? 'منسوخ' : 'Cancel'}</button>
                        <button type="submit" className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl">{isUrdu ? 'محفوظ کریں' : 'Save Changes'}</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* 6. DAILY TIMETABLE MODULE (4 Periods) */}
          {/* ========================================================= */}
          {activeModule === 'timetable' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'روزانہ کا تعلیمی نظام الاوقات' : 'Daily Madrasa Timetable'}</h2>
                  <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'چاروں بنیادی دورانیے (صبح، دوپہر، بعد عصر اور بعد مغرب) کے اوقات اور تفصیلات' : 'Configure the four daily educational and prayer sessions'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {adminData.dailyTimetable.map(period => (
                  <div key={period.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                          {period.periodNum}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 font-urdu text-base">{period.titleUr}</h4>
                          <p className="text-xs text-emerald-800 font-medium">{period.titleEn}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingTimetablePeriod(period)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-emerald-800 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-xs font-urdu space-y-1">
                      <div className="font-bold text-emerald-950">{isUrdu ? 'اوقاتِ دورانیہ:' : 'Time Range:'} <span className="text-emerald-800">{period.timeRangeUr}</span></div>
                      <div className="text-slate-600">{period.subtitleUr}</div>
                    </div>

                    <p className="text-xs text-slate-600 font-urdu leading-relaxed">{period.descUr}</p>
                  </div>
                ))}
              </div>

              {/* Edit Period Modal */}
              {editingTimetablePeriod && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-900 font-urdu text-base">{isUrdu ? 'دورانیہ کے اوقات میں ترمیم' : 'Edit Timetable Period'}</h3>
                      <button onClick={() => setEditingTimetablePeriod(null)} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                    </div>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const titleUr = formData.get('titleUr') as string;
                      const timeRangeUr = formData.get('timeRangeUr') as string;
                      const subtitleUr = formData.get('subtitleUr') as string;
                      const descUr = formData.get('descUr') as string;

                      const updated = adminData.dailyTimetable.map(p => p.id === editingTimetablePeriod.id ? {
                        ...p,
                        titleUr,
                        timeRangeUr,
                        subtitleUr,
                        descUr
                      } : p);

                      await handleSaveModule('dailyTimetable', updated, isUrdu ? 'ٹائم ٹیبل اپ ڈیٹ ہو گیا۔' : 'Timetable period updated');
                      setEditingTimetablePeriod(null);
                    }} className="space-y-3 text-xs font-urdu">
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'عنوان (اردو) *' : 'Title (Urdu) *'}</label>
                        <input name="titleUr" defaultValue={editingTimetablePeriod.titleUr} required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'اوقات (مثلاً صبح 7:30 تا دوپہر 12:00) *' : 'Time Range *'}</label>
                        <input name="timeRangeUr" defaultValue={editingTimetablePeriod.timeRangeUr} required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'ذیلی وضاحت' : 'Subtitle'}</label>
                        <input name="subtitleUr" defaultValue={editingTimetablePeriod.subtitleUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'تدریسی تفصیل' : 'Description'}</label>
                        <textarea name="descUr" defaultValue={editingTimetablePeriod.descUr} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                        <button type="button" onClick={() => setEditingTimetablePeriod(null)} className="px-4 py-2 border rounded-xl">{isUrdu ? 'منسوخ' : 'Cancel'}</button>
                        <button type="submit" className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl">{isUrdu ? 'محفوظ کریں' : 'Save Changes'}</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* 7. WEEKLY SCHEDULE & SPECIAL HOLIDAYS MODULE */}
          {/* ========================================================= */}
          {activeModule === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'ہفتہ وار تعلیمی شیڈول و تعطیلات' : 'Weekly Schedule & Holidays'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'ہفتہ تا جمعرات تدریس اور جمعہ مبارک کی تعطیل کا انتظام، علاوہ ازیں خصوصی تعطیلات' : 'Saturday-Thursday class operations and Friday holiday notice'}</p>
              </div>

              {/* 7 Days List */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 font-urdu text-base">{isUrdu ? 'ہفتہ وار تعلیمی ایام' : 'Days of the Week'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                  {adminData.weeklySchedule.map(day => (
                    <div key={day.id} className={`p-4 rounded-2xl border text-center font-urdu space-y-1.5 ${
                      day.isHoliday ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="font-bold text-base text-slate-900">{isUrdu ? day.dayUr : day.dayEn}</div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-block ${
                        day.isHoliday ? 'bg-amber-200 text-amber-950' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isUrdu ? day.statusUr : day.statusEn}
                      </span>
                      <div className="text-[10px] text-slate-500">{isUrdu ? day.timingsUr : day.timingsEn}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Holidays Manager */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 font-urdu text-base">{isUrdu ? 'خصوصی تعطیلات و اعلانات' : 'Special Closures & Holiday Dates'}</h3>
                  <button
                    onClick={async () => {
                      const title = prompt(isUrdu ? 'تعطیل کا نام درج کریں:' : 'Enter Holiday Title:');
                      if (!title) return;
                      const date = prompt(isUrdu ? 'تاریخ (مثلاً 2026-03-25):' : 'Date (e.g. 2026-03-25):') || '2026-03-25';
                      const newHol: SpecialHoliday = {
                        id: `hol-${Date.now()}`,
                        titleUr: title,
                        titleEn: title,
                        date,
                        descUr: 'مدرسہ میں تدریس معطل رہے گی۔',
                        descEn: 'Academic classes will be suspended.',
                        isPublished: true
                      };
                      await handleSaveModule('specialHolidays', [...adminData.specialHolidays, newHol]);
                    }}
                    className="px-3.5 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-bold font-urdu cursor-pointer"
                  >
                    {isUrdu ? '+ نئی خصوصی تعطیل' : '+ Add Special Holiday'}
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {adminData.specialHolidays.map(hol => (
                    <div key={hol.id} className="py-3 flex items-center justify-between text-xs font-urdu">
                      <div>
                        <div className="font-bold text-slate-900">{hol.titleUr} ({hol.date})</div>
                        <div className="text-slate-500 text-[11px]">{hol.descUr}</div>
                      </div>
                      <button
                        onClick={async () => {
                          const updated = adminData.specialHolidays.filter(h => h.id !== hol.id);
                          await handleSaveModule('specialHolidays', updated);
                        }}
                        className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* 8. PRAYER COMPETITIONS MODULE */}
          {/* ========================================================= */}
          {activeModule === 'competitions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'نماز کے مقابلے مینیجر' : 'Prayer Competitions'}</h2>
                  <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'متغیر وقفوں (مثلاً 40 دن، 2 ماہ، 3 ماہ) پر منعقد ہونے والے نماز کے ترغیبی مقابلے' : 'Manage periodic prayer punctuality and Takbeer-e-Ula competitions'}</p>
                </div>
                <button
                  onClick={async () => {
                    const title = prompt(isUrdu ? 'مقابلے کا عنوان:' : 'Competition Title:');
                    if (!title) return;
                    const newComp: Competition = {
                      id: `comp-${Date.now()}`,
                      titleUr: title,
                      titleEn: title,
                      descUr: 'طلبہ میں پانچوں نمازوں کی پابندی اور تکبیرِ اولیٰ کا ترغیبی مقابلہ۔',
                      descEn: 'Motivational contest for five daily prayers.',
                      intervalUr: 'تقریباً 40 دن',
                      intervalEn: 'Approximately 40 Days',
                      startDate: new Date().toISOString().split('T')[0],
                      endDate: new Date(Date.now() + 40 * 86400000).toISOString().split('T')[0],
                      rulesUr: 'باجماعت تکبیرِ اولیٰ کی پابندی۔',
                      rulesEn: 'Takbeer-e-Ula in congregational prayers.',
                      prizesUr: 'اسناد و انعامات۔',
                      prizesEn: 'Certificates and awards.',
                      status: 'active',
                      isPublished: true
                    };
                    await handleSaveModule('competitions', [...adminData.competitions, newComp]);
                  }}
                  className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold font-urdu cursor-pointer"
                >
                  {isUrdu ? '+ نیا مقابلہ درج کریں' : '+ Add Competition'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {adminData.competitions.map(comp => (
                  <div key={comp.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-bold font-urdu">
                          {comp.intervalUr}
                        </span>
                        <h3 className="font-bold text-slate-900 font-urdu text-base mt-2">{comp.titleUr}</h3>
                        <p className="text-xs text-emerald-800 font-medium">{comp.titleEn}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        comp.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {comp.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-urdu leading-relaxed">{comp.descUr}</p>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs font-urdu space-y-1">
                      <div><strong>{isUrdu ? 'قواعد:' : 'Rules:'}</strong> {comp.rulesUr}</div>
                      <div><strong>{isUrdu ? 'انعامات:' : 'Prizes:'}</strong> {comp.prizesUr}</div>
                      <div className="font-mono text-slate-500 text-[11px] pt-1">
                        {comp.startDate} تا {comp.endDate}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={async () => {
                          const updated = adminData.competitions.filter(c => c.id !== comp.id);
                          await handleSaveModule('competitions', updated);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-urdu cursor-pointer"
                      >
                        {isUrdu ? 'حذف کریں' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 9. COMPETITION RESULTS MODULE */}
          {/* ========================================================= */}
          {activeModule === 'results' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'مقابلوں کے نتائج و پوزیشنز' : 'Competition Results'}</h2>
                  <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'نماز کے مقابلوں کے مستند نتائج، نمایاں پوزیشنز اور تقسیمِ انعامات' : 'Verified winners and evaluation scores for prayer competitions'}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-start text-xs font-urdu">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="p-3.5 text-start">{isUrdu ? 'طالب علم' : 'Student'}</th>
                      <th className="p-3.5 text-start">{isUrdu ? 'پوزیشن' : 'Position'}</th>
                      <th className="p-3.5 text-start">{isUrdu ? 'اسکور' : 'Score'}</th>
                      <th className="p-3.5 text-start">{isUrdu ? 'انعام' : 'Prize'}</th>
                      <th className="p-3.5 text-start">{isUrdu ? 'تفصیل' : 'Notes'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {adminData.competitionResults.map(r => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="p-3.5 font-bold text-slate-900">{r.studentName}</td>
                        <td className="p-3.5 text-amber-800 font-bold">{r.positionUr}</td>
                        <td className="p-3.5 font-mono text-emerald-800 font-bold">{r.evaluationScore}</td>
                        <td className="p-3.5 text-slate-700">{r.prizeAwarded}</td>
                        <td className="p-3.5 text-slate-500">{r.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 10. MONTHLY ASSESSMENTS MODULE */}
          {/* ========================================================= */}
          {activeModule === 'assessments' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'ماہانہ جائزے مینیجر' : 'Monthly Assessments'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'شعبہ حفظ و ناظرہ کے ماہانہ جائزوں کی تاریخیں، نصاب اور پیش رفت' : 'Monthly academic assessment schedules and evaluations'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {adminData.assessments.map(ass => (
                  <div key={ass.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold font-urdu">{ass.month}</span>
                      <span className="font-mono text-xs text-slate-500">{ass.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 font-urdu text-base">{ass.titleUr}</h3>
                    <p className="text-xs text-slate-600 font-urdu leading-relaxed">{ass.summaryUr}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 11. ANNUAL EXAMINATIONS MODULE */}
          {/* ========================================================= */}
          {activeModule === 'examinations' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'سالانہ امتحانات مینیجر' : 'Annual Examinations'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'سالانہ امتحانات کا نظام الاوقات اور نوٹس' : 'Annual examination schedules and academic rules'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {adminData.examinations.map(exam => (
                  <div key={exam.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-emerald-800">{exam.examDate}</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] uppercase font-mono">{exam.status}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 font-urdu text-base">{exam.titleUr}</h3>
                    <p className="text-xs text-slate-600 font-urdu">{exam.rulesUr}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 12. ANNUAL PROGRAM & AWARDS MODULE */}
          {/* ========================================================= */}
          {activeModule === 'annual-awards' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'سالانہ پروگرام و تقسیمِ انعامات' : 'Annual Program & Awards'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'دستار بندی، اسناد کی تقسیم اور نمازی و تعلیمی ایوارڈز' : 'Graduation ceremony (Dastaar Bandi) and annual awards'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {adminData.annualAwards.map(awd => (
                  <div key={awd.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-bold font-urdu">{awd.categoryUr}</span>
                      <span className="font-mono text-xs text-slate-500">{awd.year}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 font-urdu text-base">{awd.titleUr}</h3>
                    <div className="text-xs font-urdu space-y-1 bg-slate-50 p-3 rounded-2xl">
                      <div><strong>{isUrdu ? 'کامیاب طالب علم:' : 'Winner:'}</strong> {awd.winnerName}</div>
                      <div><strong>{isUrdu ? 'ایوارڈ کا نام:' : 'Award:'}</strong> {awd.awardNameUr}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 13. WEBSITE PAGE EDITOR (Visual CMS with Live Preview!) */}
          {/* ========================================================= */}
          {activeModule === 'website-editor' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'مکمل ویب سائٹ پیج ایڈیٹر (Visual CMS)' : 'Website Page Editor'}</h2>
                  <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'کسی بھی صفحے کا مواد، عنوانات، پیراگراف اور بٹن اردو اور انگریزی میں تبدیل کریں' : 'Edit content for all website pages with instant live synchronization'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLivePreview(!showLivePreview)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs font-urdu font-bold flex items-center gap-1.5 bg-white cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-emerald-700" />
                    <span>{showLivePreview ? (isUrdu ? 'پیش نظارہ چھپائیں' : 'Hide Preview') : (isUrdu ? 'پیش نظارہ دیکھیں' : 'Show Preview')}</span>
                  </button>
                </div>
              </div>

              {/* Page Selector Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                {[
                  { id: 'home', labelUr: 'ہوم پیج (Homepage)', labelEn: 'Home' },
                  { id: 'about', labelUr: 'تعارف (About)', labelEn: 'About' },
                  { id: 'programs', labelUr: 'پروگرامز (Programs)', labelEn: 'Programs' },
                  { id: 'schedule', labelUr: 'اوقات (Schedule)', labelEn: 'Schedule' },
                  { id: 'admissions', labelUr: 'داخلہ پیج (Admissions)', labelEn: 'Admissions' },
                  { id: 'contact', labelUr: 'رابطہ پیج (Contact)', labelEn: 'Contact' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setEditorPage(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-urdu transition-colors cursor-pointer ${
                      editorPage === tab.id ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isUrdu ? tab.labelUr : tab.labelEn}
                  </button>
                ))}
              </div>

              {/* Split Screen Editor + Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Editing Form (6 cols or full) */}
                <div className={`${showLivePreview ? 'lg:col-span-6' : 'lg:col-span-12'} bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4`}>
                  <h3 className="font-bold text-slate-900 font-urdu text-base border-b border-slate-100 pb-2">
                    {isUrdu ? `صفحہ برائے ترمیم: ${editorPage.toUpperCase()}` : `Editing: ${editorPage.toUpperCase()} Page`}
                  </h3>

                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);

                    const currentPages = { ...adminData.pagesContent };
                    if (editorPage === 'home') {
                      currentPages.home = {
                        ...currentPages.home,
                        heroTitleUr: formData.get('heroTitleUr') as string,
                        heroTitleEn: formData.get('heroTitleEn') as string,
                        heroDescUr: formData.get('heroDescUr') as string,
                        heroDescEn: formData.get('heroDescEn') as string,
                        ctaTitleUr: formData.get('ctaTitleUr') as string,
                        ctaDescUr: formData.get('ctaDescUr') as string
                      };
                    } else if (editorPage === 'about') {
                      currentPages.about = {
                        ...currentPages.about,
                        titleUr: formData.get('titleUr') as string,
                        titleEn: formData.get('titleEn') as string,
                        mainDescUr: formData.get('mainDescUr') as string,
                        missionUr: formData.get('missionUr') as string
                      };
                    } else if (editorPage === 'programs') {
                      currentPages.programs = {
                        ...currentPages.programs,
                        titleUr: formData.get('titleUr') as string,
                        titleEn: formData.get('titleEn') as string,
                        descUr: formData.get('descUr') as string
                      };
                    } else if (editorPage === 'admissions') {
                      currentPages.admissions = {
                        ...currentPages.admissions,
                        titleUr: formData.get('titleUr') as string,
                        policyUr: formData.get('policyUr') as string
                      };
                    } else if (editorPage === 'contact') {
                      currentPages.contact = {
                        ...currentPages.contact,
                        titleUr: formData.get('titleUr') as string,
                        officeHoursUr: formData.get('officeHoursUr') as string
                      };
                    }

                    await handleSaveModule('pagesContent', currentPages, isUrdu ? 'صفحہ کا مواد کامیابی سے اپ ڈیٹ ہو گیا۔' : 'Page content updated');
                  }} className="space-y-4 text-xs font-urdu">
                    
                    {editorPage === 'home' && (
                      <>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'ہیرو عنوان (اردو)' : 'Hero Title (Urdu)'}</label>
                          <input name="heroTitleUr" defaultValue={adminData.pagesContent.home.heroTitleUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'ہیرو عنوان (انگلش)' : 'Hero Title (English)'}</label>
                          <input name="heroTitleEn" defaultValue={adminData.pagesContent.home.heroTitleEn} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'ہیرو تعارفی پیراگراف (اردو)' : 'Hero Description (Urdu)'}</label>
                          <textarea name="heroDescUr" defaultValue={adminData.pagesContent.home.heroDescUr} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'ہیرو تعارفی پیراگراف (انگلش)' : 'Hero Description (English)'}</label>
                          <textarea name="heroDescEn" defaultValue={adminData.pagesContent.home.heroDescEn} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'CTA بینر عنوان' : 'CTA Title'}</label>
                          <input name="ctaTitleUr" defaultValue={adminData.pagesContent.home.ctaTitleUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'CTA بینر تفصیل' : 'CTA Description'}</label>
                          <textarea name="ctaDescUr" defaultValue={adminData.pagesContent.home.ctaDescUr} rows={2} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </>
                    )}

                    {editorPage === 'about' && (
                      <>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'صفحہ عنوان (اردو)' : 'Title (Urdu)'}</label>
                          <input name="titleUr" defaultValue={adminData.pagesContent.about.titleUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'صفحہ عنوان (انگلش)' : 'Title (English)'}</label>
                          <input name="titleEn" defaultValue={adminData.pagesContent.about.titleEn} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'تفصیلی تعارف (اردو)' : 'Main Description (Urdu)'}</label>
                          <textarea name="mainDescUr" defaultValue={adminData.pagesContent.about.mainDescUr} rows={4} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'مشن و ویژن (اردو)' : 'Mission Statement (Urdu)'}</label>
                          <textarea name="missionUr" defaultValue={adminData.pagesContent.about.missionUr} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </>
                    )}

                    {editorPage === 'programs' && (
                      <>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'صفحہ عنوان (اردو)' : 'Title (Urdu)'}</label>
                          <input name="titleUr" defaultValue={adminData.pagesContent.programs.titleUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'تعارفی تفصیل' : 'Description'}</label>
                          <textarea name="descUr" defaultValue={adminData.pagesContent.programs.descUr} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </>
                    )}

                    {editorPage === 'admissions' && (
                      <>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'داخلہ پیج عنوان' : 'Title'}</label>
                          <input name="titleUr" defaultValue={adminData.pagesContent.admissions.titleUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'شرائط و پالیسی' : 'Policy'}</label>
                          <textarea name="policyUr" defaultValue={adminData.pagesContent.admissions.policyUr} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </>
                    )}

                    {editorPage === 'contact' && (
                      <>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'رابطہ پیج عنوان' : 'Title'}</label>
                          <input name="titleUr" defaultValue={adminData.pagesContent.contact.titleUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'دفتری اوقات' : 'Office Hours'}</label>
                          <input name="officeHoursUr" defaultValue={adminData.pagesContent.contact.officeHoursUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                        </div>
                      </>
                    )}

                    <button type="submit" className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold font-urdu cursor-pointer shadow-sm">
                      {isUrdu ? 'تبدیلیاں شائع کریں (Publish Changes)' : 'Publish Changes to Website'}
                    </button>
                  </form>
                </div>

                {/* Live Preview Card (6 cols) */}
                {showLivePreview && (
                  <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-xs text-amber-300 font-bold font-mono">LIVE PREVIEW</span>
                      <span className="text-[10px] text-slate-400 font-urdu">{isUrdu ? 'عوامی ویب سائٹ پر ظاہر ہونے والی شکل' : 'Public appearance preview'}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-urdu">
                      {editorPage === 'home' && (
                        <>
                          <div className="text-lg font-bold text-white">{adminData.pagesContent.home.heroTitleUr}</div>
                          <div className="text-xs text-amber-200">{adminData.pagesContent.home.heroSubtitleUr}</div>
                          <p className="text-xs text-slate-300 leading-relaxed">{adminData.pagesContent.home.heroDescUr}</p>
                          <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-700/50 text-xs">
                            <span className="font-bold text-amber-300">{adminData.pagesContent.home.ctaTitleUr}</span>
                            <p className="text-[11px] text-emerald-200 mt-1">{adminData.pagesContent.home.ctaDescUr}</p>
                          </div>
                        </>
                      )}

                      {editorPage === 'about' && (
                        <>
                          <div className="text-lg font-bold text-white">{adminData.pagesContent.about.titleUr}</div>
                          <p className="text-xs text-slate-300 leading-relaxed">{adminData.pagesContent.about.mainDescUr}</p>
                          <p className="text-xs text-amber-300 mt-2 font-medium">{adminData.pagesContent.about.missionUr}</p>
                        </>
                      )}

                      {editorPage !== 'home' && editorPage !== 'about' && (
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {isUrdu ? 'صفحے کے تبدیل شدہ عنوانات اور مواد کو لائیو پبلک پیش نظارہ میں دیکھیں۔' : 'Preview dynamic content updates.'}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 14. HOMEPAGE SECTIONS CONTROL MODULE */}
          {/* ========================================================= */}
          {activeModule === 'home-sections' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'ہوم پیج سیکشنز کنٹرول مینیجر' : 'Homepage Sections Visibility'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'ہوم پیج پر مختلف حصوں (ہیرو، اساتذہ و طلبہ کارڈز، پروگرامز، ٹائم ٹیبل، نماز وغیرہ) کو آن یا آف کریں' : 'Toggle visibility of individual homepage sections'}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-urdu">
                  {Object.entries(adminData.pagesContent.home.sectionsVisibility || {}).map(([key, isVis]) => (
                    <div key={key} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">
                          {key === 'hero' ? 'ہیرو بینر (Hero Banner)' : 
                           key === 'stats' ? '22 اساتذہ و 400+ طلبہ کارڈز (Statistics)' :
                           key === 'programs' ? 'بنیادی تعلیمی پروگرامز (Core Programs)' :
                           key === 'timetable' ? 'روزانہ ٹائم ٹیبل (Daily Timetable)' :
                           key === 'prayers' ? 'نماز و تکبیرِ اولیٰ (Prayer Section)' :
                           key === 'assessments' ? 'ماہانہ امتحانات و جائزے (Assessments)' :
                           key === 'announcements' ? 'تازہ ترین نوٹس بورڈ (Announcements)' : 'داخلہ CTA بینر (CTA Banner)'}
                        </span>
                        <div className="text-[11px] text-slate-500 font-mono">section: {key}</div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isVis}
                          onChange={async (e) => {
                            const newVis = {
                              ...adminData.pagesContent.home.sectionsVisibility,
                              [key]: e.target.checked
                            };
                            const updatedPages = {
                              ...adminData.pagesContent,
                              home: {
                                ...adminData.pagesContent.home,
                                sectionsVisibility: newVis
                              }
                            };
                            await handleSaveModule('pagesContent', updatedPages);
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 15. BRANDING & INSTITUTION TITLE MODULE */}
          {/* ========================================================= */}
          {activeModule === 'branding' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'ادارہ جاتی برانڈنگ و عنوانات' : 'Header & Institution Branding'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'مدرسہ کا سرکاری نام، نعرہ (Motto)، اور نوٹس پٹی' : 'Configure official names and header banner texts'}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const updatedSettings = {
                    ...adminData.settings,
                    siteNameUr: formData.get('siteNameUr') as string,
                    siteNameEn: formData.get('siteNameEn') as string,
                    mottoUr: formData.get('mottoUr') as string,
                    mottoEn: formData.get('mottoEn') as string,
                    scheduleNoticeUr: formData.get('scheduleNoticeUr') as string,
                    scheduleNoticeEn: formData.get('scheduleNoticeEn') as string
                  };
                  await handleSaveModule('settings', updatedSettings, isUrdu ? 'برانڈنگ کامیابی سے اپ ڈیٹ ہو گئی۔' : 'Branding updated');
                }} className="space-y-4 text-xs font-urdu">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">{isUrdu ? 'مدرسے کا سرکاری نام (اردو) *' : 'Official Urdu Name *'}</label>
                      <input name="siteNameUr" defaultValue={adminData.settings.siteNameUr} required className="w-full px-3 py-2 rounded-xl border border-slate-200 font-urdu text-sm" />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">{isUrdu ? 'مدرسے کا سرکاری نام (انگلش) *' : 'Official English Name *'}</label>
                      <input name="siteNameEn" defaultValue={adminData.settings.siteNameEn} required className="w-full px-3 py-2 rounded-xl border border-slate-200 font-sans text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">{isUrdu ? 'نعرہ / سب ٹائٹل (اردو)' : 'Motto / Subtitle (Urdu)'}</label>
                      <input name="mottoUr" defaultValue={adminData.settings.mottoUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">{isUrdu ? 'نعرہ / سب ٹائٹل (انگلش)' : 'Motto / Subtitle (English)'}</label>
                      <input name="mottoEn" defaultValue={adminData.settings.mottoEn} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">{isUrdu ? 'ہیڈر کی ٹاپ نوٹس پٹی (اردو)' : 'Top Header Notice Bar (Urdu)'}</label>
                    <input name="scheduleNoticeUr" defaultValue={adminData.settings.scheduleNoticeUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                  </div>

                  <button type="submit" className="px-6 py-2.5 bg-emerald-800 text-white font-bold rounded-xl cursor-pointer">
                    {isUrdu ? 'برانڈنگ محفوظ کریں' : 'Save Branding'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 16. OFFICIAL LOGO MANAGER MODULE */}
          {/* ========================================================= */}
          {activeModule === 'logo' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'لوگو مینیجر (Official Logo Crest)' : 'Official Logo Manager'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'مدرسے کے آفیشل لوگو کو تبدیل، پریویو یا بحال کریں' : 'Manage and preview official crest image'}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
                
                {/* Current Logo Display */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-32 h-32 rounded-3xl bg-white border-2 border-emerald-600 shadow-md p-2 overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={adminData.settings.logoUrl || '/images/madrasa-logo.jpeg'}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-start text-xs font-urdu">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-0.5 rounded-full font-bold">
                      {isUrdu ? 'فعال لوگو' : 'Active Logo Asset'}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm font-mono mt-1" dir="ltr">
                      {adminData.settings.logoUrl || '/images/madrasa-logo.jpeg'}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {isUrdu 
                        ? 'یہ لوگو ہیڈر، فوٹر اور ایڈمن پورٹل پر بغیر کسی تبدیلی کے اصل تناسب کے ساتھ نظر آتا ہے۔' 
                        : 'This crest is displayed across headers, footers and certificates with proportional integrity.'}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <label className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold cursor-pointer inline-flex items-center gap-2">
                        <Upload className="w-4 h-4 text-amber-300" />
                        <span>{isUrdu ? 'نیا لوگو اپ لوڈ کریں' : 'Upload New Logo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const res = await uploadMediaAsset(file, 'madrasa-logo', 'Official Crest');
                            if (res.success && res.mediaItem) {
                              const updatedSettings = { ...adminData.settings, logoUrl: res.mediaItem.url };
                              await handleSaveModule('settings', updatedSettings);
                              showToast(isUrdu ? 'لوگو کامیابی سے اپ ڈیٹ ہو گیا!' : 'Logo updated successfully!');
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={async () => {
                          const updatedSettings = { ...adminData.settings, logoUrl: '/images/madrasa-logo.jpeg' };
                          await handleSaveModule('settings', updatedSettings);
                          showToast(isUrdu ? 'ڈیفالٹ آفیشل لوگو بحال کر دیا گیا۔' : 'Reset to default official logo');
                        }}
                        className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                      >
                        {isUrdu ? 'اصل ڈیفالٹ لوگو بحال کریں' : 'Restore Default Logo'}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 17. IMAGE AND MEDIA LIBRARY MODULE */}
          {/* ========================================================= */}
          {activeModule === 'media' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'میڈیا و تصاویر لائبریری' : 'Image & Media Library'}</h2>
                  <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'ویب سائٹ کے لیے تصاویر اپ لوڈ کریں، محفوظ کریں اور پبلک سیکشنز میں استعمال کریں' : 'Upload, preview and manage images with permanent server disk storage'}</p>
                </div>

                <label className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold font-urdu flex items-center gap-1.5 cursor-pointer shadow-sm">
                  <Upload className="w-4 h-4 text-amber-300" />
                  <span>{isUploadingMedia ? (isUrdu ? 'اپ لوڈ ہو رہی ہے...' : 'Uploading...') : (isUrdu ? 'نئی تصویر اپ لوڈ کریں' : 'Upload Image')}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isUploadingMedia} />
                </label>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {adminData.mediaLibrary.map(med => (
                  <div key={med.id} className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
                    <div className="aspect-square rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-2">
                      <img src={med.url} alt={med.altText} className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-xs text-slate-900 truncate font-mono" dir="ltr">{med.filename}</div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">{med.url}</div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(med.url);
                          showToast(isUrdu ? 'URL کاپی ہو گیا!' : 'URL copied to clipboard!');
                        }}
                        className="text-emerald-700 hover:underline font-bold text-[11px] font-urdu cursor-pointer"
                      >
                        {isUrdu ? 'کاپی لنک' : 'Copy URL'}
                      </button>

                      {med.url !== '/images/madrasa-logo.jpeg' && (
                        <button
                          onClick={async () => {
                            if (confirm(isUrdu ? 'کیا آپ واقعی اس تصویر کو حذف کرنا چاہتے ہیں؟' : 'Delete image?')) {
                              await deleteMediaAsset(med.id);
                              setAdminData(prev => ({
                                ...prev,
                                mediaLibrary: prev.mediaLibrary.filter(m => m.id !== med.id)
                              }));
                              showToast(isUrdu ? 'تصویر حذف کر دی گئی۔' : 'Image deleted');
                            }
                          }}
                          className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 18. NAVIGATION MENU EDITOR */}
          {/* ========================================================= */}
          {activeModule === 'navigation' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'نیویگیشن مینو ایڈیٹر' : 'Navigation Menu Editor'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'ویب سائٹ کے مینو آئٹمز کے لیبلز، ترتیب اور آن/آف ویزیبلٹی' : 'Configure menu tabs and visibility'}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                {adminData.navItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-urdu">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-400 w-6">#{idx + 1}</span>
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{item.labelUr}</span>
                        <span className="text-slate-500 text-xs ms-2">({item.labelEn})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="text-xs flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isVisible}
                          onChange={async (e) => {
                            const updated = adminData.navItems.map(n => n.id === item.id ? { ...n, isVisible: e.target.checked } : n);
                            await handleSaveModule('navItems', updated);
                          }}
                        />
                        <span>{isUrdu ? 'ظاہر کریں' : 'Visible'}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 19. FOOTER EDITOR MODULE */}
          {/* ========================================================= */}
          {activeModule === 'footer' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'فوٹر ایڈیٹر' : 'Footer Editor'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'فوٹر کے تمام عنوانات، روابط اور کاپی رائٹ کی ترامیم' : 'Configure footer content, copyright text, and headings'}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const updatedFooter: FooterConfig = {
                    ...adminData.footerConfig,
                    aboutTextUr: formData.get('aboutTextUr') as string,
                    aboutTextEn: formData.get('aboutTextEn') as string,
                    copyrightUr: formData.get('copyrightUr') as string,
                    copyrightEn: formData.get('copyrightEn') as string
                  };
                  await handleSaveModule('footerConfig', updatedFooter, isUrdu ? 'فوٹر محفوظ ہو گیا۔' : 'Footer updated');
                }} className="space-y-4 text-xs font-urdu">
                  <div>
                    <label className="block font-bold mb-1">{isUrdu ? 'تعارفی پیراگراف (اردو)' : 'About Text (Urdu)'}</label>
                    <textarea name="aboutTextUr" defaultValue={adminData.footerConfig.aboutTextUr} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">{isUrdu ? 'تعارفی پیراگراف (انگلش)' : 'About Text (English)'}</label>
                    <textarea name="aboutTextEn" defaultValue={adminData.footerConfig.aboutTextEn} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">{isUrdu ? 'کاپی رائٹ تحریر (اردو)' : 'Copyright Text (Urdu)'}</label>
                    <input name="copyrightUr" defaultValue={adminData.footerConfig.copyrightUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                  </div>
                  <button type="submit" className="px-6 py-2.5 bg-emerald-800 text-white font-bold rounded-xl cursor-pointer">
                    {isUrdu ? 'محفوظ کریں' : 'Save Footer'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 20. ANNOUNCEMENTS AND NOTICES MODULE */}
          {/* ========================================================= */}
          {activeModule === 'announcements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'اعلانات و نوٹس بورڈ' : 'Announcements & Notices'}</h2>
                  <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'داخلے، امتحانات، ٹائم ٹیبل اور تعطیلات کے سرکاری اعلانات' : 'Publish official notices and pin important alerts'}</p>
                </div>
                <button
                  onClick={() => { setIsAddingAnnouncement(true); setEditingAnnouncement(null); }}
                  className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold font-urdu cursor-pointer shadow-sm"
                >
                  {isUrdu ? '+ نیا اعلان لکھیں' : '+ Add Announcement'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {adminData.announcements.map(ann => (
                  <div key={ann.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full font-urdu">{ann.categoryUr}</span>
                        <span className="font-mono text-slate-400">{ann.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 font-urdu text-base">{ann.titleUr}</h4>
                      <p className="text-xs text-slate-600 font-urdu leading-relaxed">{ann.contentUr}</p>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={async () => {
                          const updated = adminData.announcements.filter(a => a.id !== ann.id);
                          await handleSaveModule('announcements', updated, isUrdu ? 'اعلان حذف ہو گیا۔' : 'Notice deleted');
                        }}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Announcement Modal */}
              {isAddingAnnouncement && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="font-bold text-slate-900 font-urdu text-base">{isUrdu ? 'نیا اعلان شائع کریں' : 'New Announcement'}</h3>
                      <button onClick={() => setIsAddingAnnouncement(false)} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                    </div>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const titleUr = formData.get('titleUr') as string;
                      const contentUr = formData.get('contentUr') as string;
                      const cat = formData.get('categoryUr') as string;
                      const isImp = formData.get('isImportant') === 'on';

                      const newAnn: Announcement = {
                        id: `ann-${Date.now()}`,
                        titleUr,
                        titleEn: titleUr,
                        contentUr,
                        contentEn: contentUr,
                        categoryUr: cat,
                        categoryEn: cat,
                        date: new Date().toISOString().split('T')[0],
                        isImportant: isImp
                      };

                      await handleSaveModule('announcements', [newAnn, ...adminData.announcements], isUrdu ? 'اعلان شائع ہو گیا۔' : 'Notice published');
                      setIsAddingAnnouncement(false);
                    }} className="space-y-3 text-xs font-urdu">
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'اعلان کا عنوان *' : 'Title *'}</label>
                        <input name="titleUr" required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'زمرہ (Category)' : 'Category'}</label>
                        <select name="categoryUr" className="w-full px-3 py-2 rounded-xl border border-slate-200">
                          <option value="داخلے">{isUrdu ? 'داخلے (Admissions)' : 'Admissions'}</option>
                          <option value="شیڈول">{isUrdu ? 'شیڈول و اوقات (Schedule)' : 'Schedule'}</option>
                          <option value="امتحانات">{isUrdu ? 'امتحانات (Exams)' : 'Exams'}</option>
                          <option value="عام نوٹس">{isUrdu ? 'عام نوٹس (General)' : 'General'}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'تفصیلی تحریر *' : 'Details *'}</label>
                        <textarea name="contentUr" rows={4} required className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer font-bold">
                        <input type="checkbox" name="isImportant" />
                        <span>{isUrdu ? 'اہم نوٹس کے طور پر نمایاں کریں' : 'Pin as Important Notice'}</span>
                      </label>

                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                        <button type="button" onClick={() => setIsAddingAnnouncement(false)} className="px-4 py-2 border rounded-xl">{isUrdu ? 'منسوخ' : 'Cancel'}</button>
                        <button type="submit" className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl">{isUrdu ? 'شائع کریں' : 'Publish'}</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* 21. CONTACT INFO & 22. SOCIAL LINKS */}
          {/* ========================================================= */}
          {(activeModule === 'contact-info' || activeModule === 'social-links') && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">
                  {activeModule === 'contact-info' ? (isUrdu ? 'رابطہ کی تفصیلات' : 'Contact Information') : (isUrdu ? 'سوشل میڈیا روابط' : 'Social Media Links')}
                </h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'عوامی فون، ای میل، پتہ اور سوشل روابط' : 'Manage institutional phone, email, and social networks'}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);

                  const updatedSettings: any = { ...adminData.settings };
                  if (activeModule === 'contact-info') {
                    updatedSettings.phone = formData.get('phone') as string;
                    updatedSettings.whatsapp = formData.get('whatsapp') as string;
                    updatedSettings.email = formData.get('email') as string;
                    updatedSettings.addressUr = formData.get('addressUr') as string;
                  } else {
                    updatedSettings.socialLinks = {
                      facebook: formData.get('facebook') as string,
                      youtube: formData.get('youtube') as string,
                      whatsapp: formData.get('whatsapp') as string,
                      twitter: formData.get('twitter') as string,
                      telegram: formData.get('telegram') as string
                    };
                  }

                  await handleSaveModule('settings', updatedSettings, isUrdu ? 'معلومات محفوظ ہو گئیں۔' : 'Updated successfully');
                }} className="space-y-4 text-xs font-urdu">
                  
                  {activeModule === 'contact-info' ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'رابطہ فون نمبر' : 'Phone'}</label>
                          <input name="phone" defaultValue={adminData.settings.phone} className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono" dir="ltr" />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">{isUrdu ? 'واٹس ایپ نمبر' : 'WhatsApp'}</label>
                          <input name="whatsapp" defaultValue={adminData.settings.whatsapp} className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono" dir="ltr" />
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'ای میل ایڈریس' : 'Email'}</label>
                        <input name="email" defaultValue={adminData.settings.email} className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono" dir="ltr" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">{isUrdu ? 'رہائشی پتہ (اردو)' : 'Address (Urdu)'}</label>
                        <input name="addressUr" defaultValue={adminData.settings.addressUr} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block font-bold mb-1">Facebook URL</label>
                        <input name="facebook" defaultValue={adminData.settings.socialLinks?.facebook} className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono" dir="ltr" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">YouTube Channel URL</label>
                        <input name="youtube" defaultValue={adminData.settings.socialLinks?.youtube} className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono" dir="ltr" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">WhatsApp Chat Link</label>
                        <input name="whatsapp" defaultValue={adminData.settings.socialLinks?.whatsapp} className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono" dir="ltr" />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">Telegram Link</label>
                        <input name="telegram" defaultValue={adminData.settings.socialLinks?.telegram} className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono" dir="ltr" />
                      </div>
                    </>
                  )}

                  <button type="submit" className="px-6 py-2.5 bg-emerald-800 text-white font-bold rounded-xl cursor-pointer">
                    {isUrdu ? 'محفوظ کریں' : 'Save Changes'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CONTACT MESSAGES INBOX */}
          {/* ========================================================= */}
          {activeModule === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'موصولہ پیغامات و استفسارات' : 'Contact Inquiries'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'عوامی ویب سائٹ کے رابطہ فارم سے موصول ہونے والے پیغامات' : 'Messages sent through public contact form'}</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
                {adminData.messages.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 font-urdu text-xs">
                    {isUrdu ? 'فی الحال کوئی نیا پیغام موصول نہیں ہوا ہے۔' : 'No contact messages yet.'}
                  </div>
                ) : (
                  adminData.messages.map(msg => (
                    <div key={msg.id} className="p-4 space-y-2 text-xs font-urdu">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                        <span className="font-mono text-slate-400 text-[11px]">{msg.createdAt}</span>
                      </div>
                      <div className="text-slate-500 font-mono" dir="ltr">{msg.phone} {msg.email ? `• ${msg.email}` : ''}</div>
                      <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 23. SEO SETTINGS MODULE */}
          {/* ========================================================= */}
          {activeModule === 'seo' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'SEO و پیج میٹا ڈیٹا مینیجر' : 'SEO & Page Metadata'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'گوگل اور سوشل میڈیا شیئرنگ (OpenGraph) کے لیے ٹائٹل اور ڈسکرپشن' : 'Configure search engine snippet and social card metadata'}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);

                  const updatedSeo = {
                    ...adminData.seoSettings,
                    home: {
                      ...adminData.seoSettings.home,
                      metaTitle: formData.get('metaTitle') as string,
                      metaDescription: formData.get('metaDescription') as string,
                      keywords: formData.get('keywords') as string
                    }
                  };

                  await handleSaveModule('seoSettings', updatedSeo, isUrdu ? 'SEO سیٹنگز محفوظ ہو گئیں۔' : 'SEO settings saved');
                }} className="space-y-4 text-xs font-urdu">
                  <div>
                    <label className="block font-bold mb-1">{isUrdu ? 'ہوم پیج SEO ٹائٹل' : 'Home SEO Title'}</label>
                    <input name="metaTitle" defaultValue={adminData.seoSettings?.home?.metaTitle} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">{isUrdu ? 'میٹا ڈسکرپشن (Meta Description)' : 'Meta Description'}</label>
                    <textarea name="metaDescription" defaultValue={adminData.seoSettings?.home?.metaDescription} rows={3} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">{isUrdu ? 'کی ورڈز (Keywords)' : 'Keywords'}</label>
                    <input name="keywords" defaultValue={adminData.seoSettings?.home?.keywords} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
                  </div>

                  <button type="submit" className="px-6 py-2.5 bg-emerald-800 text-white font-bold rounded-xl cursor-pointer">
                    {isUrdu ? 'SEO محفوظ کریں' : 'Save SEO'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 24. REPORTS AND CSV EXPORTS */}
          {/* ========================================================= */}
          {activeModule === 'reports' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'رپورٹس و CSV ڈاؤن لوڈ سینٹر' : 'Reports & CSV Exports'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'طلبہ، اساتذہ، داخلہ درخواستیں اور سسٹم لاگز ایکسل/CSV فارمیٹ میں ڈاؤن لوڈ کریں' : 'Export institutional records into spreadsheet compatible CSV files'}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { type: 'students', titleUr: 'طلبہ کرام ریکارڈ رپورٹ', titleEn: 'Students Report (CSV)', count: adminData.students.length },
                  { type: 'teachers', titleUr: 'اساتذہ کرام رپورٹ', titleEn: 'Teachers Report (CSV)', count: adminData.teachers.length },
                  { type: 'admissions', titleUr: 'داخلہ درخواستیں رپورٹ', titleEn: 'Admissions Report (CSV)', count: adminData.admissions.length },
                  { type: 'audit_logs', titleUr: 'آڈٹ ایکٹیویٹی لاگز', titleEn: 'Activity Audit Trail (CSV)', count: adminData.activityLogs.length }
                ].map(r => (
                  <div key={r.type} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-emerald-800 font-bold">{r.count} Records</span>
                      <h4 className="font-bold text-slate-900 font-urdu text-base">{r.titleUr}</h4>
                      <p className="text-xs text-slate-500">{r.titleEn}</p>
                    </div>

                    <button
                      onClick={() => downloadCSV(r.type as any)}
                      className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold font-urdu flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Download className="w-4 h-4 text-amber-300" />
                      <span>{isUrdu ? 'CSV ڈاؤن لوڈ کریں' : 'Download CSV'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 25. ADMIN ACCOUNTS AND ROLES */}
          {/* ========================================================= */}
          {activeModule === 'admin-users' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'ایڈمن اکاؤنٹس و اختیارات' : 'Admin Accounts & Roles'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'سپر ایڈمن، ناظمِ داخلہ اور تعلیمی ایڈمن کے پاس ورڈ اور رولز' : 'Manage administrative credentials and role access'}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="divide-y divide-slate-100">
                  {adminData.adminUsers.map(u => (
                    <div key={u.id} className="py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-urdu">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                        <div className="text-slate-500 font-mono text-[11px]">username: {u.username} • PIN: {u.passwordHash}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold font-mono text-[11px] uppercase">
                          {u.role}
                        </span>

                        <button
                          onClick={async () => {
                            const newPass = prompt(isUrdu ? `صارف "${u.username}" کے لیے نیا پن کوڈ درج کریں:` : `Enter new PIN for ${u.username}:`);
                            if (!newPass) return;
                            const updated = adminData.adminUsers.map(user => user.id === u.id ? { ...user, passwordHash: newPass } : user);
                            await handleSaveModule('adminUsers', updated, isUrdu ? 'پن کوڈ تبدیل کر دیا گیا' : 'PIN updated');
                          }}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold cursor-pointer"
                        >
                          {isUrdu ? 'پن تبدیل کریں' : 'Change PIN'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 26. ACTIVITY LOGS (AUDIT TRAIL) */}
          {/* ========================================================= */}
          {activeModule === 'activity-logs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'آڈٹ و ایکٹیویٹی لاگز' : 'Activity & Audit Trail'}</h2>
                  <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'سسٹم میں ہونے والی تمام ترامیم، لاگ ان اور سیو ریکارڈز کی مکمل ہسٹری' : 'Immutable audit trail of all administrative actions and updates'}</p>
                </div>
                <button
                  onClick={() => downloadCSV('audit_logs')}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold font-urdu flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>{isUrdu ? 'لاگز ایکسپورٹ' : 'Export Logs'}</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {adminData.activityLogs.map(log => (
                  <div key={log.id} className="p-4 flex items-start justify-between gap-4 text-xs font-urdu">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">{log.details}</div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-2">
                        <span className="font-semibold text-emerald-800">{log.adminName}</span>
                        <span>•</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-mono">{log.module}</span>
                      </div>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 27. DATABASE BACKUP AND RESTORE */}
          {/* ========================================================= */}
          {activeModule === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'ڈیٹا بیس بیک اپ و ری اسٹور' : 'Database Backup & Restore'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'مکمل ڈیٹا بیس کا فوری سنیپ شاٹ محفوظ کریں یا پرانا بیک اپ بحال کریں' : 'Instant JSON snapshot export, restore, or seed data reset'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Export Snapshot */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                      <Download className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 font-urdu text-base">{isUrdu ? 'بیک اپ ڈاؤن لوڈ کریں' : 'Download Backup JSON'}</h3>
                    <p className="text-xs text-slate-600 font-urdu leading-relaxed">
                      {isUrdu ? 'تمام طلبہ، اساتذہ، پیجز اور سیٹنگز کا مکمل اسنیپ شاٹ کمپیوٹر پر محفوظ کریں۔' : 'Download complete database snapshot as a single JSON file.'}
                    </p>
                  </div>
                  <a
                    href="/api/admin/backup/export"
                    className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold font-urdu text-center block shadow-sm"
                  >
                    {isUrdu ? 'مکمل بیک اپ ڈاؤن لوڈ کریں' : 'Download Backup Snapshot'}
                  </a>
                </div>

                {/* Restore Backup */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                      <Upload className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 font-urdu text-base">{isUrdu ? 'بیک اپ بحال کریں' : 'Restore from Backup'}</h3>
                    <p className="text-xs text-slate-600 font-urdu leading-relaxed">
                      {isUrdu ? 'کسی بھی سابقہ بیک اپ فائل (JSON) سے ڈیٹا بحال کریں۔' : 'Upload and restore an existing database snapshot.'}
                    </p>
                  </div>
                  <label className="w-full py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold font-urdu text-center block shadow-sm cursor-pointer">
                    {isUrdu ? 'فائل منتخب کریں' : 'Upload JSON File'}
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = async () => {
                          try {
                            const parsed = JSON.parse(reader.result as string);
                            const res = await restoreDatabaseBackup(parsed);
                            if (res.success) {
                              setAdminData(parsed);
                              showToast(isUrdu ? 'بیک اپ کامیابی سے بحال ہو گیا!' : 'Backup restored successfully!');
                            }
                          } catch {
                            showToast('Invalid backup file format', 'error');
                          }
                        };
                        reader.readAsText(file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Reset to Clean Seeds */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                      <RefreshCw className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 font-urdu text-base">{isUrdu ? 'ابتدائی حالت پر بحال کریں' : 'Reset to Clean Seeds'}</h3>
                    <p className="text-xs text-slate-600 font-urdu leading-relaxed">
                      {isUrdu ? 'ڈیٹا بیس کو مدرسے کے بنیادی مصدقہ مواد پر دوبارہ سیٹ کریں۔' : 'Reset all modules to verified default madrasa seed data.'}
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      if (confirm(isUrdu ? 'کیا آپ واقعی ڈیٹا بیس کو ابتدائی حالت پر بحال کرنا چاہتے ہیں؟' : 'Reset database to clean default seed data?')) {
                        const res = await resetDatabaseSeeds();
                        if (res.success && res.data) {
                          setAdminData(res.data);
                          showToast(isUrdu ? 'ڈیٹا بیس ابتدائی حالت پر بحال ہو گیا' : 'Database reset to seeds');
                        }
                      }
                    }}
                    className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold font-urdu cursor-pointer shadow-sm"
                  >
                    {isUrdu ? 'ابتدائی حالت پر ری سیٹ کریں' : 'Reset to Initial Seeds'}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 28. GLOBAL WEBSITE SETTINGS */}
          {/* ========================================================= */}
          {activeModule === 'global-settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-urdu">{isUrdu ? 'گلوبل ویب سائٹ سیٹنگز' : 'Global Website Settings'}</h2>
                <p className="text-xs text-slate-500 font-urdu">{isUrdu ? 'ٹائم زون، دیکھ بھال موڈ (Maintenance Mode) اور عام سیٹنگز' : 'Timezone and site preferences'}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const updatedSettings: any = {
                    ...adminData.settings,
                    timezone: formData.get('timezone') as string,
                    defaultLang: formData.get('defaultLang') as any,
                    maintenanceMode: formData.get('maintenanceMode') === 'on'
                  };
                  await handleSaveModule('settings', updatedSettings, isUrdu ? 'سیٹنگز محفوظ ہو گئیں۔' : 'Settings updated');
                }} className="space-y-4 text-xs font-urdu">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">{isUrdu ? 'ٹائم زون (Timezone)' : 'Timezone'}</label>
                      <input name="timezone" defaultValue={adminData.settings.timezone || 'Asia/Karachi'} className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono" dir="ltr" />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">{isUrdu ? 'پہلے سے طے شدہ زبان (Default Language)' : 'Default Language'}</label>
                      <select name="defaultLang" defaultValue={adminData.settings.defaultLang || 'ur'} className="w-full px-3 py-2 rounded-xl border border-slate-200">
                        <option value="ur">اردو (Urdu)</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer p-3 rounded-2xl bg-amber-50 border border-amber-200 font-bold text-amber-950">
                    <input type="checkbox" name="maintenanceMode" defaultChecked={adminData.settings.maintenanceMode} />
                    <span>{isUrdu ? 'دیکھ بھال کا موڈ فعال کریں (Maintenance Mode Notice)' : 'Enable Maintenance Notice'}</span>
                  </label>

                  <button type="submit" className="px-6 py-2.5 bg-emerald-800 text-white font-bold rounded-xl cursor-pointer">
                    {isUrdu ? 'سیٹنگز محفوظ کریں' : 'Save Global Settings'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ANIMATIONS & MOTION SETTINGS MODULE */}
          {/* ========================================================= */}
          {activeModule === 'animations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-urdu flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    <span>{isUrdu ? 'اینیمیشنز و موشن سیٹنگز' : 'Animations & Motion Settings'}</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-urdu mt-0.5">
                    {isUrdu 
                      ? 'ویب سائٹ کے اسکرول ریویل، اینیمیٹڈ بیک گراؤنڈز، ہوور افیکٹس اور پروگریس بار کا مکمل کنٹرول' 
                      : 'Configure scroll reveals, Islamic background effects, card interactions and progress indicator'}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
                {(() => {
                  const anim = adminData.settings.animations || {
                    enabled: true,
                    intensity: 'balanced',
                    enableBackgroundEffects: true,
                    enableScrollReveals: true,
                    enableHoverEffects: true,
                    enableScrollProgressBar: true,
                    enableCounters: true
                  };

                  return (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);

                        const updatedAnimations = {
                          enabled: formData.get('anim_enabled') === 'on',
                          intensity: (formData.get('anim_intensity') as 'subtle' | 'balanced' | 'expressive') || 'balanced',
                          enableBackgroundEffects: formData.get('anim_bg') === 'on',
                          enableScrollReveals: formData.get('anim_reveals') === 'on',
                          enableHoverEffects: formData.get('anim_hover') === 'on',
                          enableScrollProgressBar: formData.get('anim_progress') === 'on',
                          enableCounters: formData.get('anim_counters') === 'on'
                        };

                        const updatedSettings = {
                          ...adminData.settings,
                          animations: updatedAnimations
                        };

                        await handleSaveModule(
                          'settings',
                          updatedSettings,
                          isUrdu ? 'اینیمیشن سیٹنگز کامیابی سے محفوظ ہو گئیں!' : 'Animation settings saved successfully!'
                        );
                      }}
                      className="space-y-6 text-xs font-urdu"
                    >
                      {/* Master Animation Toggle */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-700" />
                            <span>{isUrdu ? 'مرکزی اینیمیشن سوئچ (Master Animation Switch)' : 'Master Animation Switch'}</span>
                          </span>
                          <p className="text-[11px] text-slate-600">
                            {isUrdu 
                              ? 'پورے پورٹل پر آرائشی اینیمیشنز کو آن یا آف کریں۔ (Reduced Motion موڈ میں خودکار طور پر بند ہو جاتی ہیں)' 
                              : 'Enable or disable all decorative animations throughout the public website.'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input 
                            type="checkbox" 
                            name="anim_enabled" 
                            defaultChecked={anim.enabled} 
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                        </label>
                      </div>

                      {/* Animation Intensity Selector */}
                      <div className="space-y-3">
                        <label className="block font-bold text-slate-900 text-sm">
                          {isUrdu ? 'اینیمیشن کی رفتار و شدت (Animation Intensity)' : 'Animation Intensity'}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { value: 'subtle', titleUr: 'خفیف (Subtle - 0.35s)', titleEn: 'Subtle (0.35s)', descUr: 'نہایت ہلکی اور تیز ترین حرکت' },
                            { value: 'balanced', titleUr: 'متوازن (Balanced - 0.55s)', titleEn: 'Balanced (0.55s)', descUr: 'بہترین اور پروقار تجربہ (تجویز کردہ)' },
                            { value: 'expressive', titleUr: 'نمایاں (Expressive - 0.8s)', titleEn: 'Expressive (0.8s)', descUr: 'واضح اور آہستہ تدریجی ظہور' }
                          ].map((opt) => (
                            <label 
                              key={opt.value} 
                              className="border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer hover:bg-slate-50 transition-all has-checked:border-emerald-700 has-checked:bg-emerald-50/50 has-checked:ring-1 has-checked:ring-emerald-700"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="font-bold text-slate-900">{isUrdu ? opt.titleUr : opt.titleEn}</span>
                                <input 
                                  type="radio" 
                                  name="anim_intensity" 
                                  value={opt.value} 
                                  defaultChecked={anim.intensity === opt.value}
                                  className="text-emerald-700 focus:ring-emerald-600"
                                />
                              </div>
                              <span className="text-[11px] text-slate-500 leading-normal">{opt.descUr}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Granular Animation Controls Grid */}
                      <div className="space-y-3">
                        <label className="block font-bold text-slate-900 text-sm">
                          {isUrdu ? 'خصوصی اینیمیشن فیچرز (Granular Feature Toggles)' : 'Feature Toggles'}
                        </label>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          {/* 1. Islamic Background Effects */}
                          <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="anim_bg" 
                              defaultChecked={anim.enableBackgroundEffects}
                              className="mt-1 text-emerald-700 rounded focus:ring-emerald-600"
                            />
                            <div className="space-y-0.5">
                              <span className="font-bold text-slate-900 block">
                                {isUrdu ? 'اسلامی بیک گراؤنڈ موشن (Islamic Ambient Motion)' : 'Islamic Ambient Motion'}
                              </span>
                              <span className="text-[11px] text-slate-500 block leading-relaxed">
                                {isUrdu ? 'ہیرو سیکشن میں عربیسک پیٹرن اور آرائشی دائروں کی دھیمی حرکت' : 'Subtle floating geometric arabesque background rings'}
                              </span>
                            </div>
                          </label>

                          {/* 2. Scroll Reveals */}
                          <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="anim_reveals" 
                              defaultChecked={anim.enableScrollReveals}
                              className="mt-1 text-emerald-700 rounded focus:ring-emerald-600"
                            />
                            <div className="space-y-0.5">
                              <span className="font-bold text-slate-900 block">
                                {isUrdu ? 'اسکرول ریویل (Scroll-Triggered Reveals)' : 'Scroll-Triggered Reveals'}
                              </span>
                              <span className="text-[11px] text-slate-500 block leading-relaxed">
                                {isUrdu ? 'صفحہ اسکرول کرنے پر کارڈز اور سیکشنز کا اوپر ابھرنا' : 'Cards and sections animate gracefully into view when scrolled to'}
                              </span>
                            </div>
                          </label>

                          {/* 3. Card Hover & Lift */}
                          <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="anim_hover" 
                              defaultChecked={anim.enableHoverEffects}
                              className="mt-1 text-emerald-700 rounded focus:ring-emerald-600"
                            />
                            <div className="space-y-0.5">
                              <span className="font-bold text-slate-900 block">
                                {isUrdu ? 'کارڈز پر ہوور لیفٹ (Card Hover & Lift)' : 'Card Hover & Lift'}
                              </span>
                              <span className="text-[11px] text-slate-500 block leading-relaxed">
                                {isUrdu ? 'ماؤس لانے پر کارڈز کا ہلکا اوپر اٹھنا اور نرم سایہ دار ہونا' : 'Cards elevate subtly on mouse hover with smooth shadow'}
                              </span>
                            </div>
                          </label>

                          {/* 4. Scroll Progress Indicator */}
                          <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                            <input 
                              type="checkbox" 
                              name="anim_progress" 
                              defaultChecked={anim.enableScrollProgressBar}
                              className="mt-1 text-emerald-700 rounded focus:ring-emerald-600"
                            />
                            <div className="space-y-0.5">
                              <span className="font-bold text-slate-900 block">
                                {isUrdu ? 'اسکرول پروگریس بار (Scroll Progress Bar)' : 'Scroll Progress Indicator'}
                              </span>
                              <span className="text-[11px] text-slate-500 block leading-relaxed">
                                {isUrdu ? 'اسٹکی نیویگیشن بار کے اوپر باریک گولڈن/زمردی پروگریس لائن' : 'Slim progress line at top of sticky navigation bar'}
                              </span>
                            </div>
                          </label>

                          {/* 5. Statistics Counters */}
                          <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 cursor-pointer sm:col-span-2">
                            <input 
                              type="checkbox" 
                              name="anim_counters" 
                              defaultChecked={anim.enableCounters}
                              className="mt-1 text-emerald-700 rounded focus:ring-emerald-600"
                            />
                            <div className="space-y-0.5">
                              <span className="font-bold text-slate-900 block">
                                {isUrdu ? 'اعداد و شمار کا لائیو کاؤنٹر (Animated Statistics Counters)' : 'Animated Statistics Counters'}
                              </span>
                              <span className="text-[11px] text-slate-500 block leading-relaxed">
                                {isUrdu ? '22 اساتذہ اور 400+ طلبہ کے کارڈز پر نمبرز کا اینیمیٹڈ طریقے سے گنتی مکمل کرنا' : 'Numbers count up smoothly when scrolled into the statistics section'}
                              </span>
                            </div>
                          </label>

                        </div>
                      </div>

                      {/* Interactive Sandbox Test Preview */}
                      <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="font-bold text-amber-300 font-mono text-[11px]">LIVE MOTION PREVIEW</span>
                          <span className="text-[10px] text-slate-400 font-urdu">{isUrdu ? 'موجودہ سیٹنگز کی جانچ' : 'Test Active Settings'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                          <div className="space-y-1 text-start">
                            <div className="text-sm font-bold text-white font-urdu">مدرسہ تعلیم القرآن فریال مسجد</div>
                            <div className="text-[11px] text-emerald-300 font-urdu">حفظ و ناظرہ مع تجوید • باوقار دینی ادارہ</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                showToast(isUrdu ? 'اینیمیشن ٹیسٹ مکمل ہوا' : 'Animation test complete');
                              }}
                              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover-lift active:scale-95 cursor-pointer font-urdu"
                            >
                              {isUrdu ? 'ٹیسٹ بٹن' : 'Test Button'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2 flex items-center justify-end gap-3">
                        <button
                          type="submit"
                          className="px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer font-urdu flex items-center gap-2"
                        >
                          <Save className="w-4 h-4 text-amber-300" />
                          <span>{isUrdu ? 'اینیمیشن سیٹنگز محفوظ کریں' : 'Save Animation Settings'}</span>
                        </button>
                      </div>

                    </form>
                  );
                })()}
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
