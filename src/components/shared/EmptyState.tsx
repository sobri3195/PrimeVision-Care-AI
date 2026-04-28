export default function EmptyState({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">{text}</div>;
}
