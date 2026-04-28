export type SymptomMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const DEFAULT_MODEL = import.meta.env.VITE_AI_MODEL ?? 'gpt-4o-mini';
const API_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL ?? 'https://api.openai.com/v1';
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT =
  'Anda adalah asisten kesehatan mata berbahasa Indonesia. Berikan analisa awal berdasarkan gejala pengguna secara singkat, jelas, dan aman. Jangan memberikan diagnosis pasti, selalu sarankan pemeriksaan dokter untuk kondisi berat.';

export const hasAiConfig = Boolean(API_KEY);

export async function analyzeEyeSymptoms(prompt: string, history: SymptomMessage[] = []) {
  if (!API_KEY) {
    return {
      answer:
        'AI belum diaktifkan. Tambahkan VITE_OPENAI_API_KEY di file .env agar analisa real-time dapat digunakan.',
      source: 'fallback' as const,
    };
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map((item) => ({ role: item.role, content: item.content })),
    { role: 'user', content: prompt },
  ];

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
}
