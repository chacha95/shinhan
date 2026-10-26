'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Lenis 부드러운 스크롤 + ScrollTrigger 동기화 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

/** 캔버스 RAF 루프 — DPR 리사이즈, 화면 밖이면 일시정지 */
export function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void,
) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
  });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const loop = (t: number) => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        drawRef.current(ctx, w, h, t / 1000);
      }
      raf = requestAnimationFrame(loop);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    resize();
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return ref;
}

/** 캔버스 기준 마우스 좌표 (없으면 -9999) */
export function useMouse() {
  const m = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const on = (e: PointerEvent) => {
      m.current.x = e.clientX;
      m.current.y = e.clientY;
    };
    window.addEventListener('pointermove', on);
    return () => window.removeEventListener('pointermove', on);
  }, []);
  return m;
}

/** [data-reveal] 요소를 뷰포트 진입 시 아래→위 페이드인 (부모 [data-stagger] 단위로 순차) */
export function reveal(scope: Element) {
  scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 70,
      opacity: 0,
      duration: 1.1,
      ease: 'power4.out',
      delay: Number(el.dataset.reveal || 0),
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

/** 스크롤 진입 시 숫자 카운트업 — data-count 속성 가진 요소 대상 */
export function countUp(scope: Element) {
  scope.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString()),
    });
  });
}
