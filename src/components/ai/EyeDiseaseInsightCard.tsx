import Card from '@/components/shared/Card';

export default function EyeDiseaseInsightCard() {
  return (
    <Card>
      <div className="space-y-3">
        <div>
          <p className="font-semibold">AI Insight Penyakit Mata</p>
          <p className="text-sm text-slate-600">Screening awal untuk risiko glaukoma, retinopati diabetik, katarak, dan mata kering kronis.</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-emerald-50 p-3">
            <p className="font-semibold text-emerald-700">Glaukoma</p>
            <p className="text-slate-600">Cek faktor umur, riwayat keluarga, dan tekanan darah.</p>
          </div>
          <div className="rounded-xl bg-orange-50 p-3">
            <p className="font-semibold text-orange-700">Katarak</p>
            <p className="text-slate-600">Deteksi gejala silau berlebih, buram progresif, dan kontras rendah.</p>
          </div>
          <div className="rounded-xl bg-cyan-50 p-3">
            <p className="font-semibold text-cyan-700">Retina Diabetes</p>
            <p className="text-slate-600">Analisa risiko berdasar kontrol gula darah dan lama diabetes.</p>
          </div>
          <div className="rounded-xl bg-violet-50 p-3">
            <p className="font-semibold text-violet-700">Mata Kering</p>
            <p className="text-slate-600">Skor kualitas air mata dan paparan AC/screen time.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
