import type { Metadata } from 'next';
import DesignA from '@/components/shinhan/DesignA';
import { LangProvider } from '@/components/shinhan/i18n';

export const metadata: Metadata = {
  title: 'SHINHAN NETWORKS',
  description: 'Shinhan Networks connects medical device expertise with global brands.',
};

export default function Home() {
  return (
    <LangProvider lang="en">
      <DesignA />
    </LangProvider>
  );
}
