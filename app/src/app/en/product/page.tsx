import type { Metadata } from 'next';
import ProductPage from '@/components/shinhan/ProductPage';
import { LangProvider } from '@/components/shinhan/i18n';

export const metadata: Metadata = { title: 'Product | SHINHAN NETWORKS' };

export default function Page() {
  return (
    <LangProvider lang="en">
      <ProductPage />
    </LangProvider>
  );
}
