'use client';

// PRODUCT — Figma 11/03 '신한네트웍스 PRODUCT'
import Link from 'next/link';
import { ArrowUpRight, Cpu, ClipboardList, Stethoscope } from 'lucide-react';
import { SubPage, SubHero, SectionHead } from './SubPage';
import { ProductSlider } from './DesignA';
import { useContent, useHref, useLang } from './i18n';

const features = [
  { cat: 'CORE TECHNOLOGY', title: 'Technology', Icon: Cpu },
  { cat: 'SPECIFICATION', title: 'Product Details', Icon: ClipboardList },
  { cat: 'APPLICATION', title: 'Application', Icon: Stethoscope },
];

const T = {
  ko: {
    hero: { title: '제품 소개', desc: '의료기기 분야의 전문성을 바탕으로\n제품과 고객을 연결합니다.' },
    features: {
      title: 'INMODE의 주요 정보를\n한눈에 확인하세요.',
      desc: '확인 가능한 공식 제품 자료를 중심으로\n기술, 사양, 사용 분야를 안내합니다.',
      items: [
        '제품 기술과 주요 기능은 제조사가 제공하는 공식 자료를 기준으로 안내합니다.',
        '제품 구성과 주요 사양을 정확하게 확인할 수 있도록 관련 자료를 제공합니다.',
        '확인 가능한 공식 정보에 근거해 제품의 사용 분야와 적용 정보를 안내합니다.',
      ],
    },
    res: {
      title: '제품을 더 자세히\n알아보세요.',
      desc: '공식 브랜드 콘텐츠와 제품 관련 자료를 통해\n필요한 정보를 확인할 수 있습니다.',
      official: { desc: '제품의 상세 정보와 공식 브랜드 콘텐츠를 확인할 수 있는 인모드 대표 사이트로 연결됩니다.', link: '공식 사이트' },
      contact: { desc: '프로젝트 및 서비스 관련 문의를 남겨주시면 전문적인 상담과 맞춤형 솔루션을 통해 최적의 방향을 제안해 드립니다.', link: '제품 문의하기' },
    },
  },
  en: {
    hero: { title: 'Product', desc: 'Leveraging our medical device expertise,\nwe connect innovative products with the customers who need them.' },
    features: {
      title: 'Explore Key INMODE\nProduct Information.',
      desc: 'Explore the product’s technology, specifications, and applications based on verified official resources.',
      items: [
        'Product technology and key features are presented based on official information provided by the manufacturer.',
        'We provide detailed resources to help you accurately review the product configuration and key specifications.',
        'We provide information about the product’s intended uses and applications based on verified official sources.',
      ],
    },
    res: {
      title: 'Learn More\nAbout the Product.',
      desc: 'Find the information you need through official brand content and product resources.',
      official: { desc: 'Visit INMODE’s official website for detailed product information and official brand content.', link: 'Official Website' },
      contact: { desc: 'Contact us with your project or service inquiry, and our specialists will recommend the best approach through expert consultation and tailored solutions.', link: 'Product Inquiry' },
    },
  },
};

export default function ProductPage() {
  const t = T[useLang()];
  const C = useContent();
  const href = useHref();
  return (
    <SubPage active="PRODUCT">
      <SubHero eyebrow="ABOUT PRODUCT" title={t.hero.title} desc={t.hero.desc} />

      {/* 제품 슬라이더 */}
      <section className="bg-white px-6 py-[72px] md:py-[120px]">
        <div className="mx-auto max-w-[1180px]">
          <ProductSlider cta={{ label: C.product.inquire, href: '/contact#form' }} />
        </div>
      </section>

      {/* PRODUCT FEATURES */}
      <section className="bg-[#F8FBFF] px-6 py-[72px] md:py-[128px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            eyebrow="PRODUCT FEATURES"
            title={t.features.title}
            desc={t.features.desc}
          />
          <div className="mt-16 grid border-t border-[#1F7AE0]/60 md:grid-cols-3">
            {features.map((f, i) => (
              <article key={f.title} data-reveal={i * 0.1} className="group relative border-b border-[#E3E9F0] bg-white p-8 pb-12 md:border-b-0 md:border-r md:last:border-r-0">
                <span className="absolute -top-[3px] left-8 h-[5px] w-[5px] rounded-full bg-[#1F7AE0]" />
                <div className="t-body-sm flex justify-between text-[#999]">
                  <span>0{i + 1}</span>
                  <span className="text-[10px] font-bold tracking-[0.12em]">{f.cat}</span>
                </div>
                <span className="mt-10 grid h-14 w-14 place-items-center rounded-full border border-[#E3E9F0] text-[#1F7AE0] transition-colors duration-300 group-hover:border-[#1F7AE0] group-hover:bg-[#1F7AE0] group-hover:text-white">
                  <f.Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="t-heading-lg mt-8">{f.title}</h3>
                <p className="t-body-md mt-4 text-[#666]">{t.features.items[i]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICIAL RESOURCES */}
      <section className="bg-white px-6 py-[72px] md:py-[128px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead eyebrow="OFFICIAL RESOURCES" title={t.res.title} desc={t.res.desc} />
          <div className="mt-16 grid md:grid-cols-2">
            <a
              href="https://inmode.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="group flex flex-col bg-[#0C2A33] p-10 text-white transition-colors duration-300 hover:bg-[#123744] md:p-12"
            >
              <div className="flex justify-between">
                <span className="t-tag text-[#71B4FE]">OFFICIAL CHANNEL</span>
                <span className="t-body-sm text-white/40">01</span>
              </div>
              <h3 className="t-heading-lg mt-5">INMODE Official Website</h3>
              <p className="t-body-md mt-5 max-w-[420px] text-white/70">{t.res.official.desc}</p>
              <span className="t-nav mt-8 inline-flex w-fit items-center gap-4 border-b border-white/40 pb-2 !font-bold">
                {t.res.official.link} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
            <Link
              href={href('/contact#form')}
              data-reveal="0.1"
              className="group flex flex-col border border-[#E3E9F0] bg-white p-10 transition-colors duration-300 hover:border-[#1F7AE0] md:p-12"
            >
              <div className="flex justify-between">
                <span className="t-tag text-[#1F7AE0]">CONTACT US</span>
                <span className="t-body-sm text-[#999]">02</span>
              </div>
              <h3 className="t-heading-lg mt-5">Business Contact</h3>
              <p className="t-body-md mt-5 max-w-[420px] text-[#666]">{t.res.contact.desc}</p>
              <span className="t-nav mt-8 inline-flex w-fit items-center gap-4 border-b border-black/30 pb-2 !font-bold">
                {t.res.contact.link} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </SubPage>
  );
}
