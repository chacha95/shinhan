'use client';

// 시안 A — PULSE : Figma 원안 충실형. 다크 네이비 + 동심원 파동 + 원근 물결선
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ArrowUpRight, Award, Globe2, MessageSquareText } from 'lucide-react';
import { gsap, useSmoothScroll, reveal, countUp } from './motion';
import { WaveField } from './WaveField';
import { BackToTop } from './BackToTop';
import { LogoType, Symbol, Wordmark } from './Symbol';
import { ProductVisual } from './ProductVisual';
import * as C from './content';
import { useContent, useHref, useLang, LangSwitch } from './i18n';

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
    <div className="a-stage pointer-events-none absolute left-1/2 top-[27%] z-0 scale-[.62] lg:left-[63.6%] lg:top-[52.5%] lg:scale-100">
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
          className="a-widget absolute flex flex-col"
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
          className="a-widget absolute flex flex-col justify-between"
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

export function Header({ active }: { active?: (typeof C.nav)[number] }) {
  // 11/03: 헤더 FIXED — 스크롤해도 항상 상단 고정. 모바일은 60px + 햄버거 메뉴(Figma M/nav)
  const C = useContent();
  const href = useHref();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);
  return (
    <>
      <header className="a-header fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#273E4E]/90 backdrop-blur-[12px]">
        <div className="mx-auto flex h-[60px] max-w-[1240px] items-center justify-between px-5 text-white md:h-[77px] md:px-6">
          <Link href={href('/')} aria-label={C.ui.home} onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>
          <div className="flex items-center gap-5 md:gap-10">
            <nav className="t-nav hidden gap-[34px] text-white md:flex">
              {C.nav.map((n) => (
                <Link key={n} href={href(C.routes[n])} className={`transition-colors hover:text-[#71B4FE] ${active === n ? 'text-[#71B4FE]' : ''}`}>
                  {n}
                </Link>
              ))}
            </nav>
            <LangSwitch className="t-caption !leading-4 tracking-[1px] text-white max-md:hidden" />
            <Link href={href('/contact#form')} className="t-button hidden items-center gap-4 border border-white/40 px-5 py-2 transition-colors hover:bg-white hover:text-[#273E4E] md:inline-flex">
              {C.hero.cta} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button type="button" aria-label={open ? C.ui.menuClose : C.ui.menuOpen} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="relative grid h-10 w-10 place-items-center md:hidden">
              <span className={`absolute h-px w-5 bg-white transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
              <span className={`absolute h-px w-5 bg-white transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
            </button>
          </div>
        </div>
      </header>
        {/* 모바일 메뉴 패널 — 헤더를 덮는 전체화면(Figma M/nav), header의 backdrop-filter가 fixed 기준이 되지 않도록 header 밖에 둠 */}
        <div
          className={`fixed inset-0 z-[60] flex flex-col px-5 pb-[30px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:hidden ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
          style={{ background: 'radial-gradient(224.94% 111.64% at 100% 0%, rgba(113,180,254,.12) 0%, rgba(113,180,254,0) 36%), #092A2F' }}
        >
          <div className="flex h-[60px] shrink-0 items-center justify-end">
            <button type="button" aria-label={C.ui.menuClose} onClick={() => setOpen(false)} className="relative grid h-10 w-10 place-items-center">
              <span className="absolute h-px w-5 rotate-45 bg-white" />
              <span className="absolute h-px w-5 -rotate-45 bg-white" />
            </button>
          </div>
          <nav className="mt-[26px] text-white">
            {C.nav.map((n, i) => (
              <Link
                key={n}
                href={href(C.routes[n])}
                onClick={() => setOpen(false)}
                className={`flex h-24 items-center justify-between border-white/[0.14] px-3 ${i === 0 ? 'border-y' : 'border-b'}`}
                style={open ? { animation: `rise-in .7s cubic-bezier(.16,1,.3,1) ${0.08 + i * 0.07}s both` } : undefined}
              >
                <span>
                  <span className={`block text-[22px] font-bold leading-[34px] ${active === n ? 'text-[#71B4FE]' : ''}`}>{n}</span>
                  <span className="block text-[12px] leading-[18px] text-white/50">{C.navSub[n]}</span>
                </span>
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            ))}
          </nav>
          <LangSwitch className="t-caption mt-auto self-end pb-4 !leading-4 tracking-[1px] text-white" />
          <Link href={href('/contact#form')} onClick={() => setOpen(false)} className="flex items-center justify-between border border-white/30 px-4 py-4 text-[15px] font-bold leading-[22px] text-white">
            {C.hero.cta} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
    </>
  );
}

/** 11/03: 영상 영역 전체화면 — 작은 창에서 화면 가득 펼쳐지며 재생 */
function VideoSection() {
  const C = useContent();
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const v = video.current!;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <section className="a-video relative h-svh overflow-hidden bg-[#08131f]">
      <div className="a-video-frame absolute inset-0 overflow-hidden">
        <video
          ref={video}
          className="a-video-el h-full w-full object-cover"
          src="/video/evoke.mp4"
          poster="/video/evoke-poster.jpg"
          muted={muted}
          loop
          playsInline
          preload="metadata"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className="t-caption absolute bottom-8 right-8 z-10 border border-white/40 px-4 py-2.5 text-white/90 backdrop-blur-sm transition-colors hover:bg-white hover:text-[#08131f]"
        aria-label={muted ? C.ui.soundOn : C.ui.soundOff}
      >
        {muted ? 'SOUND OFF' : 'SOUND ON'}
      </button>
    </section>
  );
}

/** 제품 슬라이더 — 기존 사이트처럼 카드 전체가 옆으로 밀리며 넘어가고, 새 슬라이드 글이 아래에서 올라옴 */
export function ProductSlider({ cta: ctaProp }: { cta?: { label: string; href: string } }) {
  const C = useContent();
  const href = useHref();
  const N = C.products.length;
  const cta = ctaProp ?? { label: C.product.more, href: 'https://inmode.co.kr/' };
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % N), 4500);
    return () => clearTimeout(t);
  }, [i, paused, N]);
  const go = (d: number) => setI((v) => (v + d + N) % N);

  return (
    <div className="a-prod relative mt-14 overflow-hidden border border-slate-200 bg-white" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex transition-transform duration-[900ms] ease-[cubic-bezier(.77,0,.18,1)]" style={{ transform: `translateX(-${i * 100}%)` }}>
        {C.products.map((p, k) => (
          <div key={p.name} className="grid w-full shrink-0 md:grid-cols-2" aria-hidden={k !== i}>
            <ProductVisual name={p.name} image={p.image} className="aspect-[662/620] h-full w-full" />
            {/* 활성 슬라이드가 될 때마다 key가 바뀌어 글이 다시 올라옴 */}
            <div key={k === i ? `on-${i}` : 'off'} className="flex flex-col justify-center p-10 pb-32 md:p-14 md:pb-36">
              {[
                <p key="t" className="t-tag text-[#71B4FE]">{p.tag}</p>,
                <h3 key="n" className="t-display-xl mt-4">{p.name}</h3>,
                <p key="c" className="mt-6 whitespace-pre-line text-[20px] font-bold leading-[1.3] tracking-[-0.02em]">{p.copy}</p>,
                ...(p.desc ? [<p key="d" className="t-body-md mt-4 max-w-[440px] text-[#666]">{p.desc}</p>] : []),
                cta.href.startsWith('http') ? (
                  <a key="l" href={cta.href} target="_blank" rel="noopener noreferrer" className="t-nav mt-10 inline-flex w-fit items-center gap-2 !font-bold">
                    {cta.label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link key="l" href={href(cta.href)} className="t-nav mt-10 inline-flex w-fit items-center gap-2 !font-bold">
                    {cta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ),
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
        <button aria-label={C.ui.prev} onClick={() => go(-1)} className="grid h-11 w-11 place-items-center border border-slate-300 bg-white transition-colors hover:bg-slate-900 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button aria-label={C.ui.next} onClick={() => go(1)} className="grid h-11 w-11 place-items-center border border-slate-300 bg-white transition-colors hover:bg-slate-900 hover:text-white">
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
  const C = useContent();
  const lang = useLang();
  const href = useHref();
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

      // 핀 고정 섹션은 페이지 순서대로 생성해야 아래 섹션 시작 위치가 어긋나지 않음
      // 영상 — 화면 가운데 작은 창에서 전체화면으로 펼쳐짐
      gsap
        .timeline({ scrollTrigger: { trigger: '.a-video', start: 'top top', end: '+=120%', scrub: 1, pin: true } })
        .fromTo('.a-video-frame', { clipPath: 'inset(22% 26% 22% 26%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' })
        .fromTo('.a-video-el', { scale: 1.25 }, { scale: 1, ease: 'none' }, 0);

      // 제품 카드 — 아래에서 밀려 올라옴
      gsap.from('.a-prod', { y: 160, scale: 0.96, opacity: 0, duration: 1.4, ease: 'power4.out', scrollTrigger: { trigger: '.a-prod', start: 'top 92%' } });

      reveal(root.current!);
      countUp(root.current!);

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
        <div className="relative z-10 mx-auto flex h-full max-w-[1240px] flex-col justify-end px-5 pb-28 pt-10 md:px-6 lg:justify-center lg:pb-0">
          <p className="a-hero-fade t-eyebrow mb-7 flex items-center gap-3 !leading-[15px] text-[#71B4FE]">
            <span className="h-px w-9 bg-[#71B4FE]" />
            {C.hero.eyebrow}
          </p>
          <h1 className={`t-display-lg max-md:!text-[32px] max-md:!leading-[42px] ${lang === 'en' ? '!font-bold tracking-[-0.02em]' : ''}`}>
            {C.hero.lines.map((line, n) => (
              <span key={n} className="a-hero-line block overflow-hidden">
                <span className="block">
                  {line.map((s, k) =>
                    s.hl ? (
                      <em key={k} className="font-bold not-italic tracking-[-0.02em] text-[#71B4FE]">
                        {s.t}
                      </em>
                    ) : (
                      s.t
                    ),
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p className="a-hero-fade t-heading-sm mt-8 text-white/80 max-md:mt-5 max-md:!text-[16px] max-md:!leading-[26px]">{C.hero.desc}</p>
          <Link href={href('/contact#form')} className="a-hero-fade mt-12 inline-flex h-[52px] w-fit min-w-[160px] items-center justify-center gap-5 whitespace-nowrap px-6 border border-white/[0.32] text-[14px] md:h-[58px] md:min-w-[178px] md:text-[18px] font-bold leading-[28px] hover:bg-white hover:text-[#13243a]">
            {C.hero.cta} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="a-hero-fade absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1240px] px-6">
          <div className="t-caption flex h-[63px] items-center justify-between border-t border-white/70 !leading-4 text-white/70 max-md:!text-[8px] max-md:!tracking-[1px]">
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
          <h2 className={`t-display-md mt-6 ${lang === 'en' ? '!font-medium' : ''}`}>
            {C.philosophy.lines.map((line, n) => (
              <span key={n} className="block">
                {line.map((s, k) => (s.hl ? <span key={k} className="text-[#71B4FE]">{s.t}</span> : s.t))}
              </span>
            ))}
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
            <Symbol className="h-[150px] w-[160px] md:h-[210px] md:w-[224px]" outline lineClassName="a-sym-line" />
          </div>
          {/* 세로 가운데는 flex로, 가로 위치는 GSAP x로 */}
          <div className="a-sym-word absolute inset-y-0 left-1/2 flex items-center">
            <LogoType className="h-[44px] w-auto md:h-[80px]" />
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

      {/* VIDEO — 11/03 전체화면 영상 */}
      <VideoSection />

      {/* PRODUCT */}
      <section className="relative bg-[#F3F6F9] px-6 py-[72px] md:py-[120px] text-black">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="t-eyebrow text-[#1F7AE0]">OUR PRODUCT</p>
              <h2 className="t-display-md mt-3">{C.product.title}</h2>
            </div>
            <p className="t-body-md max-w-xs text-[#666]">{C.product.desc}</p>
          </div>
          <ProductSlider />
        </div>
      </section>

      {/* PARTNERSHIP — Figma: #1C3848 + 큰 반투명 링 */}
      <section className="a-part relative overflow-hidden bg-[#1C3848] px-6 py-[72px] md:py-[120px]">
        <div className="a-part-circle pointer-events-none absolute left-[53%] top-[18%] aspect-square w-[min(980px,72vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[min(90px,6vw)] border-white/[0.045]" />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 md:grid-cols-[1fr_460px]">
          <div data-reveal>
            <p className="t-eyebrow text-[#71B4FE]">{C.partnership.eyebrow}</p>
            <h2 className="t-display-md mt-6 max-md:!text-[40px] max-md:!font-normal max-md:!leading-[52px]">
              {C.partnership.title[0]}
              <br />
              {C.partnership.title[1]}
            </h2>
            <p className="t-body-md mt-8 whitespace-pre-line text-white/70">{C.partnership.desc}</p>
          </div>
          <div className="flex flex-col gap-3">
            {C.partnership.cards.map((c, i) => (
              <Link
                key={c.title}
                href={href('/contact#form')}
                data-reveal={i * 0.12}
                className="group flex items-center justify-between border border-[#79C9FA]/20 bg-[#79C9FA]/[0.06] px-6 py-7 transition-colors duration-300 hover:border-[#1F7AE0] hover:bg-[#1F7AE0]"
              >
                <span>
                  <span className="t-caption block !text-[10px] !leading-[14px] text-[#71B4FE] transition-colors duration-300 group-hover:text-white/80">{c.label}</span>
                  <span className="t-nav mt-0.5 block">{c.title}</span>
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/60 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#1F7AE0]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND IDENTITY — Figma 11/03: 흰 배경 카드 3개 */}
      <section className="bg-white px-6 py-[72px] md:py-[120px] text-black">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="t-eyebrow text-[#1F7AE0]">
                <span className="md:hidden">{C.values.eyebrowMobile}</span>
                <span className="hidden md:inline">{C.values.eyebrow}</span>
              </p>
              <h2 className="t-display-md mt-3 max-w-[600px]">{C.values.title}</h2>
            </div>
            <p className="t-body-md max-w-[340px] text-[#666]">{C.values.desc}</p>
          </div>
          <div className="mt-14 grid border border-[#E3E9F0] md:grid-cols-3">
            {C.values.items.map((v, i) => {
              const Icon = [Award, Globe2, MessageSquareText][i];
              return (
                <article
                  key={v.en}
                  data-reveal={i * 0.1}
                  className="group relative border-b border-[#E3E9F0] p-10 transition-colors duration-300 last:border-b-0 hover:bg-[#F8FBFF] md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#1F7AE0] transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <Icon className="h-7 w-7 text-[#1F7AE0]" strokeWidth={1.6} />
                    <span className="t-body-sm text-[#999]">0{i + 1}</span>
                  </div>
                  <h3 className="t-heading-lg mt-14">{v.en}</h3>
                  <p className="t-nav mt-1 !font-bold text-[#1F7AE0]">{v.ko}</p>
                  <p className="t-body-md mt-5 text-[#666]">{v.desc}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-8 flex justify-end">
            <Link href={href('/about')} className="t-nav inline-flex items-center gap-2 !font-bold transition-colors hover:text-[#1F7AE0]">
              {C.values.about} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export function Footer({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  // Figma 푸터: #1A2D3B, 로고 + 메뉴 한 줄(모바일도) / 구분선 / 소개 문구 + 저작권
  const C = useContent();
  const lang = useLang();
  const href = useHref();
  const dark = tone === 'dark';
  return (
    <footer className={`px-5 pb-9 pt-12 md:px-6 md:py-12 ${dark ? 'bg-[#1A2D3B] text-white' : 'bg-white text-[#0d1b2a]'}`}>
      <BackToTop />
      <div className="mx-auto max-w-[1240px]">
        <div className={`flex items-center justify-between gap-7 border-b pb-[30px] ${dark ? 'border-white/[0.28]' : 'border-slate-200'}`}>
          <Link href={href('/')} aria-label={C.ui.home} className="shrink-0">
            <Wordmark />
          </Link>
          <nav className={`t-nav flex ${lang === 'en' ? 'gap-4' : 'gap-6'} max-md:!text-[12px] max-md:!leading-[18px] md:gap-8 ${dark ? 'text-white/80' : 'text-slate-600'}`}>
            {C.footerNav.map((n) => (
              <Link key={n.label} href={href(n.href)} className="whitespace-nowrap transition-colors hover:text-[#71B4FE]">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={`flex flex-col gap-1 pt-6 md:flex-row md:justify-between ${dark ? 'text-white/50' : 'text-slate-500'}`}>
          <p className="t-body-sm max-md:!text-[10px] max-md:!leading-[16px]">{C.hero.desc}</p>
          <p className="t-body-sm max-md:!text-[9px] max-md:!leading-[14px]">© 2025 SHINHAN NETWORKS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
