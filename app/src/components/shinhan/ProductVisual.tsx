// 제품 비주얼 — Figma 'img' 레이어(662×620) 값 그대로: 하늘빛 그라데이션 + 기울어진 타원 2개 + 바닥 그림자
import Image from 'next/image';

type Props = { name: string; image?: string; tone?: 'dark' | 'light'; className?: string };

// Figma px → 컨테이너 비율(%)
const W = 662.39;
const H = 620;
const box = (w: number, h: number, l: number, t: number) => ({ width: `${(w / W) * 100}%`, height: `${(h / H) * 100}%`, left: `${(l / W) * 100}%`, top: `${(t / H) * 100}%` });

export function ProductVisual({ name, image, tone = 'light', className }: Props) {
  const dark = tone === 'dark';
  return (
    <div
      className={`relative overflow-hidden ${className ?? ''}`}
      style={{
        background: dark
          ? '#13263b'
          : 'radial-gradient(68.49% 73.17% at 50% 50%, rgba(255,255,255,.95) 0%, rgba(255,255,255,.95) 22%, rgba(255,255,255,0) 55%), linear-gradient(145deg, #E0F3FF 6.17%, #F6F9F8 47.37%, #E0F3FF 93.83%)',
      }}
    >
      {/* 기울어진 타원 2개 — 천천히 흔들림 */}
      <span className="absolute rounded-[50%] border border-[#79C9FA]/20" style={{ ...box(550, 484, 15.2, 16.1), rotate: '-12deg', animation: 'pv-sway 14s ease-in-out infinite' }} />
      <span className="absolute rounded-[50%] border border-[#79C9FA]/20" style={{ ...box(682, 347, -99.65, 33.78), rotate: '22deg', animation: 'pv-sway 18s ease-in-out infinite reverse' }} />
      {/* 바닥 그림자 */}
      <span className="absolute rounded-[50%] bg-[rgba(45,93,124,.17)] blur-[18px]" style={{ ...box(212, 43, 226, 519), animation: 'pv-shadow 6s ease-in-out infinite' }} />
      {image && (
        <div className="absolute inset-x-0 mx-auto w-[60%]" style={{ top: `${(71 / H) * 100}%`, height: `${(523 / H) * 100}%`, animation: 'pv-float 6s ease-in-out infinite' }}>
          <Image src={image} alt={name} fill loading="eager" sizes="(min-width: 768px) 40vw, 80vw" className="object-contain object-bottom" />
        </div>
      )}
      <span className="absolute left-7 top-7 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold leading-[7px] tracking-[2px] text-[#1F7AE0] backdrop-blur-[8px]">
        GLOBAL MEDICAL BRAND
      </span>
    </div>
  );
}
