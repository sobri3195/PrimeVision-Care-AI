import Card from '@/components/shared/Card';
import type { EyeCheckResult } from '@/types/eyeCheck';

export default function AIRecommendationCard({ result }: { result: EyeCheckResult }) {
  return (
    <Card>
      <p className="font-semibold">Rekomendasi AI</p>
      <p className="text-sm text-slate-600">{result.recommendation}</p>
      <p className="mt-2 text-sm">Topik edukasi: <b>{result.suggestedEducationTopic}</b></p>
    </Card>
  );
}
