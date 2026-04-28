import { Link } from 'react-router-dom';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';

export default function HeroCard() {
  return (
    <Card className="bg-gradient-to-br from-primeNavy to-sky-900 text-white">
      <p className="text-lg font-bold">Cek risiko mata Anda dalam 2 menit</p>
      <p className="mt-1 text-sm text-slate-200">Dapatkan skor mata dan rekomendasi awal.</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link to="/ai-check"><Button className="w-full bg-primeGold text-primeNavy">Mulai Cek Mata AI</Button></Link>
        <Link to="/booking"><Button className="w-full bg-white text-primeNavy">Booking Pemeriksaan</Button></Link>
      </div>
    </Card>
  );
}
