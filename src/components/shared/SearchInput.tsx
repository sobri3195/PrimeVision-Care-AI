export default function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />;
}
