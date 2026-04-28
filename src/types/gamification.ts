export type Challenge = {
  id: string;
  title: string;
  type: 'daily' | 'weekly';
  points: number;
  progress: number;
  target: number;
};

export type GamificationState = {
  points: number;
  streak: number;
  completedMissions: number;
  badges: string[];
  userLevel: string;
  rewardEligibility: string[];
};
