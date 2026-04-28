import { Activity, BookOpen, Home, ShoppingBag, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cx } from '@/lib/utils';

const items = [
  { to: '/', label: 'Beranda', icon: Home },
  { to: '/ai-check', label: 'Cek AI', icon: Activity },
  { to: '/education', label: 'Edukasi', icon: BookOpen },
  { to: '/marketplace', label: 'Belanja', icon: ShoppingBag },
  { to: '/profile', label: 'Profil', icon: User },
];

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-md border-t border-slate-200 bg-white shadow-soft">
      <div className="grid grid-cols-5">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => cx('flex flex-col items-center gap-1 py-2 text-[11px]', isActive ? 'text-primeNavy' : 'text-slate-500')}>
            <item.icon size={18} />
            <span>{item.label}</span>
            <span className="h-0.5 w-6 rounded-full bg-primeGold" />
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
