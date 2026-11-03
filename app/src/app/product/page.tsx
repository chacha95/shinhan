import type { Metadata } from 'next';
import ProductPage from '@/components/shinhan/ProductPage';

export const metadata: Metadata = { title: '제품 소개 | 신한네트웍스' };

export default function Page() {
  return <ProductPage />;
}
