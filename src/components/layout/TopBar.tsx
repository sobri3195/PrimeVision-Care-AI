export default function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 bg-slate-50/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="PrimeVision Care AI" className="h-8 w-auto" />
        <h1 className="text-lg font-bold text-primeNavy">{title}</h1>
      </div>
    </header>
  );
}
