import { useState } from 'react';
import Card from '@/components/shared/Card';
import { scoreLasikReadiness } from '@/lib/aiFeatureEngine';

export default function LasikReadinessCard() {
  const [age, setAge] = useState(24);
  const [glassesYearsStable, setGlassesYearsStable] = useState(2);
  const [dryEye, setDryEye] = useState(false);
  const [autoImmune, setAutoImmune] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [highMinus, setHighMinus] = useState(false);

  const result = scoreLasikReadiness({ age, glassesYearsStable, dryEye, autoImmune, pregnant, highMinus });

  return (
    <Card>
      <div className="space-y-3">
        <p className="font-semibold">AI Kesiapan LASIK</p>
        <p className="text-sm text-slate-600">Skrining aktif berbasis faktor klinis dasar, bukan placeholder statis.</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="rounded-xl border p-2">Usia
            <input className="mt-1 w-full rounded-lg border p-1" type="number" min={15} max={70} value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </label>
          <label className="rounded-xl border p-2">Stabil kacamata (tahun)
            <input className="mt-1 w-full rounded-lg border p-1" type="number" min={0} max={10} value={glassesYearsStable} onChange={(e) => setGlassesYearsStable(Number(e.target.value))} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ['Mata kering aktif', dryEye, setDryEye],
            ['Autoimun', autoImmune, setAutoImmune],
            ['Hamil/menyusui', pregnant, setPregnant],
            ['Minus sangat tinggi', highMinus, setHighMinus],
          ].map(([label, value, setter]) => (
            <button key={label as string} type="button" className={`rounded-xl border p-2 ${value ? 'bg-primeNavy text-white' : 'bg-white'}`} onClick={() => (setter as (v: boolean) => void)(!(value as boolean))}>
              {label as string}
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p>Skor kesiapan: <b>{result.score}</b>/100 ({result.level})</p>
          <p className="text-slate-600">{result.note}</p>
        </div>
      </div>
    </Card>
  );
}
