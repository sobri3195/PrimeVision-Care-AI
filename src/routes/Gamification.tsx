import TopBar from '@/components/layout/TopBar';
import { computeGamification } from '@/lib/gamificationEngine';
import { loadLS } from '@/lib/utils';
import PointsCard from '@/components/gamification/PointsCard';
import StreakCard from '@/components/gamification/StreakCard';
import BadgeCard from '@/components/gamification/BadgeCard';
import ChallengeCard from '@/components/gamification/ChallengeCard';

export default function Gamification(){
  const state = computeGamification(loadLS('points', 420), loadLS('streak', 5), 12);
  return <div className="space-y-4 px-4"><TopBar title="Gamification"/><PointsCard text={`PrimePoints: ${state.points}`} /><StreakCard text={`Streak: ${state.streak} hari`} /><BadgeCard text={`Badge: ${state.badges.join(', ')}`} /><ChallengeCard text={`Level: ${state.userLevel}`} /></div>
}
