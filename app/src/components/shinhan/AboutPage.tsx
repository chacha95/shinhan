'use client';

// ABOUT — Figma 11/03 '신한네트웍스 ABOUT'
import { SubPage, SubHero, SectionHead } from './SubPage';
import { Symbol } from './Symbol';
import * as C from './content';

const strengths = [
  { en: 'Expertise', desc: '전문성과 경험을 바탕으로 제품의 가치를 정확하게 전달합니다.' },
  { en: 'Network', desc: '글로벌 브랜드와 국내 의료 현장을 연결해 새로운 기회를 만듭니다.' },
  { en: 'Service', desc: '제품 공급부터 문의 대응, 자료 제공까지 고객 중심의 서비스를 지향합니다.' },
  { en: 'Future-oriented', desc: '트렌드와 시장 변화에 유연하게 대응하는 미래지향적인 기업을 지향합니다.' },
];

const visit = [
  { k: 'ADDRESS', v: C.company.addr },
  { k: 'BUS', v: '버스로 오는 방법' },
  { k: 'SUBWAY', v: '지하철로 오는 방법' },
  { k: 'CAR', v: '자가용으로 오는 방법' },
];

function VisionCard({ label, name, tags, desc, active }: { label: string; name: string; tags: string; desc: string; active?: boolean }) {
  return (
    <div
      className={`relative flex-1 border bg-white p-10 transition-shadow duration-500 ${active ? 'border-[#71B4FE] shadow-[0_20px_60px_-24px_rgba(31,122,224,.45)]' : 'border-[#E3E9F0] shadow-[0_20px_50px_-30px_rgba(13,27,42,.25)]'}`}
    >
      <p className="t-tag text-[#1F7AE0]">{label}</p>
      <h3 className="mt-5 whitespace-pre-line text-[28px] font-bold leading-[1.2] tracking-[-0.02em]">{name}</h3>
      <p className="t-body-sm mt-4 font-bold text-[#1F7AE0]">{tags}</p>
      <p className="t-body-md mt-5 text-[#666]">{desc}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <SubPage active="ABOUT">
      <SubHero
        eyebrow="ABOUT SINHAN NETWORKS"
        title="회사 소개"
        desc={'신한네트웍스는 의료기기 분야의 전문성과 경험을 바탕으로 글로벌 브랜드와 의료 현장을 연결합니다.\n제품과 고객을 잇는 체계적인 서비스를 통해 새로운 가치를 만들어갑니다.'}
      />

      {/* OUR COMPANY */}
      <section className="bg-[#F8FBFF] px-6 py-[128px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            eyebrow="OUR COMPANY"
            title={'의료 기술을 연결하여,\n새로운 가치를 창조합니다.'}
            desc={'신한네트웍스는 의료기기 분야의 전문성과 경험을 바탕으로\n글로벌 브랜드와 의료 현장을 연결합니다.\n제품과 고객을 잇는 체계적인 서비스를 통해 새로운 가치를 만들어갑니다.'}
          />
          <div className="mt-16 grid border-t border-[#1F7AE0]/60 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => (
              <article key={s.en} data-reveal={i * 0.08} className="group relative border-b border-[#E3E9F0] bg-white p-8 pb-12 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <span className="absolute -top-[3px] left-8 h-[5px] w-[5px] rounded-full bg-[#1F7AE0]" />
                <span className="t-body-sm text-[#999]">0{i + 1}</span>
                <h3 className="t-heading-lg mt-12 transition-colors duration-300 group-hover:text-[#1F7AE0]">{s.en}</h3>
                <p className="t-body-md mt-5 text-[#666]">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="bg-white px-6 py-[128px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHead
            eyebrow="OUR VISION"
            title={'신뢰를 기반으로,\n더 넓은 가치를 연결합니다.'}
            desc={'신한씨스텍의 전문성과 신뢰를 바탕으로,\n신한네트웍스만의 브랜드 정체성과 고객 접점을 확장해 나갑니다.'}
          />
          <div className="relative mt-16 flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-0">
            <div data-reveal className="flex-1">
              <VisionCard label="TRUSTED FOUNDATION" name={'SHINHAN\nSYSTEK'} tags="기술 · 수입 · 유통" desc="기술 전문성과 시장 신뢰의 기반" />
            </div>
            {/* CONNECT — 두 회사를 잇는 선과 맥동하는 원 */}
            <div className="relative mx-auto flex h-24 w-24 shrink-0 items-center justify-center md:mx-0 md:w-36" data-reveal="0.15">
              <span className="absolute inset-x-0 top-1/2 hidden h-px bg-[#71B4FE]/60 md:block" />
              {[0, 1.2].map((d) => (
                <span key={d} className="absolute h-20 w-20 rounded-full border border-[#71B4FE]/50" style={{ animation: `ripple-out 2.4s ease-out ${d}s infinite` }} />
              ))}
              <span className="relative grid h-16 w-16 place-items-center rounded-full border border-[#71B4FE] bg-white text-[9px] font-bold tracking-[0.15em] text-[#1F7AE0] shadow-[0_0_30px_rgba(113,180,254,.55)]">
                CONNECT
              </span>
            </div>
            <div data-reveal="0.3" className="flex-1">
              <VisionCard label="CUSTOMER CONNECTION" name={'SHINHAN\nNETWORKS'} tags="제품 · 고객 · 서비스" desc="제품과 고객을 연결하는 네트워크" active />
            </div>
          </div>
        </div>
      </section>

      {/* FIND US */}
      <section className="bg-[#F8FBFF] px-6 py-[128px]">
        <div className="mx-auto grid max-w-[1200px] overflow-hidden border border-[#E3E9F0] bg-white md:grid-cols-[1.1fr_1fr]" data-reveal>
          <div className="relative min-h-[360px]">
            <iframe
              title="신한네트웍스 위치"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(C.company.addr.split(' (')[0])}&z=16&output=embed`}
              className="absolute inset-0 h-full w-full grayscale-[0.2]"
              loading="lazy"
            />
            <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-full place-items-center rounded-full rounded-bl-none border-2 border-[#71B4FE] bg-white shadow-lg" style={{ rotate: '-45deg' }}>
              <Symbol className="h-7 w-7" style={{ rotate: '45deg' }} />
            </span>
          </div>
          <div className="bg-[#F6F8FB] p-10 md:p-14">
            <p className="t-eyebrow text-[#1F7AE0]">FIND US</p>
            <h2 className="t-display-md mt-3">
              신한네트웍스를
              <br />
              만나보세요.
            </h2>
            <p className="t-body-md mt-4 text-[#666]">방문하거나 문의하는 데 필요한 정보는 기업 정보 확인 후 업데이트될 예정입니다.</p>
            <dl className="mt-8 border-t-2 border-[#71B4FE]/40">
              {visit.map((r) => (
                <div key={r.k} className="grid grid-cols-[96px_1fr] border-b border-[#E3E9F0] bg-white px-5 py-4">
                  <dt className="t-tag !tracking-normal text-[#1F7AE0]">{r.k}</dt>
                  <dd className="t-body-sm text-[#333]">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </SubPage>
  );
}
