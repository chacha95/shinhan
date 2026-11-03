'use client';

// 국문/영문 전환 — 영문은 /en 아래 같은 구조 (/en, /en/about, /en/product, /en/contact)
import { createContext, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ko, en } from './content';

export type Lang = 'ko' | 'en';

const LangContext = createContext<Lang>('ko');

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = 'ko';
    };
  }, [lang]);
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** 현재 언어의 공통 콘텐츠 */
export const useContent = () => (useLang() === 'en' ? en : ko);

/** 내부 경로에 언어 접두어 붙이기 — '/contact#form' → '/en/contact#form' */
export function useHref() {
  const lang = useLang();
  return (path: string) => (lang === 'en' ? (path === '/' ? '/en' : `/en${path}`) : path);
}

/** KR / EN 전환 — 같은 페이지의 다른 언어로 이동 */
export function LangSwitch({ className = '' }: { className?: string }) {
  const lang = useLang();
  const path = usePathname();
  const base = path.replace(/^\/en(?=\/|$)/, '') || '/';
  const to = { ko: base, en: base === '/' ? '/en' : `/en${base}` };
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {(['ko', 'en'] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="h-2.5 w-px bg-current opacity-30" />}
          <Link
            href={to[l]}
            hrefLang={l}
            aria-current={lang === l ? 'true' : undefined}
            className={`transition-opacity hover:opacity-100 ${lang === l ? 'opacity-100' : 'opacity-50'}`}
          >
            {l === 'ko' ? 'KR' : 'EN'}
          </Link>
        </span>
      ))}
    </div>
  );
}
