import type { EyeCheckInput } from '@/types/eyeCheck';

const booleanFieldMeta: Array<{ key: keyof EyeCheckInput; label: string }> = [
  { key: 'blurryVision', label: 'Penglihatan kabur' },
  { key: 'redEye', label: 'Mata merah' },
  { key: 'eyePain', label: 'Nyeri mata' },
  { key: 'dryEye', label: 'Mata kering' },
  { key: 'diabetes', label: 'Diabetes' },
  { key: 'hypertension', label: 'Hipertensi' },
  { key: 'glasses', label: 'Pakai kacamata' },
  { key: 'familyHistory', label: 'Riwayat keluarga penyakit mata' },
  { key: 'lasikInterest', label: 'Minat LASIK' },
  { key: 'postOpStatus', label: 'Pasca operasi mata' },
  { key: 'suddenSeverePain', label: 'Red flag: nyeri hebat mendadak' },
  { key: 'suddenVisionLoss', label: 'Red flag: visus menurun mendadak' },
  { key: 'flashesOrFloaters', label: 'Red flag: kilatan/floaters hitam' },
  { key: 'eyeTrauma', label: 'Red flag: trauma mata' },
  { key: 'redEyeWithNausea', label: 'Red flag: mata merah + mual' },
  { key: 'retinaCheckOverYear', label: 'Kontrol retina >1 tahun lalu' },
  { key: 'glareAtNight', label: 'Silau saat malam' },
  { key: 'lowContrastVision', label: 'Kontras menurun' },
  { key: 'progressiveBilateralBlur', label: 'Kabur progresif bilateral' },
  { key: 'usesContactLens', label: 'Pemakai lensa kontak' },
];

const numberRange: Partial<Record<keyof EyeCheckInput, { min: number; max: number }>> = {
  age: { min: 1, max: 110 },
  screenTime: { min: 0, max: 24 },
  dmDurationYears: { min: 0, max: 80 },
  latestHbA1c: { min: 4, max: 18 },
  airConditionedRoomHours: { min: 0, max: 24 },
  sleepHours: { min: 0, max: 24 },
  childNearWorkHours: { min: 0, max: 16 },
  childOutdoorHours: { min: 0, max: 16 },
};

export default function AIQuestionnaire({ form, setForm }: { form: EyeCheckInput; setForm: (next: EyeCheckInput) => void }) {
  const toggle = (key: keyof EyeCheckInput) => {
    const value = form[key];
    if (typeof value !== 'boolean') return;
    setForm({ ...form, [key]: !value });
  };

  const setNumber = (key: keyof EyeCheckInput, value: string) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;

    const range = numberRange[key];
    const nextValue = range ? Math.min(range.max, Math.max(range.min, parsed)) : parsed;
    setForm({ ...form, [key]: nextValue });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <input type="number" className="w-full rounded-xl border p-3" value={form.age} onChange={(e) => setNumber('age', e.target.value)} placeholder="Usia" />
        <input type="number" className="w-full rounded-xl border p-3" value={form.screenTime} onChange={(e) => setNumber('screenTime', e.target.value)} placeholder="Screen time (jam)" />
      </div>

      <input className="w-full rounded-xl border p-3" value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} placeholder="Keluhan utama" />

      <div className="grid grid-cols-2 gap-2">
        <input type="number" className="w-full rounded-xl border p-3" value={form.dmDurationYears} onChange={(e) => setNumber('dmDurationYears', e.target.value)} placeholder="Durasi DM (tahun)" />
        <input type="number" step="0.1" className="w-full rounded-xl border p-3" value={form.latestHbA1c} onChange={(e) => setNumber('latestHbA1c', e.target.value)} placeholder="HbA1c terakhir" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input type="number" className="w-full rounded-xl border p-3" value={form.airConditionedRoomHours} onChange={(e) => setNumber('airConditionedRoomHours', e.target.value)} placeholder="Jam di ruangan AC" />
        <input type="number" className="w-full rounded-xl border p-3" value={form.sleepHours} onChange={(e) => setNumber('sleepHours', e.target.value)} placeholder="Jam tidur" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input type="number" className="w-full rounded-xl border p-3" value={form.childNearWorkHours} onChange={(e) => setNumber('childNearWorkHours', e.target.value)} placeholder="Near-work anak (jam)" />
        <input type="number" className="w-full rounded-xl border p-3" value={form.childOutdoorHours} onChange={(e) => setNumber('childOutdoorHours', e.target.value)} placeholder="Outdoor anak (jam)" />
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
        {booleanFieldMeta.map((field) => (
          <button
            type="button"
            key={field.key}
            className={`rounded-xl border p-2 text-left ${form[field.key] ? 'bg-primeNavy text-white' : 'bg-white'}`}
            onClick={() => toggle(field.key)}
          >
            {field.label}
          </button>
        ))}
      </div>
    </div>
  );
}
