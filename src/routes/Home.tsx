import HeroCard from '@/components/home/HeroCard';
import EyeScorePreview from '@/components/home/EyeScorePreview';
import DailyChallengeCard from '@/components/home/DailyChallengeCard';
import VoucherPreview from '@/components/home/VoucherPreview';
import RecommendedProducts from '@/components/home/RecommendedProducts';
import EducationPreview from '@/components/home/EducationPreview';
import TopBar from '@/components/layout/TopBar';
import { loadLS } from '@/lib/utils';

export default function Home() {
  const score = loadLS<number>('lastRiskScore', 48);
  return (
    <div className="space-y-4 px-4 pb-4">
      <TopBar title="Halo, Rina. Sudah istirahatkan mata hari ini?" />
      <HeroCard />
      <EyeScorePreview score={score} />
      <DailyChallengeCard />
      <VoucherPreview />
      <RecommendedProducts />
      <EducationPreview />
    </div>
  );
}
