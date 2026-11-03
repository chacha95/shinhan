import type { Metadata } from 'next';
import ContactPage from '@/components/shinhan/ContactPage';

export const metadata: Metadata = { title: '문의 | 신한네트웍스' };

export default function Page() {
  return <ContactPage />;
}
