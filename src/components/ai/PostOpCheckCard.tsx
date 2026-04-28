import { useState } from 'react';
import Card from '@/components/shared/Card';
import { scorePostOpSafety } from '@/lib/aiFeatureEngine';

export default function PostOpCheckCard() {
  const [daysAfterSurgery, setDaysAfterSurgery] = useState(3);
  const [pain, setPain] = useState(false);
  const [redEye, setRedEye] = useState(false);
  const [blurryVision, setBlurryVision] = useState(false);
  const [suddenDrop, setSuddenDrop] = useState(false);

  const result = scorePostOpSafety({ daysAfterSurgery, pain, redEye, blurryVision, suddenDrop });

  return (
    <Card>
      <div className="space-y-3">
        <p className="font-semibold">AI Post-Operative Check</p>
        <p className="text-sm text-slate-600">Triage pasca-LASIK/katarak aktif berdasarkan gejala saat ini.</p>

        <label className="block rounded-xl border p-2 text-sm">Hari setelah operasi
          <input className="mt-1 w-full rounded-lg border p-1" type="number" min={0} max={90} value={daysAfterSurgery} onChange={(e) => setDaysAfterSurgery(Number(e.target.value))} />
        </label>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ['Nyeri mata', pain, setPain],
            ['Mata merah', redEye, setRedEye],
            ['Penglihatan kabur', blurryVision, setBlurryVision],
            ['Penurunan visus mendadak', suddenDrop, setSuddenDrop],
          ].map(([label, value, setter]) => (
            <button key={label as string} type="button" className={`rounded-xl border p-2 ${value ? 'bg-primeNavy text-white' : ''}`} onClick={() => (setter as (v: boolean) => void)(!(value as boolean))}>
              {label as string}
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p>Skor risiko pasca-op: <b>{result.score}</b>/100 ({result.level})</p>
          <p className="text-slate-600">{result.instruction}</p>
        </div>
      </div>
    </Card>
  );
}
