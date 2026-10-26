// 제품 비주얼 — 실제 제품 컷이 있으면 사용, 없으면 장비 실루엣 자리표시
import Image from 'next/image';

type Props = { name: string; image?: string; tone?: 'dark' | 'light'; className?: string };

export function ProductVisual({ name, image, tone = 'light', className }: Props) {
  const dark = tone === 'dark';
  const line = dark ? 'rgba(255,255,255,.12)' : 'rgba(13,27,42,.1)';
  return (
    <div className={`relative grid place-items-center overflow-hidden ${className ?? ''}`} style={{ background: dark ? '#13263b' : '#eef3f8' }}>
      {[1, 0.72, 0.46].map((s, i) => (
        <span
          key={i}
          className="absolute aspect-square rounded-full border"
          style={{
            width: `${s * 90}%`,
            borderColor: line,
            borderStyle: i === 1 ? 'dashed' : 'solid',
          }}
        />
      ))}
      {image ? (
        <div className="relative h-[86%] w-[70%]" style={{ animation: 'pv-float 6s ease-in-out infinite' }}>
          <Image src={image} alt={name} fill sizes="(min-width: 768px) 40vw, 80vw" className="object-contain" />
        </div>
      ) : (
        <div className="relative flex flex-col items-center opacity-80" style={{ animation: 'pv-float 6s ease-in-out infinite' }}>
          <div className="h-24 w-32 rounded-lg border-4" style={{ borderColor: dark ? '#cfd8e3' : '#e3e8ef', background: dark ? '#1f3550' : '#2b3a4f' }} />
          <div className="h-32 w-16 rounded-b-3xl" style={{ background: dark ? '#d8e0ea' : '#f7f9fb' }} />
          <div className="h-2 w-28 rounded-full" style={{ background: dark ? '#8a9bb0' : '#cdd6e2' }} />
        </div>
      )}
      <span className="absolute bottom-4 left-5 text-[11px] font-semibold tracking-[0.2em]" style={{ color: dark ? 'rgba(255,255,255,.5)' : 'rgba(13,27,42,.4)' }}>
        {name.toUpperCase()}
      </span>
    </div>
  );
}
