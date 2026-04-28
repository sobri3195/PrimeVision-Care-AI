import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import AIQuestionnaire from '@/components/ai/AIQuestionnaire';
import DisclaimerBanner from '@/components/ai/DisclaimerBanner';
import LasikReadinessCard from '@/components/ai/LasikReadinessCard';
import DiabetesEyeCheckCard from '@/components/ai/DiabetesEyeCheckCard';
import MyopiaTrackerCard from '@/components/ai/MyopiaTrackerCard';
import PostOpCheckCard from '@/components/ai/PostOpCheckCard';
import SymptomChatBox from '@/components/ai/SymptomChatBox';
import EyeCameraScanCard from '@/components/ai/EyeCameraScanCard';
import EyeHabitCoachCard from '@/components/ai/EyeHabitCoachCard';
import EyeDiseaseInsightCard from '@/components/ai/EyeDiseaseInsightCard';
import BaselineVisualFunctionCard from '@/components/ai/BaselineVisualFunctionCard';
import CareJourneyCard from '@/components/ai/CareJourneyCard';
import { runAiRiskEngine } from '@/lib/aiRiskEngine';
import type { EyeCheckInput, EyeCheckRecord } from '@/types/eyeCheck';
import { loadLS, saveLS } from '@/lib/utils';

const initial: EyeCheckInput = {
  age: 30,
  symptoms: '',
  screenTime: 8,
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
  latestHbA1c: 6.5,
  retinaCheckOverYear: false,
  glareAtNight: false,
  lowContrastVision: false,
  progressiveBilateralBlur: false,
  usesContactLens: false,
  airConditionedRoomHours: 4,
  sleepHours: 7,
  childNearWorkHours: 2,
  childOutdoorHours: 2,
};

export default function AICheck() {
  const [form, setForm] = useState<EyeCheckInput>(initial);
  const navigate = useNavigate();

  const submit = () => {
    const result = runAiRiskEngine(form);
    const record: EyeCheckRecord = {
      ...form,
      ...result,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };

    const history = loadLS<EyeCheckRecord[]>('eyeCheckHistory', []);
    saveLS('eyeCheckHistory', [record, ...history].slice(0, 30));
    saveLS('lastRiskScore', result.riskScore);
    saveLS('lastEyeCheck', record);
    navigate('/ai-check/result');
  };

  return (
    <div className="space-y-4 px-4 pb-4">
      <TopBar title="Cek Mata AI" />

      <Card>
        <p className="font-semibold">Cek risiko mata berbasis triase urgensi dalam 2 menit.</p>
        <AIQuestionnaire form={form} setForm={setForm} />
        <Button className="mt-3 w-full" onClick={submit}>
          Lihat Hasil AI + Triage
        </Button>
      </Card>

      <EyeCameraScanCard />
      <BaselineVisualFunctionCard />
      <CareJourneyCard />
      <EyeDiseaseInsightCard />
      <EyeHabitCoachCard />
      <LasikReadinessCard />
      <DiabetesEyeCheckCard />
      <MyopiaTrackerCard />
      <PostOpCheckCard />
      <SymptomChatBox />
      <DisclaimerBanner />
    </div>
  );
}
