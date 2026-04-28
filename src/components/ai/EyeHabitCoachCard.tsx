import Card from '@/components/shared/Card';

const habits = [
  { title: '20-20-20 Reminder AI', detail: 'Setiap 20 menit, lihat objek 20 kaki selama 20 detik untuk mengurangi digital eye strain.' },
  { title: 'Hydration & Blink Tracker', detail: 'AI menghitung estimasi kedipan dan mengingatkan hidrasi saat bekerja lama di depan layar.' },
  { title: 'Sleep & Eye Recovery', detail: 'Prediksi pemulihan mata berdasarkan jam tidur, durasi layar malam, dan pencahayaan ruangan.' },
];

export default function EyeHabitCoachCard() {
  return (
    <Card>
      <div className="space-y-3">
        <div>
          <p className="font-semibold">AI Eye Habit Coach</p>
          <p className="text-sm text-slate-600">Rencana kebiasaan harian berbasis AI untuk menjaga fokus, kelembapan, dan stamina mata.</p>
        </div>

        <div className="space-y-2">
          {habits.map((habit) => (
            <div key={habit.title} className="rounded-xl border border-slate-200 p-3">
              <p className="text-sm font-semibold text-slate-800">{habit.title}</p>
              <p className="text-sm text-slate-600">{habit.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
