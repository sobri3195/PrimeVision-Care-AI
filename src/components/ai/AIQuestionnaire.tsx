import type { EyeCheckInput } from '@/types/eyeCheck';

const booleanKeys: Array<keyof Pick<EyeCheckInput, 'blurryVision' | 'redEye' | 'eyePain' | 'dryEye' | 'diabetes' | 'hypertension' | 'glasses' | 'familyHistory' | 'lasikInterest' | 'postOpStatus'>> = [
  'blurryVision','redEye','eyePain','dryEye','diabetes','hypertension','glasses','familyHistory','lasikInterest','postOpStatus',
];

export default function AIQuestionnaire({ form, setForm }: { form: EyeCheckInput; setForm: (next: EyeCheckInput) => void }) {
  const toggle = (key: (typeof booleanKeys)[number]) => setForm({ ...form, [key]: !form[key] });
  return (
    <div className="space-y-3">
      <input type="number" className="w-full rounded-xl border p-3" value={form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} placeholder="Usia" />
      <input className="w-full rounded-xl border p-3" value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} placeholder="Keluhan utama" />
      <input type="number" className="w-full rounded-xl border p-3" value={form.screenTime} onChange={(e) => setForm({ ...form, screenTime: Number(e.target.value) })} placeholder="Screen time (jam)" />
      <div className="grid grid-cols-2 gap-2 text-xs">
        {booleanKeys.map((k) => (
          <button type="button" key={k} className={`rounded-xl border p-2 ${form[k] ? 'bg-primeNavy text-white' : 'bg-white'}`} onClick={() => toggle(k)}>{k}</button>
        ))}
      </div>
    </div>
  );
}
