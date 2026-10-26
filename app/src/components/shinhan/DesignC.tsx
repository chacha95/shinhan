'use client';

// 시안 C — RIPPLE : 라이트 클리니컬 톤. 수면 파문 + 떠다니는 구체 + 궤도 회전
import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Award, Globe2, Headset } from 'lucide-react';
import { gsap, useCanvas, useSmoothScroll, reveal, countUp } from './motion';
import { Symbol, Wordmark } from './Symbol';
import { ProductVisual } from './ProductVisual';
import { Footer } from './DesignA';
import * as C from './content';

const NAVY = '#0b1f3a';
const BLUE = '#1f5eff';

type Drop = { x: number; y: number; t: number; big: boolean };

function RippleCanvas() {
  const drops = useRef<Drop[]>([]);
  const lastAuto = useRef(0);
  const lastMove = useRef(0);
  const box = useRef<DOMRect | null>(null);

  const ref = useCanvas((ctx, w, h, t) => {
    if (t - lastAuto.current > 0.9) {
      drops.current.push({ x: w * (0.15 + Math.random() * 0.7), y: h * (0.2 + Math.random() * 0.6), t, big: true });
      lastAuto.current = t;
    }
    drops.current = drops.current.filter((d) => t - d.t < 3.2);
    drops.current.forEach((d) => {
      const k = (t - d.t) / 3.2;
      const max = d.big ? 320 : 140;
      for (let j = 0; j < 3; j++) {
        const kk = k - j * 0.08;
        if (kk <= 0) continue;
        ctx.beginPath();
        ctx.ellipse(d.x, d.y, kk * max, kk * max * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(31,94,255,${(1 - kk) * (d.big ? 0.35 : 0.25)})`;
        ctx.lineWidth = 1.4 - j * 0.3;
        ctx.stroke();
      }
    });
  });

  useEffect(() => {
    const canvas = ref.current!;
    const on = (e: PointerEvent) => {
      const now = performance.now() / 1000;
      if (now - lastMove.current < 0.09) return;
      lastMove.current = now;
      box.current = canvas.getBoundingClientRect();
      const b = box.current;
      if (e.clientY < b.top || e.clientY > b.bottom) return;
      drops.current.push({ x: e.clientX - b.left, y: e.clientY - b.top, t: now, big: false });
    };
    const click = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      drops.current.push({ x: e.clientX - b.left, y: e.clientY - b.top, t: performance.now() / 1000, big: true });
    };
    window.addEventListener('pointermove', on);
    window.addEventListener('pointerdown', click);
    return () => {
      window.removeEventListener('pointermove', on);
      window.removeEventListener('pointerdown', click);
    };
  }, [ref]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

function WaveBand({ color = BLUE, flip = false }: { color?: string; flip?: boolean }) {
  const ref = useCanvas((ctx, w, h, t) => {
    for (let l = 0; l < 3; l++) {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 8) {
        const y = h * 0.5 + Math.sin(x * 0.006 + t * (1 + l * 0.3) + l * 2) * h * 0.18 + Math.sin(x * 0.013 - t * 0.8) * h * 0.06;
        ctx.lineTo(x, y + l * 8);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.globalAlpha = l === 2 ? 1 : 0.25;
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} className={`block h-28 w-full ${flip ? 'rotate-180' : ''}`} />;
}

export default function DesignC() {
  useSmoothScroll();
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 커서 팔로워
      const xTo = gsap.quickTo(cursor.current, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(cursor.current, 'y', { duration: 0.5, ease: 'power3' });
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener('pointermove', move);

      // 인트로
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.c-orb', { scale: 0, opacity: 0, duration: 2, stagger: 0.15 })
        .from('.c-line > span', { yPercent: 105, duration: 1.3, stagger: 0.1 }, 0.4)
        .from('.c-fade', { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 0.9);

      // 구체 떠다님
      gsap.utils.toArray<HTMLElement>('.c-orb').forEach((el, i) => {
        gsap.to(el, { x: `random(-80,80)`, y: `random(-60,60)`, duration: 5 + i, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
      gsap.to('.c-orbs', { yPercent: 30, scrollTrigger: { trigger: '.c-hero', start: 'top top', end: 'bottom top', scrub: true } });

      // 철학 — 단어별 하이라이트
      gsap.fromTo(
        '.c-word',
        { opacity: 0.12 },
        { opacity: 1, stagger: 0.1, scrollTrigger: { trigger: '.c-philo', start: 'top 70%', end: 'bottom 60%', scrub: true } },
      );

      // 원형 게이지
      gsap.utils.toArray<SVGCircleElement>('.c-gauge').forEach((el) => {
        gsap.fromTo(el, { strokeDashoffset: 1 }, { strokeDashoffset: 1 - Number(el.dataset.pct), duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      // 궤도 섹션 — 들어올 때 궤도가 확대되며 열림
      gsap.from('.c-orbit-ring', {
        scale: 0.3,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: { trigger: '.c-orbit', start: 'top 80%', end: 'center center', scrub: 1 },
      });

      reveal(root.current!);
      countUp(root.current!);
      return () => window.removeEventListener('pointermove', move);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-[#f5f8fd] text-[#0b1f3a]">
      <div
        ref={cursor}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1f5eff] mix-blend-multiply md:block"
      />

      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between rounded-full border border-white/60 bg-white/70 px-6 shadow-[0_10px_40px_-10px_rgba(11,31,58,.15)] backdrop-blur-xl">
          <Wordmark />
          <nav className="hidden gap-10 text-[13px] font-medium tracking-[0.1em] md:flex">
            {C.nav.map((n) => (
              <a key={n} href="#" className="hover:text-[#1f5eff]">{n}</a>
            ))}
          </nav>
          <a href="#" className="rounded-full bg-[#0b1f3a] px-5 py-2.5 text-[12px] font-semibold text-white hover:bg-[#1f5eff]">제품 문의</a>
        </div>
      </header>

      {/* HERO */}
      <section className="c-hero relative h-svh min-h-[720px] overflow-hidden">
        <div className="c-orbs absolute inset-0">
          <span className="c-orb absolute left-[8%] top-[18%] h-[42vw] w-[42vw] rounded-full bg-[radial-gradient(circle_at_30%_30%,#9cc1ff,#1f5eff_60%,transparent_72%)] opacity-60 blur-2xl" />
          <span className="c-orb absolute right-[5%] top-[8%] h-[30vw] w-[30vw] rounded-full bg-[radial-gradient(circle_at_40%_40%,#c9f1ff,#5fc8ff_55%,transparent_72%)] opacity-60 blur-2xl" />
          <span className="c-orb absolute bottom-[-10%] right-[25%] h-[34vw] w-[34vw] rounded-full bg-[radial-gradient(circle_at_50%_50%,#dfe6ff,#7b8cff_55%,transparent_72%)] opacity-40 blur-3xl" />
        </div>
        <RippleCanvas />
        <div className="relative z-10 mx-auto flex h-full max-w-[1240px] flex-col justify-end px-6 pb-[14vh]">
          <p className="c-fade text-[12px] font-semibold tracking-[0.3em] text-[#1f5eff]">{C.hero.eyebrow}</p>
          <h1 className="mt-5 text-[clamp(44px,7.4vw,112px)] font-extrabold leading-[1.04] tracking-[-0.045em]">
            <span className="c-line block overflow-hidden"><span className="block">전문성을 이어,</span></span>
            <span className="c-line block overflow-hidden"><span className="block">새로운 가치를 <span className="text-[#1f5eff]">연결</span>합니다</span></span>
          </h1>
          <div className="c-fade mt-10 flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-sm text-[15px] text-slate-600">{C.hero.desc}</p>
            <a href="#" className="group inline-flex items-center gap-3 rounded-full bg-[#1f5eff] py-2 pl-6 pr-2 font-semibold text-white">
              {C.hero.cta}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1f5eff] transition group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
        <p className="c-fade absolute right-6 top-1/2 z-10 hidden -rotate-90 text-[11px] tracking-[0.3em] text-slate-400 md:block">CLICK ANYWHERE · RIPPLE</p>
      </section>

      {/* STATS — 원형 게이지 */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-8 md:grid-cols-4">
          {C.stats.map((s, i) => (
            <div key={s.label} data-reveal={i * 0.08} className="relative mx-auto grid aspect-square w-full max-w-[220px] place-items-center">
              <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#dfe7f3" strokeWidth="2" />
                <circle className="c-gauge" data-pct={[0.75, 1, 0.6, 0.85][i]} cx="60" cy="60" r="54" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
              </svg>
              <div className="text-center">
                <p className="text-4xl font-bold tracking-tight">
                  <span data-count={s.value}>0</span>
                  <span className="text-[#1f5eff]">{s.suffix}</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY — 단어 하이라이트 */}
      <section className="c-philo px-6 py-28">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[12px] font-semibold tracking-[0.3em] text-[#1f5eff]" data-reveal>{C.philosophy.eyebrow}</p>
          <p className="mt-8 text-[clamp(26px,3.6vw,52px)] font-bold leading-[1.35] tracking-[-0.03em]">
            {`${C.philosophy.title.join(' ')} ${C.philosophy.desc}`.split(' ').map((w, i) => (
              <span key={i} className="c-word">{w} </span>
            ))}
          </p>
        </div>
      </section>

      {/* ORBIT — 심볼 + 제품 궤도 */}
      <section className="c-orbit relative overflow-hidden bg-[#0b1f3a] text-white">
        <WaveBand color="#f5f8fd" flip />
        <div className="relative mx-auto grid min-h-[820px] max-w-[1240px] place-items-center px-6 py-10">
          <div className="absolute left-6 top-10" data-reveal>
            <p className="text-[12px] tracking-[0.3em] text-[#7fb2ff]">OUR NETWORK</p>
            <h2 className="mt-2 text-[clamp(28px,3vw,44px)] font-bold">세계의 기술을 하나로</h2>
          </div>
          <div className="relative aspect-square w-[min(88vw,640px)]">
            {[1, 0.7, 0.42].map((s) => (
              <span key={s} className="c-orbit-ring absolute inset-0 m-auto rounded-full border border-white/15" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
            ))}
            <span className="absolute inset-0 m-auto h-[42%] w-[42%] rounded-full bg-[#1f5eff]/30 blur-2xl" />
            <div className="absolute inset-0 grid place-items-center">
              <Symbol className="h-24 w-24" />
            </div>
            {/* 회전 궤도 */}
            <div className="absolute inset-0" style={{ animation: 'orbit 40s linear infinite' }}>
              {C.products.map((p, i) => {
                const a = (i / C.products.length) * Math.PI * 2;
                return (
                  <div key={p.name} className="absolute" style={{ left: `${(50 + Math.cos(a) * 50).toFixed(2)}%`, top: `${(50 + Math.sin(a) * 50).toFixed(2)}%` }}>
                    <div className="-translate-x-1/2 -translate-y-1/2" style={{ animation: 'orbit-rev 40s linear infinite' }}>
                      <a href="#" className="group grid h-24 w-24 place-items-center rounded-full border border-white/20 bg-[#0b1f3a] text-center text-[12px] font-semibold transition hover:scale-125 hover:border-[#1f5eff] hover:bg-[#1f5eff] md:h-28 md:w-28">
                        {p.name}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* 안쪽 역회전 점 */}
            <div className="absolute inset-[29%]" style={{ animation: 'orbit-rev 14s linear infinite' }}>
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7fd3ff] shadow-[0_0_20px_#7fd3ff]" />
            </div>
          </div>
        </div>
        <WaveBand color="#ffffff" />
      </section>

      {/* PRODUCT FEATURE */}
      <section className="bg-white px-6 py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <p className="text-[12px] font-semibold tracking-[0.3em] text-[#1f5eff]">OUR PRODUCT</p>
              <h2 className="mt-2 text-[clamp(30px,3.4vw,48px)] font-bold tracking-tight">Featured Product</h2>
            </div>
            <a href="#" className="text-sm font-semibold">전체 제품 보기 →</a>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {C.products.slice(0, 3).map((p, i) => (
              <a key={p.name} href="#" data-reveal={i * 0.1} className="group relative overflow-hidden rounded-[32px] bg-[#f5f8fd] p-3">
                <div className="overflow-hidden rounded-[24px]">
                  <ProductVisual name={p.name} image={p.image} className="aspect-square transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-[11px] tracking-[0.2em] text-[#1f5eff]">{p.tag}</p>
                    <h3 className="mt-1 text-xl font-bold">{p.name}</h3>
                  </div>
                  <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-slate-300">
                    <span className="absolute inset-0 scale-0 rounded-full bg-[#1f5eff] transition-transform duration-500 group-hover:scale-100" />
                    <ArrowRight className="relative h-4 w-4 transition group-hover:text-white" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-[1240px]">
          <h2 className="text-center text-[clamp(28px,3vw,44px)] font-bold" data-reveal>{C.values.title}</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {C.values.items.map((v, i) => {
              const Icon = [Award, Globe2, Headset][i];
              return (
                <div key={v.en} data-reveal={i * 0.1} className="group rounded-[32px] bg-white p-10 shadow-[0_20px_60px_-30px_rgba(11,31,58,.3)] transition hover:-translate-y-2">
                  <span className="relative grid h-16 w-16 place-items-center rounded-full bg-[#eaf1ff] text-[#1f5eff]">
                    <span className="absolute inset-0 rounded-full border border-[#1f5eff]/40 opacity-0 group-hover:opacity-100" style={{ animation: 'ripple-out 1.6s ease-out infinite' }} />
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-8 text-2xl font-bold">{v.en}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#1f5eff]">{v.ko}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP + NEWS */}
      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div data-reveal className="relative overflow-hidden rounded-[32px] p-12 text-white" style={{ background: `linear-gradient(135deg, ${BLUE}, ${NAVY})` }}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full border border-white/25" style={{ animation: `ripple-out 4.5s ease-out ${i * 1.5}s infinite` }} />
            ))}
            <p className="relative text-[12px] tracking-[0.3em] text-white/70">{C.partnership.eyebrow}</p>
            <h2 className="relative mt-4 text-[clamp(28px,3vw,42px)] font-bold leading-snug">
              {C.partnership.title[0]}
              <br />
              {C.partnership.title[1]}
            </h2>
            <p className="relative mt-4 max-w-sm text-sm text-white/70">{C.partnership.desc}</p>
            <div className="relative mt-10 flex flex-wrap gap-3">
              {C.partnership.cards.map((c, i) => (
                <a key={c.title} href="#" className={`rounded-full px-6 py-3 text-sm font-semibold ${i === 0 ? 'bg-white text-[#0b1f3a]' : 'border border-white/50'}`}>
                  {c.title}
                </a>
              ))}
            </div>
          </div>
          <div data-reveal="0.1" className="rounded-[32px] bg-white p-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">새로운 소식</h2>
              <a href="#" className="text-sm text-slate-500">더보기 +</a>
            </div>
            <ul className="mt-6">
              {C.news.map((n) => (
                <li key={n.title}>
                  <a href="#" className="group block border-t border-slate-200 py-5">
                    <span className="flex gap-3 text-[11px] tracking-widest text-slate-400">
                      <span className="font-semibold text-[#1f5eff]">{n.cat}</span>
                      {n.date}
                    </span>
                    <span className="mt-2 block font-medium transition group-hover:text-[#1f5eff]">{n.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer tone="light" />
    </div>
  );
}
