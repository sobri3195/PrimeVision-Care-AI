import type { DiseaseRisk, EyeCheckInput, EyeCheckResult, EyeUrgency } from '@/types/eyeCheck';

export const getRiskLevel = (score: number): EyeCheckResult['riskLevel'] => {
  if (score <= 30) return 'Risiko Rendah';
  if (score <= 60) return 'Perlu Perhatian';
  if (score <= 80) return 'Disarankan Periksa';
  return 'Segera Periksa';
};

const getUrgency = (score: number, redFlags: string[]): EyeUrgency => {
  if (redFlags.length > 0 || score >= 81) return 'darurat';
  if (score >= 55) return 'cepat';
  return 'rutin';
};

const getConfidenceBand = (score: number, signalCount: number): EyeCheckResult['confidenceBand'] => {
  if (signalCount >= 9 || score >= 80) return 'tinggi';
  if (signalCount >= 5 || score >= 55) return 'sedang';
  return 'rendah';
};

const toDiseaseRisk = (name: DiseaseRisk['name'], score: number, note: string): DiseaseRisk => ({
  name,
  level: score >= 70 ? 'tinggi' : score >= 40 ? 'sedang' : 'rendah',
  note,
});

export function runAiRiskEngine(input: EyeCheckInput): EyeCheckResult {
  const redFlags: string[] = [];
  let score = 5;

  if (input.suddenSeverePain) redFlags.push('Nyeri mata hebat mendadak');
  if (input.suddenVisionLoss) redFlags.push('Penurunan visus mendadak');
  if (input.flashesOrFloaters) redFlags.push('Kilatan/cairan hitam mendadak');
  if (input.eyeTrauma) redFlags.push('Riwayat trauma mata');
  if (input.redEyeWithNausea) redFlags.push('Mata merah disertai mual');

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
  score += redFlags.length * 12;

  const glaucomaScore =
    (input.age >= 40 ? 25 : 10) +
    (input.familyHistory ? 25 : 0) +
    (input.hypertension ? 10 : 0) +
    (input.eyePain ? 15 : 0);

  const diabeticRetinopathyScore =
    (input.diabetes ? 30 : 0) +
    Math.min(25, input.dmDurationYears * 2) +
    (input.latestHbA1c >= 8 ? 25 : input.latestHbA1c >= 7 ? 15 : 5) +
    (input.retinaCheckOverYear ? 20 : 0);

  const cataractScore =
    (input.age >= 55 ? 25 : 5) +
    (input.glareAtNight ? 25 : 0) +
    (input.lowContrastVision ? 20 : 0) +
    (input.progressiveBilateralBlur ? 20 : 0);

  const dryEyeScore =
    Math.min(25, input.screenTime * 2) +
    Math.min(15, input.airConditionedRoomHours * 2) +
    (input.usesContactLens ? 15 : 0) +
    (input.sleepHours < 6 ? 20 : 10) +
    (input.dryEye ? 15 : 0);

  const progressiveMyopiaScore =
    (input.age <= 18 ? 30 : 5) +
    Math.min(25, input.childNearWorkHours * 3) +
    (input.childOutdoorHours < 2 ? 25 : 10) +
    (input.glasses && input.age <= 18 ? 20 : 5);

  const diseaseRisks: DiseaseRisk[] = [
    toDiseaseRisk('Glaukoma', glaucomaScore, 'Pertimbangkan cek tekanan bola mata & OCT saraf optik.'),
    toDiseaseRisk('Retinopati Diabetik', diabeticRetinopathyScore, 'Evaluasi retina berkala penting untuk pasien diabetes.'),
    toDiseaseRisk('Katarak', cataractScore, 'Keluhan silau malam dan kontras menurun perlu evaluasi refraksi/lensa.'),
    toDiseaseRisk('Mata Kering', dryEyeScore, 'Optimalkan blink, hidrasi, dan paparan AC/lensa kontak.'),
    toDiseaseRisk('Miopia Progresif Anak', progressiveMyopiaScore, 'Tingkatkan outdoor time dan kurangi near-work berlebih.'),
  ];

  score = Math.min(
    100,
    score + diseaseRisks.filter((item) => item.level === 'tinggi').length * 5 + diseaseRisks.filter((item) => item.level === 'sedang').length * 2,
  );

  const riskLevel = getRiskLevel(score);
  const urgency = getUrgency(score, redFlags);
  const topDisease = diseaseRisks
    .slice()
    .sort((a, b) => (a.level === b.level ? 0 : a.level === 'tinggi' ? -1 : b.level === 'tinggi' ? 1 : a.level === 'sedang' ? -1 : 1))[0];

  const explainabilityFactors: string[] = [];
  if (redFlags.length) explainabilityFactors.push(`Red-flag klinis: ${redFlags.join(', ')}`);
  if (input.diabetes) explainabilityFactors.push('Status diabetes meningkatkan risiko retina.');
  if (input.screenTime > 8) explainabilityFactors.push('Screen-time tinggi berkaitan dengan kelelahan & mata kering.');
  if (input.age > 55) explainabilityFactors.push('Usia >55 tahun meningkatkan risiko katarak/glaukoma.');
  if (input.familyHistory) explainabilityFactors.push('Riwayat keluarga berkontribusi pada risiko glaukoma.');

  const signalCount = explainabilityFactors.length + diseaseRisks.filter((d) => d.level !== 'rendah').length;
  const confidenceBand = getConfidenceBand(score, signalCount);

  const recommendationMap = {
    'Risiko Rendah': 'Risiko saat ini relatif rendah. Lanjutkan kebiasaan sehat mata dan evaluasi rutin.',
    'Perlu Perhatian': 'Terdapat faktor risiko yang perlu dipantau. Pertimbangkan konsultasi 1-3 hari.',
    'Disarankan Periksa': 'Risiko klinis cukup bermakna. Jadwalkan pemeriksaan mata komprehensif.',
    'Segera Periksa': 'Risiko tinggi terdeteksi. Butuh evaluasi dokter mata sesegera mungkin.',
  } as const;

  const ctaConfig = {
    darurat: { ctaLabel: 'Ke IGD Mata Hari Ini', ctaHref: '/booking?service=urgent-eye-er' },
    cepat: { ctaLabel: 'Telemedis 1-3 Hari', ctaHref: '/booking?service=telemedis' },
    rutin: { ctaLabel: 'Booking Klinik 1-4 Minggu', ctaHref: '/booking?service=routine-eye-clinic' },
  } as const;

  return {
    riskScore: score,
    riskLevel,
    recommendation: recommendationMap[riskLevel],
    urgency,
    redFlags,
    suggestedAction:
      urgency === 'darurat'
        ? 'Segera ke IGD/RS mata hari ini.'
        : urgency === 'cepat'
          ? 'Jadwalkan telemedis atau klinik dalam 1-3 hari.'
          : 'Lakukan pemeriksaan rutin dalam 1-4 minggu.',
    ctaLabel: ctaConfig[urgency].ctaLabel,
    ctaHref: ctaConfig[urgency].ctaHref,
    suggestedProductCategory: input.diabetes
      ? 'Diabetes Eye Care'
      : input.lasikInterest
        ? 'Voucher Prime Center'
        : input.dryEye
          ? 'Produk Mata Sehat'
          : 'Paket Pemeriksaan',
    suggestedEducationTopic: topDisease?.name ?? 'Kesehatan mata umum',
    confidenceBand,
    explainabilityFactors,
    diseaseRisks,
    preTriageSummary: `Pasien usia ${input.age} tahun dengan urgensi ${urgency}. Keluhan utama: ${input.symptoms || '-'}.
Risiko dominan: ${topDisease?.name ?? '-'} (${topDisease?.level ?? '-'}). Red-flag: ${redFlags.length ? redFlags.join(', ') : 'tidak ada'}.`,
  };
}
