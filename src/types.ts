export type Language = 'ur' | 'en';

export interface ScheduleDay {
  id: string;
  dayUr: string;
  dayEn: string;
  statusUr: string;
  statusEn: string;
  isHoliday: boolean;
  timingsUr: string;
  timingsEn: string;
}

export interface DailyPeriod {
  id: string;
  periodNum: number;
  titleUr: string;
  titleEn: string;
  timeRangeUr: string;
  timeRangeEn: string;
  subtitleUr: string;
  subtitleEn: string;
  descUr: string;
  descEn: string;
  isTeachingSession: boolean;
  typeUr: string;
  typeEn: string;
  iconName: string;
}

export interface Program {
  id: string;
  titleUr: string;
  titleEn: string;
  descUr: string;
  descEn: string;
  durationUr: string;
  durationEn: string;
  ageUr: string;
  ageEn: string;
  timingsUr: string;
  timingsEn: string;
  iconName: string;
  featuresUr: string[];
  featuresEn: string[];
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  fatherName: string;
  age: string;
  programId: string;
  currentLevelUr: string;
  guardianPhone: string;
  address: string;
  previousMadrasa?: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Announcement {
  id: string;
  titleUr: string;
  titleEn: string;
  contentUr: string;
  contentEn: string;
  categoryUr: string;
  categoryEn: string;
  date: string;
  isImportant: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface GalleryItem {
  id: string;
  titleUr: string;
  titleEn: string;
  descUr: string;
  descEn: string;
  category: 'curriculum' | 'hifz' | 'events' | 'facilities';
  date: string;
  iconName: string;
}

export interface Teacher {
  id: string;
  nameUr: string;
  nameEn: string;
  roleUr: string;
  roleEn: string;
  qualificationUr: string;
  qualificationEn: string;
  experienceUr: string;
  experienceEn: string;
  monogramUr: string;
  status?: 'active' | 'archived';
  imageUrl?: string;
}
