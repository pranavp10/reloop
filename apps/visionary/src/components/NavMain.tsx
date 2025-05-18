'use client';

import { usePush } from '@/hooks/usePush';
import { DevSidebar } from './DevSidebar';
import { MarketingSidebar } from './MarketingSidebar';
import { motion, AnimatePresence } from 'motion/react';

export function NavMain() {
  const { isDev, mode } = usePush();

  const sidebarVariants = (direction: 'left' | 'right') => {
    const offset = direction === 'right' ? 20 : -20;
    return {
      enter: { x: offset, opacity: 0.3 },
      center: { x: 0, opacity: 1 },
      exit: { x: offset, opacity: 0 },
    };
  };

  const SidebarComponent = isDev ? DevSidebar : MarketingSidebar;
  const direction = isDev ? 'right' : 'left';

  return (
    <div className="relative h-full">
      <AnimatePresence initial={false}>
        <motion.aside
          key={mode}
          variants={sidebarVariants(direction)}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.18, ease: 'easeInOut' }}
          className="h-full absolute inset-0"
        >
          <SidebarComponent />
        </motion.aside>
      </AnimatePresence>
    </div>
  );
}
