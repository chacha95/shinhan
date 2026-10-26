// 슬롯머신처럼 자릿수가 휘리릭 굴러 올라가는 숫자
import { gsap } from './motion';

const DIGITS = Array.from({ length: 30 }, (_, i) => i % 10); // 0-9 세 바퀴

export function Odometer({ value }: { value: number }) {
  return (
    <span className="inline-flex tabular-nums" aria-label={value.toLocaleString()}>
      {[...value.toLocaleString()].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="inline-block h-[1em] overflow-hidden leading-none" aria-hidden>
            <span className="odo-col block" data-digit={ch}>
              {DIGITS.map((d, k) => (
                <span key={k} className="block h-[1em] leading-none">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} className="leading-none" aria-hidden>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

/** scope 안의 Odometer를 뷰포트 진입 시 굴림 — 마지막 바퀴의 목표 숫자에서 멈춤 */
export function rollOdometers(scope: Element) {
  scope.querySelectorAll<HTMLElement>('.odo-col').forEach((col, i) => {
    const target = 20 + Number(col.dataset.digit);
    gsap.fromTo(
      col,
      { yPercent: 0 },
      {
        yPercent: -(target / DIGITS.length) * 100,
        duration: 1.6 + (i % 4) * 0.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: col.parentElement, start: 'top 90%' },
      },
    );
  });
}
