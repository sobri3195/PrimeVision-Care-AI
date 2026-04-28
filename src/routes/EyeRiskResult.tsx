import { Link } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import DisclaimerBanner from '@/components/ai/DisclaimerBanner';
import RiskScoreCard from '@/components/ai/RiskScoreCard';
import AIRecommendationCard from '@/components/ai/AIRecommendationCard';
import Button from '@/components/shared/Button';
import Card from '@/components/shared/Card';
import { loadLS } from '@/lib/utils';
import type { EyeCheckRecord } from '@/types/eyeCheck';

const fallback: EyeCheckRecord = {
  id: 'fallback',
  createdAt: new Date(0).toISOString(),
  age: 0,
  symptoms: '-',
  screenTime: 0,
  diabetes: false,
  hypertension: false,
  glasses: false,
  blurryVision: false,
  redEye: false,
  eyePain: false,
  dryEye: false,
  familyHistory: false,
  lasikInterest: false,
  postOpStatus: false,
  suddenSeverePain: false,
  suddenVisionLoss: false,
  flashesOrFloaters: false,
  eyeTrauma: false,
  redEyeWithNausea: false,
  dmDurationYears: 0,
  latestHbA1c: 0,
  retinaCheckOverYear: false,
  glareAtNight: false,
  lowContrastVision: false,
  progressiveBilateralBlur: false,
  usesContactLens: false,
  airConditionedRoomHours: 0,
  sleepHours: 0,
  childNearWorkHours: 0,
  childOutdoorHours: 0,
  riskScore: 0,
  riskLevel: 'Risiko Rendah',
  recommendation: '-',
  suggestedAction: '-',
  suggestedProductCategory: '-',
  suggestedEducationTopic: '-',
  urgency: 'rutin',
  redFlags: [],
  ctaLabel: 'Booking Klinik',
  ctaHref: '/booking',
  confidenceBand: 'rendah',
  explainabilityFactors: [],
  diseaseRisks: [],
  carePlan: [],
  followUpWindowDays: 30,
  recommendedProductKeywords: [],
  preTriageSummary: '-',
};

export default function EyeRiskResult() {
  const result = loadLS<EyeCheckRecord>('lastEyeCheck', fallback);

  return (
    <div className="space-y-4 px-4 pb-4">
      <TopBar title="Hasil Cek Mata AI" />
      <RiskScoreCard result={result} />
      <AIRecommendationCard result={result} />

      <Card>
        <p className="font-semibold">Triage Urgensi: {result.urgency.toUpperCase()}</p>
        <p className="text-sm text-slate-600">{result.suggestedAction}</p>
        <p className="mt-1 text-xs text-slate-500">Confidence band AI: {result.confidenceBand}</p>
        {result.redFlags.length > 0 ? (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-700">
            {result.redFlags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        ) : null}
      </Card>

      <Card>
        <p className="font-semibold">Rencana Aksi Harian</p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {result.carePlan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-slate-500">Target follow-up: {result.followUpWindowDays === 0 ? 'hari ini' : `${result.followUpWindowDays} hari`}</p>
      </Card>

      <Card>
        <p className="font-semibold">Explainability</p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {result.explainabilityFactors.map((factor) => (
            <li key={factor}>{factor}</li>
          ))}
        </ul>
      </Card>

      {result.recommendedProductKeywords.length > 0 ? (
        <Card>
          <p className="font-semibold">Rekomendasi Produk AI</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {result.recommendedProductKeywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                {keyword}
              </span>
            ))}
          </div>
        </Card>
      ) : null}

      <Card>
        <p className="font-semibold">Skrining Penyakit Mata</p>
        <div className="mt-2 space-y-2 text-sm">
          {result.diseaseRisks.map((item) => (
            <div key={item.name} className="rounded-xl border border-slate-200 p-2">
              <p className="font-semibold">{item.name}: {item.level}</p>
              <p className="text-slate-600">{item.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <p className="font-semibold">Pre-Triage Summary untuk Dokter</p>
        <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{result.preTriageSummary}</p>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <Link to={result.ctaHref}>
          <Button className="w-full">{result.ctaLabel}</Button>
        </Link>
        <Link to="/marketplace">
          <Button className="w-full bg-primeGold text-primeNavy">Lihat Produk</Button>
        </Link>
      </div>

      <DisclaimerBanner />
    </div>
  );
}
