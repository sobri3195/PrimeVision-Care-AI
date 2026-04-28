import type { DiseaseRisk, EyeCheckInput, EyeCheckResult, EyeUrgency } from '@/types/eyeCheck';
import { recommendProductKeywords } from '@/lib/productRecommendationEngine';

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

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const generateDailyCarePlan = (input: EyeCheckInput, urgency: EyeUrgency, redFlags: string[]) => {
  if (urgency === 'darurat' || redFlags.length > 0) {
    return [
      'Prioritaskan pemeriksaan langsung hari ini di IGD/RS mata.',
      'Hindari menyetir sendiri bila penglihatan terganggu.',
      'Siapkan daftar obat yang sedang dikonsumsi untuk dokter.',
    ];
  }

  const plan = [
    'Gunakan aturan 20-20-20 saat menatap layar.',
    'Tingkatkan frekuensi berkedip dan jaga hidrasi tubuh.',
  ];

  if (input.dryEye || input.screenTime > 8) {
    plan.push('Batasi paparan AC/layar berkepanjangan dan pertimbangkan pelumas mata sesuai anjuran.');
  }

  if (input.diabetes) {
    plan.push('Jaga gula darah dan jadwalkan evaluasi retina berkala.');
  }

  if (input.age <= 18) {
    plan.push('Targetkan outdoor time anak minimal 2 jam per hari.');
  }

  return plan;
};

const estimateFollowUpDays = (urgency: EyeUrgency) => {
  if (urgency === 'darurat') return 0;
  if (urgency === 'cepat') return 3;
  return 30;
};

export function runAiRiskEngine(input: EyeCheckInput): EyeCheckResult {
  const cleanInput: EyeCheckInput = {
    ...input,
    age: clamp(input.age, 1, 110),
    screenTime: clamp(input.screenTime, 0, 24),
    dmDurationYears: clamp(input.dmDurationYears, 0, 80),
    latestHbA1c: clamp(input.latestHbA1c, 4, 18),
    airConditionedRoomHours: clamp(input.airConditionedRoomHours, 0, 24),
    sleepHours: clamp(input.sleepHours, 0, 24),
    childNearWorkHours: clamp(input.childNearWorkHours, 0, 16),
    childOutdoorHours: clamp(input.childOutdoorHours, 0, 16),
    symptoms: input.symptoms.trim(),
  };

  const redFlags: string[] = [];
  let score = 5;

  if (cleanInput.suddenSeverePain) redFlags.push('Nyeri mata hebat mendadak');
  if (cleanInput.suddenVisionLoss) redFlags.push('Penurunan visus mendadak');
  if (cleanInput.flashesOrFloaters) redFlags.push('Kilatan/cairan hitam mendadak');
  if (cleanInput.eyeTrauma) redFlags.push('Riwayat trauma mata');
  if (cleanInput.redEyeWithNausea) redFlags.push('Mata merah disertai mual');

  if (cleanInput.age > 60) score += 15;
  if (cleanInput.diabetes) score += 18;
  if (cleanInput.hypertension) score += 10;
  if (cleanInput.screenTime > 8) score += 12;
  if (cleanInput.blurryVision) score += 14;
  if (cleanInput.redEye) score += 9;
  if (cleanInput.eyePain) score += 14;
  if (cleanInput.dryEye) score += 9;
  if (cleanInput.familyHistory) score += 7;
  if (cleanInput.postOpStatus && (cleanInput.eyePain || cleanInput.blurryVision)) score += 20;
  if (cleanInput.age < 18 && cleanInput.screenTime > 6 && cleanInput.glasses) score += 15;
  score += redFlags.length * 12;

  const symptomsText = cleanInput.symptoms.toLowerCase();
  if (/sulit melihat malam|silau|glare/.test(symptomsText)) score += 8;
  if (/mata berpasir|perih|kering/.test(symptomsText)) score += 5;
  if (/penglihatan menurun mendadak|gelap/.test(symptomsText)) {
    score += 15;
    redFlags.push('Keluhan teks mengindikasikan penurunan penglihatan mendadak');
  }

  const glaucomaScore =
    (cleanInput.age >= 40 ? 25 : 10) +
    (cleanInput.familyHistory ? 25 : 0) +
    (cleanInput.hypertension ? 10 : 0) +
    (cleanInput.eyePain ? 15 : 0);

  const diabeticRetinopathyScore =
    (cleanInput.diabetes ? 30 : 0) +
    Math.min(25, cleanInput.dmDurationYears * 2) +
    (cleanInput.latestHbA1c >= 8 ? 25 : cleanInput.latestHbA1c >= 7 ? 15 : 5) +
    (cleanInput.retinaCheckOverYear ? 20 : 0);

  const cataractScore =
    (cleanInput.age >= 55 ? 25 : 5) +
    (cleanInput.glareAtNight ? 25 : 0) +
    (cleanInput.lowContrastVision ? 20 : 0) +
    (cleanInput.progressiveBilateralBlur ? 20 : 0);

  const dryEyeScore =
    Math.min(25, cleanInput.screenTime * 2) +
    Math.min(15, cleanInput.airConditionedRoomHours * 2) +
    (cleanInput.usesContactLens ? 15 : 0) +
    (cleanInput.sleepHours < 6 ? 20 : 10) +
    (cleanInput.dryEye ? 15 : 0);

  const progressiveMyopiaScore =
    (cleanInput.age <= 18 ? 30 : 5) +
    Math.min(25, cleanInput.childNearWorkHours * 3) +
    (cleanInput.childOutdoorHours < 2 ? 25 : 10) +
    (cleanInput.glasses && cleanInput.age <= 18 ? 20 : 5);

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
  if (cleanInput.diabetes) explainabilityFactors.push('Status diabetes meningkatkan risiko retina.');
  if (cleanInput.screenTime > 8) explainabilityFactors.push('Screen-time tinggi berkaitan dengan kelelahan & mata kering.');
  if (cleanInput.age > 55) explainabilityFactors.push('Usia >55 tahun meningkatkan risiko katarak/glaukoma.');
  if (cleanInput.familyHistory) explainabilityFactors.push('Riwayat keluarga berkontribusi pada risiko glaukoma.');
  if (cleanInput.symptoms) explainabilityFactors.push(`Keluhan utama terdeteksi: ${cleanInput.symptoms}.`);

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

  const carePlan = generateDailyCarePlan(cleanInput, urgency, redFlags);
  const followUpWindowDays = estimateFollowUpDays(urgency);

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
    suggestedProductCategory: cleanInput.diabetes
      ? 'Diabetes Eye Care'
      : cleanInput.lasikInterest
        ? 'Voucher Prime Center'
        : cleanInput.dryEye
          ? 'Produk Mata Sehat'
          : 'Paket Pemeriksaan',
    suggestedEducationTopic: topDisease?.name ?? 'Kesehatan mata umum',
    confidenceBand,
    explainabilityFactors,
    diseaseRisks,
    carePlan,
    followUpWindowDays,
    recommendedProductKeywords: recommendProductKeywords(cleanInput),
    preTriageSummary: `Pasien usia ${cleanInput.age} tahun dengan urgensi ${urgency}. Keluhan utama: ${cleanInput.symptoms || '-'}.
Risiko dominan: ${topDisease?.name ?? '-'} (${topDisease?.level ?? '-'}). Red-flag: ${redFlags.length ? redFlags.join(', ') : 'tidak ada'}.`,
  };
}
