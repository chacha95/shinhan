import type { Metadata } from 'next';
import AboutPage from '@/components/shinhan/AboutPage';

export const metadata: Metadata = { title: '회사 소개 | 신한네트웍스' };

export default function Page() {
  return <AboutPage />;
}
