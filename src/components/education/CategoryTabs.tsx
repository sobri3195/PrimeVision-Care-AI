export default function CategoryTabs({ categories, value, onChange }: { categories: string[]; value: string; onChange: (v: string) => void }) {
  return <div className="flex gap-2 overflow-x-auto pb-1">{categories.map((c)=><button key={c} onClick={()=>onChange(c)} className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${c===value?'bg-primeNavy text-white':'bg-white border'}`}>{c}</button>)}</div>;
}
