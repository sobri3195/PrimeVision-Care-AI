import type { PropsWithChildren } from 'react';
import BottomNavigation from './BottomNavigation';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-slate-50 pb-24">
      {children}
      <BottomNavigation />
    </div>
  );
}
