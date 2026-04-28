export default function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 bg-slate-50/90 px-4 py-3 backdrop-blur">
      <h1 className="text-lg font-bold text-primeNavy">{title}</h1>
    </header>
  );
}
