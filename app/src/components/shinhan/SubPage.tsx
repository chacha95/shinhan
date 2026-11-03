'use client';

// ABOUT / PRODUCT / CONTACT 공통 — 헤더·푸터·서브 히어로·섹션 머리글
import { useEffect, useRef } from 'react';
import { gsap, useSmoothScroll, reveal } from './motion';
import { Header, Footer } from './DesignA';
import * as C from './content';

export function SubPage({ active, children }: { active: (typeof C.nav)[number]; children: React.ReactNode }) {
  useSmoothScroll();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.s-hero-bg', { scale: 1.12, opacity: 0, duration: 2 })
        .from('.s-hero-txt > *', { y: 40, opacity: 0, duration: 1.2, stagger: 0.12 }, 0.2);
      reveal(root.current!);
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={root} className="bg-white text-black">
      <Header active={active} />
      {children}
      <Footer />
    </div>
  );
}

/** Figma 서브 히어로 — 실크 배경 + 청록 오버레이, 가운데 정렬 */
export function SubHero({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <section className="relative overflow-hidden bg-[#092C32] pt-[77px] text-white">
      <div className="s-hero-bg absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/hero/hero-bg.jpg)', animation: 'hero-drift 24s ease-in-out infinite alternate' }} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(3,28,35,.98) 0%, rgba(3,35,42,.92) 46%, rgba(2,27,34,.7) 100%), linear-gradient(0deg, rgba(3,25,31,.9) 0%, rgba(3,25,31,0) 55%)',
        }}
      />
      {/* Figma blur 글로우 2개 */}
      <span className="pointer-events-none absolute -bottom-1/2 -left-40 h-[643px] w-[723px] rounded-full" style={{ background: 'radial-gradient(70.71% 70.71% at 50% 50%, rgba(121,201,250,.35) 0%, rgba(121,201,250,0) 64%)', animation: 'pv-float 9s ease-in-out infinite' }} />
      <span className="pointer-events-none absolute -right-40 -top-1/3 h-[614px] w-[614px] rounded-full opacity-70" style={{ background: 'radial-gradient(70.71% 70.71% at 50% 50%, rgba(121,201,250,.35) 0%, rgba(121,201,250,0) 64%)', animation: 'pv-float 11s ease-in-out infinite reverse' }} />
      <div className="s-hero-txt relative mx-auto flex h-[492px] max-w-[1200px] flex-col items-center justify-center px-6 text-center">
        <p className="t-eyebrow !leading-[15px] text-[#71B4FE]">{eyebrow}</p>
        <h1 className="t-display-lg mt-4 !font-bold tracking-[-0.02em]">{title}</h1>
        <p className="t-body-lg mt-7 max-w-[625px] whitespace-pre-line text-white/80">{desc}</p>
      </div>
    </section>
  );
}

/** 섹션 머리글 — 왼쪽 라벨+제목, 오른쪽 설명 */
export function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
      <div>
        <p className="t-eyebrow text-[#1F7AE0]">{eyebrow}</p>
        <h2 className="t-display-md mt-3 whitespace-pre-line">{title}</h2>
      </div>
      {desc && <p className="t-body-md max-w-[380px] whitespace-pre-line text-[#666]">{desc}</p>}
    </div>
  );
}
