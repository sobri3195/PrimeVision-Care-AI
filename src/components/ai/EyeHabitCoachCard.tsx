import { useMemo, useState } from 'react';
import Card from '@/components/shared/Card';

const profilePlan: Record<string, { title: string; points: string[] }> = {
  screen_worker: {
    title: 'Jalur Pekerja Layar',
    points: [
      '20-20-20 adaptif berdasarkan screen-time aktual.',
      'Reminder blink + hidrasi setiap blok kerja panjang.',
      'Mode malam: rekomendasi kontras, font-size, dan cadence break.',
    ],
  },
  student_child: {
    title: 'Jalur Anak Sekolah',
    points: ['Batasi near-work bertahap.', 'Challenge outdoor time keluarga.', 'Pengingat jeda fokus saat belajar.'],
  },
  diabetes: {
    title: 'Jalur Diabetes',
    points: ['Reminder kontrol retina berkala.', 'Alert saat HbA1c tinggi + gejala mata.', 'Edukasi harian retinopati diabetik.'],
  },
  post_lasik: {
    title: 'Jalur Pasca-LASIK',
    points: ['Pengingat tetes mata & proteksi UV.', 'Checklist gejala red-flag pasca-op.', 'Notifikasi cerdas tanpa spam berdasarkan kepatuhan.'],
  },
};

export default function EyeHabitCoachCard() {
  const [profile, setProfile] = useState<keyof typeof profilePlan>('screen_worker');
  const plan = useMemo(() => profilePlan[profile], [profile]);

  return (
    <Card>
      <div className="space-y-3">
        <div>
          <p className="font-semibold">AI Eye Habit Coach Personal</p>
          <p className="text-sm text-slate-600">Rencana harian, coaching profil risiko, dan gamifikasi klinis ringan.</p>
        </div>

        <select className="w-full rounded-xl border p-2 text-sm" value={profile} onChange={(e) => setProfile(e.target.value as keyof typeof profilePlan)}>
          <option value="screen_worker">Pekerja layar</option>
          <option value="student_child">Anak sekolah</option>
          <option value="diabetes">Penderita diabetes</option>
          <option value="post_lasik">Pasca-LASIK</option>
        </select>

        <div className="rounded-xl border border-slate-200 p-3">
          <p className="text-sm font-semibold text-slate-800">{plan.title}</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {plan.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-xl bg-emerald-50 p-2 text-emerald-800">
            <p className="font-semibold">Streak</p>
            <p>6 hari</p>
          </div>
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-800">
            <p className="font-semibold">Badge</p>
            <p>Kontrol Rutin</p>
          </div>
          <div className="rounded-xl bg-amber-50 p-2 text-amber-800">
            <p className="font-semibold">Family</p>
            <p>Outdoor 80%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
