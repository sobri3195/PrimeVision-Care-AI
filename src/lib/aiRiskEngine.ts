import type { EyeCheckInput, EyeCheckResult } from '@/types/eyeCheck';

export const getRiskLevel = (score: number): EyeCheckResult['riskLevel'] => {
  if (score <= 30) return 'Risiko Rendah';
  if (score <= 60) return 'Perlu Perhatian';
  if (score <= 80) return 'Disarankan Periksa';
  return 'Segera Periksa';
};

export function runAiRiskEngine(input: EyeCheckInput): EyeCheckResult {
  let score = 5;
  if (input.age > 60) score += 15;
  if (input.diabetes) score += 18;
  if (input.hypertension) score += 10;
  if (input.screenTime > 8) score += 12;
  if (input.blurryVision) score += 14;
  if (input.redEye) score += 9;
  if (input.eyePain) score += 14;
  if (input.dryEye) score += 9;
  if (input.familyHistory) score += 7;
  if (input.postOpStatus && (input.eyePain || input.blurryVision)) score += 20;
  if (input.age < 18 && input.screenTime > 6 && input.glasses) score += 15;
  score = Math.min(100, score);

  const riskLevel = getRiskLevel(score);
  const recommendationMap = {
    'Risiko Rendah': 'Saat ini tidak terlihat tanda risiko tinggi dari jawaban Anda. Tetap jaga kebiasaan mata sehat.',
    'Perlu Perhatian': 'Ada beberapa faktor yang perlu diperhatikan. Lakukan pemantauan dan pertimbangkan pemeriksaan mata.',
    'Disarankan Periksa': 'Hasil menunjukkan Anda sebaiknya melakukan pemeriksaan mata untuk evaluasi lebih akurat.',
    'Segera Periksa': 'Ada tanda yang perlu diperiksa segera. Hubungi klinik atau dokter mata.',
  } as const;

  return {
    riskScore: score,
    riskLevel,
    recommendation: recommendationMap[riskLevel],
    suggestedAction: riskLevel === 'Segera Periksa' ? 'Booking cepat & hubungi klinik.' : 'Pantau gejala dan lakukan booking.',
    suggestedProductCategory: input.diabetes
      ? 'Diabetes Eye Care'
      : input.lasikInterest
      ? 'Voucher Prime Center'
      : input.dryEye
      ? 'Produk Mata Sehat'
      : 'Paket Pemeriksaan',
    suggestedEducationTopic: input.diabetes ? 'Diabetes dan mata' : input.lasikInterest ? 'LASIK' : input.screenTime > 8 ? 'Mata lelah' : 'Katarak',
  };
}
