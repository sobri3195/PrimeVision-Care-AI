import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cx } from '@/lib/utils';

export default function Button({ children, className, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button className={cx('rounded-2xl bg-primeNavy px-4 py-3 text-sm font-semibold text-white active:scale-[0.98]', className)} {...props}>
      {children}
    </button>
  );
}
