import { useMemo, useState } from 'react';
import { AlertTriangle, Award, Bot, Camera, ChartLine, ClipboardList, Eye, HeartPulse, MessageCircleHeart, ShieldAlert, Sparkles, Stethoscope } from 'lucide-react';
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

const quickActions = [
  { id: 'risk', title: 'Cek Risiko Mata', desc: 'Skoring triase cepat untuk langkah awal yang aman.', badge: '2 menit', icon: ShieldAlert },
  { id: 'camera', title: 'Cek Mata AI', desc: 'Skrining visual kamera dengan quality gate.', badge: 'AI', icon: Camera },
  { id: 'lasik', title: 'Kesiapan LASIK', desc: 'Lihat readiness sebelum evaluasi dokter.', badge: 'Screening', icon: Sparkles },
  { id: 'diabetes', title: 'Retina Diabetes', desc: 'Pantau risiko retina secara berkala.', badge: 'Risk', icon: HeartPulse },
  { id: 'myopia', title: 'Myopia Tracker', desc: 'Monitor progres minus anak & remaja.', badge: 'Trend', icon: ChartLine },
  { id: 'post-op', title: 'Post-Op Check', desc: 'Checklist aman pasca LASIK/katarak.', badge: 'Urgent', icon: Stethoscope },
];

const timelineSteps = ['Awareness', 'AI Check', 'Voucher', 'Booking', 'Follow-up', 'Retention'];

const statusTone = (score: number) => {
  if (score >= 75) return 'bg-rose-100 text-rose-700';
  if (score >= 45) return 'bg-amber-100 text-amber-800';
  return 'bg-emerald-100 text-emerald-700';
};

export default function AICheck() {
  const [form, setForm] = useState<EyeCheckInput>(initial);
  const [riskResult, setRiskResult] = useState(() => loadLS<EyeCheckRecord | null>('lastEyeCheck', null));

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
    setRiskResult(record);
  };

  const todaySummary = useMemo(() => {
    const score = riskResult?.riskScore ?? 24;
    const visualScore = Math.max(35, 100 - Math.round((form.screenTime / 14) * 50));
    const recommendation = score >= 75 ? 'Konsultasi cepat' : score >= 45 ? 'Monitor ketat' : 'Lanjutkan kebiasaan baik';

    return { score, visualScore, recommendation };
  }, [riskResult, form.screenTime]);

  return (
    <div className="space-y-4 px-4 pb-6">
      <section className="rounded-b-[30px] bg-white px-5 pb-5 pt-6 shadow-soft">
        <p className="text-sm text-slate-500">Selamat datang kembali, Prime Member 👋</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-[#082B4C]">PrimeVision Care</h1>
        <p className="mt-1 text-sm text-slate-600">Teman cek dan rawat mata keluarga secara berkelanjutan.</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-[#082B4C] p-3 text-white">
            <p className="text-[11px] opacity-80">Eye Risk Score</p>
            <p className="text-xl font-bold">{todaySummary.score}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3 text-[#082B4C]">
            <p className="text-[11px] opacity-70">Streak Habit</p>
            <p className="text-xl font-bold">6 hari</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-3 text-[#7A4E00]">
            <p className="text-[11px] opacity-70">PrimePoints</p>
            <p className="text-xl font-bold">1.280</p>
          </div>
        </div>
      </section>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#082B4C]">Ringkasan Hari Ini</h2>
          <span className="text-xs text-slate-500">Update terakhir: hari ini</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-slate-100 p-3">
            <AlertTriangle className="mb-2" size={18} color="#D99A1E" />
            <p className="text-lg font-bold text-[#082B4C]">{todaySummary.score}</p>
            <p className="text-xs text-slate-500">Risiko Mata</p>
          </div>
          <div className="rounded-2xl border border-slate-100 p-3">
            <Eye className="mb-2" size={18} color="#1F8A70" />
            <p className="text-lg font-bold text-[#082B4C]">{todaySummary.visualScore}</p>
            <p className="text-xs text-slate-500">Skor Visual</p>
          </div>
          <div className="rounded-2xl border border-slate-100 p-3">
            <Bot className="mb-2" size={18} color="#0B2E4A" />
            <p className="text-sm font-semibold text-[#082B4C]">{todaySummary.recommendation}</p>
            <p className="text-xs text-slate-500">Rekomendasi AI</p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="mb-3 text-base font-bold text-[#082B4C]">Quick Action</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <a key={action.id} href={`#${action.id}`} className="min-h-[116px] rounded-2xl border border-slate-100 p-3 transition hover:border-[#082B4C]">
              <div className="mb-2 flex items-center justify-between">
                <action.icon size={18} className="text-[#082B4C]" />
                <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-800">{action.badge}</span>
              </div>
              <p className="text-sm font-semibold text-[#082B4C]">{action.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{action.desc}</p>
            </a>
          ))}
        </div>
      </Card>

      <Card id="risk" className="p-5">
        <h3 className="text-base font-bold text-[#082B4C]">Cek Risiko Mata</h3>
        <p className="mt-1 text-sm text-slate-600">Skor ini membantu menentukan langkah berikutnya. Cek awal, bukan diagnosis final.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <input type="number" className="w-full rounded-xl border border-slate-200 p-3 text-sm" value={form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} placeholder="Usia" />
          <input type="number" className="w-full rounded-xl border border-slate-200 p-3 text-sm" value={form.screenTime} onChange={(e) => setForm({ ...form, screenTime: Number(e.target.value) })} placeholder="Screen time / hari" />
        </div>
        <input className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm" value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} placeholder="Keluhan utama" />

        <details className="mt-3 rounded-xl border border-slate-200 p-3">
          <summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Faktor risiko lainnya</summary>
          <div className="mt-3"><AIQuestionnaire form={form} setForm={setForm} /></div>
        </details>

        <Button className="mt-3 h-11 w-full rounded-xl bg-[#082B4C]" onClick={submit}>Hitung Risiko</Button>

        {riskResult ? (
          <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#082B4C]">Risk Score Card</p>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusTone(riskResult.riskScore)}`}>Skor {riskResult.riskScore}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{riskResult.recommendation}</p>
          </div>
        ) : null}
      </Card>

      <Card id="camera" className="p-5">
        <h3 className="text-base font-bold text-[#082B4C]">AI Kamera Cek Mata</h3>
        <p className="text-sm text-slate-600">Quality-gated sebelum analisis untuk memastikan hasil skrining lebih stabil.</p>
        <details className="mt-3 rounded-xl border border-slate-200 p-3">
          <summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Buka modul kamera</summary>
          <div className="mt-3"><EyeCameraScanCard /></div>
        </details>
      </Card>

      <Card className="p-5">
        <h3 className="text-base font-bold text-[#082B4C]">Baseline Visual Function</h3>
        <p className="text-sm text-slate-600">Simpan baseline mata kanan/kiri, VA, kontras, dan astigmatisme secara ringkas.</p>
        <details className="mt-3 rounded-xl border border-slate-200 p-3">
          <summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Isi baseline visual</summary>
          <div className="mt-3"><BaselineVisualFunctionCard /></div>
        </details>
      </Card>

      <Card className="p-5">
        <h3 className="text-base font-bold text-[#082B4C]">Care Journey & Timeline</h3>
        <div className="mt-3 space-y-3">
          {timelineSteps.map((step, idx) => (
            <div key={step} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#082B4C] text-xs font-bold text-white">{idx + 1}</span>
                {idx !== timelineSteps.length - 1 ? <span className="mt-1 h-6 w-px bg-slate-200" /> : null}
              </div>
              <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">{step}</div>
            </div>
          ))}
        </div>
        <details className="mt-3 rounded-xl border border-slate-200 p-3">
          <summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Lihat riwayat detail</summary>
          <div className="mt-3"><CareJourneyCard /></div>
        </details>
      </Card>

      <Card className="p-5">
        <h3 className="text-base font-bold text-[#082B4C]">AI Insight Penyakit Mata</h3>
        <p className="text-sm text-slate-600">Dapatkan rekomendasi personal berdasarkan profil risiko.</p>
        <details className="mt-3 rounded-xl border border-slate-200 p-3">
          <summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Lihat AI insight</summary>
          <div className="mt-3"><EyeDiseaseInsightCard /></div>
        </details>
      </Card>

      <Card className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#082B4C]">Eye Health Coach</h3>
            <p className="text-sm text-slate-600">Pantau kebiasaan mata Anda setiap hari.</p>
          </div>
          <Award size={18} className="text-[#D99A1E]" />
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Streak 6 hari</span>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">Badge Konsisten</span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Family Outdoor</span>
        </div>
        <details className="mt-3 rounded-xl border border-slate-200 p-3">
          <summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Buka rekomendasi coach</summary>
          <div className="mt-3"><EyeHabitCoachCard /></div>
        </details>
      </Card>

      <Card id="lasik" className="p-5"><h3 className="text-base font-bold text-[#082B4C]">AI Kesiapan LASIK</h3><details className="mt-3 rounded-xl border border-slate-200 p-3"><summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Cek readiness</summary><div className="mt-3"><LasikReadinessCard /></div></details></Card>
      <Card id="diabetes" className="p-5"><h3 className="text-base font-bold text-[#082B4C]">Diabetes Eye Guard</h3><details className="mt-3 rounded-xl border border-slate-200 p-3"><summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Lihat skor retina</summary><div className="mt-3"><DiabetesEyeCheckCard /></div></details></Card>
      <Card id="myopia" className="p-5"><h3 className="text-base font-bold text-[#082B4C]">Myopia Progress Tracker</h3><details className="mt-3 rounded-xl border border-slate-200 p-3"><summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Simpan & pantau risiko</summary><div className="mt-3"><MyopiaTrackerCard /></div></details></Card>
      <Card id="post-op" className="p-5"><h3 className="text-base font-bold text-[#082B4C]">Post-Operative Check</h3><details className="mt-3 rounded-xl border border-slate-200 p-3"><summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Checklist gejala</summary><div className="mt-3"><PostOpCheckCard /></div></details></Card>

      <Card className="p-5">
        <div className="flex items-start gap-2">
          <MessageCircleHeart className="mt-0.5 text-[#082B4C]" size={18} />
          <div>
            <h3 className="text-base font-bold text-[#082B4C]">Analisa Gejala Mata Real-time</h3>
            <p className="text-sm text-slate-600">Output AI: ringkasan gejala, urgensi, saran aman, dan CTA konsultasi dokter.</p>
          </div>
        </div>
        <details className="mt-3 rounded-xl border border-slate-200 p-3">
          <summary className="cursor-pointer text-sm font-semibold text-[#082B4C]">Mulai chat AI</summary>
          <div className="mt-3"><SymptomChatBox /></div>
        </details>
      </Card>

      <DisclaimerBanner />
      <Card className="border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-2 text-amber-900">
          <ClipboardList size={16} className="mt-0.5" />
          <p className="text-xs leading-relaxed">
            AI membantu edukasi dan skrining awal. Hasil ini bukan diagnosis medis final. Untuk keluhan berat, nyeri hebat,
            penurunan penglihatan mendadak, atau mata merah berat, segera konsultasi dengan dokter mata.
          </p>
        </div>
      </Card>

      <p className="px-1 text-center text-xs text-slate-500">Konsultasikan hasil dengan dokter mata Prime untuk keputusan klinis.</p>
    </div>
  );
}
