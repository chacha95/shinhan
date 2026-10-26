'use client';

// 시안 B — TIDE : 마우스에 반응하는 물결 필드 + 원형 마스크 전환 + 가로 스크롤 제품
import { useEffect, useRef } from 'react';
import { WaveField } from './WaveField';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap, useSmoothScroll, reveal, countUp } from './motion';
import { Symbol, Wordmark } from './Symbol';
import { ProductVisual } from './ProductVisual';
import { Footer } from './DesignA';
import * as C from './content';

const INK = '#041322';
const BLUE = '#2f6bff';

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className ?? ''}`}>
      {[...text].map((ch, i) => (
        <span key={i} className="b-char inline-block will-change-transform">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

export default function DesignB() {
  useSmoothScroll();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 인트로 — 원이 열리며 물결 등장
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.b-intro', { clipPath: 'circle(0% at 50% 46%)' }, { clipPath: 'circle(150% at 50% 46%)', duration: 2.2, ease: 'expo.inOut' })
        .from('.b-char', { yPercent: 120, rotate: 12, duration: 1.3, stagger: 0.03 }, 1.1)
        .from('.b-fade', { opacity: 0, y: 24, duration: 1, stagger: 0.1 }, 1.6);

      // 히어로 스크롤 시 물결 가라앉음
      gsap.to('.b-hero-inner', {
        yPercent: 40,
        opacity: 0,
        scrollTrigger: { trigger: '.b-hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      // 원형 마스크 리빌 (다크 → 화이트)
      const rv = gsap.timeline({
        scrollTrigger: { trigger: '.b-reveal', start: 'top top', end: '+=200%', scrub: 1, pin: true },
      });
      rv.fromTo('.b-reveal-panel', { clipPath: 'circle(4% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 1, ease: 'power2.in' })
        .from('.b-reveal-txt > *', { y: 80, opacity: 0, stagger: 0.15, duration: 0.6 }, 0.6)
        .to({}, { duration: 0.4 });

      // 가로 스크롤 제품
      const track = document.querySelector<HTMLElement>('.b-track')!;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 48),
        ease: 'none',
        scrollTrigger: {
          trigger: '.b-products',
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // 세 개의 원이 겹쳐 있다가 펼쳐짐 (연결의 가치)
      const vt = gsap.timeline({
        scrollTrigger: { trigger: '.b-values', start: 'top top', end: '+=160%', scrub: 1, pin: true },
      });
      vt.from('.b-venn-0', { xPercent: 100, duration: 1 })
        .from('.b-venn-2', { xPercent: -100, duration: 1 }, 0)
        .from('.b-venn-txt', { opacity: 0, y: 30, stagger: 0.1, duration: 0.5 }, 0.6);

      reveal(root.current!);
      countUp(root.current!);
    }, root);
    return () => ctx.revert();
  }, []);

  const marquee = 'CONNECTING VALUE · CREATING TOMORROW · SHINHAN NETWORKS · ';

  return (
    <div ref={root} style={{ background: INK }} className="text-white">
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6">
          <Wordmark />
          <nav className="hidden gap-10 text-[13px] tracking-[0.14em] md:flex">
            {C.nav.map((n) => (
              <a key={n} href="#">{n}</a>
            ))}
          </nav>
          <a href="#" className="text-[13px] underline underline-offset-4">문의하기</a>
        </div>
      </header>

      {/* HERO */}
      <section className="b-hero relative h-svh min-h-[700px] overflow-hidden">
        <div className="b-intro absolute inset-0">
          <WaveField className="b-canvas absolute inset-0 h-full w-full" />
        </div>
        <div className="b-hero-inner relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="b-fade text-[12px] tracking-[0.3em] text-[#8fb8ff]">{C.hero.eyebrow}</p>
          <h1 className="mt-6 text-[clamp(44px,8vw,128px)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            <SplitText text="전문성을 잇고," />
            <SplitText text="가치를 연결하다" className="text-[#8fb8ff]" />
          </h1>
          <p className="b-fade mt-8 max-w-md text-[15px] text-white/60">{C.hero.desc}</p>
          <div className="b-fade absolute bottom-10 flex flex-col items-center gap-3 text-[11px] tracking-[0.3em] text-white/50">
            SCROLL
            <span className="relative block h-12 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white" style={{ animation: 'drip 1.6s ease-in-out infinite' }} />
            </span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-white/10 py-6">
        <div className="flex w-max" style={{ animation: 'marquee 28s linear infinite' }}>
          {[0, 1].map((k) => (
            <span key={k} className="whitespace-nowrap pr-8 text-[clamp(28px,4vw,56px)] font-bold tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(143,184,255,.5)]">
              {marquee.repeat(3)}
            </span>
          ))}
        </div>
      </div>

      {/* CIRCLE REVEAL */}
      <section className="b-reveal relative h-svh overflow-hidden">
        <div className="absolute inset-0 grid place-items-center">
          <Symbol className="h-40 w-40 opacity-40" />
        </div>
        <div className="b-reveal-panel absolute inset-0 grid place-items-center bg-[#f2f6fc] text-[#041322]">
          <div className="b-reveal-txt max-w-3xl px-6 text-center">
            <p className="text-[12px] tracking-[0.3em] text-[#2f6bff]">{C.philosophy.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(32px,4.6vw,64px)] font-bold leading-[1.2] tracking-[-0.03em]">
              {C.philosophy.title[0]}
              <br />
              {C.philosophy.title[1]}
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-slate-500">{C.philosophy.desc}</p>
            <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
              {C.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-4xl font-bold">
                    <span data-count={s.value}>0</span>
                    <span className="text-[#2f6bff]">{s.suffix}</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS — 가로 스크롤 */}
      <section className="b-products relative h-svh overflow-hidden bg-[#f2f6fc] text-[#041322]">
        <div className="absolute left-6 top-24 z-10 md:left-12">
          <p className="text-[12px] tracking-[0.3em] text-[#2f6bff]">OUR PRODUCT</p>
          <h2 className="mt-2 text-[clamp(32px,4vw,56px)] font-bold tracking-tight">Featured Product</h2>
        </div>
        <div className="b-track flex h-full items-end gap-6 pb-16 pl-6 pt-48 md:pl-12">
          {C.products.map((p, i) => (
            <article key={p.name} className="group relative flex h-full w-[min(78vw,420px)] shrink-0 flex-col overflow-hidden rounded-[28px] bg-white">
              <ProductVisual name={p.name} image={p.image} tone={i % 2 ? 'dark' : 'light'} className="flex-1 transition-transform duration-700 group-hover:scale-105" />
              <div className="flex items-end justify-between p-7">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-[#2f6bff]">{p.tag}</p>
                  <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm text-slate-500">{p.copy}</p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#041322] text-white transition group-hover:bg-[#2f6bff]">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <span className="absolute right-6 top-5 text-[64px] font-black leading-none text-black/5">0{i + 1}</span>
            </article>
          ))}
        </div>
      </section>

      {/* VALUES — 세 개의 원 */}
      <section className="b-values relative grid h-svh place-items-center overflow-hidden px-6">
        <div className="absolute left-6 top-24 md:left-12">
          <p className="text-[12px] tracking-[0.3em] text-[#8fb8ff]">{C.values.eyebrow}</p>
          <h2 className="mt-2 text-[clamp(28px,3vw,44px)] font-bold">{C.values.title}</h2>
        </div>
        <div className="mt-20 flex items-center">
          {C.values.items.map((v, i) => (
            <div
              key={v.en}
              className={`b-venn-${i} relative -mx-[3vw] grid aspect-square w-[min(34vw,360px)] place-items-center rounded-full border border-[#8fb8ff]/40 text-center`}
              style={{ background: i === 1 ? 'radial-gradient(circle, rgba(47,107,255,.5), rgba(47,107,255,.08) 70%)' : 'radial-gradient(circle, rgba(143,184,255,.12), transparent 70%)', zIndex: i === 1 ? 2 : 1 }}
            >
              <div className="b-venn-txt px-8">
                <h3 className="text-[clamp(18px,2vw,30px)] font-bold">{v.en}</h3>
                <p className="mt-1 text-xs text-[#8fb8ff] md:text-sm">{v.ko}</p>
                <p className="mx-auto mt-4 hidden max-w-[220px] text-[13px] leading-relaxed text-white/60 md:block">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERSHIP */}
      <section className="relative overflow-hidden px-6 py-32" style={{ background: BLUE }}>
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" style={{ animation: 'ripple-out 4s ease-out infinite' }} />
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" style={{ animation: 'ripple-out 4s ease-out 2s infinite' }} />
        <div className="relative mx-auto max-w-[1100px] text-center" data-reveal>
          <p className="text-[12px] tracking-[0.3em] text-white/70">{C.partnership.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(34px,5vw,72px)] font-extrabold leading-[1.1] tracking-[-0.03em]">
            {C.partnership.title[0]}
            <br />
            {C.partnership.title[1]}
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {C.partnership.cards.map((c, i) => (
              <a key={c.title} href="#" className={`group inline-flex items-center gap-4 rounded-full px-8 py-5 font-semibold transition ${i === 0 ? 'bg-white text-[#041322]' : 'border border-white/50 hover:bg-white/10'}`}>
                {c.title}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-[1300px]">
          <div className="flex items-end justify-between" data-reveal>
            <h2 className="text-[clamp(30px,4vw,56px)] font-bold">새로운 소식</h2>
            <a href="#" className="text-sm text-white/70">VIEW ALL →</a>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {C.news.map((n, i) => (
              <a key={n.title} href="#" data-reveal={i * 0.1} className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-8">
                <span className="absolute -bottom-1/2 -right-1/2 aspect-square w-full rounded-full bg-[#2f6bff] opacity-0 transition-all duration-700 group-hover:-bottom-1/4 group-hover:-right-1/4 group-hover:opacity-100" />
                <span className="relative flex justify-between text-[12px] tracking-[0.2em] text-[#8fb8ff] group-hover:text-white">
                  {n.cat}
                  <span className="text-white/50">{n.date}</span>
                </span>
                <span className="relative text-xl font-semibold leading-snug">{n.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
