import type { Challenge } from '@/types/gamification';

const daily = ['Baca 1 edukasi mata','Selesaikan cek mata 2 menit','Lakukan 20-20-20 eye break','Tambahkan anggota keluarga','Cek LASIK readiness'];
const weekly = ['7 Hari Istirahat Mata','5 Hari Kurangi Screen Time','Family Eye Check Week','Diabetes Retina Awareness Week','Myopia Anak Monitoring Week'];

export const mockChallenges: Challenge[] = Array.from({ length: 20 }, (_, i) => ({
  id: `c-${i + 1}`,
  title: i < 10 ? daily[i % daily.length] : weekly[i % weekly.length],
  type: i < 10 ? 'daily' : 'weekly',
  points: i < 10 ? 20 : 80,
  progress: i % 4,
  target: i < 10 ? 1 : 5,
}));

export const mockBadges = ['7 Days Eye Break','Screen Time Warrior','Family Guardian','Diabetes Eye Aware','Myopia Parent Hero','LASIK Explorer','Post-Op Care Champion','Education Learner','Marketplace Saver','Booking Ready'];
