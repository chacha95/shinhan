// 신한네트웍스 심볼·워드마크 — 원본 AI 벡터(logoPaths.ts) 사용
import { useId } from 'react';
import { LOCKUP_VIEWBOX, SYMBOL_VIEWBOX, WORDMARK_VIEWBOX, symbolPaths, wordmarkPaths } from './logoPaths';

type Props = {
  className?: string;
  /** 패스마다 붙는 클래스 — GSAP로 외곽선 그리기·채우기 애니메이션 할 때 사용 */
  lineClassName?: string;
  /** 외곽선 스트로크 추가 (그리기 애니메이션용) */
  outline?: boolean;
};

function SymbolGradient({ id }: { id: string }) {
  // 원본 로고 그라디언트: 위 청록 → 아래 블루
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="934" x2="0" y2="1315">
      <stop offset="0" stopColor="#5ab1c3" />
      <stop offset="1" stopColor="#2a5ea8" />
    </linearGradient>
  );
}

export function Symbol({ className, lineClassName, outline }: Props) {
  const id = useId();
  return (
    <svg viewBox={SYMBOL_VIEWBOX} className={className} aria-label="신한네트웍스 심볼">
      <defs>
        <SymbolGradient id={id} />
      </defs>
      {symbolPaths.map((d, i) => (
        <path
          key={i}
          d={d}
          className={lineClassName}
          fill={`url(#${id})`}
          {...(outline && { stroke: `url(#${id})`, strokeWidth: 1.5, pathLength: 1 })}
        />
      ))}
    </svg>
  );
}

/** 영문 워드마크만 (currentColor) */
export function LogoType({ className }: { className?: string }) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} fill="currentColor" aria-label="SHINHAN NETWORKS">
      {wordmarkPaths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/** 심볼 + 워드마크 가로형 로고 */
export function Wordmark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox={LOCKUP_VIEWBOX} className={`h-8 w-auto ${className ?? ''}`} aria-label="신한네트웍스">
      <defs>
        <SymbolGradient id={id} />
      </defs>
      {symbolPaths.map((d, i) => (
        <path key={i} d={d} fill={`url(#${id})`} />
      ))}
      <g fill="currentColor">
        {wordmarkPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
