import { useMemo } from 'react';
import Card from '@/components/shared/Card';
import { loadLS } from '@/lib/utils';
import type { EyeCheckRecord } from '@/types/eyeCheck';

export default function CareJourneyCard() {
  const history = loadLS<EyeCheckRecord[]>('eyeCheckHistory', []);

  const worseningAlert = useMemo(() => {
    if (history.length < 2) return null;
    const latest = history[0];
    const earliest = history[Math.min(history.length - 1, 3)];
    if (!latest || !earliest) return null;

    const increase = latest.riskScore - earliest.riskScore;
    if (increase >= 15) {
      return `Tren memburuk ${increase} poin dalam ${Math.min(history.length, 4)} pemeriksaan terakhir.`;
    }
    return null;
  }, [history]);

  return (
    <Card>
      <div className="space-y-3">
        <div>
          <p className="font-semibold">Care Journey & Timeline</p>
          <p className="text-sm text-slate-600">Riwayat skor risiko, gejala, hasil tes rumah, serta alert tren 2-4 minggu.</p>
        </div>

        {worseningAlert ? <p className="rounded-xl bg-rose-50 p-2 text-sm font-semibold text-rose-700">⚠️ {worseningAlert}</p> : null}

        <div className="space-y-2 text-sm">
          {history.slice(0, 4).map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 p-3">
              <p className="font-semibold">{new Date(item.createdAt).toLocaleDateString('id-ID')} · skor {item.riskScore}</p>
              <p className="text-slate-600">Urgensi: {item.urgency} | Topik: {item.suggestedEducationTopic}</p>
            </div>
          ))}
          {history.length === 0 ? <p className="text-slate-500">Belum ada riwayat.</p> : null}
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
          Integrasi opsional ke screen-time OS, sleep tracker, dan ambient light dapat ditambahkan pada fase berikutnya.
        </div>
      </div>
    </Card>
  );
}
