'use client';

// 시안 A — PULSE : Figma 원안 충실형. 다크 네이비 + 동심원 파동 + 원근 물결선
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, useSmoothScroll, reveal, countUp } from './motion';
import { WaveField } from './WaveField';
import { LogoType, Symbol, Wordmark } from './Symbol';
import { ProductVisual } from './ProductVisual';
import { Odometer, rollOdometers } from './Odometer';
import * as C from './content';

const BG = '#08131f';

// Figma 히어로(1920×939) px → vh 환산
const u = (px: number) => `${((px * 100) / 939).toFixed(3)}vh`;
const SKY = 'rgba(121,201,250,';
const BARS = [10.47, 19.78, 13.96, 25.6, 31.42, 10.47, 25.6, 31.42];

/** 링 위의 점 — angle(도), 링 반지름(px) */
function Dot({ angle, r, size, color, glow, ring }: { angle: number; r: number; size: number; color: string; glow: string; ring?: boolean }) {
  return (
    <span className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${angle}deg) translateX(${u(r)})` }}>
      <span
        className="absolute rounded-full"
        style={{
          width: u(size),
          height: u(size),
          left: u(-size / 2),
          top: u(-size / 2),
          background: color,
          boxShadow: `0 0 ${u(size * 2.25)} ${glow}`,
          border: ring ? `${u(1.16)} solid ${SKY}0.3)` : undefined,
        }}
      />
    </span>
  );
}

function HeroRings() {
  // 동심원 스테이지 — Figma 'Container 683×683' 레이어 값 그대로
  const at = (size: number) => ({ width: u(size), height: u(size), left: u(341.5 - size / 2), top: u(341.5 - size / 2) });
  return (
    <div className="a-stage pointer-events-none absolute left-1/2 top-[52.5%] z-0 opacity-40 lg:left-[63.6%] lg:opacity-100">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: u(683), height: u(683), boxShadow: `0 0 ${u(104.7)} ${SKY}0.1)` }}>
        {/* 사선 2개 */}
        <span className="absolute left-1/2 top-1/2" style={{ width: u(628.31), height: u(1.16), translate: '-50% -50%', rotate: '-12deg', background: `linear-gradient(90deg, ${SKY}0) 0%, ${SKY}0.25) 50%, ${SKY}0) 100%)` }} />
        <span className="absolute left-1/2 top-1/2" style={{ width: u(1.16), height: u(628.31), translate: '-50% -50%', rotate: '23deg', background: `linear-gradient(180deg, ${SKY}0) 0%, ${SKY}0.25) 50%, ${SKY}0) 100%)` }} />
        {/* 안쪽 글로우 */}
        <span className="a-ring absolute rounded-full" style={{ ...at(436.33), background: `radial-gradient(70.71% 70.71% at 50% 50%, ${SKY}0.17) 0%, ${SKY}0) 64%)`, boxShadow: `inset 0 0 ${u(139.6)} ${SKY}0.08)` }} />
        {/* 바깥 점선 원 — 위치는 바깥, 회전은 안쪽 */}
        <div className="a-ring absolute" style={at(559.66)}>
          <div className="absolute inset-0 rounded-full" style={{ border: `${u(1.16)} dashed ${SKY}0.3)`, animation: 'pv-spin 80s linear infinite' }}>
            <Dot angle={-82} r={279.83} size={9.31} color="#71B4FE" glow="#79C9FA" />
            <Dot angle={-160} r={279.83} size={9.31} color="#71B4FE" glow="#73E8CF" ring />
            <Dot angle={61} r={279.83} size={6.98} color="#B2DFFB" glow="#63E2C2" />
          </div>
        </div>
        {/* 밝은 실선 원 + 퍼지는 파동 */}
        {[0, 1.6].map((d) => (
          <span key={d} className="absolute rounded-full" style={{ ...at(340.92), border: `${u(1.16)} solid ${SKY}0.45)`, animation: `a-wave 3.2s ease-out ${d}s infinite` }} />
        ))}
        <span className="a-ring absolute rounded-full" style={{ ...at(340.92), border: `${u(1.16)} solid #71B4FE` }} />
        {/* 중심 링 + 작은 점 */}
        <div className="a-ring absolute" style={at(197.8)}>
          <div className="absolute inset-0 rounded-full" style={{ border: `${u(1.16)} solid ${SKY}0.24)`, animation: 'pv-spin 24s linear infinite reverse' }}>
            <Dot angle={30} r={98.9} size={6.98} color="#71B4FE" glow="#79C9FA" />
          </div>
        </div>
        {/* 중심 원 + 심볼 */}
        <span
          className="a-ring absolute grid place-items-center rounded-full"
          style={{ ...at(162.9), background: '#223949', border: `${u(1.16)} solid ${SKY}0.42)`, boxShadow: `0 0 ${u(69.8)} ${SKY}0.12), inset 0 0 ${u(40.7)} ${SKY}0.15)` }}
        >
          <Symbol className="block" style={{ width: u(111.52), height: u(101.2), translate: `${u(-11.6)} ${u(-5.8)}` }} />
        </span>
        {/* GLOBAL NETWORK */}
        <div
          className="a-widget absolute hidden flex-col lg:flex"
          style={{ left: u(485.26), top: u(120.34), width: u(183.84), height: u(103.76), padding: `${u(17.45)} ${u(19.78)}`, background: 'rgba(4,33,40,.74)', border: `${u(1.16)} solid ${SKY}0.25)`, boxShadow: `0 ${u(16.3)} ${u(46.5)} rgba(0,0,0,.16)` }}
        >
          <p className="whitespace-nowrap font-bold text-[#71B4FE]" style={{ fontSize: u(11.64), lineHeight: u(12), letterSpacing: u(1.47) }}>GLOBAL NETWORK</p>
          <p className="font-medium tabular-nums" style={{ fontSize: u(23.27), lineHeight: u(35), letterSpacing: u(1.4), marginTop: u(3.5) }}>
            <span data-count="24">0</span> / 7
          </p>
          <span className="block" style={{ height: u(2.33), marginTop: u(13.96), background: 'rgba(255,255,255,.1)' }}>
            <span className="a-gauge block h-full bg-[#71B4FE]" style={{ width: '73.4%' }} />
          </span>
        </div>
        {/* MEDICAL TECHNOLOGY */}
        <div
          className="a-widget absolute hidden flex-col justify-between lg:flex"
          style={{ left: u(6.93), top: u(465.42), width: u(197.8), height: u(90.96), padding: `${u(16.5)} ${u(26.76)}`, background: 'rgba(4,33,40,.74)', border: `${u(1.16)} solid ${SKY}0.25)`, boxShadow: `0 ${u(16.3)} ${u(46.5)} rgba(0,0,0,.16)` }}
        >
          <p className="whitespace-nowrap font-bold text-[#71B4FE]" style={{ fontSize: u(11.64), lineHeight: u(12), letterSpacing: u(1.47) }}>MEDICAL TECHNOLOGY</p>
          <div className="flex items-end justify-between" style={{ height: u(43.05) }}>
            {BARS.map((h, i) => (
              <span
                key={i}
                className="a-bar block"
                style={{ width: u(15.13), height: u(h), background: `linear-gradient(180deg, #79C9FA 0%, ${SKY}0.61) 50%, ${SKY}0.415) 75%, ${SKY}0.3175) 87.5%, ${SKY}0.22) 100%)` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  // 항상 같은 모양. 아래로 스크롤하면 부드럽게 위로 숨고, 위로 스크롤하면 다시 내려옴
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hidden = false;
    const set = (hide: boolean) => {
      if (hide === hidden) return;
      hidden = hide;
      gsap.to(bar.current, { yPercent: hide ? -100 : 0, duration: 0.5, ease: 'power3.out', overwrite: true });
    };
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => set(self.scroll() > 120 && self.direction === 1),
    });
    return () => st.kill();
  }, []);
  return (
    <header className="a-header fixed inset-x-0 top-0 z-50">
      <div ref={bar} className="border-b border-white/10 bg-[#1b2b3b]/95 backdrop-blur-md will-change-transform">
        <div className="mx-auto flex h-[77px] max-w-[1240px] items-center justify-between px-6 text-white">
          <Wordmark />
          <nav className="t-nav hidden gap-[34px] text-white md:flex">
            {C.nav.map((n) => (
              <a key={n} href="#" className="transition-colors hover:text-[#71B4FE]">
                {n}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

const N = C.products.length;

/** 제품 슬라이더 — 기존 사이트처럼 카드 전체가 옆으로 밀리며 넘어가고, 새 슬라이드 글이 아래에서 올라옴 */
function ProductSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % N), 4500);
    return () => clearTimeout(t);
  }, [i, paused]);
  const go = (d: number) => setI((v) => (v + d + N) % N);

  return (
    <div className="a-prod relative mt-14 overflow-hidden border border-slate-200 bg-white" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex transition-transform duration-[900ms] ease-[cubic-bezier(.77,0,.18,1)]" style={{ transform: `translateX(-${i * 100}%)` }}>
        {C.products.map((p, k) => (
          <div key={p.name} className="grid w-full shrink-0 md:grid-cols-2" aria-hidden={k !== i}>
            <ProductVisual name={p.name} image={p.image} className="aspect-[4/3] md:aspect-auto md:min-h-[440px]" />
            {/* 활성 슬라이드가 될 때마다 key가 바뀌어 글이 다시 올라옴 */}
            <div key={k === i ? `on-${i}` : 'off'} className="flex flex-col justify-center p-10 pb-32 md:p-14 md:pb-36">
              {[
                <p key="t" className="t-tag text-[#71B4FE]">{p.tag}</p>,
                <h3 key="n" className="t-display-xl mt-4">{p.name}</h3>,
                <p key="c" className="mt-6 whitespace-pre-line text-[20px] font-bold leading-[1.3] tracking-[-0.02em]">{p.copy}</p>,
                <a key="l" href="#" className="t-nav mt-10 inline-flex w-fit items-center gap-2 !font-bold">
                  제품 자세히 보기 <ArrowRight className="h-4 w-4" />
                </a>,
              ].map((el, n) => (
                <div key={n} style={k === i ? { animation: `rise-in .9s cubic-bezier(.16,1,.3,1) ${0.35 + n * 0.09}s both` } : undefined}>
                  {el}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* 컨트롤은 슬라이드 위에 고정 */}
      <div className="absolute bottom-10 left-10 flex items-center gap-4 md:bottom-14 md:left-[calc(50%+3.5rem)]">
        <button aria-label="이전" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center border border-slate-300 bg-white transition-colors hover:bg-slate-900 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button aria-label="다음" onClick={() => go(1)} className="grid h-11 w-11 place-items-center border border-slate-300 bg-white transition-colors hover:bg-slate-900 hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="t-body-md tabular-nums text-[#666]">
          {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </span>
        <span className="relative ml-2 h-px w-20 bg-slate-200">
          <span key={`${i}-${paused}`} className="absolute inset-y-0 left-0 bg-[#1F7AE0]" style={{ animation: paused ? undefined : 'progress 4.5s linear both', width: paused ? '0%' : undefined }} />
        </span>
      </div>
    </div>
  );
}

// 심볼 섹션 마지막 로크업 — 원본 AI 로고: 심볼↔워드마크 간격 = 심볼 폭의 11.6%
const LOCK_SCALE = 0.55;
function lockup() {
  const mark = document.querySelector<HTMLElement>('.a-sym-mark')!;
  const word = document.querySelector<HTMLElement>('.a-sym-word')!;
  const mw = mark.offsetWidth * LOCK_SCALE;
  const gap = mw * 0.116;
  const total = mw + gap + word.offsetWidth;
  return { markX: -total / 2 + mw / 2, wordX: -total / 2 + mw + gap };
}

export default function DesignA() {
  useSmoothScroll();
  const root = useRef<HTMLDivElement>(null);

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
        scrollTrigger: { trigger: '.a-sym', start: 'top top', end: '+=260%', scrub: 1, pin: true, invalidateOnRefresh: true },
      });
      sym
        .fromTo('.a-sym-line', { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 }, { strokeDashoffset: 0, stagger: 0.12, duration: 0.8 })
        .to('.a-sym-line', { fillOpacity: 1, stagger: 0.12, duration: 0.6 }, '-=0.6')
        .from('.a-sym-step', { opacity: 0, y: 20, stagger: 0.4, duration: 0.4 }, 0)
        .to('.a-sym-ring', { scale: 1.6, opacity: 0, stagger: 0.1, duration: 1 }, '<0.5')
        .to('.a-sym-step', { opacity: 0, duration: 0.3 })
        .to('.a-sym-mark', { x: () => lockup().markX, scale: LOCK_SCALE, duration: 1, ease: 'power2.inOut' })
        .fromTo(
          '.a-sym-word',
          { x: () => lockup().wordX, clipPath: 'inset(0 100% 0 0)' },
          { x: () => lockup().wordX, clipPath: 'inset(0 0% 0 0)', duration: 1 },
          '<0.3',
        );

      // 가치 — 겹친 세 원이 좌우로 펼쳐지며 텍스트 등장
      const vt = gsap.timeline({
        scrollTrigger: { trigger: '.a-values', start: 'top top', end: '+=160%', scrub: 1, pin: true },
      });
      vt.from('.a-venn-0', { xPercent: 100, duration: 1 })
        .from('.a-venn-2', { xPercent: -100, duration: 1 }, 0)
        .from('.a-venn-1', { scale: 0.7, duration: 1 }, 0)
        .from('.a-venn-txt', { opacity: 0, y: 30, stagger: 0.1, duration: 0.5 }, 0.6);

      // 제품 카드 — 아래에서 밀려 올라옴
      gsap.from('.a-prod', { y: 160, scale: 0.96, opacity: 0, duration: 1.4, ease: 'power4.out', scrollTrigger: { trigger: '.a-prod', start: 'top 92%' } });

      reveal(root.current!);
      countUp(root.current!);
      rollOdometers(root.current!);

      // 파트너십 원 회전 스크럽
      gsap.to('.a-part-circle', {
        yPercent: -12,
        scale: 1.08,
        scrollTrigger: { trigger: '.a-part', start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);


  return (
    <div ref={root} className="text-white" style={{ background: BG }}>
      <Header />

      {/* HERO */}
      <section className="relative h-svh min-h-[680px] overflow-hidden bg-[#0d1820]">
        {/* Figma 히어로 배경 원본 (실크 + 명암) — 천천히 흐름 */}
        <div className="a-canvas absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/hero/hero-bg.jpg)', animation: 'hero-drift 24s ease-in-out infinite alternate' }} />
        </div>
        <WaveField cx={0.64} cy={0.52} circle={false} interactive={false} className="absolute inset-0 h-full w-full opacity-15 mix-blend-screen" />
        <HeroRings />
        <div className="relative z-10 mx-auto flex h-full max-w-[1240px] flex-col justify-center px-6 pt-10">
          <p className="a-hero-fade t-eyebrow mb-7 flex items-center gap-3 !leading-[15px] text-[#71B4FE]">
            <span className="h-px w-9 bg-[#71B4FE]" />
            {C.hero.eyebrow}
          </p>
          <h1 className="t-display-lg">
            <span className="a-hero-line block overflow-hidden">
              <span className="block">
                <em className="font-bold not-italic tracking-[-0.02em] text-[#71B4FE]">전문성</em>을 이어,
              </span>
            </span>
            <span className="a-hero-line block overflow-hidden">
              <span className="block">
                <em className="font-bold not-italic tracking-[-0.02em] text-[#71B4FE]">새로운 가치</em>를 <em className="font-bold not-italic tracking-[-0.02em] text-[#71B4FE]">연결</em>합니다.
              </span>
            </span>
          </h1>
          <p className="a-hero-fade t-heading-sm mt-8 text-white/80">{C.hero.desc}</p>
          <a href="#" className="a-hero-fade mt-12 inline-flex h-[58px] w-[178px] items-center justify-center gap-5 border border-white/[0.32] text-[18px] font-bold leading-[28px] hover:bg-white hover:text-[#13243a]">
            {C.hero.cta} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="a-hero-fade absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1240px] px-6">
          <div className="t-caption flex h-[63px] items-center justify-between border-t border-white/70 !leading-4 text-white/70">
            <span>SHINHAN NETWORKS · MEDICAL DEVICE PARTNER</span>
            <span className="flex items-center gap-3">
              <span className="tracking-[1.62px]">SCROLL</span>
              <span className="relative block h-[42px] w-[26px] rounded-[20px] border border-white/70">
                <span className="absolute left-[11px] top-[14px] h-[7px] w-[2px] rounded-[2px] bg-[#71B4FE] opacity-65" style={{ animation: 'drip 1.6s ease-in-out infinite' }} />
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section
        className="a-philo relative grid h-svh place-items-center overflow-hidden"
        style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(52, 143, 205, 0.25) 0%, rgba(13, 14, 16, 0.25) 100%), linear-gradient(99.48deg, #203441 6.71%, #0B0B0B 24.51%, #161E24 67.87%, #2A495E 101.65%), #032229' }}
      >
        {/* 아래 심볼 섹션(#08131f)으로 자연스럽게 이어지도록 하단 페이드 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[38%] bg-gradient-to-b from-transparent to-[#08131f]" />
        <div className="a-philo-bg absolute inset-0 grid place-items-center">
          {[560, 760, 980].map((s, i) => (
            <span
              key={s}
              className="absolute rounded-full border border-[#71B4FE]/15"
              style={{ width: s, height: s, animation: `pv-spin ${40 + i * 10}s linear infinite` }}
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#71B4FE]" />
            </span>
          ))}
          <span className="absolute h-[1px] w-full bg-white/10" />
        </div>
        <div className="a-philo-txt relative z-10 max-w-2xl px-6 text-center">
          <p className="t-eyebrow !leading-[15px] text-[#71B4FE]">{C.philosophy.eyebrow}</p>
          <h2 className="t-display-md mt-6">
            {C.philosophy.title[0]}
            <br />
            <span className="text-[#71B4FE]">{C.philosophy.title[1]}</span>
          </h2>
          <p className="t-body-lg mx-auto mt-6 whitespace-pre-line text-white/80">{C.philosophy.desc}</p>
        </div>
      </section>

      {/* SYMBOL */}
      <section className="a-sym relative grid h-svh place-items-center overflow-hidden">
        <div className="relative flex items-center">
          {[1, 1.5, 2.1].map((s, i) => (
            <span
              key={i}
              className="a-sym-ring absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#71B4FE]/25"
              style={{ scale: s }}
            />
          ))}
          <div className="a-sym-mark relative">
            <Symbol className="h-[210px] w-[224px]" outline lineClassName="a-sym-line" />
          </div>
          {/* 세로 가운데는 flex로, 가로 위치는 GSAP x로 */}
          <div className="a-sym-word absolute inset-y-0 left-1/2 flex items-center">
            <LogoType className="h-[80px] w-auto" />
          </div>
        </div>
        <div className="t-caption absolute bottom-[14%] flex gap-10 text-white/70">
          {['EXPERTISE', 'NETWORK', 'SERVICE'].map((s, i) => (
            <span key={s} className="a-sym-step">
              0{i + 1} {s}
            </span>
          ))}
        </div>
      </section>

      {/* PRODUCT */}
      <section className="relative bg-[#F3F6F9] px-6 py-[120px] text-black">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="t-eyebrow text-[#1F7AE0]">OUR PRODUCT</p>
              <h2 className="t-display-md mt-3">Featured Product</h2>
            </div>
            <p className="t-body-md max-w-xs text-[#666]">검증된 글로벌 의료기기 브랜드를 국내 의료 현장에 가장 빠르게 연결합니다.</p>
          </div>
          <ProductSlider />
        </div>
      </section>

      {/* PARTNERSHIP — Figma: #1C3848 + 큰 반투명 링 */}
      <section className="a-part relative overflow-hidden bg-[#1C3848] px-6 py-[120px]">
        <div className="a-part-circle pointer-events-none absolute left-[53%] top-[18%] aspect-square w-[min(980px,72vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[min(90px,6vw)] border-white/[0.045]" />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 md:grid-cols-[1fr_460px]">
          <div data-reveal>
            <p className="t-eyebrow text-[#71B4FE]">{C.partnership.eyebrow}</p>
            <h2 className="t-display-md mt-6">
              {C.partnership.title[0]}
              <br />
              {C.partnership.title[1]}
            </h2>
            <p className="t-body-md mt-8 whitespace-pre-line text-white/70">{C.partnership.desc}</p>
          </div>
          <div className="flex flex-col gap-3">
            {C.partnership.cards.map((c, i) => (
              <a
                key={c.title}
                href="#"
                data-reveal={i * 0.12}
                className="group flex items-center justify-between border border-[#79C9FA]/20 bg-[#79C9FA]/[0.06] px-6 py-7 transition-colors duration-300 hover:border-[#1F7AE0] hover:bg-[#1F7AE0]"
              >
                <span>
                  <span className="t-caption block !text-[10px] !leading-[14px] text-[#8BE9D3] transition-colors duration-300 group-hover:text-white/80">{c.label}</span>
                  <span className="t-nav mt-0.5 block">{c.title}</span>
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/60 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#1F7AE0]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES — 세 개의 원이 겹쳐 있다가 펼쳐짐 */}
      <section className="a-values relative grid h-svh place-items-center overflow-hidden bg-[#06121f] px-6">
        <div className="absolute inset-x-0 top-24 mx-auto max-w-[1180px] px-6">
          <p className="t-eyebrow text-[#71B4FE]">{C.values.eyebrow}</p>
          <h2 className="t-display-md mt-3">{C.values.title}</h2>
        </div>
        <div className="mt-24 flex items-center">
          {C.values.items.map((v, i) => (
            <div
              key={v.en}
              className={`a-venn-${i} relative -mx-[3vw] grid aspect-square w-[min(34vw,420px)] place-items-center rounded-full border border-white/25 text-center mix-blend-screen`}
              style={{ background: i === 1 ? 'rgba(58,109,255,.22)' : 'rgba(58,109,255,.07)' }}
            >
              <div className="a-venn-txt px-10">
                <span className="t-caption text-white/40">0{i + 1}</span>
                <h3 className="t-heading-lg mt-3">{v.en}</h3>
                <p className="t-nav mt-1 !font-bold text-[#71B4FE]">{v.ko}</p>
                <p className="t-body-md mx-auto mt-4 hidden max-w-[200px] text-white/60 md:block">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white px-6 py-[120px] text-black">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-10 md:grid-cols-4">
          {C.stats.map((s, i) => (
            <div key={s.label} data-reveal={i * 0.08}>
              <p className="text-[clamp(44px,3.75vw,72px)] font-bold leading-[1.15] tracking-[-0.02em]">
                <Odometer value={s.value} />
                <span className="text-[#1F7AE0]">{s.suffix}</span>
              </p>
              <p className="t-body-lg mt-3 !font-normal text-[#666]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-[#f4f7fb] px-6 py-[120px] text-black">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex items-end justify-between" data-reveal>
            <div>
              <p className="t-eyebrow text-[#1F7AE0]">NEWS & INSIGHTS</p>
              <h2 className="t-display-md mt-3">새로운 소식</h2>
            </div>
            <a href="#" className="t-nav !font-bold">VIEW MORE →</a>
          </div>
          <ul className="mt-12 border-t border-slate-300">
            {C.news.map((n, i) => (
              <li key={n.title} data-reveal={i * 0.08}>
                <a href="#" className="group flex items-center gap-6 border-b border-slate-300 py-6">
                  <span className="t-tag w-24 text-[#1F7AE0]">{n.cat}</span>
                  <span className="t-body-sm hidden w-28 text-[#666] sm:block">{n.date}</span>
                  <span className="t-body-lg flex-1 transition group-hover:translate-x-2">{n.title}</span>
                  <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#1F7AE0]">
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
