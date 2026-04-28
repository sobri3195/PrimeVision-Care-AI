import Card from '@/components/shared/Card';

export default function LasikReadinessCard() {
  return (
    <Card>
      <p className="font-semibold">AI Kesiapan LASIK</p>
      <p className="text-sm text-slate-600">
        Simulasi pra-skrining LASIK berdasarkan usia, minus/silinder, riwayat mata kering, dan stabilitas penglihatan.
      </p>
    </Card>
  );
}
