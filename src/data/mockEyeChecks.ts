import type { EyeCheckInput, EyeCheckRecord } from '@/types/eyeCheck';
import { runAiRiskEngine } from '@/lib/aiRiskEngine';

export const mockEyeChecks: EyeCheckRecord[] = Array.from({ length: 300 }, (_, i) => {
  const input: EyeCheckInput = {
    age: 12 + (i % 65),
    symptoms: ['Mata lelah', 'Penglihatan buram', 'Mata kering'][i % 3],
    screenTime: 2 + (i % 11),
    diabetes: i % 8 === 0,
    hypertension: i % 10 === 0,
    glasses: i % 2 === 0,
    blurryVision: i % 4 === 0,
    redEye: i % 5 === 0,
    eyePain: i % 6 === 0,
    dryEye: i % 3 === 0,
    familyHistory: i % 7 === 0,
    lasikInterest: i % 9 === 0,
    postOpStatus: i % 15 === 0,
    suddenSeverePain: i % 40 === 0,
    suddenVisionLoss: i % 47 === 0,
    flashesOrFloaters: i % 34 === 0,
    eyeTrauma: i % 50 === 0,
    redEyeWithNausea: i % 44 === 0,
    dmDurationYears: i % 16,
    latestHbA1c: 6 + (i % 4) * 0.7,
    retinaCheckOverYear: i % 3 === 0,
    glareAtNight: i % 5 === 0,
    lowContrastVision: i % 6 === 0,
    progressiveBilateralBlur: i % 7 === 0,
    usesContactLens: i % 4 === 0,
    airConditionedRoomHours: 2 + (i % 8),
    sleepHours: 5 + (i % 4),
    childNearWorkHours: 1 + (i % 6),
    childOutdoorHours: i % 4,
  };

  const result = runAiRiskEngine(input);

  return {
    id: `ec-${i + 1}`,
    ...input,
    ...result,
    createdAt: `2026-04-${String((i % 28) + 1).padStart(2, '0')}`,
  };
});
