import Card from '@/components/shared/Card';
import { loadLS } from '@/lib/utils';
import { summarizeDiseaseInsight } from '@/lib/aiFeatureEngine';
import type { EyeCheckRecord } from '@/types/eyeCheck';

export default function EyeDiseaseInsightCard() {
  const history = loadLS<EyeCheckRecord[]>('eyeCheckHistory', []);
  const latest = history[0] ?? null;
  const summary = summarizeDiseaseInsight(latest);

  return (
    <Card>
      <div className="space-y-3">
        <div>
          <p className="font-semibold">AI Insight Penyakit Mata</p>
          <p className="text-sm text-slate-600">Insight dinamis dari hasil skrining terbaru dan faktor risiko personal.</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
          <p className="font-semibold">{summary.headline}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {summary.priorities.map((priority) => (
              <li key={priority}>{priority}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
