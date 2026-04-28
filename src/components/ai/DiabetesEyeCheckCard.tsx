import { useState } from 'react';
import Card from '@/components/shared/Card';
import { scoreDiabetesEyeGuard } from '@/lib/aiFeatureEngine';

export default function DiabetesEyeCheckCard() {
  const [hasDiabetes, setHasDiabetes] = useState(true);
  const [dmDurationYears, setDmDurationYears] = useState(5);
  const [latestHbA1c, setLatestHbA1c] = useState(7.2);
  const [retinaCheckOverYear, setRetinaCheckOverYear] = useState(false);
  const [blurryVision, setBlurryVision] = useState(false);

  const result = scoreDiabetesEyeGuard({ hasDiabetes, dmDurationYears, latestHbA1c, retinaCheckOverYear, blurryVision });

  return (
    <Card>
      <div className="space-y-3">
        <p className="font-semibold">AI Diabetes Eye Guard</p>
        <p className="text-sm text-slate-600">Analisis interval kontrol retina yang dihitung otomatis dari data risiko Anda.</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="rounded-xl border p-2">Lama diabetes (tahun)
            <input className="mt-1 w-full rounded-lg border p-1" type="number" min={0} max={40} value={dmDurationYears} onChange={(e) => setDmDurationYears(Number(e.target.value))} />
          </label>
          <label className="rounded-xl border p-2">HbA1c terakhir
            <input className="mt-1 w-full rounded-lg border p-1" type="number" min={4} max={15} step={0.1} value={latestHbA1c} onChange={(e) => setLatestHbA1c(Number(e.target.value))} />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <button type="button" className={`rounded-xl border p-2 ${hasDiabetes ? 'bg-primeNavy text-white' : ''}`} onClick={() => setHasDiabetes((v) => !v)}>Diabetes</button>
          <button type="button" className={`rounded-xl border p-2 ${retinaCheckOverYear ? 'bg-primeNavy text-white' : ''}`} onClick={() => setRetinaCheckOverYear((v) => !v)}>Retina {'>'}1 tahun</button>
          <button type="button" className={`rounded-xl border p-2 ${blurryVision ? 'bg-primeNavy text-white' : ''}`} onClick={() => setBlurryVision((v) => !v)}>Penglihatan kabur</button>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p>Skor risiko retina diabetes: <b>{result.score}</b>/100 ({result.level})</p>
          <p className="text-slate-700">Rekomendasi interval: <b>{result.interval}</b></p>
          <p className="text-xs text-slate-600">{result.note}</p>
        </div>
      </div>
    </Card>
  );
}
