import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cx } from '@/lib/utils';

export default function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cx('rounded-3xl bg-white p-5 shadow-soft', className)} {...props}>
      {children}
    </div>
  );
}
