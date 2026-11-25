import { Project, PersonaInfo, PricingPlan, TokenPackage, VoteItem } from '../types';

export const PERSONAS: PersonaInfo[] = [
  {
    id: 'sara',
    name: 'سارا احمدی',
    title: 'خانواده در حال بازسازی',
    goal: 'تطابق بودجه ۳۰۰ میلیونی و رفع اختلاف سلیقه با همسر برای پذیرایی',
    challenge: 'همسرش سبک مینیمال می‌پسندد اما خودش عاشق سبک کلاسیک ایرانی است.',
    avatar: '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg',
    defaultProject: 'بازسازی آپارتمان سعادت‌آباد'
  },
  {
    id: 'arman',
    name: 'آرمان مهندس',
    title: 'معمار داخلی ارشد',
    goal: 'دریافت سریع بریف دقیق و سلایق کارفرما بدون جلسات طولانی',
    challenge: 'زمان زیاد برای کشف سلیقه واقعی کارفرما و تغییرات مکرر رندرها.',
    avatar: '/__l5e/assets-v1/73aaeffc-03f6-4dd8-b652-a097efe0b551/prototype-healthcare.jpg',
    defaultProject: 'واحد اداری الوند'
  },
  {
    id: 'reza',
    name: 'رضا کریمی',
    title: 'خریدار مسکن',
    goal: 'تصویرسازی فضای خالی آپارتمان نوساز قبل از خرید اسباب و اثاثیه',
    challenge: 'عدم توانایی در تصور ابعاد واقعی و چیدمان مبلمان در فضای خام.',
    avatar: '/__l5e/assets-v1/223c68d9-64db-4c3c-a572-34b853d2ec54/prototype-commerce.jpg',
    defaultProject: 'ویلای لواسان'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'بازسازی آپارتمان سعادت‌آباد',
    persona: 'سارا احمدی',
    budget: 350000000,
    style: 'مدرن ایرانی با رگه‌های گرم',
    materials: ['چوب راش طبیعی', 'سنگ مرمر سفید', 'پارکت بلوط'],
    status: 'pending_approval',
    renderCount: 8,
    area: 145,
    createdAt: '۱۴۰۳/۰۸/۱۲',
    image: '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg',
    description: 'بازسازی کامل سالن پذیرایی، آشپزخانه اپن و اتاق نشیمن با سیستم حل تعارض سلیقه زوجین.'
  },
  {
    id: 'proj-2',
    name: 'واحد اداری الوند',
    persona: 'آرمان مهندس',
    budget: 650000000,
    style: 'مینیمال شرکتی و نورپردازی خطی',
    materials: ['بتن اکسپوز', 'شیشه سکوریت مات', 'فلز مشکی مات'],
    status: 'approved',
    renderCount: 14,
    area: 210,
    createdAt: '۱۴۰۳/۰۸/15',
    image: '/__l5e/assets-v1/73aaeffc-03f6-4dd8-b652-a097efe0b551/prototype-healthcare.jpg',
    description: 'طراحی فضای کار اشتراکی و اتاق جلسات اجرایی با هوش مصنوعی و بهینه‌سازی آکوستیک.'
  },
  {
    id: 'proj-3',
    name: 'ویلای لواسان',
    persona: 'رضا کریمی',
    budget: 1200000000,
    style: 'اسکاندیناوی طبیعی',
    materials: ['سنگ تراورتن', 'چوب ترمووود', 'شیشه‌های قدی'],
    status: 'rendering',
    renderCount: 5,
    area: 320,
    createdAt: '۱۴۰۳/۰۸/۱۸',
    image: '/__l5e/assets-v1/68ceadfc-b580-4f18-8679-0088dddd218c/prototype-travel.jpg',
    description: 'ویلا دوبلکس با چشم‌انداز کوهستان، طراحی تراس سبز و چیدمان مبلمان تخصصی.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'طراح خانگی',
    price: '۲۹۰,۰۰۰',
    period: 'ماهانه',
    description: 'مناسب برای بازسازی‌های شخصی و پروژه‌های تک اتاقه',
    features: [
      '۱۰ رندر هوش مصنوعی در ماه',
      'دسترسی به حل‌کننده تعارض سلیقه',
      'تحلیل بودجه و متریال پایه',
      'پشتیبانی ایمیلی'
    ]
  },
  {
    id: 'pro',
    name: 'معمار حرفه‌ای',
    price: '۶۹۰,۰۰۰',
    period: 'ماهانه',
    description: 'مناسب طراحان داخلی، استودیوها و پروژه‌های چندبخشی',
    popular: true,
    features: [
      '۵۰ رندر هوش مصنوعی در ماه',
      'حل‌کننده پیشرفته تعارض سلیقه زوجین',
      'گزارش دقیق متره و برآورد قیمت بازار ایران',
      'خروجی کیفیت 4K و نقشه‌های فاز ۲',
      'پشتیبانی اختصاصی'
    ]
  },
  {
    id: 'enterprise',
    name: 'سازمانی / انبوه‌ساز',
    price: '۱,۸۹۰,۰۰۰',
    period: 'ماهانه',
    description: 'برای دفاتر معماری بزرگ و شرکت‌های ساختمانی',
    features: [
      'رندر نامحدود هوش مصنوعی',
      'دستیار اختصاصی برند و متریال‌خانه',
      'API اختصاصی و همگام‌سازی تیمی',
      'آموزش حضوری و تنظیمات سفارشی',
      'مدیر حساب اختصاصی ۲۴/۷'
    ]
  }
];

export const TOKEN_PACKAGES: TokenPackage[] = [
  { id: 'tok-1', name: 'بسته اقتصادی', tokens: 15, price: '۹۹,۰۰۰ تومان' },
  { id: 'tok-2', name: 'بسته پیشنهادی', tokens: 40, price: '۲۴۹,۰۰۰ تومان' },
  { id: 'tok-3', name: 'بسته حرفه‌ای', tokens: 100, price: '۵۴۹,۰۰۰ تومان' }
];

export const INITIAL_VOTE_ITEMS: VoteItem[] = [
  {
    id: 'vote-1',
    topic: 'انتخاب جنس و رنگ کفپوش پذیرایی سعادت‌آباد',
    status: 'conflict',
    options: [
      { id: 'opt-1', label: 'پارکت چوب بلوط روشن (پیشنهاد سارا)', votes: 1, image: '/__l5e/assets-v1/37676bb5-fabf-42e6-97a0-a98cdbd1de16/prototype-workplace.jpg' },
      { id: 'opt-2', label: 'بتن اکسپوز خاکستری مات (پیشنهاد همسر)', votes: 1, image: '/__l5e/assets-v1/73aaeffc-03f6-4dd8-b652-a097efe0b551/prototype-healthcare.jpg' }
    ]
  },
  {
    id: 'vote-2',
    topic: 'سبک نورپردازی سقف کاذب نشیمن',
    status: 'consensus',
    options: [
      { id: 'opt-3', label: 'نور مخفی خطی توکار (تایید شده)', votes: 4, image: '/__l5e/assets-v1/68ceadfc-b580-4f18-8679-0088dddd218c/prototype-travel.jpg' },
      { id: 'opt-4', label: 'لوستر مدرن برنزی', votes: 1 }
    ]
  }
];
