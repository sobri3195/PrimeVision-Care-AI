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

export default function AIQuestionnaire({ form, setForm }: { form: EyeCheckInput; setForm: (next: EyeCheckInput) => void }) {
  const toggle = (key: keyof EyeCheckInput) => {
    const value = form[key];
    if (typeof value !== 'boolean') return;
    setForm({ ...form, [key]: !value });
  };

  const setNumber = (key: keyof EyeCheckInput, value: string) => setForm({ ...form, [key]: Number(value) });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <input type="number" className="w-full rounded-xl border p-3" value={form.age} onChange={(e) => setNumber('age', e.target.value)} placeholder="Usia" />
        <input type="number" className="w-full rounded-xl border p-3" value={form.screenTime} onChange={(e) => setNumber('screenTime', e.target.value)} placeholder="Screen time (jam)" />
      </div>

      <input className="w-full rounded-xl border p-3" value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} placeholder="Keluhan utama" />


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
