export type SymptomMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const DEFAULT_MODEL = import.meta.env.VITE_AI_MODEL ?? 'gpt-4o-mini';
const API_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL ?? 'https://api.openai.com/v1';
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const REQUEST_TIMEOUT_MS = 12000;

const SYSTEM_PROMPT =
  'Anda adalah asisten kesehatan mata berbahasa Indonesia. Berikan analisa awal berdasarkan gejala pengguna secara singkat, jelas, dan aman. Jangan memberikan diagnosis pasti, selalu sarankan pemeriksaan dokter untuk kondisi berat.';

const RED_FLAG_PATTERNS: Array<{ pattern: RegExp; advice: string }> = [
  { pattern: /mendadak|tiba[- ]?tiba|sudden/i, advice: 'Keluhan mendadak perlu evaluasi dokter mata segera.' },
  { pattern: /hilang|buram total|gelap|tidak bisa lihat/i, advice: 'Penurunan penglihatan signifikan termasuk tanda bahaya.' },
  { pattern: /nyeri hebat|sakit sekali/i, advice: 'Nyeri mata berat sebaiknya ditangani sebagai kondisi urgensi.' },
  { pattern: /kilatan|floaters|bintik hitam/i, advice: 'Kilatan atau floaters baru perlu skrining retina sesegera mungkin.' },
  { pattern: /trauma|terbentur|kena benda/i, advice: 'Riwayat trauma mata perlu pemeriksaan fisik langsung.' },
];

const SELF_CARE_PATTERNS: Array<{ pattern: RegExp; advice: string }> = [
  { pattern: /kering|perih|lelah|pedih/i, advice: 'Gunakan aturan 20-20-20, berkedip sadar, dan pertimbangkan pelumas mata.' },
  { pattern: /layar|monitor|screen|hp/i, advice: 'Kurangi screen time kontinu dan atur pencahayaan ruangan lebih nyaman.' },
  { pattern: /lensa kontak|softlens/i, advice: 'Batasi pemakaian lensa kontak saat mata iritasi dan jaga higienitas.' },
];

export const hasAiConfig = Boolean(API_KEY);

const normalizeHistory = (history: SymptomMessage[]) =>
  history
    .slice(-6)
    .filter((item) => item.content.trim().length > 0)
    .map((item) => ({ role: item.role, content: item.content.trim() }));

const buildLocalFallbackAnswer = (prompt: string) => {
  const notes: string[] = [];
  const lowerPrompt = prompt.toLowerCase();

  for (const item of RED_FLAG_PATTERNS) {
    if (item.pattern.test(lowerPrompt)) notes.push(`- ${item.advice}`);
  }

  for (const item of SELF_CARE_PATTERNS) {
    if (item.pattern.test(lowerPrompt)) notes.push(`- ${item.advice}`);
  }

  if (notes.length === 0) {
    notes.push('- Pantau gejala 24-48 jam, istirahatkan mata, dan hindari mengucek mata.');
  }

  return [
    'Analisa awal (mode aman lokal):',
    ...notes,
    '',
    'Jika keluhan memberat, disertai nyeri hebat, atau penglihatan turun mendadak, segera ke IGD mata.',
  ].join('\n');
};

export async function analyzeEyeSymptoms(prompt: string, history: SymptomMessage[] = []) {
  const trimmedPrompt = prompt.trim();

  if (!trimmedPrompt) {
    return {
      answer: 'Silakan tulis gejala terlebih dahulu agar AI bisa membantu analisa awal.',
      source: 'fallback' as const,
    };
  }

  if (!API_KEY) {
    return {
      answer: buildLocalFallbackAnswer(trimmedPrompt),
      source: 'fallback' as const,
    };
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...normalizeHistory(history),
    { role: 'user', content: trimmedPrompt },
  ];

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.2,
        messages,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI request failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const answer: string | undefined = data?.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error('AI response is empty.');
    }

    return { answer, source: 'openai' as const };
  } catch {
    return {
      answer: `${buildLocalFallbackAnswer(trimmedPrompt)}\n\n(Catatan: layanan AI real-time sedang tidak stabil, sementara memakai mode fallback.)`,
      source: 'fallback' as const,
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
