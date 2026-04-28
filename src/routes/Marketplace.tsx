import { useMemo, useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import SearchInput from '@/components/shared/SearchInput';
import ProductCategoryTabs from '@/components/marketplace/ProductCategoryTabs';
import ProductCard from '@/components/marketplace/ProductCard';
import ProductRecommendationAI from '@/components/marketplace/ProductRecommendationAI';
import { mockProducts } from '@/data/mockProducts';
import { loadLS } from '@/lib/utils';
import { recommendProductKeywords } from '@/lib/productRecommendationEngine';

export default function Marketplace() {
  const [q, setQ] = useState(''); const [cat, setCat] = useState('Semua');
  const categories = ['Semua', ...Array.from(new Set(mockProducts.map((p) => p.category)))];
  const lastCheck = loadLS<any>('lastEyeCheck', {});
  const reasons = recommendProductKeywords(lastCheck);
  const items = useMemo(() => mockProducts.filter((p) => (cat === 'Semua' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())), [q, cat]);
  return <div className="space-y-4 px-4 pb-4"><TopBar title="Marketplace" /><ProductRecommendationAI reasons={reasons} /><SearchInput value={q} onChange={setQ} placeholder="Cari produk" /><ProductCategoryTabs categories={categories} value={cat} onChange={setCat} /><div className="grid grid-cols-1 gap-3">{items.slice(0,12).map((p)=><ProductCard key={p.id} product={p} />)}</div></div>;
}
