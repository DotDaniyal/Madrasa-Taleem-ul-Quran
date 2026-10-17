import { 
  DAILY_TIMETABLE, 
  WEEKLY_SCHEDULE, 
  INITIAL_PROGRAMS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_GALLERY, 
  INITIAL_TEACHERS, 
  INITIAL_APPLICATIONS 
} from './initialData';
import { DonationCategory } from '../types';

export interface SiteSettings {
  siteNameUr: string;
  siteNameEn: string;
  subtitleUr: string;
  subtitleEn: string;
  mottoUr: string;
  mottoEn: string;
  logoUrl: string;
  logoSize: number;
  phone: string;
  email: string;
  addressUr: string;
  addressEn: string;
  whatsapp: string;
  scheduleNoticeUr: string;
  scheduleNoticeEn: string;
  statsTeachers: string;
  statsTeachersLabelUr: string;
  statsTeachersLabelEn: string;
  statsTeachersDescUr: string;
  statsTeachersDescEn: string;
  statsStudents: string;
  statsStudentsLabelUr: string;
  statsStudentsLabelEn: string;
  statsStudentsDescUr: string;
  statsStudentsDescEn: string;
  socialLinks: {
    facebook?: string;
    youtube?: string;
    whatsapp?: string;
    twitter?: string;
    telegram?: string;
  };
  maintenanceMode: boolean;
  defaultLang: 'ur' | 'en';
  timezone: string;
  animations?: AnimationSettings;
}

export interface AnimationSettings {
  enabled: boolean;
  intensity: 'subtle' | 'balanced' | 'expressive';
  enableBackgroundEffects: boolean;
  enableScrollReveals: boolean;
  enableHoverEffects: boolean;
  enableScrollProgressBar: boolean;
  enableCounters: boolean;
}

export interface Student {
  id: string;
  name: string;
  fatherName: string;
  guardianPhone: string;
  programId: string;
  enrollmentDate: string;
  status: 'active' | 'graduated' | 'leave' | 'archived';
  academicNotes: string;
  age: string;
  address: string;
}

export interface Competition {
  id: string;
  titleUr: string;
  titleEn: string;
  descUr: string;
  descEn: string;
  intervalUr: string;
  intervalEn: string;
  startDate: string;
  endDate: string;
  rulesUr: string;
  rulesEn: string;
  prizesUr: string;
  prizesEn: string;
  status: 'draft' | 'upcoming' | 'active' | 'completed' | 'cancelled';
  isPublished: boolean;
}

export interface CompetitionResult {
  id: string;
  competitionId: string;
  studentName: string;
  evaluationScore: string;
  positionUr: string;
  positionEn: string;
  prizeAwarded: string;
  notes: string;
  isVerified: boolean;
}

export interface Assessment {
  id: string;
  month: string;
  year: string;
  programId: string;
  titleUr: string;
  titleEn: string;
  date: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  summaryUr: string;
  summaryEn: string;
}

export interface Examination {
  id: string;
  titleUr: string;
  titleEn: string;
  examDate: string;
  programId: string;
  rulesUr: string;
  rulesEn: string;
  status: 'scheduled' | 'completed' | 'published';
}

export interface AnnualAward {
  id: string;
  titleUr: string;
  titleEn: string;
  categoryUr: string;
  categoryEn: string;
  winnerName: string;
  awardNameUr: string;
  awardNameEn: string;
  year: string;
  presented: boolean;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  title: string;
  altText: string;
  sizeBytes: number;
  mimeType: string;
  uploadedAt: string;
  usageCount: number;
  usedIn: string[];
}

export interface NavItemConfig {
  id: string;
  labelUr: string;
  labelEn: string;
  targetTab: string;
  isVisible: boolean;
  order: number;
}

export interface FooterConfig {
  aboutTextUr: string;
  aboutTextEn: string;
  quickLinksTitleUr: string;
  quickLinksTitleEn: string;
  contactTitleUr: string;
  contactTitleEn: string;
  copyrightUr: string;
  copyrightEn: string;
}

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
  keywords: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'super_admin' | 'admissions_admin' | 'academic_admin' | 'content_editor';
  passwordHash: string; // Plain PIN or hash for easy authentication
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  adminRole: string;
  action: string;
  module: string;
  details: string;
}

export interface SpecialHoliday {
  id: string;
  titleUr: string;
  titleEn: string;
  date: string;
  endDate?: string;
  descUr: string;
  descEn: string;
  isPublished: boolean;
}

export interface PagesContent {
  home: {
    heroTitleUr: string;
    heroTitleEn: string;
    heroSubtitleUr: string;
    heroSubtitleEn: string;
    heroDescUr: string;
    heroDescEn: string;
    hadithArabic: string;
    hadithUr: string;
    hadithEn: string;
    ctaTitleUr: string;
    ctaTitleEn: string;
    ctaDescUr: string;
    ctaDescEn: string;
    sectionsVisibility: {
      hero: boolean;
      stats: boolean;
      programs: boolean;
      timetable: boolean;
      prayers: boolean;
      assessments: boolean;
      announcements: boolean;
      cta: boolean;
    };
  };
  about: {
    titleUr: string;
    titleEn: string;
    subtitleUr: string;
    subtitleEn: string;
    mainDescUr: string;
    mainDescEn: string;
    missionUr: string;
    missionEn: string;
  };
  programs: {
    titleUr: string;
    titleEn: string;
    subtitleUr: string;
    subtitleEn: string;
    descUr: string;
    descEn: string;
  };
  schedule: {
    titleUr: string;
    titleEn: string;
    subtitleUr: string;
    subtitleEn: string;
  };
  admissions: {
    titleUr: string;
    titleEn: string;
    subtitleUr: string;
    subtitleEn: string;
    policyUr: string;
    policyEn: string;
  };
  contact: {
    titleUr: string;
    titleEn: string;
    subtitleUr: string;
    subtitleEn: string;
    officeHoursUr: string;
    officeHoursEn: string;
  };
}

export const INITIAL_SETTINGS: SiteSettings = {
  siteNameUr: 'مدرسہ تعلیم القرآن فریال مسجد',
  siteNameEn: 'Madrasa Taleem-ul-Quran Faryal Masjid',
  subtitleUr: 'حفظ و ناظرہ و تجوید القرآن',
  subtitleEn: 'Quran Memorization, Recitation & Tajweed',
  mottoUr: 'حفظ و ناظرہ مع تجوید • اخلاقی و دینی تربیت کا مستند ادارہ',
  mottoEn: 'Quran Memorization, Recitation & Tajweed • Certified Islamic Institution',
  logoUrl: '/images/madrasa-logo.jpeg',
  logoSize: 96,
  phone: '+92 300 1234567',
  email: 'contact@madrasataleemulquran.edu.pk',
  addressUr: 'فریال مسجد، نزد مین چورنگی، کراچی',
  addressEn: 'Faryal Masjid, Near Main Chowrangi, Karachi',
  whatsapp: '+92 300 1234567',
  scheduleNoticeUr: 'تعلیمی شیڈول: ہفتہ تا جمعرات تدریسی نشستیں | جمعہ: ہفتہ وار تعطیل (جمعہ مبارک)',
  scheduleNoticeEn: 'Academic Timetable: Saturday - Thursday Classes | Friday: Weekly Holiday (Jummah)',
  statsTeachers: '22',
  statsTeachersLabelUr: 'اساتذہ کرام',
  statsTeachersLabelEn: 'Teachers',
  statsTeachersDescUr: 'قرآنِ کریم کی تعلیم کے لیے 22 اساتذہ کرام خدمات انجام دے رہے ہیں۔',
  statsTeachersDescEn: 'A dedicated team of 22 teachers serving Quranic education.',
  statsStudents: '400+',
  statsStudentsLabelUr: 'طلبہ کرام',
  statsStudentsLabelEn: 'Students',
  statsStudentsDescUr: 'تقریباً 400 طلبہ مدرسے کے تعلیمی ماحول سے مستفید ہو رہے ہیں۔',
  statsStudentsDescEn: 'Approximately 400 students benefit from the madrasa\'s educational environment.',
  socialLinks: {
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    whatsapp: 'https://wa.me/923001234567',
    twitter: 'https://twitter.com',
    telegram: 'https://t.me'
  },
  maintenanceMode: false,
  defaultLang: 'ur',
  timezone: 'Asia/Karachi',
  animations: {
    enabled: true,
    intensity: 'balanced',
    enableBackgroundEffects: true,
    enableScrollReveals: true,
    enableHoverEffects: true,
    enableScrollProgressBar: true,
    enableCounters: true,
  }
};

export const INITIAL_PAGES_CONTENT: PagesContent = {
  home: {
    heroTitleUr: 'مدرسہ تعلیم القرآن فریال مسجد',
    heroTitleEn: 'Madrasa Taleem-ul-Quran Faryal Masjid',
    heroSubtitleUr: 'حفظ و ناظرہ و تجوید القرآن',
    heroSubtitleEn: 'Quran Memorization, Recitation & Tajweed',
    heroDescUr: 'قرآنِ کریم کی حفظ، ناظرہ، تجوید اور بنیادی اسلامی تعلیمات کا ایک مستند، باوقار اور پرامن روحانی مرکز۔',
    heroDescEn: 'A prestigious, authentic, and serene spiritual sanctuary dedicated to Quran memorization, recitation, and Islamic character building.',
    hadithArabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    hadithUr: '”تم میں سے بہترین شخص وہ ہے جو قرآن سیکھے اور سکھائے۔“ (صحیح بخاری)',
    hadithEn: '"The best among you are those who learn the Quran and teach it." (Sahih al-Bukhari)',
    ctaTitleUr: 'اپنے بچے کا مستقبل قرآنِ پاک کی روشنی سے روشن کریں',
    ctaTitleEn: 'Illuminate Your Child’s Future with the Light of the Quran',
    ctaDescUr: 'سال 2026ء کے داخلے جاری ہیں۔ محدود نشستوں کے باعث آج ہی اپنی درخواست آن لائن جمع کروائیں۔',
    ctaDescEn: 'Admissions open for 2026. Limited seats available; apply online today.',
    sectionsVisibility: {
      hero: true,
      stats: true,
      programs: true,
      timetable: true,
      prayers: true,
      assessments: true,
      announcements: true,
      cta: true
    }
  },
  about: {
    titleUr: 'مدرسہ کا تفصیلی تعارف و تاریخی پس منظر',
    titleEn: 'About Madrasa Taleem-ul-Quran Faryal Masjid',
    subtitleUr: 'قرآنی علوم کی ترویج اور اخلاقی تربیت کا روشن مینار',
    subtitleEn: 'A beacon of authentic Quranic education and moral character development',
    mainDescUr: 'مدرسہ تعلیم القرآن فریال مسجد کا قیام خالصتاً رضائے الٰہی کے حصول اور نسلِ نو کو قرآنِ مجید کے فہم، حفظ، تجوید اور اخلاقیات سے آراستہ کرنے کے عظیم مقصد کے تحت عمل میں لایا گیا ہے۔',
    mainDescEn: 'Madrasa Taleem-ul-Quran Faryal Masjid was established with the noble purpose of seeking the pleasure of Allah Almighty and nurturing the next generation with Quran memorization, recitation with Tajweed, and noble character.',
    missionUr: 'ہمارا مشن ہر مسلمان بچے اور بچی کے سینے کو کلامِ الٰہی کے نور سے منور کرنا اور انہیں عملی مسلمان بنانا ہے۔',
    missionEn: 'Our mission is to illuminate every student\'s heart with the divine light of the Quran and inspire lifelong Islamic practice.'
  },
  programs: {
    titleUr: 'جامع تعلیمی پروگرامز و کورسز',
    titleEn: 'Comprehensive Academic Programs & Courses',
    subtitleUr: 'حفظِ قرآن، ناظرہ مع تجوید، نورانی قاعدہ اور بنیادی دینیات کے منظم شعبہ جات',
    subtitleEn: 'Systematic Quranic memorization, recitation, Tajweed, and foundational Deeniyat',
    descUr: 'مدرسہ میں تجربہ کار اور مستند اساتذہ کی زیرِ نگرانی مختلف عمر کے طلباء کے لیے درجہ بدرجہ تعلیمی نصاب ترتیب دیا گیا ہے۔',
    descEn: 'Under the guidance of qualified mentors, structured curriculums are tailored for students of varying ages and levels.'
  },
  schedule: {
    titleUr: 'روزانہ کا تعلیمی نظام الاوقات و ہفتہ وار شیڈول',
    titleEn: 'Daily Timetable & Weekly Schedule',
    subtitleUr: 'مدرسہ کی 4 روزانہ تدریسی و تربیتی نشستیں اور ہفتہ وار تعطیلات کی تفاصیل',
    subtitleEn: 'Detailed timings of the four daily study sessions and weekly holiday guidelines'
  },
  admissions: {
    titleUr: 'آن لائن داخلہ فارم و شرائطِ داخلہ',
    titleEn: 'Online Admission Application & Policies',
    subtitleUr: 'مدرسہ تعلیم القرآن فریال مسجد میں داخلے کے لیے فارم پُر کریں',
    subtitleEn: 'Submit your application for enrollment at Madrasa Taleem-ul-Quran Faryal Masjid',
    policyUr: 'داخلے میرٹ اور انٹرویو کی بنیاد پر ہوتے ہیں۔ والدین کی رضامندی اور باقاعدگی کی پابندی لازمی شرط ہے۔',
    policyEn: 'Admissions are granted based on interview and space availability. Regularity and parental commitment are mandatory.'
  },
  contact: {
    titleUr: 'رابطہ و معلومات',
    titleEn: 'Contact & Institutional Inquiries',
    subtitleUr: 'کسی بھی معلومات، داخلہ رہنمائی یا عطیات کے سلسلے میں ہم سے رابطہ فرمائیں',
    subtitleEn: 'Reach out for inquiries, admission guidance, or madrasa visits',
    officeHoursUr: 'دفتری اوقات: صبح 8:00 تا دوپہر 12:00 اور بعد عصر تا مغرب (ہفتہ تا جمعرات)',
    officeHoursEn: 'Office Hours: 8:00 AM – 12:00 PM & Post-Asr – Maghrib (Saturday to Thursday)'
  }
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'STU-2026-001',
    name: 'محمد عثمان خان',
    fatherName: 'احمد خان',
    guardianPhone: '0300-1234567',
    programId: 'hifz',
    enrollmentDate: '2026-10-02',
    status: 'active',
    academicNotes: 'پارہ نمبر 3 زیرِ حفظ، روزانہ 1 پاؤ سبق سناتے ہیں۔',
    age: '9',
    address: 'فریال ٹاؤن، کراچی'
  },
  {
    id: 'STU-2026-002',
    name: 'عبداللہ بن طارق',
    fatherName: 'طارق محمود',
    guardianPhone: '0321-9876543',
    programId: 'nazra',
    enrollmentDate: '2026-10-05',
    status: 'active',
    academicNotes: 'پارہ 1 ناظرہ مکمل، تجوید کے قواعد کی مشق جاری ہے۔',
    age: '7',
    address: 'نزد فریال مسجد، کراچی'
  },
  {
    id: 'STU-2026-003',
    name: 'حمزہ بلال',
    fatherName: 'بلال احمد',
    guardianPhone: '0333-5551234',
    programId: 'hifz',
    enrollmentDate: '2026-09-15',
    status: 'active',
    academicNotes: 'ماشاءاللہ 15 پارے حفظ مکمل، منزل پختہ ہے۔',
    age: '11',
    address: 'سیکٹر 4، کراچی'
  }
];

export const INITIAL_COMPETITIONS: Competition[] = [
  {
    id: 'comp-1',
    titleUr: 'پانچوں نمازوں کی پابندی اور تکبیرِ اولیٰ مقابلہ',
    titleEn: 'Five Daily Prayers & Takbeer-e-Ula Competition',
    descUr: 'طلبہ میں نمازِ باجماعت اور پہلی صف میں تکبیرِ اولیٰ کے ساتھ حاضری کا ترغیبی مقابلہ۔ یہ مقابلہ وقتاً فوقتاً منعقد ہوتا ہے۔',
    descEn: 'Motivational competition to encourage punctuality for congregational prayers with Takbeer-e-Ula in the first row.',
    intervalUr: 'تقریباً 40 دن',
    intervalEn: 'Approximately 40 Days',
    startDate: '2026-10-01',
    endDate: '2026-11-10',
    rulesUr: 'پانچوں نمازیں مسجد میں تکبیرِ اولیٰ کے ساتھ باجماعت ادا کرنا۔ غیر حاضری پر پوائنٹس منہا ہوں گے۔',
    rulesEn: 'All 5 prayers in the masjid with Takbeer-e-Ula. Absences deduce evaluation points.',
    prizesUr: 'خصوصی اسناد، قرآنی تحائف اور سالانہ تقریب میں باوقار انعامات۔',
    prizesEn: 'Special certificates, Quranic gifts, and grand awards at the Annual Program.',
    status: 'active',
    isPublished: true
  },
  {
    id: 'comp-2',
    titleUr: 'حفظِ سورتیں و مسنون دعائیں مقابلہ',
    titleEn: 'Surah Memorization & Masnoon Duas Contest',
    descUr: 'ناظرہ اور مکتب کے طلبہ کے لیے منتخب سورتوں اور روزمرہ دعاؤں کے حفظ کا مقابلہ۔',
    descEn: 'Competition for Nazra and Maktab students memorizing selected Surahs and daily prayers.',
    intervalUr: '2 تا 3 ماہ',
    intervalEn: '2 to 3 Months',
    startDate: '2026-11-15',
    endDate: '2027-01-15',
    rulesUr: 'تجوید اور تلفظ کی درستگی پر ترجیح دی جائے گی۔',
    rulesEn: 'Evaluated primarily on Tajweed and Makharij precision.',
    prizesUr: 'درجہ اول، دوم اور سوم کے لیے نقد و اعزازی انعامات۔',
    prizesEn: 'Merit prizes for 1st, 2nd, and 3rd positions.',
    status: 'upcoming',
    isPublished: true
  }
];

export const INITIAL_COMPETITION_RESULTS: CompetitionResult[] = [
  {
    id: 'res-1',
    competitionId: 'comp-1',
    studentName: 'محمد عثمان خان',
    evaluationScore: '98%',
    positionUr: 'اول پوزیشن (شعبہ حفظ)',
    positionEn: '1st Position (Hifz Dept)',
    prizeAwarded: 'تفسیرِ قرآن مع شیلڈ',
    notes: 'پوری مدت میں ایک بھی نماز قضا نہیں ہوئی، تکبیرِ اولیٰ کی مکمل پابندی۔',
    isVerified: true
  },
  {
    id: 'res-2',
    competitionId: 'comp-1',
    studentName: 'حمزہ بلال',
    evaluationScore: '96%',
    positionUr: 'دوم پوزیشن (شعبہ حفظ)',
    positionEn: '2nd Position (Hifz Dept)',
    prizeAwarded: 'اسلامی کتب کا سیٹ و سند',
    notes: 'ماشاءاللہ مسلسل فجر و عشاء میں پہلی صف کی پابندی۔',
    isVerified: true
  }
];

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'ass-1',
    month: 'اکتوبر 2026ء',
    year: '2026',
    programId: 'hifz',
    titleUr: 'ماہانہ جائزہ شعبہ حفظ القرآن',
    titleEn: 'Monthly Hifz Assessment October 2026',
    date: '2026-10-25',
    status: 'scheduled',
    summaryUr: 'نیا سبق 2 پارے، سبقی اور پچھلی منزل کی تلاوت کا تفصیلی جائزہ۔',
    summaryEn: 'Comprehensive review of Sabaq, Sabqi, and cumulative Manzil retention.'
  },
  {
    id: 'ass-2',
    month: 'اکتوبر 2026ء',
    year: '2026',
    programId: 'nazra',
    titleUr: 'ماہانہ تجویدی جائزہ شعبہ ناظرہ',
    titleEn: 'Monthly Nazra & Tajweed Assessment',
    date: '2026-10-26',
    status: 'scheduled',
    summaryUr: 'نورانی قاعدہ کی تختیاں، ادغام و اخفاء کے قواعد کا انفرادی ٹیسٹ۔',
    summaryEn: 'Individual testing of Noorani Qaida and Tajweed phonetics rules.'
  }
];

export const INITIAL_EXAMINATIONS: Examination[] = [
  {
    id: 'exam-1',
    titleUr: 'سالانہ امتحانات برائے تعلیمی سال 1447ھ / 2026ء',
    titleEn: 'Annual Examinations Academic Year 1447 AH / 2026',
    examDate: '2026-12-15',
    programId: 'all',
    rulesUr: 'تمام طلبہ کا تحریری و زبانی امتحان وفاق المدارس کے نصاب کے مطابق لیا جائے گا۔',
    rulesEn: 'Oral and written examinations conducted according to Islamic madrasa standards.',
    status: 'scheduled'
  }
];

export const INITIAL_ANNUAL_AWARDS: AnnualAward[] = [
  {
    id: 'awd-1',
    titleUr: 'تکمیلِ حفظِ قرآن دستار بندی',
    titleEn: 'Graduation of Quran Memorization (Dastaar Bandi)',
    categoryUr: 'حفظِ قرآن',
    categoryEn: 'Hifz-ul-Quran',
    winnerName: 'حافظ محمد عثمان',
    awardNameUr: 'سندِ فراغت و اعزازی شیلڈ',
    awardNameEn: 'Completion Certificate & Shield of Honor',
    year: '2026',
    presented: true
  },
  {
    id: 'awd-2',
    titleUr: 'نمازی مقابلہ سالانہ ایوارڈ',
    titleEn: 'Annual Prayer Discipline Grand Prize',
    categoryUr: 'نماز و اخلاق',
    categoryEn: 'Prayer & Ethics',
    winnerName: 'حمزہ بلال',
    awardNameUr: 'خصوصی ستارہ نماز ایوارڈ',
    awardNameEn: 'Distinguished Prayer Star Award',
    year: '2026',
    presented: true
  }
];

export const INITIAL_SPECIAL_HOLIDAYS: SpecialHoliday[] = [
  {
    id: 'hol-1',
    titleUr: 'عید الفطر کی تعطیلات',
    titleEn: 'Eid-ul-Fitr Holidays',
    date: '2026-03-20',
    endDate: '2026-03-27',
    descUr: 'عید الفطر کے پرمسرت موقع پر مدرسہ میں 7 روزہ تعطیلات ہوں گی۔',
    descEn: 'A 7-day academic recess on the joyous occasion of Eid-ul-Fitr.',
    isPublished: true
  },
  {
    id: 'hol-2',
    titleUr: 'عید الاضحیٰ کی تعطیلات',
    titleEn: 'Eid-ul-Adha Holidays',
    date: '2026-05-27',
    endDate: '2026-06-03',
    descUr: 'سنتِ ابراہیمی کی ادائیگی کے لیے مدرسہ بند رہے گا۔',
    descEn: 'Recess for the observance of Eid-ul-Adha and Sunnah of Ibrahim (AS).',
    isPublished: true
  }
];

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'med-1',
    filename: 'madrasa-logo.jpeg',
    url: '/images/madrasa-logo.jpeg',
    title: 'مدرسہ آفیشل لوگو',
    altText: 'Official Madrasa Taleem-ul-Quran Faryal Masjid Crest and Calligraphy',
    sizeBytes: 84500,
    mimeType: 'image/jpeg',
    uploadedAt: '2026-10-01',
    usageCount: 8,
    usedIn: ['Header', 'Footer', 'Admin Portal', 'Hero Banner', 'Social Preview']
  }
];

export const INITIAL_NAV_ITEMS: NavItemConfig[] = [
  { id: 'home', labelUr: 'ہوم', labelEn: 'Home', targetTab: 'home', isVisible: true, order: 1 },
  { id: 'about', labelUr: 'تعارف', labelEn: 'About', targetTab: 'about', isVisible: true, order: 2 },
  { id: 'programs', labelUr: 'پروگرامز', labelEn: 'Programs', targetTab: 'programs', isVisible: true, order: 3 },
  { id: 'schedule', labelUr: 'اوقات و شیڈول', labelEn: 'Schedule', targetTab: 'schedule', isVisible: true, order: 4 },
  { id: 'admissions', labelUr: 'آن لائن داخلہ', labelEn: 'Admissions', targetTab: 'admissions', isVisible: true, order: 5 },
  { id: 'gallery', labelUr: 'شعبہ جات', labelEn: 'Departments', targetTab: 'gallery', isVisible: true, order: 6 },
  { id: 'announcements', labelUr: 'اعلانات', labelEn: 'Announcements', targetTab: 'announcements', isVisible: true, order: 7 },
  { id: 'contact', labelUr: 'رابطہ', labelEn: 'Contact', targetTab: 'contact', isVisible: true, order: 8 },
  { id: 'admin', labelUr: 'انتظامیہ', labelEn: 'Admin Portal', targetTab: 'admin', isVisible: true, order: 9 }
];

export const INITIAL_FOOTER_CONFIG: FooterConfig = {
  aboutTextUr: 'مدرسہ تعلیم القرآن فریال مسجد میں حفظِ قرآن، ناظرہ مع تجوید، نورانی قاعدہ اور بنیادی اسلامی اخلاقیات کی باقاعدہ اور معیاری تعلیم دی جاتی ہے۔',
  aboutTextEn: 'Madrasa Taleem-ul-Quran Faryal Masjid offers verified and high-standard education in Quran memorization, recitation with Tajweed, and Islamic ethics.',
  quickLinksTitleUr: 'اہم روابط',
  quickLinksTitleEn: 'Quick Links',
  contactTitleUr: 'رابطہ کی تفصیلات',
  contactTitleEn: 'Contact Info',
  copyrightUr: '© 2026 مدرسہ تعلیم القرآن فریال مسجد۔ جملہ حقوق محفوظ ہیں۔',
  copyrightEn: '© 2026 Madrasa Taleem-ul-Quran Faryal Masjid. All Rights Reserved.'
};

export const INITIAL_PAGE_SEO: Record<string, PageSeo> = {
  home: {
    metaTitle: 'مدرسہ تعلیم القرآن فریال مسجد | Madrasa Taleem-ul-Quran Faryal Masjid',
    metaDescription: 'مدرسہ تعلیم القرآن فریال مسجد: حفظ القرآن، ناظرہ، تجوید اور اسلامی تعلیمات کا مستند ادارہ۔ آن لائن داخلہ فارم اور معلومات۔',
    ogTitle: 'مدرسہ تعلیم القرآن فریال مسجد',
    ogDescription: 'Madrasa Taleem-ul-Quran Faryal Masjid - حفظ القرآن، ناظرہ، تجوید اور اسلامی تعلیمات کا مستند ادارہ۔',
    canonicalUrl: 'https://madrssa-taleem-ul-quran.vercel.app/',
    keywords: 'مدرسہ, تعلیم القرآن, فریال مسجد, حفظ قرآن, ناظرہ, تجوید, کراچی, madrasa, quran, hifz'
  },
  about: {
    metaTitle: 'تعارف مدرسہ | مدرسہ تعلیم القرآن فریال مسجد',
    metaDescription: 'مدرسہ تعلیم القرآن فریال مسجد کا قیام، مقاصد، 22 اساتذہ کرام اور 400+ طلبہ کی تعلیمی خدمات کا تعارف۔',
    ogTitle: 'تعارف مدرسہ تعلیم القرآن فریال مسجد',
    ogDescription: 'مدرسہ کا قیام، تاریخی پس منظر اور خدمات کا جامع تعارف۔',
    canonicalUrl: 'https://madrssa-taleem-ul-quran.vercel.app/#about',
    keywords: 'تعارف, مدرسہ فریال مسجد, اساتذہ کرام, اسلامی ادارہ'
  },
  programs: {
    metaTitle: 'تعلیمی پروگرامز | مدرسہ تعلیم القرآن فریال مسجد',
    metaDescription: 'شعبہ حفظ القرآن، ناظرہ قرآن و تجوید، اور مکتب دینیات کے پروگرامز کی تفاصیل۔',
    ogTitle: 'تعلیمی پروگرامز - مدرسہ تعلیم القرآن فریال مسجد',
    ogDescription: 'حفظ و ناظرہ کے بنیادی اور معیاری کورسز۔',
    canonicalUrl: 'https://madrssa-taleem-ul-quran.vercel.app/#programs',
    keywords: 'حفظ کورس, ناظرہ تجوید, مکتب کورس'
  },
  schedule: {
    metaTitle: 'نظام الاوقات و شیڈول | مدرسہ تعلیم القرآن فریال مسجد',
    metaDescription: 'مدرسہ کے 4 روزانہ تدریسی دورانیے، نمازوں کی پابندی اور ہفتہ تا جمعرات کلاس شیڈول۔',
    ogTitle: 'روزانہ کا نظام الاوقات - مدرسہ تعلیم القرآن فریال مسجد',
    ogDescription: 'مدرسہ کے روزانہ اور ہفتہ وار تعلیمی اوقات۔',
    canonicalUrl: 'https://madrssa-taleem-ul-quran.vercel.app/#schedule',
    keywords: 'نظام الاوقات, ٹائم ٹیبل, مدرسہ شیڈول'
  },
  admissions: {
    metaTitle: 'آن لائن داخلہ | مدرسہ تعلیم القرآن فریال مسجد',
    metaDescription: 'سال 2026ء کے داخلوں کے لیے آن لائن فارم پُر کریں اور اپنے بچے کا داخلہ یقینی بنائیں۔',
    ogTitle: 'آن لائن داخلہ فارم - مدرسہ تعلیم القرآن فریال مسجد',
    ogDescription: 'حفظ و ناظرہ میں داخلہ فارم آن لائن جمع کروائیں۔',
    canonicalUrl: 'https://madrssa-taleem-ul-quran.vercel.app/#admissions',
    keywords: 'آن لائن داخلہ, داخلہ فارم, مدرسہ ایڈمیشن'
  },
  gallery: {
    metaTitle: 'شعبہ جات و سہولیات | مدرسہ تعلیم القرآن فریال مسجد',
    metaDescription: 'مدرسہ کے شعبہ جات، کلاس رومز، لائبریری اور نمازی ہال کی معلومات۔',
    ogTitle: 'شعبہ جات - مدرسہ تعلیم القرآن فریال مسجد',
    ogDescription: 'مدرسہ کے تعلیمی و تدریسی شعبہ جات۔',
    canonicalUrl: 'https://madrssa-taleem-ul-quran.vercel.app/#gallery',
    keywords: 'شعبہ جات, کلاس روم, کتب خانہ'
  },
  announcements: {
    metaTitle: 'اہم اعلانات | مدرسہ تعلیم القرآن فریال مسجد',
    metaDescription: 'مدرسہ کے تازہ ترین اعلانات، امتحانات، داخلہ تاریخیں اور نوٹس بورڈ۔',
    ogTitle: 'اہم اعلانات و نوٹس بورڈ',
    ogDescription: 'مدرسہ کے اہم اعلانات اور نوٹس۔',
    canonicalUrl: 'https://madrssa-taleem-ul-quran.vercel.app/#announcements',
    keywords: 'اعلانات, نوٹس بورڈ, امتحانات نوٹس'
  },
  contact: {
    metaTitle: 'رابطہ | مدرسہ تعلیم القرآن فریال مسجد',
    metaDescription: 'مدرسہ کے فون نمبر، واٹس ایپ، پتہ اور آن لائن پیغام بھیجنے کا فارم۔',
    ogTitle: 'رابطہ - مدرسہ تعلیم القرآن فریال مسجد',
    ogDescription: 'مدرسہ انتظامیہ سے رابطہ کریں۔',
    canonicalUrl: 'https://madrssa-taleem-ul-quran.vercel.app/#contact',
    keywords: 'رابطہ, فون نمبر, واٹس ایپ, پتہ'
  }
};

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    username: 'admin',
    name: 'مہتمم صاحب (Super Admin)',
    role: 'super_admin',
    passwordHash: '1234', // Default PIN/Password for administrative access
    createdAt: '2026-10-01',
    lastLogin: '2026-10-17 10:00 AM',
    isActive: true
  },
  {
    id: 'usr-2',
    username: 'admissions',
    name: 'ناظمِ داخلہ (Admissions Admin)',
    role: 'admissions_admin',
    passwordHash: 'adm123',
    createdAt: '2026-10-05',
    isActive: true
  },
  {
    id: 'usr-3',
    username: 'academic',
    name: 'ناظمِ تعلیمات (Academic Admin)',
    role: 'academic_admin',
    passwordHash: 'aca123',
    createdAt: '2026-10-05',
    isActive: true
  },
  {
    id: 'usr-4',
    username: 'editor',
    name: 'مواد ایڈیٹر (Content Editor)',
    role: 'content_editor',
    passwordHash: 'edit123',
    createdAt: '2026-10-10',
    isActive: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-17 09:30:15',
    adminName: 'مہتمم صاحب (Super Admin)',
    adminRole: 'super_admin',
    action: 'INIT_SYSTEM',
    module: 'System',
    details: 'مرکزی کنٹرول پینل اور ڈیٹا بیس سروس فعال کی گئی۔'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-17 09:35:22',
    adminName: 'مہتمم صاحب (Super Admin)',
    adminRole: 'super_admin',
    action: 'VERIFY_STATS',
    module: 'Institutional Statistics',
    details: '22 اساتذہ کرام اور 400+ طلبہ کرام کے اعداد و شمار تصدیق شدہ کیے گئے۔'
  }
];
export const INITIAL_DONATION_CATEGORIES: DonationCategory[] = [
  { id: 'general', labelUr: 'عمومی عطیہ', labelEn: 'General Donation', isZakatEligible: false, enabled: true },
  { id: 'quran', labelUr: 'تعلیمِ قرآن', labelEn: 'Quran Education', isZakatEligible: false, enabled: true },
  { id: 'students', labelUr: 'طلبہ کی تعلیمی ضروریات', labelEn: 'Students Educational Needs', isZakatEligible: true, enabled: true },
  { id: 'maintenance', labelUr: 'مدرسے کی دیکھ بھال', labelEn: 'Madrasa Maintenance', isZakatEligible: false, enabled: true },
  { id: 'zakat', labelUr: 'زکوٰۃ', labelEn: 'Zakat', isZakatEligible: true, enabled: true },
  { id: 'sadaqah', labelUr: 'صدقہ', labelEn: 'Sadaqah', isZakatEligible: false, enabled: true }
];
