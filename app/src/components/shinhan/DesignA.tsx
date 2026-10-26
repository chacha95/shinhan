'use client';

// 시안 A — PULSE : Figma 원안 충실형. 다크 네이비 + 동심원 파동 + 원근 물결선
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { gsap, useSmoothScroll, reveal, countUp } from './motion';
import { WaveField } from './WaveField';
import { LogoType, Symbol, Wordmark } from './Symbol';
import { ProductVisual } from './ProductVisual';
import { Odometer, rollOdometers } from './Odometer';
import * as C from './content';

const BG = '#08131f';

function HeroRings() {
  // 동심원 스테이지 — 단위는 vh (Figma 1048px 높이 기준)
  return (
    <div className="a-stage pointer-events-none absolute left-1/2 top-[52%] z-0 opacity-40 lg:left-[64%] lg:opacity-100">
      {/* 사선 */}
      <span className="absolute left-0 top-0 h-px w-[78vh] -rotate-[62deg] bg-white/15" style={{ translate: '-50% 0' }} />
      {/* 바깥 점선 원 + 궤도 점 */}
      <div className="a-ring absolute left-0 top-0 h-[56vh] w-[56vh] -translate-x-1/2 -translate-y-1/2">
        {/* 위치(translate)는 바깥, 회전은 안쪽 — GSAP transform과 CSS 회전 충돌 방지 */}
        <div className="absolute inset-0 rounded-full border border-dashed border-white/30" style={{ animation: 'pv-spin 60s linear infinite' }}>
          {[[-32, 0], [148, 0], [205, 0]].map(([deg], i) => (
            <span key={i} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${deg}deg) translateX(28vh)` }}>
              <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#5aa2ff]" />
            </span>
          ))}
        </div>
      </div>
      {/* 퍼지는 파동 */}
      {[0, 1.6].map((d) => (
        <span key={d} className="absolute left-0 top-0 h-[34vh] w-[34vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5aa2ff]/50" style={{ animation: `a-wave 3.2s ease-out ${d}s infinite` }} />
      ))}
      {/* 밝은 실선 원 */}
      <span className="a-ring absolute left-0 top-0 h-[34vh] w-[34vh] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#4f8fe6]">
        <span className="absolute left-1/2 top-1/2 h-0 w-0" style={{ animation: 'pv-spin 14s linear infinite' }}>
          <span className="absolute h-1.5 w-1.5 rounded-full bg-[#5aa2ff]" style={{ transform: 'translate(15.5vh, 4vh)' }} />
        </span>
      </span>
      <span className="a-ring absolute left-0 top-0 h-[27vh] w-[27vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
      <span className="a-ring absolute left-0 top-0 h-[19.5vh] w-[19.5vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4f8fe6]/40" />
      {/* 안쪽 채워진 원 + 심볼 */}
      <span className="a-ring absolute left-0 top-0 grid h-[16vh] w-[16vh] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#4f8fe6]/60 bg-[#1c3350]">
        <Symbol className="h-[7vh] w-[7vh]" />
      </span>
      {/* 위젯 */}
      <div className="a-widget absolute hidden border border-white/10 bg-[#1a2d40]/90 px-5 pb-4 pt-5 lg:block" style={{ left: '14.3vh', top: '-21.8vh', width: '18vh', minWidth: 170 }}>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#5aa2ff]">GLOBAL NETWORK</p>
        <p className="mt-2 text-2xl font-medium tabular-nums">
          <span data-count="24">0</span> / 7
        </p>
        <span className="mt-3 block h-[2px] bg-white/10">
          <span className="a-gauge block h-full w-[75%] bg-[#5aa2ff]" />
        </span>
      </div>
      <div className="a-widget absolute hidden border border-[#4f8fe6]/30 bg-[#173247]/90 px-5 py-4 lg:block" style={{ left: '-33.2vh', top: '12.4vh', minWidth: 190 }}>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#5aa2ff]">MEDICAL TECHNOLOGY</p>
        <div className="mt-3 flex h-8 items-end gap-1.5">
          {[30, 60, 40, 85, 95, 30, 70, 95].map((v, i) => (
            <span key={i} className={`a-bar w-4 ${i % 2 ? 'bg-[#5aa2ff]' : 'bg-[#3b78c4]'}`} style={{ height: `${v}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="a-header fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#22384c]/75 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-6 text-white">
        <Wordmark />
        <nav className="hidden gap-10 text-[14px] font-medium text-white/90 md:flex">
          {C.nav.map((n) => (
            <a key={n} href="#" className="transition hover:text-[#5aa2ff]">
              {n}
            </a>
          ))}
        </nav>
        <a href="#" className="inline-flex items-center gap-4 border border-white/40 px-5 py-3 text-[14px] font-semibold hover:bg-white hover:text-[#13243a]">
          {C.hero.cta} <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

export default function DesignA() {
  useSmoothScroll();
  const root = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 인트로
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
      intro
        .from('.a-canvas', { opacity: 0, scale: 1.15, duration: 2.4 })
        .from('.a-ring', { scale: 0.4, opacity: 0, duration: 1.8, stagger: 0.08 }, 0.2)
        .from('.a-gauge', { width: 0, duration: 1.6, ease: 'power3.out' }, 1.4)
        .from('.a-hero-line > span', { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.3)
        .from('.a-hero-fade', { y: 30, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.8)
        .from('.a-widget', { x: 40, opacity: 0, duration: 1.2, stagger: 0.15 }, 1)
        .from('.a-bar', { scaleY: 0, transformOrigin: 'bottom', duration: 1, stagger: 0.06 }, 1.3)
        .from('.a-header', { y: -80, duration: 1 }, 0.4);

      // 철학 섹션 — 배경 페이드인 → 글 순차 → 글만 페이드아웃
      const ph = gsap.timeline({
        scrollTrigger: { trigger: '.a-philo', start: 'top top', end: '+=180%', scrub: 1, pin: true },
      });
      ph.from('.a-philo-bg', { opacity: 0, scale: 0.6, duration: 1 })
        .from('.a-philo-txt > *', { y: 60, opacity: 0, stagger: 0.25, duration: 1 })
        .to({}, { duration: 0.6 })
        .to('.a-philo-txt > *', { y: -40, opacity: 0, stagger: 0.1, duration: 0.8 });

      // 심볼 섹션 — 1·2·3 순서로 색이 채워짐 → 로고 자리로 이동 + 워드마크 좌→우
      const sym = gsap.timeline({
        scrollTrigger: { trigger: '.a-sym', start: 'top top', end: '+=260%', scrub: 1, pin: true },
      });
      sym
        .fromTo('.a-sym-line', { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 }, { strokeDashoffset: 0, stagger: 0.12, duration: 0.8 })
        .to('.a-sym-line', { fillOpacity: 1, stagger: 0.12, duration: 0.6 }, '-=0.6')
        .from('.a-sym-step', { opacity: 0, y: 20, stagger: 0.4, duration: 0.4 }, 0)
        .to('.a-sym-ring', { scale: 1.6, opacity: 0, stagger: 0.1, duration: 1 }, '<0.5')
        .to('.a-sym-step', { opacity: 0, duration: 0.3 })
        .to('.a-sym-mark', { xPercent: -70, scale: 0.55, duration: 1, ease: 'power2.inOut' })
        .fromTo('.a-sym-word', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1 }, '<0.3');

      // 가치 — 겹친 세 원이 좌우로 펼쳐지며 텍스트 등장
      const vt = gsap.timeline({
        scrollTrigger: { trigger: '.a-values', start: 'top top', end: '+=160%', scrub: 1, pin: true },
      });
      vt.from('.a-venn-0', { xPercent: 100, duration: 1 })
        .from('.a-venn-2', { xPercent: -100, duration: 1 }, 0)
        .from('.a-venn-1', { scale: 0.7, duration: 1 }, 0)
        .from('.a-venn-txt', { opacity: 0, y: 30, stagger: 0.1, duration: 0.5 }, 0.6);

      reveal(root.current!);
      countUp(root.current!);
      rollOdometers(root.current!);

      // 파트너십 원 회전 스크럽
      gsap.to('.a-part-circle', {
        rotate: 90,
        scale: 1.15,
        scrollTrigger: { trigger: '.a-part', start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const p = C.products[slide];

  return (
    <div ref={root} className="text-white" style={{ background: BG }}>
      <Header />

      {/* HERO */}
      <section
        className="relative h-svh min-h-[680px] overflow-hidden"
        style={{ background: '#16293b' }}
      >
        <WaveField cx={0.64} cy={0.52} circle={false} interactive={false} className="a-canvas absolute inset-0 h-full w-full" />
        <HeroRings />
        <div className="relative z-10 mx-auto flex h-full max-w-[1240px] flex-col justify-center px-6 pt-10">
          <p className="a-hero-fade mb-7 flex items-center gap-3 text-[13px] font-bold tracking-[0.18em] text-[#5aa2ff]">
            <span className="h-px w-9 bg-[#5aa2ff]" />
            {C.hero.eyebrow}
          </p>
          <h1 className="text-[clamp(38px,3.5vw,68px)] font-bold leading-[1.28] tracking-[-0.02em]">
            <span className="a-hero-line block overflow-hidden">
              <span className="block">
                <em className="not-italic text-[#5aa2ff]">전문성</em>을 이어,
              </span>
            </span>
            <span className="a-hero-line block overflow-hidden">
              <span className="block">
                <em className="not-italic text-[#5aa2ff]">새로운 가치</em>를 <em className="not-italic text-[#5aa2ff]">연결</em>합니다.
              </span>
            </span>
          </h1>
          <p className="a-hero-fade mt-8 text-[clamp(15px,1vw,18px)] text-white/85">{C.hero.desc}</p>
          <a href="#" className="a-hero-fade mt-12 inline-flex w-fit items-center gap-6 border border-white/50 px-5 py-4 text-[16px] font-semibold hover:bg-white hover:text-[#13243a]">
            {C.hero.cta} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="a-hero-fade absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1240px] px-6">
          <div className="flex items-center justify-between border-t border-white/30 py-6 text-[13px] font-semibold tracking-[0.16em] text-white/75">
            <span>SHINHAN NETWORKS · MEDICAL DEVICE PARTNER</span>
            <span className="flex items-center gap-3">
              SCROLL
              <span className="relative block h-10 w-6 rounded-full border border-white/60">
                <span className="absolute left-1/2 top-2 h-1.5 w-px -translate-x-1/2 bg-white" style={{ animation: 'drip 1.6s ease-in-out infinite' }} />
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="a-philo relative grid h-svh place-items-center overflow-hidden">
        <div className="a-philo-bg absolute inset-0 grid place-items-center">
          {[560, 760, 980].map((s, i) => (
            <span
              key={s}
              className="absolute rounded-full border border-[#5aa2ff]/15"
              style={{ width: s, height: s, animation: `pv-spin ${40 + i * 10}s linear infinite` }}
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5aa2ff]" />
            </span>
          ))}
          <span className="absolute h-[1px] w-full bg-white/10" />
        </div>
        <div className="a-philo-txt relative z-10 max-w-2xl px-6 text-center">
          <p className="text-[11px] tracking-[0.28em] text-[#5aa2ff]">{C.philosophy.eyebrow}</p>
          <h2 className="mt-6 text-[clamp(30px,4vw,52px)] font-bold leading-[1.3] tracking-[-0.03em]">
            {C.philosophy.title[0]}
            <br />
            <span className="text-[#5aa2ff]">{C.philosophy.title[1]}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/60">{C.philosophy.desc}</p>
        </div>
      </section>

      {/* SYMBOL */}
      <section className="a-sym relative grid h-svh place-items-center overflow-hidden">
        <div className="relative flex items-center">
          {[1, 1.5, 2.1].map((s, i) => (
            <span
              key={i}
              className="a-sym-ring absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5aa2ff]/25"
              style={{ scale: s }}
            />
          ))}
          <div className="a-sym-mark relative">
            <Symbol className="h-56 w-56" outline lineClassName="a-sym-line" />
          </div>
          <div className="a-sym-word absolute left-1/2 ml-4 ">
            <LogoType className="h-[clamp(52px,6vw,88px)] w-auto" />
          </div>
        </div>
        <div className="absolute bottom-[14%] flex gap-10 text-[12px] tracking-[0.2em] text-white/70">
          {['EXPERTISE', 'NETWORK', 'SERVICE'].map((s, i) => (
            <span key={s} className="a-sym-step">
              0{i + 1} {s}
            </span>
          ))}
        </div>
      </section>

      {/* PRODUCT */}
      <section className="relative bg-white px-6 py-32 text-[#0d1b2a]">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="text-[12px] font-semibold tracking-[0.2em] text-[#2a5ea8]">OUR PRODUCT</p>
              <h2 className="mt-3 text-[clamp(30px,3.4vw,44px)] font-bold tracking-tight">Featured Product</h2>
            </div>
            <p className="max-w-xs text-sm text-slate-500">검증된 글로벌 의료기기 브랜드를 국내 의료 현장에 가장 빠르게 연결합니다.</p>
          </div>
          <div className="relative mt-14 grid overflow-hidden border border-slate-200 bg-white md:grid-cols-2" data-reveal="0.1">
            <ProductVisual key={p.name} name={p.name} image={p.image} className="aspect-[4/3] md:aspect-auto md:min-h-[440px]" />
            <div className="flex flex-col justify-center p-10 md:p-14">
              <p className="text-[11px] tracking-[0.2em] text-[#2a5ea8]">{p.tag}</p>
              <h3 className="mt-4 text-5xl font-light tracking-tight">{p.name}</h3>
              <p className="mt-6 whitespace-pre-line font-semibold">{p.copy}</p>
              <a href="#" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">
                제품 자세히 보기 <ArrowRight className="h-4 w-4" />
              </a>
              <div className="mt-12 flex items-center gap-4">
                <button aria-label="이전" onClick={() => setSlide((slide + C.products.length - 1) % C.products.length)} className="grid h-11 w-11 place-items-center border border-slate-300 hover:bg-slate-900 hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button aria-label="다음" onClick={() => setSlide((slide + 1) % C.products.length)} className="grid h-11 w-11 place-items-center border border-slate-300 hover:bg-slate-900 hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </button>
                <span className="text-sm tabular-nums text-slate-400">
                  {String(slide + 1).padStart(2, '0')} / {String(C.products.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP */}
      <section className="a-part relative overflow-hidden bg-[#13263d] px-6 py-28">
        <div className="a-part-circle pointer-events-none absolute -right-60 top-1/2 h-[760px] w-[760px] -translate-y-1/2">
          {[1, 0.74, 0.48].map((k) => (
            <span key={k} className="absolute inset-0 m-auto rounded-full border border-white/10" style={{ width: `${k * 100}%`, height: `${k * 100}%` }} />
          ))}
        </div>
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 md:grid-cols-2">
          <div data-reveal>
            <p className="text-[12px] tracking-[0.2em] text-[#5aa2ff]">{C.partnership.eyebrow}</p>
            <h2 className="mt-4 text-[clamp(28px,3vw,40px)] font-bold leading-snug">
              {C.partnership.title[0]}
              <br />
              {C.partnership.title[1]}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">{C.partnership.desc}</p>
          </div>
          <div className="flex flex-col gap-3">
            {C.partnership.cards.map((c, i) => (
              <a key={c.title} href="#" data-reveal={i * 0.12} className={`group flex items-center justify-between border p-6 transition ${i === 0 ? 'border-[#2a5ea8] bg-[#2a5ea8] hover:bg-[#244f8f]' : 'border-white/20 hover:border-white/50'}`}>
                <span>
                  <span className="block text-[11px] tracking-[0.15em] opacity-70">{c.label}</span>
                  <span className="mt-1 block font-semibold">{c.title}</span>
                </span>
                <span className="transition group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES — 세 개의 원이 겹쳐 있다가 펼쳐짐 */}
      <section className="a-values relative grid h-svh place-items-center overflow-hidden bg-[#06121f] px-6">
        <div className="absolute inset-x-0 top-24 mx-auto max-w-[1180px] px-6">
          <p className="text-[12px] font-semibold tracking-[0.2em] text-[#5aa2ff]">{C.values.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold tracking-tight">{C.values.title}</h2>
        </div>
        <div className="mt-24 flex items-center">
          {C.values.items.map((v, i) => (
            <div
              key={v.en}
              className={`a-venn-${i} relative -mx-[3vw] grid aspect-square w-[min(34vw,420px)] place-items-center rounded-full border border-white/25 text-center mix-blend-screen`}
              style={{ background: i === 1 ? 'rgba(58,109,255,.22)' : 'rgba(58,109,255,.07)' }}
            >
              <div className="a-venn-txt px-10">
                <span className="text-[11px] font-medium tracking-[0.2em] text-white/40">0{i + 1}</span>
                <h3 className="mt-3 text-[clamp(18px,1.8vw,28px)] font-semibold tracking-tight">{v.en}</h3>
                <p className="mt-1 text-xs text-[#8fb8ff] md:text-sm">{v.ko}</p>
                <p className="mx-auto mt-4 hidden max-w-[190px] text-[13px] leading-relaxed text-white/55 md:block">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white px-6 py-28 text-[#0d1b2a]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-10 md:grid-cols-4">
          {C.stats.map((s, i) => (
            <div key={s.label} data-reveal={i * 0.08}>
              <p className="text-[clamp(40px,4vw,60px)] font-bold tracking-tight">
                <Odometer value={s.value} />
                <span className="text-[#2a5ea8]">{s.suffix}</span>
              </p>
              <p className="mt-2 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-[#f3f6fa] px-6 py-28 text-[#0d1b2a]">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex items-end justify-between" data-reveal>
            <div>
              <p className="text-[12px] font-semibold tracking-[0.2em] text-[#2a5ea8]">NEWS & INSIGHTS</p>
              <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold">새로운 소식</h2>
            </div>
            <a href="#" className="text-sm font-semibold">VIEW MORE →</a>
          </div>
          <ul className="mt-12 border-t border-slate-300">
            {C.news.map((n, i) => (
              <li key={n.title} data-reveal={i * 0.08}>
                <a href="#" className="group flex items-center gap-6 border-b border-slate-300 py-6">
                  <span className="w-20 text-[11px] font-semibold tracking-widest text-[#2a5ea8]">{n.cat}</span>
                  <span className="hidden w-28 text-sm text-slate-400 sm:block">{n.date}</span>
                  <span className="flex-1 font-medium transition group-hover:translate-x-2">{n.title}</span>
                  <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#2a5ea8]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export function Footer({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';
  return (
    <footer className={`px-6 py-14 text-sm ${dark ? 'bg-[#06101b] text-white/60' : 'bg-white text-slate-500'}`}>
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:flex-row md:justify-between">
        <div className={dark ? 'text-white' : 'text-[#0d1b2a]'}>
          <Wordmark />
        </div>
        <div className="space-y-1 text-[13px]">
          <p>
            {C.company.name} · 대표 {C.company.ceo} · 사업자등록번호 {C.company.biz}
          </p>
          <p>{C.company.addr}</p>
          <p>
            TEL {C.company.tel} · FAX {C.company.fax}
          </p>
          <p className="pt-4 text-[12px] opacity-60">© SHINHAN NETWORKS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
