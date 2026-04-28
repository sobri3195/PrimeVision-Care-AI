import Card from '@/components/shared/Card';
import ProgressBar from '@/components/shared/ProgressBar';
import type { EyeCheckResult } from '@/types/eyeCheck';

export default function RiskScoreCard({ result }: { result: EyeCheckResult }) {
  return (
    <Card>
      <p className="text-xs text-slate-500">AI Eye Risk Score</p>
      <p className="text-3xl font-bold text-primeNavy">{result.riskScore}</p>
      <p className="font-semibold">{result.riskLevel}</p>
      <ProgressBar value={result.riskScore} />
    </Card>
  );
}
