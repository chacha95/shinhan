// 시안 공통 콘텐츠 — Figma(신한네트웍스 Main) + 기존 사이트(shsystek.co.kr) 기준

export const nav = ['ABOUT', 'PRODUCT', 'CONTACT', 'NEWS'] as const;

export const hero = {
  eyebrow: 'MEDICAL EXPERTISE, CONNECTED',
  title: ['전문성을 이어,', '새로운 가치를 연결합니다.'],
  desc: '의료기기 전문성과 글로벌 브랜드를 연결하는 신한네트웍스',
  cta: '비즈니스 문의',
};

export const philosophy = {
  eyebrow: 'CONNECTING VALUE · CREATING TOMORROW',
  title: ['의료기기의 가치를 잇고,', '더 나은 내일을 연결하다.'],
  desc: '국내 최초 Laser, Robot 수술기와 Target Biopsy를 보급한 이래, 신한네트웍스는 끊임없는 기술 개발과 서비스 재투자로 의료기기 시장을 선도해 왔습니다.',
};

export const stats = [
  { value: 30, suffix: '+', label: '업력 (년)' },
  { value: 24, suffix: '/7', label: 'Global Network' },
  { value: 120, suffix: '+', label: '공급 장비' },
  { value: 1500, suffix: '+', label: '파트너 병원' },
];

export const products: { name: string; tag: string; copy: string; image?: string }[] = [
  { name: 'INMODE', image: '/products/inmode.png', tag: 'RF Platform', copy: '혁신적인 기술로\n의료의 새로운 기준을 제시합니다.' },
  { name: 'SofWave', tag: 'Ultrasound Lifting', copy: '당신의 시간이\n느리게 흐를 수 있도록.' },
  { name: 'StarWalker QX', tag: 'Hybrid Laser', copy: '나노와 피코,\n그 이상의 가치 하이브리드.' },
  { name: 'J CATH', tag: 'EP Catheter', copy: '세계 최초\nMulti Bi-Directional Duodeca.' },
  { name: 'ComboLab', tag: 'Hemodynamic · EP', copy: 'Hemodynamic과 EP 시술을\n단 하나의 장비로.' },
  { name: 'Type 2300', tag: 'Ultrasound', copy: 'Ultrasound\nfor your speciality.' },
];

export const partnership = {
  eyebrow: 'PARTNERSHIP',
  title: ['함께 새로운 기회를', '만들어갑니다.'],
  desc: '글로벌 제조사와 국내 의료기관을 잇는 파트너로서, 제품 도입부터 교육·사후관리까지 함께합니다.',
  cards: [
    { label: 'Partnership', title: '제휴 및 공급 문의' },
    { label: 'Product', title: '제품 상담 신청' },
  ],
};

export const values = {
  eyebrow: 'BRAND IDENTITY',
  title: '연결의 힘으로 만드는 가치',
  items: [
    { en: 'Expertise', ko: '검증된 전문성', desc: '30년 의료기기 유통·기술 노하우로 최적의 장비를 제안합니다.' },
    { en: 'Network', ko: '글로벌 네트워크', desc: '세계 유수 제조사와의 파트너십으로 최신 기술을 가장 먼저 연결합니다.' },
    { en: 'Service', ko: '고객 중심 서비스', desc: '설치·교육·A/S까지, 고객 신뢰를 최우선으로 생각합니다.' },
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
