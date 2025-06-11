'use client';

import { usePush } from '@/hooks/usePush';
import { Icon } from '@reloop/ui/components/icon';
import { RadioGroup, RadioGroupItem } from '@reloop/ui/components/radio-group';
import { cn } from '@reloop/ui/lib/utils';
import { useId } from 'react';

export default function UserMode() {
  const id = useId();
  const { mode, changeMode, isDev } = usePush();

  return (
    <div className="bg-input/50 inline-flex h-8 rounded-full p-0.5">
      <RadioGroup
        value={mode}
        onValueChange={changeMode}
        className={`${isDev ? 'after:bg-black' : 'after:bg-indigo-500'} flex-1 group  has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-full after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=dev]:after:translate-x-0 data-[state=marketing]:after:translate-x-full`}
        data-state={mode}
      >
        <label
          className={cn(
            'group-data-[state=marketing]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none gap-2 text-white',
            isDev ? 'text-white' : 'text-black',
          )}
        >
          <Icon name="coding" className="w-3 h-3" />
          <span className="text-xs">Dev</span>
          <RadioGroupItem id={`${id}-1`} value="dev" className="sr-only" />
        </label>
        <label
          className={cn(
            'group-data-[state=dev]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-6 whitespace-nowrap transition-colors select-none gap-2 text-white',
            isDev ? 'text-indigo-500' : 'text-white',
          )}
        >
          <Icon name="mega-phone" className="w-3 h-3 shrink-0" />
          <span className="text-xs">Marketing</span>
          <RadioGroupItem
            id={`${id}-2`}
            value="marketing"
            className="sr-only"
          />
        </label>
      </RadioGroup>
    </div>
  );
}
