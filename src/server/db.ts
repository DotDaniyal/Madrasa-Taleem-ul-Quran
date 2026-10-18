import fs from 'fs';
import path from 'path';
import {
  DAILY_TIMETABLE,
  WEEKLY_SCHEDULE,
  INITIAL_PROGRAMS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_GALLERY,
  INITIAL_TEACHERS,
  INITIAL_APPLICATIONS
} from '../data/initialData';
import {
  INITIAL_SETTINGS,
  INITIAL_PAGES_CONTENT,
  INITIAL_STUDENTS,
  INITIAL_COMPETITIONS,
  INITIAL_COMPETITION_RESULTS,
  INITIAL_ASSESSMENTS,
  INITIAL_EXAMINATIONS,
  INITIAL_ANNUAL_AWARDS,
  INITIAL_SPECIAL_HOLIDAYS,
  INITIAL_MEDIA_LIBRARY,
  INITIAL_NAV_ITEMS,
  INITIAL_FOOTER_CONFIG,
  INITIAL_PAGE_SEO,
  INITIAL_ADMIN_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_DONATION_CATEGORIES,
  SiteSettings,
  PagesContent,
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
  Program,
  DailyPeriod,
  ScheduleDay,
  Teacher,
  Announcement,
  GalleryItem,
  AdmissionApplication,
  ContactMessage,
  Donation,
  DonationCategory,
  TeacherAttendance,
  TeacherPayroll,
  FeeVoucher
} from '../types';

export interface DatabaseSchema {
  settings: SiteSettings;
  pagesContent: PagesContent;
  students: Student[];
  teachers: Teacher[];
  admissions: AdmissionApplication[];
  donations: Donation[];
  donationCategories: DonationCategory[];
  teacherAttendance: TeacherAttendance[];
  teacherPayroll: TeacherPayroll[];
  feeVouchers: FeeVoucher[];
  programs: Program[];
  dailyTimetable: DailyPeriod[];
  weeklySchedule: ScheduleDay[];
  specialHolidays: SpecialHoliday[];
  competitions: Competition[];
  competitionResults: CompetitionResult[];
  assessments: Assessment[];
  examinations: Examination[];
  annualAwards: AnnualAward[];
  announcements: Announcement[];
  gallery: GalleryItem[];
  mediaLibrary: MediaItem[];
  navItems: NavItemConfig[];
  footerConfig: FooterConfig;
  seoSettings: Record<string, PageSeo>;
  adminUsers: AdminUser[];
  activityLogs: AuditLog[];
  messages: ContactMessage[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function getDefaultData(): DatabaseSchema {
  return {
    settings: INITIAL_SETTINGS,
    pagesContent: INITIAL_PAGES_CONTENT,
    students: INITIAL_STUDENTS,
    teachers: INITIAL_TEACHERS,
    admissions: INITIAL_APPLICATIONS,
    donations: [],
    donationCategories: INITIAL_DONATION_CATEGORIES,
    teacherAttendance: [],
    teacherPayroll: [],
    feeVouchers: [],
    programs: INITIAL_PROGRAMS,
    dailyTimetable: DAILY_TIMETABLE,
    weeklySchedule: WEEKLY_SCHEDULE,
    specialHolidays: INITIAL_SPECIAL_HOLIDAYS,
    competitions: INITIAL_COMPETITIONS,
    competitionResults: INITIAL_COMPETITION_RESULTS,
    assessments: INITIAL_ASSESSMENTS,
    examinations: INITIAL_EXAMINATIONS,
    annualAwards: INITIAL_ANNUAL_AWARDS,
    announcements: INITIAL_ANNOUNCEMENTS,
    gallery: INITIAL_GALLERY,
    mediaLibrary: INITIAL_MEDIA_LIBRARY,
    navItems: INITIAL_NAV_ITEMS,
    footerConfig: INITIAL_FOOTER_CONFIG,
    seoSettings: INITIAL_PAGE_SEO,
    adminUsers: INITIAL_ADMIN_USERS,
    activityLogs: INITIAL_AUDIT_LOGS,
    messages: []
  };
}

let cachedDb: DatabaseSchema | null = null;

export function loadDatabase(): DatabaseSchema {
  if (cachedDb) return cachedDb;

  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Merge with default schema to guarantee any newly added modules are present
      const defaultData = getDefaultData();
      const merged: DatabaseSchema = {
        ...defaultData,
        ...parsed,
        settings: { ...defaultData.settings, ...(parsed.settings || {}) },
        pagesContent: { ...defaultData.pagesContent, ...(parsed.pagesContent || {}) },
        seoSettings: { ...defaultData.seoSettings, ...(parsed.seoSettings || {}) }
      };
      cachedDb = merged;
      return merged;
    }
  } catch (err) {
    console.error('Error reading db.json, falling back to defaults:', err);
  }

  const initial = getDefaultData();
  saveDatabase(initial);
  cachedDb = initial;
  return initial;
}

export function saveDatabase(data: DatabaseSchema): void {
  try {
    cachedDb = data;
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Failed to write database file:', err);
  }
}

export function addAuditLog(adminName: string, adminRole: string, action: string, module: string, details: string): void {
  const db = loadDatabase();
  const newLog: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toLocaleString('en-US', { timeZone: db.settings.timezone || 'Asia/Karachi' }),
    adminName,
    adminRole,
    action,
    module,
    details
  };
  db.activityLogs = [newLog, ...db.activityLogs.slice(0, 199)]; // keep latest 200 logs
  saveDatabase(db);
}

export function getPublicData() {
  const db = loadDatabase();
  return {
    settings: db.settings,
    pagesContent: db.pagesContent,
    programs: db.programs,
    donationCategories: db.donationCategories.filter(c => c.enabled),
    dailyTimetable: db.dailyTimetable,
    weeklySchedule: db.weeklySchedule,
    specialHolidays: db.specialHolidays.filter(h => h.isPublished),
    teachers: db.teachers.filter(t => t.status !== 'archived'),
    announcements: db.announcements,
    gallery: db.gallery,
    competitions: db.competitions.filter(c => c.isPublished),
    competitionResults: db.competitionResults.filter(r => r.isVerified),
    assessments: db.assessments,
    examinations: db.examinations,
    annualAwards: db.annualAwards,
    navItems: db.navItems,
    footerConfig: db.footerConfig,
    seoSettings: db.seoSettings
  };
}

export function getAdminFullData() {
  return loadDatabase();
}

export function saveModuleData(
  moduleName: keyof DatabaseSchema,
  data: any,
  adminUser?: { name: string; role: string }
): DatabaseSchema {
  const db = loadDatabase();
  (db as any)[moduleName] = data;
  
  if (adminUser) {
    addAuditLog(
      adminUser.name,
      adminUser.role,
      'UPDATE_MODULE',
      String(moduleName),
      `Updated module: ${String(moduleName)} successfully`
    );
  }
  
  saveDatabase(db);
  return db;
}

export function addOnlineAdmission(application: Omit<AdmissionApplication, 'id' | 'createdAt'>): AdmissionApplication {
  const db = loadDatabase();
  const newApp: AdmissionApplication = {
    ...application,
    id: `TMQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'pending'
  };
  db.admissions = [newApp, ...db.admissions];
  addAuditLog(
    'Public Portal',
    'guest',
    'SUBMIT_ADMISSION',
    'Admissions',
    `New admission application received for student: ${newApp.studentName} (Phone: ${newApp.guardianPhone})`
  );
  saveDatabase(db);
  return newApp;
}

export function addContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): ContactMessage {
  const db = loadDatabase();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toLocaleString(),
    isRead: false
  };
  db.messages = [newMsg, ...db.messages];
  addAuditLog(
    'Public Portal',
    'guest',
    'SUBMIT_CONTACT',
    'Contact',
    `New contact inquiry from ${newMsg.name} (${newMsg.phone})`
  );
  saveDatabase(db);
  return newMsg;
}

export function saveUploadedMedia(
  filename: string,
  base64Data: string,
  title: string,
  altText: string,
  adminUser?: { name: string; role: string }
): MediaItem {
  const db = loadDatabase();
  // Strip data URL prefix if present
  const base64Clean = base64Data.replace(/^data:[^;]+;base64,/, '');
  const buffer = Buffer.from(base64Clean, 'base64');
  
  // Safe filename
  const ext = path.extname(filename) || '.jpg';
  const cleanBase = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const safeFilename = `${cleanBase}-${Date.now()}${ext}`;
  const filePath = path.join(UPLOADS_DIR, safeFilename);
  
  fs.writeFileSync(filePath, buffer);
  
  const publicUrl = `/uploads/${safeFilename}`;
  const mediaItem: MediaItem = {
    id: `med-${Date.now()}`,
    filename: safeFilename,
    url: publicUrl,
    title: title || cleanBase,
    altText: altText || title || cleanBase,
    sizeBytes: buffer.length,
    mimeType: ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg',
    uploadedAt: new Date().toISOString().split('T')[0],
    usageCount: 0,
    usedIn: []
  };
  
  db.mediaLibrary = [mediaItem, ...db.mediaLibrary];
  if (adminUser) {
    addAuditLog(adminUser.name, adminUser.role, 'UPLOAD_MEDIA', 'Media Library', `Uploaded image: ${safeFilename}`);
  }
  saveDatabase(db);
  return mediaItem;
}

export function generateCSV(type: 'students' | 'teachers' | 'admissions' | 'audit_logs'): string {
  const db = loadDatabase();
  if (type === 'students') {
    const headers = ['Student ID', 'Full Name', 'Father Name', 'Phone', 'Program', 'Age', 'Status', 'Enrollment Date', 'Address', 'Notes'];
    const rows = db.students.map(s => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.fatherName}"`,
      `"${s.guardianPhone}"`,
      `"${s.programId}"`,
      `"${s.age}"`,
      `"${s.status}"`,
      `"${s.enrollmentDate}"`,
      `"${(s.address || '').replace(/"/g, '""')}"`,
      `"${(s.academicNotes || '').replace(/"/g, '""')}"`
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  } else if (type === 'teachers') {
    const headers = ['Teacher ID', 'Name (Urdu)', 'Name (English)', 'Role (Urdu)', 'Role (English)', 'Qualification', 'Experience', 'Status'];
    const rows = db.teachers.map(t => [
      `"${t.id}"`,
      `"${t.nameUr}"`,
      `"${t.nameEn}"`,
      `"${t.roleUr}"`,
      `"${t.roleEn}"`,
      `"${t.qualificationUr}"`,
      `"${t.experienceUr}"`,
      `"${t.status || 'active'}"`
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  } else if (type === 'admissions') {
    const headers = ['Application ID', 'Student Name', 'Father Name', 'Age', 'Program', 'Current Level', 'Phone', 'Address', 'Status', 'Date', 'Admin Notes'];
    const rows = db.admissions.map(a => [
      `"${a.id}"`,
      `"${a.studentName}"`,
      `"${a.fatherName}"`,
      `"${a.age}"`,
      `"${a.programId}"`,
      `"${a.currentLevelUr || ''}"`,
      `"${a.guardianPhone}"`,
      `"${(a.address || '').replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${a.createdAt}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  } else {
    const headers = ['Log ID', 'Timestamp', 'Admin Name', 'Role', 'Action', 'Module', 'Details'];
    const rows = db.activityLogs.map(l => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.adminName}"`,
      `"${l.adminRole}"`,
      `"${l.action}"`,
      `"${l.module}"`,
      `"${l.details.replace(/"/g, '""')}"`
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}
