import Link from 'next/link';

const drafts = [
  { href: '/a', name: '시안 A — PULSE', desc: 'Figma 원안 충실형. 다크 네이비, 동심원 파동, 원근 물결선, 심볼 드로잉 스크롤 시퀀스.' },
  { href: '/b', name: '시안 B — TIDE', desc: '마우스에 반응하는 물결 필드, 원형 마스크 전환, 가로 스크롤 제품, 세 원이 펼쳐지는 가치 섹션.' },
  { href: '/c', name: '시안 C — RIPPLE', desc: '라이트 클리니컬 톤. 클릭·이동 시 수면 파문, 떠다니는 구체, 제품 궤도 회전, 원형 게이지.' },
];

export const metadata = { title: '신한네트웍스 — 시안 모음' };

export default function Drafts() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#08131f] p-8 text-white">
      <div className="w-full max-w-3xl">
        <p className="text-[12px] tracking-[0.3em] text-[#7fd3ff]">SHINHAN NETWORKS · MAIN DRAFTS</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">신한네트웍스 메인 시안</h1>
        <ul className="mt-10 grid gap-3">
          {drafts.map((d) => (
            <li key={d.href}>
              <Link href={d.href} className="group block rounded-2xl border border-white/10 p-6 transition hover:border-[#7fd3ff]/60 hover:bg-white/5">
                <span className="flex items-center justify-between text-xl font-semibold">
                  {d.name}
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
                <span className="mt-2 block text-sm text-white/60">{d.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
