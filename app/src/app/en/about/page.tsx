import type { Metadata } from 'next';
import AboutPage from '@/components/shinhan/AboutPage';
import { LangProvider } from '@/components/shinhan/i18n';

export const metadata: Metadata = { title: 'About Us | SHINHAN NETWORKS' };

export default function Page() {
  return (
    <LangProvider lang="en">
      <AboutPage />
    </LangProvider>
  );
}
