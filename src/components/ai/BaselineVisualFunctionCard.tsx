import { useMemo, useState } from 'react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { loadLS, saveLS } from '@/lib/utils';
import type { VisualTestRecord } from '@/types/eyeCheck';

const STORAGE_KEY = 'visualFunctionRecords';

const visualAcuityOptions = [
  { label: '20/20 (sangat baik)', score: 95 },
  { label: '20/30', score: 80 },
  { label: '20/40', score: 65 },
  { label: '20/60', score: 45 },
  { label: '20/80 atau lebih buruk', score: 25 },
];

export default function BaselineVisualFunctionCard() {
  const [userId, setUserId] = useState('default-user');
  const [eye, setEye] = useState<'kanan' | 'kiri'>('kanan');
  const [visualAcuityScore, setVisualAcuityScore] = useState(95);
  const [amslerDistortion, setAmslerDistortion] = useState(false);
  const [contrastScore, setContrastScore] = useState(4);

  const records = loadLS<VisualTestRecord[]>(STORAGE_KEY, []);

  const saveRecord = () => {
    const next: VisualTestRecord = {
      id: `${Date.now()}-${eye}`,
      userId,
      eye,
      visualAcuityScore,
      amslerDistortion,
      contrastScore,
      recordedAt: new Date().toISOString(),
    };

    saveLS(STORAGE_KEY, [next, ...records].slice(0, 60));
  };

  const trend = useMemo(
    () => records.filter((record) => record.userId === userId && record.eye === eye).slice(0, 5),
    [records, userId, eye],
  );

  return (
    <Card>
      <div className="space-y-3">
        <div>
          <p className="font-semibold">Baseline Visual Function (Rumah)</p>
          <p className="text-sm text-slate-600">Snellen-like adaptif, Amsler grid, dan uji kontras sederhana tersimpan per pengguna/per mata.</p>
        </div>

        <input className="w-full rounded-xl border p-2 text-sm" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />

        <div className="grid grid-cols-2 gap-2">
          <select className="rounded-xl border p-2 text-sm" value={eye} onChange={(e) => setEye(e.target.value as 'kanan' | 'kiri')}>
            <option value="kanan">Mata kanan</option>
            <option value="kiri">Mata kiri</option>
          </select>

          <select className="rounded-xl border p-2 text-sm" value={visualAcuityScore} onChange={(e) => setVisualAcuityScore(Number(e.target.value))}>
            {visualAcuityOptions.map((option) => (
              <option key={option.label} value={option.score}>
                VA {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="rounded-xl border p-2 text-xs">
            Amsler distortion
            <select
              className="mt-1 w-full rounded-lg border p-1 text-sm"
              value={amslerDistortion ? 'yes' : 'no'}
              onChange={(e) => setAmslerDistortion(e.target.value === 'yes')}
            >
              <option value="no">Tidak ada</option>
              <option value="yes">Ada distorsi</option>
            </select>
          </label>

          <label className="rounded-xl border p-2 text-xs">
            Kontras (1-5)
            <input type="range" min={1} max={5} value={contrastScore} onChange={(e) => setContrastScore(Number(e.target.value))} className="mt-2 w-full" />
          </label>
        </div>

        <Button className="w-full" onClick={saveRecord}>
          Simpan Hasil Baseline
        </Button>

        <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
          <p className="font-semibold">Tren 5 hasil terakhir ({userId} - {eye})</p>
          {trend.length === 0 ? (
            <p className="mt-1">Belum ada data.</p>
          ) : (
            <ul className="mt-1 space-y-1">
              {trend.map((record) => (
                <li key={record.id}>
                  {new Date(record.recordedAt).toLocaleDateString('id-ID')}: VA {record.visualAcuityScore}, Amsler {record.amslerDistortion ? 'distorsi' : 'normal'}, Kontras {record.contrastScore}/5
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}
