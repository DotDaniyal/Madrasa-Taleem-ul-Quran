export type Language = 'ur' | 'en';

export type CalligraphyFont = 
  | 'nastaliq'      // Noto Nastaliq Urdu (خطِ نستعلیق)
  | 'gulzar'        // Gulzar (خطِ گلزار)
  | 'naskh'         // Amiri (خطِ نسخ)
  | 'ruqaa'         // Aref Ruqaa (خطِ رقعہ)
  | 'kufi'          // Reem Kufi (خطِ کوفی)
  | 'lateef'        // Lateef (خطِ لطیف)
  | 'scheherazade'  // Scheherazade New (خطِ شہرزاد)
  | 'marhey'        // Marhey (خطِ مرح)
  | 'qahiri';       // Qahiri (خطِ قاہری)

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
  category: 'mosque' | 'classes' | 'hifz' | 'events' | 'facilities';
  imageUrl: string;
  date: string;
}

export interface Teacher {
  id: string;
  nameUr: string;
  nameEn: string;
  roleUr: string;
  roleEn: string;
  qualificationUr: string;
  qualificationEn: string;
  imageUrl: string;
}
