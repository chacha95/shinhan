// 시안 공통 콘텐츠 — Figma(신한네트웍스 Main) + 기존 사이트(shsystek.co.kr) 기준

export const nav = ['ABOUT', 'PRODUCT', 'CONTACT'] as const;
export const routes: Record<(typeof nav)[number], string> = { ABOUT: '/about', PRODUCT: '/product', CONTACT: '/contact' };
export const footerNav = [
  { label: '회사소개', href: '/about' },
  { label: '제품소개', href: '/product' },
  { label: '비즈니스 문의', href: '/contact' },
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
  { name: 'Evoke Naked', image: '/products/evoke.webp', tag: 'INMODE', copy: '혁신적인 기술로\n의료의 새로운 기준을 제시합니다.', desc: inmodeDesc },
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
