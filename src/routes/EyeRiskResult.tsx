import { Link } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import DisclaimerBanner from '@/components/ai/DisclaimerBanner';
import RiskScoreCard from '@/components/ai/RiskScoreCard';
import AIRecommendationCard from '@/components/ai/AIRecommendationCard';
import Button from '@/components/shared/Button';
import { loadLS } from '@/lib/utils';
import type { EyeCheckResult } from '@/types/eyeCheck';

export default function EyeRiskResult() {
  const result = loadLS<EyeCheckResult>('lastEyeCheck', { riskScore: 0, riskLevel: 'Risiko Rendah', recommendation: '-', suggestedAction: '-', suggestedProductCategory: '-', suggestedEducationTopic: '-' });
  return (
    <div className="space-y-4 px-4 pb-4">
      <TopBar title="Hasil Cek Mata AI" />
      <RiskScoreCard result={result} />
      <AIRecommendationCard result={result} />
      <div className="grid grid-cols-2 gap-2">
        <Link to="/booking"><Button className="w-full">Booking Pemeriksaan</Button></Link>
        <Link to="/marketplace"><Button className="w-full bg-primeGold text-primeNavy">Lihat Produk</Button></Link>
      </div>
      <DisclaimerBanner />
    </div>
  );
}
