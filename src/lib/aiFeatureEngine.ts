import type { EyeCheckRecord } from '@/types/eyeCheck';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function scoreLasikReadiness(input: {
  age: number;
  glassesYearsStable: number;
  dryEye: boolean;
  autoImmune: boolean;
  pregnant: boolean;
  highMinus: boolean;
}) {
  let score = 65;
  score += input.age >= 21 && input.age <= 40 ? 15 : input.age < 18 ? -40 : 0;
  score += input.glassesYearsStable >= 1 ? 10 : -15;
  score += input.highMinus ? -12 : 8;
  score += input.dryEye ? -18 : 5;
  score += input.autoImmune ? -25 : 0;
  score += input.pregnant ? -20 : 0;

  const normalized = clamp(score, 0, 100);

  if (normalized >= 80) {
    return { level: 'tinggi', score: normalized, note: 'Secara skrining awal cukup layak untuk evaluasi LASIK komprehensif.' } as const;
  }

  if (normalized >= 55) {
    return { level: 'sedang', score: normalized, note: 'Perlu evaluasi topografi kornea, ketebalan kornea, dan stabilitas refraksi.' } as const;
  }

  return { level: 'rendah', score: normalized, note: 'Skrining awal belum ideal. Optimalkan kondisi mata dan konsultasi dokter spesialis.' } as const;
}

export function scoreDiabetesEyeGuard(input: {
  hasDiabetes: boolean;
  dmDurationYears: number;
  latestHbA1c: number;
  retinaCheckOverYear: boolean;
  blurryVision: boolean;
}) {
  if (!input.hasDiabetes) {
    return {
      score: 12,
      level: 'rendah',
      interval: 'Tetap skrining mata rutin tiap 1-2 tahun.',
      note: 'Belum ada faktor diabetes aktif pada skrining ini.',
    } as const;
  }

  let score = 25;
  score += Math.min(25, input.dmDurationYears * 2.5);
  score += input.latestHbA1c >= 8 ? 25 : input.latestHbA1c >= 7 ? 14 : 6;
  score += input.retinaCheckOverYear ? 22 : 6;
  score += input.blurryVision ? 12 : 0;

  const normalized = clamp(score, 0, 100);
  const level = normalized >= 70 ? 'tinggi' : normalized >= 45 ? 'sedang' : 'rendah';
  const interval = level === 'tinggi' ? 'Kontrol retina 1-3 bulan.' : level === 'sedang' ? 'Kontrol retina 3-6 bulan.' : 'Kontrol retina 12 bulan.';

  return {
    score: normalized,
    level,
    interval,
    note: 'Skor menggabungkan lama diabetes, HbA1c, gejala visual, dan kepatuhan kontrol retina.',
  } as const;
}

export function scoreMyopiaProgress(input: {
  age: number;
  nearWorkHours: number;
  outdoorHours: number;
  glasses: boolean;
}) {
  let score = input.age <= 18 ? 35 : 10;
  score += Math.min(30, input.nearWorkHours * 4);
  score += input.outdoorHours < 2 ? 25 : input.outdoorHours < 3 ? 12 : 4;
  score += input.glasses && input.age <= 18 ? 10 : 0;

  const normalized = clamp(score, 0, 100);
  const level = normalized >= 70 ? 'tinggi' : normalized >= 45 ? 'sedang' : 'rendah';

  return {
    score: normalized,
    level,
    forecast: level === 'tinggi' ? 'Risiko progres minus cepat 6-12 bulan ke depan.' : level === 'sedang' ? 'Risiko progres ada, butuh kontrol kebiasaan harian.' : 'Risiko progres rendah, lanjutkan kebiasaan protektif.',
  } as const;
}

export function scorePostOpSafety(input: { daysAfterSurgery: number; pain: boolean; redEye: boolean; blurryVision: boolean; suddenDrop: boolean }) {
  let score = input.daysAfterSurgery <= 7 ? 20 : 10;
  score += input.pain ? 20 : 0;
  score += input.redEye ? 15 : 0;
  score += input.blurryVision ? 20 : 0;
  score += input.suddenDrop ? 35 : 0;

  const normalized = clamp(score, 0, 100);
  const level = normalized >= 75 ? 'darurat' : normalized >= 45 ? 'cepat' : 'rutin';

  return {
    score: normalized,
    level,
    instruction:
      level === 'darurat'
        ? 'Tanda bahaya pasca-op terdeteksi. Segera ke IGD/klinik mata hari ini.'
        : level === 'cepat'
          ? 'Perlu kontrol cepat dalam 24-72 jam.'
          : 'Lanjutkan obat dan kontrol sesuai jadwal dokter.',
  } as const;
}

export function summarizeDiseaseInsight(lastRecord: EyeCheckRecord | null) {
  if (!lastRecord) {
    return {
      headline: 'Belum ada data skrining terbaru.',
      priorities: ['Selesaikan Cek Mata AI untuk menghasilkan insight penyakit personal.'],
    };
  }

  const top = lastRecord.diseaseRisks
    .slice()
    .sort((a, b) => (a.level === b.level ? 0 : a.level === 'tinggi' ? -1 : b.level === 'tinggi' ? 1 : a.level === 'sedang' ? -1 : 1))
    .slice(0, 3);

  return {
    headline: `Prioritas risiko: ${top.map((item) => item.name).join(', ')}.`,
    priorities: top.map((item) => `${item.name}: risiko ${item.level}. ${item.note}`),
  };
}
