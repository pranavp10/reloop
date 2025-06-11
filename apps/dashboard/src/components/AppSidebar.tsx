'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { NavMain } from '@/components/NavMain';
import { NavSecondary } from '@/components/NavSecondary';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '@reloop/ui/components/sidebar';
import Link from 'next/link';
import { Logo } from '@reloop/ui/components/logo';
import { Badge } from '@reloop/ui/components/badge';

import { usePush } from '@/hooks/usePush';
import { cn } from '@reloop/ui/lib/utils';
import { Icon } from '@reloop/ui/components/icon';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMarketing, mode } = usePush();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex justify-between">
              <Link href="/" className="flex gap-2  md:pt-0 pt-3 items-center">
                <Logo className="w-[26px] h-[26px] shrink-0" />
                {state === 'expanded' && (
                  <span className="text-base font-semibold">ReLoop</span>
                )}
              </Link>
              {state === 'expanded' && (
                <motion.div
                  key={mode}
                  initial={{ x: isMarketing ? -20 : 20, opacity: 0.3 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isMarketing ? -20 : 20, opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                >
                  <Badge
                    className={cn(
                      'rounded-full capitalize text-xs h-6 inline-flex items-center gap-1',
                      isMarketing ? 'bg-indigo-500' : '',
                    )}
                  >
                    <Icon
                      name={isMarketing ? 'mega-phone' : 'coding'}
                      className="w-3 h-3"
                    />
                    {mode}
                  </Badge>
                </motion.div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary />
      </SidebarContent>
    </Sidebar>
  );
}
