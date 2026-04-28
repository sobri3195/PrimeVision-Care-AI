import Card from '@/components/shared/Card';
import type { EducationContent } from '@/types/education';

export default function EducationCard({ item }: { item: EducationContent }) {
  return <Card><p className="font-semibold">{item.title}</p><p className="text-xs text-slate-500">{item.category}</p><p className="text-sm">{item.summary}</p></Card>;
}
