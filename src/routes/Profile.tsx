import { Link } from 'react-router-dom';
import TopBar from '@/components/layout/TopBar';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { mockUsers, mockBookings } from '@/data/mockUsers';
import ReminderCard from '@/components/profile/ReminderCard';
import HistoryCard from '@/components/profile/HistoryCard';

export default function Profile() {
  const user = mockUsers[0];
  return <div className="space-y-4 px-4 pb-4"><TopBar title="Profil" /><Card><p className="font-bold">{user.name}</p><p>PrimePoints: {user.points}</p><p>Streak: {user.streak} hari</p><div className="mt-3 grid grid-cols-2 gap-2"><Link to="/family-passport"><Button className="w-full">Family Passport</Button></Link><Link to="/voucher"><Button className="w-full bg-primeGold text-primeNavy">Voucher</Button></Link></div></Card><ReminderCard text="Waktunya istirahat mata 20 detik." />{mockBookings.slice(0,3).map((b)=><HistoryCard key={b.id} text={`${b.service} - ${b.date} ${b.time}`} />)}<Link to="/gamification"><Button className="w-full">Lihat Gamification</Button></Link></div>;
}
