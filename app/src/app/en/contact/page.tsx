import type { Metadata } from 'next';
import ContactPage from '@/components/shinhan/ContactPage';
import { LangProvider } from '@/components/shinhan/i18n';

export const metadata: Metadata = { title: 'Contact Us | SHINHAN NETWORKS' };

export default function Page() {
  return (
    <LangProvider lang="en">
      <ContactPage />
    </LangProvider>
  );
}
