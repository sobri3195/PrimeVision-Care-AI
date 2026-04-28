import Card from '@/components/shared/Card';
export default function EyeScorePreview({ score }: { score: number }) { return <Card><p className="text-sm">Skor mata terakhir</p><p className="text-2xl font-bold text-primeNavy">{score}</p></Card>; }
