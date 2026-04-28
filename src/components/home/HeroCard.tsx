import { Link } from 'react-router-dom';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

export default function HeroCard() {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-primeNavy via-sky-900 to-sky-700 text-white">
      <div className="space-y-2">
        <p className="text-lg font-bold">Cek risiko mata Anda dalam 2 menit</p>
        <p className="text-sm text-slate-100">Dapatkan skor mata, insight AI, dan rekomendasi produk sesuai kebutuhan mata Anda.</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link to="/ai-check"><Button className="w-full bg-primeGold text-primeNavy">Mulai Cek AI</Button></Link>
        <Link to="/marketplace"><Button className="w-full bg-white text-primeNavy">Lihat Marketplace</Button></Link>
      </div>
    </Card>
  );
}
