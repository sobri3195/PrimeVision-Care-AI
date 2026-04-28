import { useMemo, useRef, useState } from 'react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

const qualityGuides = {
  badLighting: 'Pencahayaan kurang. Hadap ke sumber cahaya lembut dari depan.',
  blur: 'Gambar blur. Stabilkan ponsel dan jaga jarak 25-35 cm.',
  framing: 'Framing belum pas. Pastikan kedua mata terlihat penuh.',
  reflection: 'Refleksi berlebih terdeteksi. Hindari lampu langsung/kacamata mengkilap.',
} as const;

type QualityIssue = keyof typeof qualityGuides;

export default function EyeCameraScanCard() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qualityIssues, setQualityIssues] = useState<QualityIssue[]>([]);
  const [analysis, setAnalysis] = useState<null | {
    rednessScore: number;
    fatigueScore: number;
    asymmetryScore: number;
    confidenceBand: 'rendah' | 'sedang' | 'tinggi';
    explainability: string[];
  }>(null);

  const canUseCamera = useMemo(() => typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia, []);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setActive(false);
  };

  const startCamera = async () => {
    if (!canUseCamera) {
      setError('Kamera tidak tersedia di perangkat/browser ini.');
      return;
    }

    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setActive(true);
    } catch {
      setError('Izin kamera ditolak atau kamera tidak dapat diakses.');
    }
  };

  const runQualityGate = () => {
    const simulatedIssues: QualityIssue[] = [];
    if (!active) simulatedIssues.push('framing');
    if (Math.random() > 0.55) simulatedIssues.push('badLighting');
    if (Math.random() > 0.65) simulatedIssues.push('blur');
    if (Math.random() > 0.7) simulatedIssues.push('reflection');

    setQualityIssues(simulatedIssues);
    setAnalysis(null);

    if (simulatedIssues.length > 0) return;

    const rednessScore = Math.round(35 + Math.random() * 50);
    const fatigueScore = Math.round(30 + Math.random() * 55);
    const asymmetryScore = Math.round(10 + Math.random() * 35);
    const worstSignal = Math.max(rednessScore, fatigueScore, asymmetryScore);

    setAnalysis({
      rednessScore,
      fatigueScore,
      asymmetryScore,
      confidenceBand: worstSignal > 75 ? 'tinggi' : worstSignal > 50 ? 'sedang' : 'rendah',
      explainability: [
        `Skor kemerahan sklera: ${rednessScore}/100`,
        `Estimasi fatigue visual (blink/eye-opening trend): ${fatigueScore}/100`,
        `Asimetri ringan kelopak/konjungtiva: ${asymmetryScore}/100`,
      ],
    });
  };

  return (
    <Card>
      <div className="space-y-3">
        <div>
          <p className="font-semibold">AI Kamera Cek Mata (Quality-Gated)</p>
          <p className="text-sm text-slate-600">Skrining non-diagnostik dengan quality gate sebelum analisis dan insight explainability ringan.</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <video ref={videoRef} autoPlay playsInline muted className="h-52 w-full object-cover" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={startCamera} disabled={active}>
            Nyalakan
          </Button>
          <Button onClick={runQualityGate} className="bg-emerald-700">
            Analisis
          </Button>
          <Button className="bg-slate-600" onClick={stopCamera} disabled={!active}>
            Matikan
          </Button>
        </div>

        {qualityIssues.length > 0 ? (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            <p className="font-semibold">Kualitas belum cukup, lakukan retake:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {qualityIssues.map((issue) => (
                <li key={issue}>{qualityGuides[issue]}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {analysis ? (
          <div className="rounded-xl bg-blue-50 p-3 text-sm text-slate-700">
            <p className="font-semibold">Insight Multi-sinyal (non-diagnostik)</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {analysis.explainability.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-2">
              Confidence band: <b>{analysis.confidenceBand}</b>
            </p>
          </div>
        ) : null}

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </Card>
  );
}
