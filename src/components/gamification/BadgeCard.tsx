import Card from '@/components/shared/Card';
export default function BadgeCard({ text }: { text: string }) { return <Card><p className="font-semibold">BadgeCard</p><p className="text-sm">{text}</p></Card>; }
