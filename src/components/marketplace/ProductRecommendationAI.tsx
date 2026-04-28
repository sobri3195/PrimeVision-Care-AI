import Card from '@/components/shared/Card';
export default function ProductRecommendationAI({ reasons }: { reasons: string[] }) { return <Card><p className="font-semibold">Direkomendasikan berdasarkan hasil cek mata Anda.</p><p className="text-sm">{reasons.join(', ') || 'Lengkapi cek AI untuk rekomendasi.'}</p></Card>; }
