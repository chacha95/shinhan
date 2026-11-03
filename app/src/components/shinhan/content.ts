// 시안 공통 콘텐츠 — Figma(신한네트웍스 Main) + 기존 사이트(shsystek.co.kr) 기준

export const nav = ['ABOUT', 'PRODUCT', 'CONTACT'] as const;
export const routes: Record<(typeof nav)[number], string> = { ABOUT: '/about', PRODUCT: '/product', CONTACT: '/contact' };
export const footerNav = [
  { label: '회사소개', href: '/about' },
  { label: '제품소개', href: '/product' },
  { label: '비즈니스 문의', href: '/contact#form' },
];

export const hero = {
  eyebrow: 'MEDICAL EXPERTISE, CONNECTED',
  title: ['전문성을 이어,', '새로운 가치를 연결합니다.'],
  desc: '의료기기 전문성과 글로벌 브랜드를 연결하는 신한네트웍스',
  cta: '비즈니스 문의',
};

export const philosophy = {
  eyebrow: 'CONNECTING VALUE · CREATING TOMORROW',
  title: ['의료기기의 가치를 잇고,', '더 나은 내일을 연결하다.'],
  desc: '신한네트웍스는 의료기기 분야의 전문성과 경험을 바탕으로 글로벌 브랜드와 의료 현장을 연결합니다.\n신뢰할 수 있는 제품과 체계적인 서비스를 통해 고객에게 새로운 가치를 제공합니다.',
};

export const stats = [
  { value: 30, suffix: '+', label: '업력 (년)' },
  { value: 24, suffix: '/7', label: 'Global Network' },
  { value: 120, suffix: '+', label: '공급 장비' },
  { value: 1500, suffix: '+', label: '파트너 병원' },
];

const inmodeDesc = 'INMODE는 의료진과 환자의 더 나은 경험을 위해 혁신적인 에너지 기반 기술과 정교한 솔루션을 제공하는 글로벌 의료기기 브랜드입니다.';

// Featured Product — Figma 기준 2개 모델
export const products: { name: string; tag: string; copy: string; image?: string; desc?: string }[] = [
  { name: 'INMODE RF', image: '/products/inmode-rf.webp', tag: 'INMODE', copy: '혁신적인 기술로\n의료의 새로운 기준을 제시합니다.', desc: inmodeDesc },
  { name: '뉴 인모드 핸즈프리', image: '/products/evoke.webp', tag: 'NEW INMODE HANDS FREE / INMODE EVOKE', copy: '혁신적인 기술로\n의료의 새로운 기준을 제시합니다.', desc: inmodeDesc },
];

export const partnership = {
  eyebrow: 'PARTNERSHIP',
  title: ['함께 새로운 기회를', '만들어갑니다.'],
  desc: '글로벌 브랜드 파트너십부터 해외 비즈니스, 제품 자료 요청까지.\n신한네트웍스의 전문 담당자가 정확하고 신속하게 안내해 드립니다.',
  cards: [
    { label: 'BUSINESS', title: '파트너십 문의' },
  ],
};

export const values = {
  eyebrow: 'BRAND IDENTITY',
  title: '연결의 힘으로 만드는 가치',
  desc: '전문성과 네트워크, 책임 있는 서비스. 신한네트웍스가 지켜가는 핵심 가치입니다.',
  items: [
    { en: 'Expertise', ko: '전문성과 경험', desc: '의료기기 산업에 대한 깊은 이해와 축적된 경험으로 제품의 가치를 정확히 전달합니다.' },
    { en: 'Network', ko: '글로벌 브랜드와 현장의 연결', desc: '세계적인 의료 브랜드와 국내 의료 현장을 유기적으로 연결해 새로운 가능성을 만듭니다.' },
    { en: 'Service', ko: '신속하고 정확한 서비스', desc: '안정적인 제품 공급부터 문의 대응, 전문 자료 제공까지 비즈니스 전 과정을 지원합니다.' },
  ],
};

export const news = [
  { cat: 'NOTICE', date: '2026.10.14', title: '신한네트웍스 New CI 및 홈페이지 리뉴얼 안내' },
  { cat: 'PRODUCT', date: '2026.09.02', title: '인모드 Morpheus8 신규 핸드피스 출시 안내' },
  { cat: 'EVENT', date: '2026.07.21', title: '2026 소프웨이브 뷰티클래스 개최' },
];

export const company = {
  name: '(주)신한네트웍스',
  ceo: '이경국',
  biz: '120-81-41925',
  tel: '02) 556-4031',
  fax: '02) 543-5214',
  addr: '서울특별시 서초구 양재천로19길 10 (양재동, KK빌딩)',
};

// ── 국문/영문 공통 콘텐츠 (메인·헤더·푸터) — 영문은 Figma 'PC 영문'/'모바일 영문' 기준
type Line = { t: string; hl?: boolean }[];
type Lang = {
  nav: typeof nav;
  routes: typeof routes;
  navSub: Record<(typeof nav)[number], string>;
  footerNav: typeof footerNav;
  hero: typeof hero & { lines: Line[] };
  philosophy: typeof philosophy & { lines: Line[] };
  product: { title: string; desc: string; more: string; inquire: string };
  products: typeof products;
  partnership: typeof partnership;
  values: typeof values & { eyebrowMobile: string; about: string };
  ui: { home: string; menuOpen: string; menuClose: string; prev: string; next: string; soundOn: string; soundOff: string };
};

export const ko: Lang = {
  nav,
  routes,
  navSub: { ABOUT: '신한네트웍스 소개', PRODUCT: '제품 및 솔루션', CONTACT: '비즈니스 문의' },
  footerNav,
  hero: {
    ...hero,
    lines: [
      [{ t: '전문성', hl: true }, { t: '을 이어,' }],
      [{ t: '새로운 가치', hl: true }, { t: '를 ' }, { t: '연결', hl: true }, { t: '합니다.' }],
    ],
  },
  philosophy: { ...philosophy, lines: [[{ t: philosophy.title[0] }], [{ t: philosophy.title[1], hl: true }]] },
  product: { title: 'Featured Product', desc: '검증된 글로벌 의료기기 브랜드와 함께 더 나은 의료 경험을 만들어갑니다.', more: '제품 자세히 보기', inquire: '제품 문의하기' },
  products,
  partnership,
  values: { ...values, eyebrowMobile: 'WHY SHINHAN', about: '회사 소개' },
  ui: { home: '신한네트웍스 홈', menuOpen: '메뉴 열기', menuClose: '메뉴 닫기', prev: '이전', next: '다음', soundOn: '소리 켜기', soundOff: '소리 끄기' },
};

const enProductCopy = 'Setting a New Standard in Healthcare Through Innovative Technology.';
const enProductDesc =
  'INMODE is a global medical device brand that delivers innovative energy-based technologies and refined solutions for a better experience for both practitioners and patients.';

export const en: Lang = {
  nav,
  routes,
  navSub: { ABOUT: 'About Shinhan Networks', PRODUCT: 'Products & Solutions', CONTACT: 'Business Inquiry' },
  footerNav: [
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/product' },
    { label: 'Contact', href: '/contact#form' },
  ],
  hero: {
    eyebrow: 'MEDICAL EXPERTISE, CONNECTED',
    title: ['Connecting Expertise,', 'Creating New Value.'],
    desc: 'Shinhan Networks connects medical device expertise with global brands.',
    cta: 'Business Inquiry',
    lines: [
      [{ t: 'Connecting', hl: true }, { t: ' Expertise,' }],
      [{ t: 'Creating ' }, { t: 'New Value', hl: true }, { t: '.' }],
    ],
  },
  philosophy: {
    eyebrow: 'CONNECTING VALUE · CREATING TOMORROW',
    title: ['Connecting the Value of Medical Devices', 'to a Better Tomorrow.'],
    desc: 'Drawing on our expertise and experience in the medical device industry, Shinhan Networks connects global brands with healthcare professionals. We deliver new value to our customers through reliable products and comprehensive services.',
    lines: [
      [{ t: 'Connecting the ' }, { t: 'Value of Medical Devices', hl: true }],
      [{ t: 'to a ' }, { t: 'Better Tomorrow', hl: true }, { t: '.' }],
    ],
  },
  product: {
    title: 'Featured Product',
    desc: 'We create better healthcare experiences in partnership with trusted global medical device brands.',
    more: 'MORE',
    inquire: 'Inquire About This Product',
  },
  products: [
    { name: 'INMODE RF', image: '/products/inmode-rf.webp', tag: 'INMODE', copy: enProductCopy, desc: enProductDesc },
    { name: 'NEW INMODE HANDSFREE', image: '/products/evoke.webp', tag: 'INMODE EVOKE', copy: enProductCopy, desc: enProductDesc },
  ],
  partnership: {
    eyebrow: 'PARTNERSHIP',
    title: ['Creating New Opportunities', 'Together.'],
    desc: 'From global brand partnerships and overseas business to product resource requests,\nour specialists provide accurate and prompt guidance.',
    cards: [{ label: 'BUSINESS', title: 'Partnership Inquiry' }],
  },
  values: {
    eyebrow: 'BRAND IDENTITY',
    eyebrowMobile: 'WHY SHINHAN',
    title: 'Creating Value Through the Power of Connection.',
    desc: 'Expertise, a strong network, and responsible service — these are the core values upheld by Shinhan Networks.',
    about: 'About Us',
    items: [
      { en: 'Expertise', ko: 'Expertise and Experience', desc: 'With deep industry knowledge and extensive experience, we communicate the true value of every product.' },
      { en: 'Network', ko: 'Connecting Global Brands with Local Healthcare', desc: 'We seamlessly connect world-class medical brands with Korea’s healthcare market to create new possibilities.' },
      { en: 'Service', ko: 'Prompt and Reliable Service', desc: 'We support every stage of your business, from reliable product supply and responsive assistance to the provision of professional resources.' },
    ],
  },
  ui: { home: 'Shinhan Networks home', menuOpen: 'Open menu', menuClose: 'Close menu', prev: 'Previous', next: 'Next', soundOn: 'Unmute', soundOff: 'Mute' },
};
