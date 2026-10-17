import { Program, Announcement, GalleryItem, Teacher, AdmissionApplication } from '../types';

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'hifz',
    titleUr: 'حفظ القرآن الكريم',
    titleEn: 'Hifz-ul-Quran',
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
      'ماہر حفاظِ کرام کی نگرانی',
      'روزانہ نیا سبق اور منزل کی پختگی',
      'صحیح تلفظ اور قواعدِ تجوید کی تربیت',
      'ماہانہ کارکردگی رپورٹس برائے والدین'
    ],
    featuresEn: [
      'Supervision by expert Huffaz',
      'Daily new lesson and revision system',
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
      'نورانی قاعدہ سے آغاز',
      'دستیاب کتب اور تختی کی مشق',
      'نماز، مسنون دعائیں اور کلمے حفظ کروانا',
      'خوشگوار اور حوصلہ افزا تعلیمی ماحول'
    ],
    featuresEn: [
      'Starting from Noorani Qaida',
      'Writing and reading practice',
      'Memorization of daily prayers & Masnoon Duas',
      'Friendly and encouraging learning environment'
    ]
  },
  {
    id: 'deeniyat',
    titleUr: 'مکتب کورس (دینیات)',
    titleEn: 'Maktab Course (Deeniyat)',
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
      'فقہی بنیادی مسائل اور طہارت',
      'سیرتِ طیبہ اور اخلاقیات کے اسباق',
      'اردو خوشخطی اور اسلامی آداب',
      'باقاعدہ کوئز اور انعامی مقابلے'
    ],
    featuresEn: [
      'Basic Islamic jurisprudence & purity',
      'Lessons on Seerah and Islamic ethics',
      'Urdu calligraphy & Islamic etiquette',
      'Regular quizzes and award ceremonies'
    ]
  },
  {
    id: 'advanced_tajweed',
    titleUr: 'تجوید و قراءت کورس',
    titleEn: 'Advanced Tajweed & Qiraat',
    descUr: 'صفت الحروف، مخارج کی باریکیوں اور خوش الحانی کے ساتھ تلاوت سیکھنے کے خواہشمند حضرات کے لیے۔',
    descEn: 'For those wishing to master the fine rules of Sifat-ul-Huroof, Makharij precision, and melodious recitation.',
    durationUr: '6 ماہ',
    durationEn: '6 Months',
    ageUr: '12 سال سے زائد',
    ageEn: 'Above 12 Years',
    timingsUr: 'بعد از نمازِ مغرب',
    timingsEn: 'After Maghrib Prayer',
    iconName: 'Sparkles',
    featuresUr: [
      'جزری اور تحفۃ الأطفال کی تدریس',
      'غنہ، ادغام، اخفاء اور اظہار کی عملی مشق',
      'صوت و الحان کی بنیادی تربیت',
      'سندِ فراغت کا حصول'
    ],
    featuresEn: [
      'Teaching of Jazariyyah principles',
      'Practical practice of Ghunnah, Idgham, Ikhfa',
      'Basic voice and melodic training',
      'Certificate upon completion'
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    titleUr: 'سالانہ داخلے برائے سال 2026ء کا آغاز',
    titleEn: 'Annual Admissions Open for 2026',
    contentUr: 'مدرسہ تعلیم القرآن فریال مسجد میں شعبہ حفظ، ناظرہ اور مکتب دینیات کے لیے نئے داخلے شروع ہو چکے ہیں۔ والدین سے گزارش ہے کہ جلد از جلد آن لائن یا مدرسہ آفس تشریف لا کر داخلہ یقینی بنائیں۔ نشستیں محدود ہیں۔',
    contentEn: 'New admissions for Hifz, Nazra, and Deeniyat departments have officially started at Madrasa Taleem-ul-Quran Faryal Masjid. Parents are requested to secure admissions early. Seats are limited.',
    categoryUr: 'داخلے',
    categoryEn: 'Admissions',
    date: '2026-10-01',
    isImportant: true
  },
  {
    id: 'ann-2',
    titleUr: 'محفلِ حسنِ قرات و دستار بندی',
    titleEn: 'Annual Qiraat Gathering & Dastaarbandi',
    contentUr: 'الحمدللہ رواں ماہ کے آخر میں مدرسہ تعلیم القرآن فریال مسجد میں سالانہ تقریبِ دستار بندی اور حسنِ قرات کا انعقاد کیا جائے گا۔ تمام اہل علاقہ اور والدین کو شرکت کی دعوت دی جاتی ہے۔',
    contentEn: 'Alhamdulillah, the annual Qiraat gathering and Dastaarbandi ceremony will be held at Madrasa Taleem-ul-Quran Faryal Masjid later this month. All local residents and parents are cordially invited.',
    categoryUr: 'تقاریب',
    categoryEn: 'Events',
    date: '2026-10-10',
    isImportant: false
  },
  {
    id: 'ann-3',
    titleUr: 'سرکاری تعطیل اور اسباق کی روٹین',
    titleEn: 'Public Holiday & Class Schedule',
    contentUr: 'آئندہ جمعہ کو خصوصی تعطیل ہوگی، جبکہ ہفتہ کے روز معمول کے مطابق کلاسز جاری رہیں گی۔ تمام طلباء کو وقت پر حاضری کی تاکید کی جاتی ہے۔',
    contentEn: 'There will be a special holiday next Friday, while regular classes will resume as scheduled on Saturday. All students are reminded to attend on time.',
    categoryUr: 'اطلاعیه',
    categoryEn: 'Notice',
    date: '2026-10-14',
    isImportant: false
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    titleUr: 'مرکزی نمازی ہال اور محراب — فریال مسجد',
    titleEn: 'Main Prayer Hall & Mihrab — Faryal Masjid',
    category: 'mosque',
    imageUrl: 'https://images.unsplash.com/photo-1564769625393-d0ef116f082e?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-15'
  },
  {
    id: 'gal-2',
    titleUr: 'شعبہ حفظ کے طلباء قرآن مجید کی دہرائی کرتے ہوئے',
    titleEn: 'Hifz Students Revising the Holy Quran',
    category: 'hifz',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=1200',
    date: '2026-02-10'
  },
  {
    id: 'gal-3',
    titleUr: 'ناظرہ اور نورانی قاعدہ کی کلاس کا منظر',
    titleEn: 'Nazra and Noorani Qaida Class Session',
    category: 'classes',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1200',
    date: '2026-03-05'
  },
  {
    id: 'gal-4',
    titleUr: 'سالانہ تقسیمِ انعامات و دستار بندی تقریب',
    titleEn: 'Annual Prize Distribution & Graduation Ceremony',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200',
    date: '2026-04-20'
  },
  {
    id: 'gal-5',
    titleUr: 'فریال مسجد کا خوبصورت بیرونی منظر اور مینار',
    titleEn: 'Beautiful Exterior View and Minaret — Faryal Masjid',
    category: 'mosque',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
    date: '2026-05-12'
  },
  {
    id: 'gal-6',
    titleUr: 'لائبریری اور تعلیمی سہولیات',
    titleEn: 'Library and Educational Facilities',
    category: 'facilities',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200',
    date: '2026-06-01'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't-1',
    nameUr: 'قاری محمد احمد صاحب',
    nameEn: 'Qari Muhammad Ahmed',
    roleUr: 'مہتمم و شیخ القراء',
    roleEn: 'Principal & Head Qari',
    qualificationUr: 'درسِ نظامی و قراءتِ سبعہ (جامعۃ العلوم الإسلامیہ)',
    qualificationEn: 'Dars-e-Nizami & Qiraat-e-Sab‘ah Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 't-2',
    nameUr: 'مولانا عبداللہ فاروقی',
    nameEn: 'Maulana Abdullah Farooqi',
    roleUr: 'ناظمِ تعلیمات و استادِ شعبہ حفظ',
    roleEn: 'Director of Studies & Hifz Teacher',
    qualificationUr: 'حافظِ قرآن و عالمِ دین',
    qualificationEn: 'Hafiz of Quran & Islamic Scholar',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 't-3',
    nameUr: 'قاری زبیر احمد نقشبندی',
    nameEn: 'Qari Zubair Ahmed Naqshbandi',
    roleUr: 'استادِ ناظرہ و تجوید',
    roleEn: 'Nazra & Tajweed Instructor',
    qualificationUr: 'تخصص في التجويد والقراءات',
    qualificationEn: 'Specialization in Tajweed & Recitation',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600'
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
    address: 'گلی نمبر 3، بلاک B، فریال ٹاؤن',
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
    currentLevelUr: 'نورانی قاعدہ آخری پارے میں',
    guardianPhone: '0321-9876543',
    address: 'مکان 45، نزد فریال مسجد',
    notes: 'عصر کے بعد والی شفٹ میں داخلہ مطلوب ہے۔',
    status: 'pending',
    createdAt: '2026-10-12'
  }
];
