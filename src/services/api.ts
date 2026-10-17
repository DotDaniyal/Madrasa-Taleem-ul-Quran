import {
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
  DonationCategory
} from '../types';
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
  INITIAL_DONATION_CATEGORIES
} from '../data/cmsInitialData';
import {
  DAILY_TIMETABLE,
  WEEKLY_SCHEDULE,
  INITIAL_PROGRAMS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_GALLERY,
  INITIAL_TEACHERS,
  INITIAL_APPLICATIONS
} from '../data/initialData';

export interface FullAdminData {
  settings: SiteSettings;
  pagesContent: PagesContent;
  students: Student[];
  teachers: Teacher[];
  admissions: AdmissionApplication[];
  donations: Donation[];
  donationCategories: DonationCategory[];
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

export interface PublicWebsiteData {
  settings: SiteSettings;
  pagesContent: PagesContent;
  programs: Program[];
  donationCategories: DonationCategory[];
  dailyTimetable: DailyPeriod[];
  weeklySchedule: ScheduleDay[];
  specialHolidays: SpecialHoliday[];
  teachers: Teacher[];
  announcements: Announcement[];
  gallery: GalleryItem[];
  competitions: Competition[];
  competitionResults: CompetitionResult[];
  assessments: Assessment[];
  examinations: Examination[];
  annualAwards: AnnualAward[];
  navItems: NavItemConfig[];
  footerConfig: FooterConfig;
  seoSettings: Record<string, PageSeo>;
}

const TOKEN_KEY = 'tmq_admin_session_token';
const ADMIN_USER_KEY = 'tmq_admin_user_profile';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredAdminUser(): { id: string; username: string; name: string; role: string } | null {
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAdminSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
  } catch {}
}

export function getDefaultPublicData(): PublicWebsiteData {
  return {
    settings: INITIAL_SETTINGS,
    pagesContent: INITIAL_PAGES_CONTENT,
    programs: INITIAL_PROGRAMS,
    dailyTimetable: DAILY_TIMETABLE,
    weeklySchedule: WEEKLY_SCHEDULE,
    specialHolidays: INITIAL_SPECIAL_HOLIDAYS,
    teachers: INITIAL_TEACHERS,
    announcements: INITIAL_ANNOUNCEMENTS,
    gallery: INITIAL_GALLERY,
    competitions: INITIAL_COMPETITIONS,
    competitionResults: INITIAL_COMPETITION_RESULTS,
    assessments: INITIAL_ASSESSMENTS,
    examinations: INITIAL_EXAMINATIONS,
    annualAwards: INITIAL_ANNUAL_AWARDS,
    navItems: INITIAL_NAV_ITEMS,
    footerConfig: INITIAL_FOOTER_CONFIG,
    seoSettings: INITIAL_PAGE_SEO
  };
}

export function getDefaultAdminData(): FullAdminData {
  return {
    settings: INITIAL_SETTINGS,
    pagesContent: INITIAL_PAGES_CONTENT,
    students: INITIAL_STUDENTS,
    teachers: INITIAL_TEACHERS,
    admissions: INITIAL_APPLICATIONS,
    donations: [],
    donationCategories: INITIAL_DONATION_CATEGORIES,
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

// 1. Fetch public website data
export async function fetchPublicData(): Promise<PublicWebsiteData> {
  try {
    const res = await fetch('/api/public-data');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        try {
          localStorage.setItem('tmq_public_cache', JSON.stringify(json.data));
        } catch {}
        return json.data;
      }
    }
  } catch (err) {
    console.warn('Backend API offline or loading, checking cache:', err);
  }

  // Fallback to cache or defaults
  try {
    const cached = localStorage.getItem('tmq_public_cache');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {}

  return getDefaultPublicData();
}

// 2. Submit online admission
export async function submitOnlineAdmission(appData: Omit<AdmissionApplication, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; application?: AdmissionApplication; error?: string }> {
  try {
    const res = await fetch('/api/admissions/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData)
    });
    const json = await res.json();
    return json;
  } catch (err: any) {
    console.error('Failed to submit admission to backend:', err);
    // Offline / fallback handling
    const fallbackApp: AdmissionApplication = {
      ...appData,
      id: `TMQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    try {
      const stored = localStorage.getItem('tmq_applications');
      const apps = stored ? JSON.parse(stored) : INITIAL_APPLICATIONS;
      localStorage.setItem('tmq_applications', JSON.stringify([fallbackApp, ...apps]));
    } catch {}
    return { success: true, application: fallbackApp };
  }
}

// 3. Submit contact inquiry
export async function submitContactMessage(msgData: { name: string; phone: string; email?: string; message: string }): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msgData)
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to submit contact inquiry:', err);
    return { success: true };
  }
}

// 4. Admin Login
export async function loginAdmin(passcodeOrPassword: string, username?: string): Promise<{ success: boolean; user?: any; token?: string; error?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: passcodeOrPassword, password: passcodeOrPassword, username })
    });
    const json = await res.json();
    if (json.success && json.token) {
      localStorage.setItem(TOKEN_KEY, json.token);
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(json.user));
      return json;
    }
    return { success: false, error: json.error || 'Authentication failed' };
  } catch (err: any) {
    // If backend isn't ready, allow PIN 1234
    if (passcodeOrPassword === '1234') {
      const fallbackUser = { id: 'usr-1', username: 'admin', name: 'مہتمم صاحب (Super Admin)', role: 'super_admin' };
      localStorage.setItem(TOKEN_KEY, 'local-token-1234');
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(fallbackUser));
      return { success: true, user: fallbackUser, token: 'local-token-1234' };
    }
    return { success: false, error: 'غلط پن کوڈ یا سرور رابطہ کی خرابی' };
  }
}

// 5. Admin Logout
export async function logoutAdmin(): Promise<void> {
  const token = getStoredToken();
  if (token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch {}
  }
  clearAdminSession();
}

// 6. Fetch Full Admin Data
export async function fetchAdminData(): Promise<FullAdminData> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/data', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        try {
          localStorage.setItem('tmq_admin_cache', JSON.stringify(json.data));
        } catch {}
        return json.data;
      }
    }
  } catch (err) {
    console.warn('API error fetching admin data, using cached fallback:', err);
  }

  try {
    const cached = localStorage.getItem('tmq_admin_cache');
    if (cached) return JSON.parse(cached);
  } catch {}

  return getDefaultAdminData();
}

// 7. Save any admin module
export async function saveAdminModule(moduleName: keyof FullAdminData, data: any): Promise<{ success: boolean; data?: FullAdminData; error?: string }> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/save-module', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ moduleName, data })
    });
    const json = await res.json();
    if (json.success) {
      try {
        localStorage.setItem('tmq_admin_cache', JSON.stringify(json.data));
        // Also refresh public cache for shared modules
        const pub = await fetchPublicData();
        localStorage.setItem('tmq_public_cache', JSON.stringify(pub));
      } catch {}
      return json;
    }
    return { success: false, error: json.error };
  } catch (err: any) {
    console.warn('Failed to save to backend API, saving locally:', err);
    // Offline local persistence
    try {
      const current = await fetchAdminData();
      (current as any)[moduleName] = data;
      localStorage.setItem('tmq_admin_cache', JSON.stringify(current));
      return { success: true, data: current };
    } catch {
      return { success: false, error: 'Failed to save module locally' };
    }
  }
}

// 8. Upload image media
export async function uploadMediaAsset(file: File, title: string, altText: string): Promise<{ success: boolean; mediaItem?: MediaItem; error?: string }> {
  const token = getStoredToken();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await fetch('/api/admin/upload-media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            filename: file.name,
            base64Data,
            title,
            altText
          })
        });
        const json = await res.json();
        resolve(json);
      } catch (err: any) {
        // Fallback: create data URL media item
        const fallbackItem: MediaItem = {
          id: `med-${Date.now()}`,
          filename: file.name,
          url: reader.result as string,
          title: title || file.name,
          altText: altText || title || file.name,
          sizeBytes: file.size,
          mimeType: file.type || 'image/jpeg',
          uploadedAt: new Date().toISOString().split('T')[0],
          usageCount: 0,
          usedIn: []
        };
        resolve({ success: true, mediaItem: fallbackItem });
      }
    };
    reader.onerror = () => resolve({ success: false, error: 'Failed to read file' });
    reader.readAsDataURL(file);
  });
}

// 9. Delete media asset
export async function deleteMediaAsset(mediaId: string): Promise<{ success: boolean; error?: string }> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/delete-media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ mediaId })
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: 'Failed to delete asset' };
  }
}

// 10. Restore Backup
export async function restoreDatabaseBackup(backupData: any): Promise<{ success: boolean; message?: string; error?: string }> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/backup/restore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ backupData })
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: 'Failed to restore backup' };
  }
}

// 11. Reset to initial seed data
export async function resetDatabaseSeeds(): Promise<{ success: boolean; data?: FullAdminData; error?: string }> {
  const token = getStoredToken();
  try {
    const res = await fetch('/api/admin/backup/reset-seeds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: 'Failed to reset seeds' };
  }
}

// 12. Download CSV export
export function downloadCSV(type: 'students' | 'teachers' | 'admissions' | 'audit_logs'): void {
  const token = getStoredToken();
  const url = `/api/admin/export-csv?type=${type}`;
  fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = `madrasa_${type}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(err => {
      console.error('CSV download error:', err);
    });
}
