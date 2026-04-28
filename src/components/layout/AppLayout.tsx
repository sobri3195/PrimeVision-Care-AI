import type { PropsWithChildren } from 'react';
import BottomNavigation from './BottomNavigation';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] pb-24">
      {children}
      <BottomNavigation />
    </div>
  );
}
