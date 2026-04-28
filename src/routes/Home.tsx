import { Link } from 'react-router-dom';
import HeroCard from '@/components/home/HeroCard';
import EyeScorePreview from '@/components/home/EyeScorePreview';
import DailyChallengeCard from '@/components/home/DailyChallengeCard';
import VoucherPreview from '@/components/home/VoucherPreview';
import RecommendedProducts from '@/components/home/RecommendedProducts';
import EducationPreview from '@/components/home/EducationPreview';
import TopBar from '@/components/layout/TopBar';
import Card from '@/components/shared/Card';
import { loadLS } from '@/lib/utils';

export default function Home() {
  const score = loadLS<number>('lastRiskScore', 48);

  return (
    <div className="space-y-4 bg-slate-50 px-4 pb-5">
      <TopBar title="Halo, Rina. Sudah istirahatkan mata hari ini?" />

      <div className="rounded-2xl bg-white p-3 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wide text-primeNavy">Fitur Cepat</p>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs font-medium">
          <Link className="rounded-xl bg-sky-50 px-2 py-3 text-primeNavy" to="/ai-check">Cek AI</Link>
          <Link className="rounded-xl bg-amber-50 px-2 py-3 text-primeNavy" to="/marketplace">Marketplace</Link>
          <Link className="rounded-xl bg-emerald-50 px-2 py-3 text-primeNavy" to="/education">Edukasi</Link>
        </div>
      </div>

      <HeroCard />
      <EyeScorePreview score={score} />
      <DailyChallengeCard />

      <Card className="border border-primeNavy/10 bg-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primeNavy">Butuh jadwal pemeriksaan?</p>
            <p className="text-xs text-slate-500">Fitur booking sekarang tersedia di menu Edukasi.</p>
          </div>
          <Link to="/education" className="rounded-lg bg-primeNavy px-3 py-2 text-xs font-semibold text-white">
            Buka Edukasi
          </Link>
        </div>
      </Card>

      <VoucherPreview />
      <RecommendedProducts />
      <EducationPreview />
    </div>
  );
}
