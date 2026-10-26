'use client';

// 마우스에 반응하는 물결선 필드 (시안 A·B 공용)
import { useRef } from 'react';
import { useCanvas, useMouse } from './motion';

type Props = {
  /** 중심 x 비율 — 데스크톱(>1024px) / 그 외 */
  cx?: number;
  cxMobile?: number;
  cy?: number;
  /** 숨 쉬는 큰 원과 글로우를 그릴지 */
  circle?: boolean;
  /** 마우스 주변 물결 융기 */
  interactive?: boolean;
  className?: string;
};

export function WaveField({ cx = 0.5, cxMobile = 0.5, cy = 0.46, circle = true, interactive = true, className }: Props) {
  const mouse = useMouse();
  const smooth = useRef({ x: -9999, y: -9999 });

  const ref = useCanvas((ctx, w, h, t) => {
    const s = smooth.current;
    const m = mouse.current;
    s.x += (m.x - s.x) * 0.08;
    s.y += (m.y - s.y) * 0.08;

    const x0 = w * (w > 1024 ? cx : cxMobile);
    const y0 = h * cy;
    const R = Math.min(w, h) * (0.34 + Math.sin(t * 0.8) * 0.015);

    if (circle) {
      const g = ctx.createRadialGradient(x0, y0, R * 0.2, x0, y0, R * 1.6);
      g.addColorStop(0, 'rgba(47,107,255,.55)');
      g.addColorStop(0.5, 'rgba(47,107,255,.12)');
      g.addColorStop(1, 'rgba(47,107,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.beginPath();
      ctx.arc(x0, y0, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(150,200,255,.35)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const rows = 56;
    for (let i = 0; i < rows; i++) {
      const p = i / (rows - 1);
      const base = h * 0.04 + p * h * 0.96;
      ctx.beginPath();
      for (let x = -10; x <= w + 10; x += 10) {
        let y =
          base +
          Math.sin(x * 0.004 + t * 1.1 + p * 6) * 22 +
          Math.sin(x * 0.011 - t * 0.7 + p * 11) * 8 +
          Math.cos(t * 0.5 + p * 3) * 10;
        // 마우스 주변 융기
        const dx = x - s.x;
        const dy = base - s.y;
        const d2 = dx * dx + dy * dy;
        if (interactive) y -= Math.exp(-d2 / 18000) * 70 * Math.sin(t * 3 - Math.sqrt(d2) * 0.03 + 1.5);
        if (x === -10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // 중심 높이에 가까울수록 밝게
      const near = 1 - Math.min(1, Math.abs(base - y0) / R);
      ctx.strokeStyle = `rgba(${120 + near * 100},${180 + near * 60},255,${0.08 + near * 0.35})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });

  return <canvas ref={ref} className={className ?? 'absolute inset-0 h-full w-full'} />;
}
