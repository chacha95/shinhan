'use client';

// 하단 플로팅 '맨 위로' 버튼 — 스크롤 진행률을 테두리 원으로 표시
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from './motion';

export function BackToTop() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const show = p > 0.08;
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="맨 위로"
      className={`group fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#1A2D3B]/90 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,.5)] backdrop-blur-md transition-all duration-500 hover:bg-[#1F7AE0] md:bottom-10 md:right-10 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
        <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2" />
        <circle cx="28" cy="28" r="26" fill="none" stroke="#71B4FE" strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      </svg>
      <ArrowUp className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
