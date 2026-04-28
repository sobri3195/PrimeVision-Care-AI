import { useMemo, useRef, useState } from 'react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

export default function EyeCameraScanCard() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <Card>
      <div className="space-y-3">
        <div>
          <p className="font-semibold">AI Kamera Cek Mata (Beta)</p>
          <p className="text-sm text-slate-600">Gunakan kamera depan untuk simulasi skrining area mata, tingkat kemerahan, dan tanda kelelahan visual.</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <video ref={videoRef} autoPlay playsInline muted className="h-52 w-full object-cover" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={startCamera} disabled={active}>
            Nyalakan Kamera
          </Button>
          <Button className="bg-slate-600" onClick={stopCamera} disabled={!active}>
            Matikan Kamera
          </Button>
        </div>

        <div className="rounded-xl bg-blue-50 p-3 text-sm text-slate-700">
          <p className="font-semibold">Insight AI yang ditampilkan:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Estimasi fatigue score mata.</li>
            <li>Indikasi awal mata kering atau iritasi.</li>
            <li>Saran jeda layar dan tetes mata buatan.</li>
          </ul>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
    </Card>
  );
}
