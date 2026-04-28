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
};

export type EyeCheckResult = {
  riskScore: number;
  riskLevel: 'Risiko Rendah' | 'Perlu Perhatian' | 'Disarankan Periksa' | 'Segera Periksa';
  recommendation: string;
  suggestedAction: string;
  suggestedProductCategory: string;
  suggestedEducationTopic: string;
};

export type EyeCheckRecord = EyeCheckInput & EyeCheckResult & { id: string; createdAt: string };
