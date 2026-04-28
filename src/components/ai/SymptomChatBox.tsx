import { useMemo, useState } from 'react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { analyzeEyeSymptoms, hasAiConfig, type SymptomMessage } from '@/lib/aiAssistant';

const quickPrompts = [
  'Mata kiri saya merah dan nyeri sejak kemarin malam.',
  'Saya sering melihat buram setelah menatap layar lebih dari 6 jam.',
  'Ada kilatan cahaya dan bintik hitam mendadak di mata kanan.',
];

export default function SymptomChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<SymptomMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSource, setLastSource] = useState<'openai' | 'fallback' | null>(null);

  const placeholder = useMemo(
    () =>
      hasAiConfig
        ? 'Contoh: Mata kiri saya merah dan nyeri sejak 2 hari, apakah perlu ke dokter?'
        : 'Mode fallback aktif. Tambahkan VITE_OPENAI_API_KEY untuk AI real-time.',
    [],
  );

  const handleAnalyze = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);

    const nextMessages = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(nextMessages);
    setInput('');

    try {
      const result = await analyzeEyeSymptoms(trimmed, messages);
      setLastSource(result.source);
      setMessages((prev) => [...prev, { role: 'assistant', content: result.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kendala saat meminta analisa AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="space-y-3">
        <div>
          <p className="font-semibold">AI Analisa Gejala Mata (Real-time)</p>
          <p className="text-sm text-slate-600">
            Jelaskan gejala Anda, AI akan membantu analisa awal dan saran langkah berikutnya.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
              onClick={() => setInput(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-3">
          {messages.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada percakapan. Mulai dengan menulis gejala Anda.</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                className={`rounded-lg p-2 text-sm ${msg.role === 'user' ? 'bg-primeNavy text-white' : 'bg-white text-slate-700'}`}
              >
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-75">
                  {msg.role === 'user' ? 'Anda' : 'AI'}
                </p>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))
          )}
          {loading ? <p className="text-sm text-slate-500">AI sedang menganalisa...</p> : null}
        </div>

        <textarea
          className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none ring-primeBlue focus:ring"
          rows={3}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
        />

        {lastSource ? (
          <p className="text-xs text-slate-500">
            Mode jawaban: {lastSource === 'openai' ? 'AI real-time' : 'fallback rule-based'}.
          </p>
        ) : null}

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <Button className="w-full" onClick={handleAnalyze} disabled={loading}>
          {loading ? 'Menganalisa...' : 'Analisa dengan AI'}
        </Button>
      </div>
    </Card>
  );
}
