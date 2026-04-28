import type { GamificationState } from '@/types/gamification';

export function computeGamification(points: number, streak: number, completedMissions: number): GamificationState {
  const badges = [
    streak >= 7 ? '7 Days Eye Break' : '',
    points >= 400 ? 'Screen Time Warrior' : '',
    completedMissions >= 10 ? 'Education Learner' : '',
    points >= 1000 ? 'PrimeVision Champion' : '',
  ].filter(Boolean);

  const userLevel =
    points >= 1500
      ? 'PrimeVision Champion'
      : points >= 1000
      ? 'Family Eye Guardian'
      : points >= 600
      ? 'Healthy Vision Hero'
      : points >= 250
      ? 'Eye Care Starter'
      : 'Beginner Viewer';

  const rewardEligibility = [points >= 200 ? 'Voucher cek mata' : '', points >= 500 ? 'Diskon screening LASIK' : ''].filter(Boolean);

  return { points, streak, completedMissions, badges, userLevel, rewardEligibility };
}
