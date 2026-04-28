import Card from '@/components/shared/Card';
export default function AIEducatorBox({ topic }: { topic: string }) { return <Card><p className="font-semibold">Tanya AI Edukator</p><p className="text-sm">Topik {topic}: penjelasan sederhana untuk keluarga.</p><p className="mt-2 text-xs text-slate-500">Hasil ini bukan diagnosis medis.</p></Card>; }
