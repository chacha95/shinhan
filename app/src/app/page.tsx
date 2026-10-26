import type { Metadata } from 'next';
import DesignA from '@/components/shinhan/DesignA';

export const metadata: Metadata = {
  title: '신한네트웍스 | SHINHAN NETWORKS',
  description: '의료기기 전문성과 글로벌 브랜드를 연결하는 신한네트웍스',
};

export default function Home() {
  return <DesignA />;
}
