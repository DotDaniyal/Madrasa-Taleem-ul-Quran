import { Program, Announcement, GalleryItem, Teacher, AdmissionApplication, ScheduleDay, DailyPeriod } from '../types';

export const DAILY_TIMETABLE: DailyPeriod[] = [
  {
    id: 'period-1',
    periodNum: 1,
    titleUr: 'پہلا دورانیہ — صبح کی تعلیمی نشست',
    titleEn: 'Period 1 — Morning Academic Session',
    timeRangeUr: 'صبح 7:30 تا دوپہر 12:00',
    timeRangeEn: '7:30 AM – 12:00 PM',
    subtitleUr: 'صبح 7:30 بجے سے دوپہر 12:00 بجے تک۔',
    subtitleEn: 'From 7:30 AM to 12:00 PM.',
    descUr: 'باقاعدہ کلاس روم تدریس: نیا سبق، سبقی، ناظرہ مع تجوید اور حفظِ قرآن کی بنیادی تدریسی نشست۔',
    descEn: 'Formal classroom instruction: Sabaq, Sabqi, Nazra with Tajweed, and core Quranic memorization session.',
    isTeachingSession: true,
    typeUr: 'باقاعدہ تدریسی نشست',
    typeEn: 'Formal Teaching Session',
    iconName: 'Sun'
  },
  {
    id: 'period-2',
    periodNum: 2,
    titleUr: 'دوسرا دورانیہ — بعد دوپہر کی نشست',
    titleEn: 'Period 2 — Afternoon Study Session',
    timeRangeUr: 'دوپہر 2:30 تا نمازِ عصر',
    timeRangeEn: '2:30 PM – Asr Prayer',
    subtitleUr: 'دوپہر 2:30 بجے سے نمازِ عصر تک۔',
    subtitleEn: 'From 2:30 PM until Asr Prayer.',
    descUr: 'دوپہر کی تدریسی و مشقی نشست: تجویدی قواعد کا اعادہ، مخارج کی درستی اور باجماعت نمازِ عصر کی تیاری۔',
    descEn: 'Afternoon instruction and drill: Tajweed rules practice, Makharij precision, and preparation for Asr Salah.',
    isTeachingSession: true,
    typeUr: 'تدریسی و مشقی نشست',
    typeEn: 'Instruction & Practice Session',
    iconName: 'Clock'
  },
  {
    id: 'period-3',
    periodNum: 3,
    titleUr: 'تیسرا دورانیہ — بعد عصر کا وقت',
    titleEn: 'Period 3 — Post-Asr Revision Circle',
    timeRangeUr: 'نمازِ عصر تا نمازِ مغرب',
    timeRangeEn: 'Asr Prayer – Maghrib Prayer',
    subtitleUr: 'نمازِ عصر سے نمازِ مغرب تک۔',
    subtitleEn: 'From Asr Prayer to Maghrib Prayer.',
    descUr: 'دہرائی و مطالعہ: حفظ و ناظرہ کی پختہ دہرائی، باہمی تکرار، مسنون دعاؤں کا اعادہ اور شام کے تعلیمی حلقے۔',
    descEn: 'Revision and consolidation: rigorous memorization review, peer recitation, and evening study circles.',
    isTeachingSession: false,
    typeUr: 'دہرائی و تکرار',
    typeEn: 'Consolidation & Review',
    iconName: 'BookOpen'
  },
  {
    id: 'period-4',
    periodNum: 4,
    titleUr: 'چوتھا دورانیہ — بعد مغرب کا وقت',
    titleEn: 'Period 4 — Post-Maghrib Manzil & Tarbiyah',
    timeRangeUr: 'نمازِ مغرب تا نمازِ عشاء',
    timeRangeEn: 'Maghrib Prayer – Isha Prayer',
    subtitleUr: 'نمازِ مغرب سے نمازِ عشاء تک۔',
    subtitleEn: 'From Maghrib Prayer to Isha Prayer.',
    descUr: 'منزل و اخلاقی رہنمائی: روزانہ منزل سنانے کا اہتمام، اخلاقی و تربیتی ہدایات اور باجماعت نمازِ عشاء کی پابندی۔',
    descEn: 'Manzil recitation & moral mentoring: daily Manzil evaluation, character-building, and preparation for Isha Salah.',
    isTeachingSession: false,
    typeUr: 'منزل و تربیتی نشست',
    typeEn: 'Manzil & Mentoring Session',
    iconName: 'Moon'
  }
];

export const WEEKLY_SCHEDULE: ScheduleDay[] = [
  {
    id: 'sat',
    dayUr: 'ہفتہ',
    dayEn: 'Saturday',
    statusUr: 'تعلیم جاری',
    statusEn: 'Classes Active',
    isHoliday: false,
    timingsUr: 'صبح 7:30 تا 12:00 / دوپہر 2:30 تا عشاء',
    timingsEn: '7:30 AM - 12:00 PM / 2:30 PM - Isha'
  },
  {
    id: 'sun',
    dayUr: 'اتوار',
    dayEn: 'Sunday',
    statusUr: 'تعلیم جاری',
    statusEn: 'Classes Active',
    isHoliday: false,
    timingsUr: 'صبح 7:30 تا 12:00 / دوپہر 2:30 تا عشاء',
    timingsEn: '7:30 AM - 12:00 PM / 2:30 PM - Isha'
  },
  {
    id: 'mon',
    dayUr: 'پیر',
    dayEn: 'Monday',
    statusUr: 'تعلیم جاری',
    statusEn: 'Classes Active',
    isHoliday: false,
    timingsUr: 'صبح 7:30 تا 12:00 / دوپہر 2:30 تا عشاء',
    timingsEn: '7:30 AM - 12:00 PM / 2:30 PM - Isha'
  },
  {
    id: 'tue',
    dayUr: 'منگل',
    dayEn: 'Tuesday',
    statusUr: 'تعلیم جاری',
    statusEn: 'Classes Active',
    isHoliday: false,
    timingsUr: 'صبح 7:30 تا 12:00 / دوپہر 2:30 تا عشاء',
    timingsEn: '7:30 AM - 12:00 PM / 2:30 PM - Isha'
  },
  {
    id: 'wed',
    dayUr: 'بدھ',
    dayEn: 'Wednesday',
    statusUr: 'تعلیم جاری',
    statusEn: 'Classes Active',
    isHoliday: false,
    timingsUr: 'صبح 7:30 تا 12:00 / دوپہر 2:30 تا عشاء',
    timingsEn: '7:30 AM - 12:00 PM / 2:30 PM - Isha'
  },
  {
    id: 'thu',
    dayUr: 'جمعرات',
    dayEn: 'Thursday',
    statusUr: 'تعلیم جاری',
    statusEn: 'Classes Active',
    isHoliday: false,
    timingsUr: 'صبح 7:30 تا 12:00 / دوپہر 2:30 تا عشاء',
    timingsEn: '7:30 AM - 12:00 PM / 2:30 PM - Isha'
  },
  {
    id: 'fri',
    dayUr: 'جمعہ',
    dayEn: 'Friday',
    statusUr: 'ہفتہ وار چھٹی (جمعہ مبارک)',
    statusEn: 'Weekly Holiday (Jummah Mubarak)',
    isHoliday: true,
    timingsUr: 'ہفتہ وار تعطیل — نمازِ جمعہ کا اہتمام',
    timingsEn: 'Weekly Holiday — Congregational Jummah Prayer'
  }
];

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'hifz',
    titleUr: 'شعبہ حفظ القرآن الكريم',
    titleEn: 'Hifz-ul-Quran Department',
    descUr: 'قرآن مجید کو حفظ کرنے کا انتہائی منظم اور معیاری شعبہ، جس میں تجوید و مخارج اور پختہ دہرائی پر خصوصی توجہ دی جاتی ہے۔',
    descEn: 'A structured and high-standard department for memorizing the Holy Quran with special focus on Tajweed, Makharij, and rigorous revision.',
    durationUr: '2.5 تا 3.5 سال',
    durationEn: '2.5 to 3.5 Years',
    ageUr: '6 سال سے زائد',
    ageEn: 'Above 6 Years',
    timingsUr: 'صبح 7:00 بجے تا دوپہر 12:30 بجے',
    timingsEn: '7:00 AM - 12:30 PM',
    iconName: 'BookOpen',
    featuresUr: [
      'ماہر حفاظِ کرام کی خصوصی نگرانی',
      'روزانہ نیا سبق، سبقی اور منزل کی پختگی',
      'صحیح تلفظ اور قواعدِ تجوید کی عملی تربیت',
      'ماہانہ کارکردگی رپورٹس برائے والدین'
    ],
    featuresEn: [
      'Supervision by expert Huffaz',
      'Daily Sabaq, Sabqi, and Manzil consolidation',
      'Proper pronunciation & Tajweed training',
      'Monthly performance reports for parents'
    ]
  },
  {
    id: 'nazra',
    titleUr: 'ناظرہ قرآن و تجوید',
    titleEn: 'Nazra Quran & Tajweed',
    descUr: 'بچیوں اور بچوں کے لیے درست تلفظ اور مخارج کے ساتھ قرآنِ پاک کی روانگی سے تلاوت کی تعلیم۔',
    descEn: 'Fluent recitation of the Holy Quran with accurate pronunciation and Makharij for children and youth.',
    durationUr: '6 ماہ تا 1 سال',
    durationEn: '6 Months to 1 Year',
    ageUr: '5 سال سے زائد',
    ageEn: 'Above 5 Years',
    timingsUr: 'عصر تا مغرب / صبح کے شفٹس',
    timingsEn: 'Asr to Maghrib / Morning shifts',
    iconName: 'Award',
    featuresUr: [
      'نورانی قاعدہ سے آغاز اور بنیادی مخارج',
      'تختی و تلفظ کی انفرادی مشق',
      'نماز، مسنون دعائیں اور بنیادی کلمے حفظ کروانا',
      'خوشگوار، حوصلہ افزا اور محفوظ تعلیمی ماحول'
    ],
    featuresEn: [
      'Starting from Noorani Qaida and foundational Makharij',
      'Individual pronunciation practice',
      'Memorization of daily Salah and Masnoon Duas',
      'Encouraging, safe, and positive atmosphere'
    ]
  },
  {
    id: 'deeniyat',
    titleUr: 'مکتب کورس (دینیات و اخلاقیات)',
    titleEn: 'Maktab Course (Deeniyat & Ethics)',
    descUr: 'بنیادی اسلامی عقائد، نماز کا طریقہ، وضو، غسل، مسنون دعائیں، اور اخلاقی تربیت کا جامع کورس۔',
    descEn: 'Comprehensive course covering basic Islamic beliefs, method of Salah, ablution, Masnoon Duas, and moral upbringing.',
    durationUr: '1 سال',
    durationEn: '1 Year',
    ageUr: '7 سال سے زائد',
    ageEn: 'Above 7 Years',
    timingsUr: 'دوپہر 3:00 بجے تا شام 5:00 بجے',
    timingsEn: '3:00 PM - 5:00 PM',
    iconName: 'Users',
    featuresUr: [
      'فقہی بنیادی مسائل، طہارت اور وضو کی مشق',
      'سیرتِ طیبہ اور اسلامی آداب و اخلاق',
      'بنیادی احادیثِ مبارکہ کا حفظ',
      'اخلاقی و تربیتی رہنما اسباق'
    ],
    featuresEn: [
      'Basic Islamic jurisprudence and purity practice',
      'Lessons on Seerah and moral conduct',
      'Memorization of short Hadiths',
      'Character-building guidance'
    ]
  },
  {
    id: 'advanced_tajweed',
    titleUr: 'تجوید و حسنِ قراءت کورس',
    titleEn: 'Tajweed & Melodious Qiraat',
    descUr: 'صفت الحروف، مخارج کی باریکیوں اور خوش الحانی کے ساتھ تلاوت سیکھنے کے خواہشمند طلباء کے لیے۔',
    descEn: 'For students wishing to master the fine rules of Sifat-ul-Huroof, Makharij precision, and melodious recitation.',
    durationUr: '6 ماہ',
    durationEn: '6 Months',
    ageUr: '10 سال سے زائد',
    ageEn: 'Above 10 Years',
    timingsUr: 'بعد از نمازِ مغرب',
    timingsEn: 'After Maghrib Prayer',
    iconName: 'Sparkles',
    featuresUr: [
      'قواعدِ تجوید اور مخارج کی تفصیلی تدریس',
      'غنہ، ادغام، اخفاء اور اظہار کی عملی مشق',
      'صوت و الحان کی باقاعدہ تربیت',
      'کامیابی پر سندِ تجوید کا اجرا'
    ],
    featuresEn: [
      'Detailed study of Tajweed rules and Makharij',
      'Hands-on practice of Ghunnah, Idgham, and Ikhfa',
      'Voice pitch and articulation training',
      'Certificate upon successful completion'
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    titleUr: 'سالانہ داخلے برائے سال 2026ء کا آغاز',
    titleEn: 'Annual Admissions Open for 2026',
    contentUr: 'مدرسہ تعلیم القرآن فریال مسجد میں شعبہ حفظ، ناظرہ اور مکتب دینیات کے لیے نئے داخلے شروع ہو چکے ہیں۔ والدین سے گزارش ہے کہ جلد از جلد آن لائن یا مدرسہ آفس تشریف لا کر داخلہ یقینی بنائیں۔ ہفتہ تا جمعرات کلاسز جاری رہتی ہیں۔',
    contentEn: 'New admissions for Hifz, Nazra, and Deeniyat departments have officially started at Madrasa Taleem-ul-Quran Faryal Masjid. Classes run Saturday through Thursday. Friday is a weekly holiday.',
    categoryUr: 'داخلے',
    categoryEn: 'Admissions',
    date: '2026-10-01',
    isImportant: true
  },
  {
    id: 'ann-2',
    titleUr: 'ہفتہ وار تعلیمی شیڈول اور جمعہ کی تعطیل',
    titleEn: 'Weekly Academic Schedule & Friday Holiday',
    contentUr: 'مدرسے کے تمام طلباء اور والدین کو مطلع کیا جاتا ہے کہ تعلیم کا شیڈول ہفتہ تا جمعرات ہے۔ جمعہ کے دن ہفتہ وار تعطیل ہوتی ہے اور نمازِ جمعہ کا باجماعت اہتمام کیا جاتا ہے۔',
    contentEn: 'All students and parents are notified that madrasa classes operate Saturday through Thursday. Friday is the designated weekly holiday with Jummah congregational prayer.',
    categoryUr: 'شیڈول',
    categoryEn: 'Schedule',
    date: '2026-10-10',
    isImportant: true
  },
  {
    id: 'ann-3',
    titleUr: 'ماہانہ کارکردگی و حفظ جائزہ ٹیسٹ',
    titleEn: 'Monthly Academic Progress & Hifz Review',
    contentUr: 'رواں ماہ کے اختتام پر شعبہ حفظ اور ناظرہ کے طلباء کا ماہانہ جائزہ ٹیسٹ منعقد ہوگا، جس کے نتائج والدین کے ساتھ شیئر کیے جائیں گے۔',
    contentEn: 'Monthly evaluation and revision assessments will be conducted for Hifz and Nazra students at the end of this month, with progress reports shared with parents.',
    categoryUr: 'امتحانات',
    categoryEn: 'Examinations',
    date: '2026-10-14',
    isImportant: false
  }
];

// Honest, authentic curriculum and facility showcases using clean Islamic architectural badges
export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    titleUr: 'شعبہ حفظ القرآن کی نشستیں',
    titleEn: 'Hifz Department Study Circles',
    descUr: 'قرآنِ مجید کی یاد دہانی اور روزانہ منزل دہرائی کے لیے مخصوص، پرسکون اور باوقار ماحول۔',
    descEn: 'Dedicated, serene study circles for Quranic memorization and daily Manzil review.',
    category: 'hifz',
    iconName: 'BookOpen',
    date: '1447 ھ / 2026ء'
  },
  {
    id: 'gal-2',
    titleUr: 'ناظرہ و نورانی قاعدہ کلاس روم',
    titleEn: 'Nazra & Noorani Qaida Learning Space',
    descUr: 'بچوں کے لیے ہوا دار، روشن اور منظم تعلیمی ہال جہاں انفرادی توجہ کے ساتھ مخارج سکھائے جاتے ہیں۔',
    descEn: 'Well-ventilated, illuminated classroom where children receive individualized phonetics attention.',
    category: 'curriculum',
    iconName: 'Award',
    date: '1447 ھ / 2026ء'
  },
  {
    id: 'gal-3',
    titleUr: 'مرکزی نمازی ہال و صفوف',
    titleEn: 'Main Prayer Hall & Gathering Space',
    descUr: 'طلباء کو نمازِ باجماعت کی پابندی اور مسنون آداب کی عملی تربیت دینے کا مرکزی ہال۔',
    descEn: 'The central hall where students practice congregational prayer and Sunnah etiquette daily.',
    category: 'facilities',
    iconName: 'Building',
    date: '1447 ھ / 2026ء'
  },
  {
    id: 'gal-4',
    titleUr: 'سالانہ جائزہ و تقسیمِ اسناد',
    titleEn: 'Annual Examinations & Certificate Awards',
    descUr: 'حفظِ قرآن مکمل کرنے والے طلباء کی دستار بندی اور اسناد کی فراہمی کا باوقار اہتمام۔',
    descEn: 'Ceremonial graduation and certificate conferment for students completing Quran memorization.',
    category: 'events',
    iconName: 'GraduationCap',
    date: '1447 ھ / 2026ء'
  },
  {
    id: 'gal-5',
    titleUr: 'اسلامی کتب خانہ و مطالعہ گاہ',
    titleEn: 'Islamic Library & Reference Center',
    descUr: 'تفاسیر، احادیثِ نبویہ اور دینی کتب پر مشتمل کتب خانہ جو اساتذہ اور طلباء کے استفادے کے لیے ہے۔',
    descEn: 'Reference library containing Quranic commentaries and Hadith literature for scholars and students.',
    category: 'facilities',
    iconName: 'Library',
    date: '1447 ھ / 2026ء'
  },
  {
    id: 'gal-6',
    titleUr: 'قواعدِ تجوید و صوتی مشقیں',
    titleEn: 'Tajweed Rules & Phonetics Lab',
    descUr: 'حروف کے درست صفات اور مخارج کی باریکیوں کی مشق کے لیے مخصوص تعلیمی نشست۔',
    descEn: 'Specialized sessions focusing on phonetics precision and acoustic articulation of Quranic letters.',
    category: 'curriculum',
    iconName: 'Sparkles',
    date: '1447 ھ / 2026ء'
  }
];

// Dignified faculty details with authentic credentials and monograms (no fake stock photos)
export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't-1',
    biometricId: 'T-101',
    fullName: 'قاری محمد احمد صاحب',
    phoneNumber: '03001234567',
    baseSalary: 35000,
    status: 'active',
    programId: 'hifz',
    nameUr: 'قاری محمد احمد صاحب',
    nameEn: 'Qari Muhammad Ahmed',
    roleUr: 'مہتمم و شیخ القراء',
    roleEn: 'Principal & Head Qari',
    qualificationUr: 'درسِ نظامی و قراءتِ سبعہ (جامعۃ العلوم الإسلامیہ)',
    qualificationEn: 'Dars-e-Nizami & Qiraat-e-Saba Graduate',
    experienceUr: '15 سالہ تدریسی تجربہ',
    experienceEn: '15+ Years Teaching Experience',
    monogramUr: 'شیخ'
  },
  {
    id: 't-2',
    biometricId: 'T-102',
    fullName: 'مولانا عبداللہ فاروقی',
    phoneNumber: '03129876543',
    baseSalary: 30000,
    status: 'active',
    programId: 'hifz',
    nameUr: 'مولانا عبداللہ فاروقی',
    nameEn: 'Maulana Abdullah Farooqi',
    roleUr: 'ناظمِ تعلیمات و استادِ شعبہ حفظ',
    roleEn: 'Director of Studies & Hifz Mentor',
    qualificationUr: 'حافظِ قرآن و عالمِ دین (وفاق المدارس العربیہ)',
    qualificationEn: 'Hafiz of Quran & Islamic Scholar',
    experienceUr: '10 سالہ شعبہ حفظ نگرانی',
    experienceEn: '10+ Years Hifz Mentorship',
    monogramUr: 'عالم'
  },
  {
    id: 't-3',
    biometricId: 'T-103',
    fullName: 'قاری زبیر احمد نقشبندی',
    phoneNumber: '03335556677',
    baseSalary: 28000,
    status: 'active',
    programId: 'nazra',
    nameUr: 'قاری زبیر احمد نقشبندی',
    nameEn: 'Qari Zubair Ahmed Naqshbandi',
    roleUr: 'استادِ ناظرہ، نورانی قاعدہ و تجوید',
    roleEn: 'Senior Nazra & Tajweed Instructor',
    qualificationUr: 'تخصص فی التجوید والقراءات',
    qualificationEn: 'Specialization in Tajweed & Recitation',
    experienceUr: '8 سالہ ناظرہ و تجوید تدریس',
    experienceEn: '8+ Years Phonetics Experience',
    monogramUr: 'قاری'
  }
];

export const INITIAL_APPLICATIONS: AdmissionApplication[] = [
  {
    id: 'TMQ-2026-1001',
    studentName: 'محمد عثمان خان',
    fatherName: 'احمد خان',
    age: '9',
    programId: 'hifz',
    currentLevelUr: 'ناظرہ مکمل، قاعدہ پختہ',
    guardianPhone: '0300-1234567',
    address: 'گلی نمبر 3، بلاک B، فریال ٹاؤن، کراچی',
    previousMadrasa: 'مکتبہ رحیمیہ',
    notes: 'بچہ صبح کے وقت حفظ کرنا چاہتا ہے۔',
    status: 'approved',
    createdAt: '2026-10-02'
  },
  {
    id: 'TMQ-2026-1002',
    studentName: 'عبداللہ بن طارق',
    fatherName: 'طارق محمود',
    age: '7',
    programId: 'nazra',
    currentLevelUr: 'نورانی قاعدہ مکمل',
    guardianPhone: '0321-9876543',
    address: 'مکان 45، نزد فریال مسجد، کراچی',
    notes: 'عصر کے بعد والی شفٹ میں داخلہ مطلوب ہے۔',
    status: 'pending',
    createdAt: '2026-10-12'
  }
];
