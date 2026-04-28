import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { cx } from '@/lib/utils';

export default function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={cx('rounded-2xl bg-white p-4 shadow-soft', className)}>
      {children}
    </motion.div>
  );
}
