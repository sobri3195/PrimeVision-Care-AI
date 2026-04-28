import { useState } from 'react';
import Card from '@/components/shared/Card';
import { scoreMyopiaProgress } from '@/lib/aiFeatureEngine';

export default function MyopiaTrackerCard() {
  const [age, setAge] = useState(12);
  const [nearWorkHours, setNearWorkHours] = useState(4);
  const [outdoorHours, setOutdoorHours] = useState(1.5);
  const [glasses, setGlasses] = useState(true);

  const result = scoreMyopiaProgress({ age, nearWorkHours, outdoorHours, glasses });

  return (
    <Card>
      <div className="space-y-3">
        <p className="font-semibold">AI Myopia Progress Tracker</p>
        <p className="text-sm text-slate-600">Model prediksi progres minus berbasis usia, near-work, dan outdoor time.</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="rounded-xl border p-2">Usia
            <input className="mt-1 w-full rounded-lg border p-1" type="number" min={4} max={40} value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </label>
          <label className="rounded-xl border p-2">Near-work (jam/hari)
            <input className="mt-1 w-full rounded-lg border p-1" type="number" min={0} max={16} step={0.5} value={nearWorkHours} onChange={(e) => setNearWorkHours(Number(e.target.value))} />
          </label>
          <label className="rounded-xl border p-2 col-span-2">Outdoor (jam/hari)
            <input className="mt-1 w-full rounded-lg border p-1" type="number" min={0} max={10} step={0.5} value={outdoorHours} onChange={(e) => setOutdoorHours(Number(e.target.value))} />
          </label>
        </div>

        <button type="button" className={`rounded-xl border p-2 text-xs ${glasses ? 'bg-primeNavy text-white' : ''}`} onClick={() => setGlasses((v) => !v)}>
          Sedang memakai kacamata minus
        </button>

        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p>Skor progres myopia: <b>{result.score}</b>/100 ({result.level})</p>
          <p className="text-slate-600">{result.forecast}</p>
        </div>
      </div>
    </Card>
  );
}
