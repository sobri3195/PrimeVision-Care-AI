export type EyeUrgency = 'darurat' | 'cepat' | 'rutin';

export type EyeCheckInput = {
  age: number;
  symptoms: string;
  screenTime: number;
  diabetes: boolean;
  hypertension: boolean;
  glasses: boolean;
  blurryVision: boolean;
  redEye: boolean;
  eyePain: boolean;
  dryEye: boolean;
  familyHistory: boolean;
  lasikInterest: boolean;
  postOpStatus: boolean;
  suddenSeverePain: boolean;
  suddenVisionLoss: boolean;
  flashesOrFloaters: boolean;
  eyeTrauma: boolean;
  redEyeWithNausea: boolean;
  dmDurationYears: number;
  latestHbA1c: number;
  retinaCheckOverYear: boolean;
  glareAtNight: boolean;
  lowContrastVision: boolean;
  progressiveBilateralBlur: boolean;
  usesContactLens: boolean;
  airConditionedRoomHours: number;
  sleepHours: number;
  childNearWorkHours: number;
  childOutdoorHours: number;
};

export type DiseaseRisk = {
  name: 'Glaukoma' | 'Retinopati Diabetik' | 'Katarak' | 'Mata Kering' | 'Miopia Progresif Anak';
  level: 'rendah' | 'sedang' | 'tinggi';
  note: string;
};

export type EyeCheckResult = {
  riskScore: number;
  riskLevel: 'Risiko Rendah' | 'Perlu Perhatian' | 'Disarankan Periksa' | 'Segera Periksa';
  recommendation: string;
  suggestedAction: string;
  suggestedProductCategory: string;
  suggestedEducationTopic: string;
  urgency: EyeUrgency;
  redFlags: string[];
  ctaLabel: string;
  ctaHref: string;
  confidenceBand: 'rendah' | 'sedang' | 'tinggi';
  explainabilityFactors: string[];
  diseaseRisks: DiseaseRisk[];
  carePlan: string[];
  followUpWindowDays: number;
  recommendedProductKeywords: string[];
  preTriageSummary: string;
};

export type EyeCheckRecord = EyeCheckInput & EyeCheckResult & { id: string; createdAt: string };

export type VisualTestRecord = {
  id: string;
  userId: string;
  eye: 'kanan' | 'kiri';
  visualAcuityScore: number;
  amslerDistortion: boolean;
  contrastScore: number;
  recordedAt: string;
};
