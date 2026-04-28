import { useMemo, useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import SearchInput from '@/components/shared/SearchInput';
import CategoryTabs from '@/components/education/CategoryTabs';
import { mockEducation } from '@/data/mockEducation';
import EducationCard from '@/components/education/EducationCard';
import MythFactCard from '@/components/education/MythFactCard';
import AIEducatorBox from '@/components/education/AIEducatorBox';

export default function Education() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Semua');
  const cats = ['Semua', ...Array.from(new Set(mockEducation.map((m) => m.category)))];
  const items = useMemo(() => mockEducation.filter((m) => (cat === 'Semua' || m.category === cat) && m.title.toLowerCase().includes(q.toLowerCase())), [q, cat]);
  return <div className="space-y-4 px-4 pb-4"><TopBar title="Edukasi" /><SearchInput value={q} onChange={setQ} placeholder="Cari edukasi" /><CategoryTabs categories={cats} value={cat} onChange={setCat} /><MythFactCard /><AIEducatorBox topic={cat} />{items.slice(0, 8).map((item)=><EducationCard key={item.id} item={item} />)}</div>;
}
