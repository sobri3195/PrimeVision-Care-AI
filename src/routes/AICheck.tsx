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
import { runAiRiskEngine } from '@/lib/aiRiskEngine';
import type { EyeCheckInput } from '@/types/eyeCheck';
import { saveLS } from '@/lib/utils';

const initial: EyeCheckInput = { age: 30, symptoms: '', screenTime: 8, diabetes: false, hypertension: false, glasses: false, blurryVision: false, redEye: false, eyePain: false, dryEye: false, familyHistory: false, lasikInterest: false, postOpStatus: false };

export default function AICheck() {
  const [form, setForm] = useState<EyeCheckInput>(initial);
  const navigate = useNavigate();
  const submit = () => {
    const result = runAiRiskEngine(form);
    saveLS('lastRiskScore', result.riskScore);
    saveLS('lastEyeCheck', { ...form, ...result });
    navigate('/ai-check/result');
  };
  return (
    <div className="space-y-4 px-4 pb-4">
      <TopBar title="Cek Mata AI" />
      <Card><p className="font-semibold">Cek risiko mata Anda dalam 2 menit.</p><AIQuestionnaire form={form} setForm={setForm} /><Button className="mt-3 w-full" onClick={submit}>Lihat Hasil AI</Button></Card>
      <LasikReadinessCard />
      <DiabetesEyeCheckCard />
      <MyopiaTrackerCard />
      <PostOpCheckCard />
      <SymptomChatBox />
      <DisclaimerBanner />
    </div>
  );
}
