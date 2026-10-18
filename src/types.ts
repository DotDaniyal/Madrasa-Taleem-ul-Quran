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
  biometricId?: string;
  fullName?: string;
  phoneNumber?: string;
  baseSalary?: number;
  status?: 'active' | 'leave' | 'resigned' | 'archived';
  programId?: string;
  joiningDate?: string;
  designation?: string;
  nameUr?: string;
  nameEn?: string;
  roleUr?: string;
  roleEn?: string;
  qualificationUr?: string;
  qualificationEn?: string;
  experienceUr?: string;
  experienceEn?: string;
  monogramUr?: string;
}

export interface Student {
  id: string;
  rollNo?: string;
  fullName?: string;
  name?: string;
  parentName?: string;
  fatherName?: string;
  parentPhone?: string;
  guardianPhone?: string;
  programId?: string;
  monthlyFee?: number;
  enrollmentDate?: string;
  admissionDate?: string;
  status?: 'active' | 'graduated' | 'leave' | 'inactive' | 'archived';
  academicNotes?: string;
  age?: string;
  address?: string;
}

export interface TeacherAttendance {
  id: string;
  teacherId: string;
  biometricId?: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'present' | 'absent' | 'leave' | 'late' | 'half-day' | 'on-time';
  adminNotes?: string;
}

export interface BiometricPunch {
  id: string;
  biometricId: string;
  teacherId?: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'on-time' | 'late' | 'half-day' | 'absent' | 'leave';
  lateMinutes?: number;
  rawPunches?: string[];
  adminNotes?: string;
}

export interface BiometricSettings {
  officialStartTime: string;
  officialEndTime: string;
  lateGraceMinutes: number;
  latePenaltyType: 'fixed_amount' | 'late_rule_days';
  fixedLatePenaltyAmount: number;
  latesPerAbsentDay: number;
  unapprovedAbsentDeductionRate: 'proportional_30' | 'fixed_daily';
  workingDaysPerMonth: number;
}

export interface TeacherPayroll {
  id: string;
  teacherId: string;
  teacherName?: string;
  biometricId?: string;
  month: string;
  year: number;
  baseSalary?: number;
  baseAmount: number;
  workingDays?: number;
  presentDays?: number;
  lateArrivalsCount?: number;
  latePenaltyDeduction?: number;
  absentDaysCount?: number;
  absentDeduction?: number;
  bonusAmount?: number;
  deductions: number;
  netAmount: number;
  netSalary?: number;
  status: 'unpaid' | 'processing' | 'paid';
  paymentDate?: string;
  paymentMethod?: 'bank_transfer' | 'jazzcash' | 'easypaisa' | 'cash';
  referenceNo?: string;
  notes?: string;
}

export interface FeeVoucher {
  id: string;
  studentId: string;
  studentRollNo?: string;
  studentName?: string;
  parentName?: string;
  programId?: string;
  month: string;
  year: number;
  amount: number;
  status: 'unpaid' | 'paid' | 'partial' | 'waived';
  paidDate?: string;
  paymentMethod?: string;
  receiptNo?: string;
  discount?: number;
  notes?: string;
}

export interface DonationCategory {
  id: string;
  labelUr: string;
  labelEn: string;
  isZakatEligible: boolean;
  enabled: boolean;
}

export interface Donation {
  id: string;
  amount: number;
  categoryId: string;
  donorName: string;
  donorContact: string;
  paymentMethod: 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'online_gateway';
  status: 'pending' | 'successful' | 'failed' | 'refunded';
  referenceNumber?: string;
  createdAt: string;
  verifiedAt?: string;
}
