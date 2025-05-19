'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { updateUser, useSession } from '@/lib/auth/client';
import { Button } from '@reloop/ui/components/button';
import { Icon } from '@reloop/ui/components/icon';
import { cn } from '@reloop/ui/lib/utils';
import { useLoading } from '@/hooks/useLoading';

const MODES = {
  dev: {
    title: 'Developer',
    description:
      'Instant APIs, drop‑in SDKs, and lucid docs—integrate bullet‑proof email before your coffee cools.',
    icon: 'terminal',
  },
  marketing: {
    title: 'Business Owner / Product Manager',
    description:
      'Craft captivating emails, grow dedicated audiences, and watch real‑time analytics turn campaigns into revenue—no code required.',
    icon: 'mega-phone',
  },
} as const;

export const SelectMode = () => {
  const [mode, setMode] = useState<keyof typeof MODES>();
  const { setLoading, setSuccess, status, setError } = useLoading();
  const { data } = useSession();
  const { push } = useRouter();

  const handleContinue = async () => {
    if (!mode || !data?.user.activeOrganization) return;
    setLoading();
    const repsones = await updateUser({ activeMode: mode });
    if (repsones.error) {
      setError();
    } else {
      setSuccess(() => push(`/${data.user.activeOrganization}/${mode}`));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Choose your way to send emails
      </h1>
      <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
        Change your modes whenever you need
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
        {Object.entries(MODES).map(([key, { title, description, icon }]) => {
          const isSelected = mode === key;
          return (
            <motion.button
              key={key}
              type="button"
              onClick={() => setMode(key as typeof mode)}
              whileTap={{ scale: 0.97 }}
              animate={{
                y: isSelected ? -6 : 0,
                scale: isSelected ? 1.03 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={cn(
                'border rounded-3xl p-6 md:p-10 flex flex-col gap-2.5 transition-colors duration-300 hover:shadow-md cursor-pointer text-left',
                isSelected
                  ? 'border-primary bg-foreground text-white'
                  : 'hover:border-gray-400',
              )}
            >
              <div className="flex justify-between items-start">
                <Icon
                  name={icon}
                  className={cn(
                    'w-8 h-8 transition-colors',
                    isSelected ? 'text-white' : 'text-black',
                  )}
                />
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.2 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <Icon
                      name="checkbox-circle"
                      className="w-4 h-4 text-white"
                    />
                  </motion.div>
                )}
              </div>
              <div className="grid gap-4 mt-4">
                <p className="text-xl font-semibold">{title}</p>
                <p
                  className={cn(
                    'text-sm',
                    isSelected ? 'text-secondary' : 'text-muted-foreground',
                  )}
                >
                  {description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity: mode ? 1 : 0.5,
            y: 0,
            scale: mode ? 1 : 0.97,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              disabled={!mode || status === 'loading'}
              size="lg"
              status={status}
              onClick={handleContinue}
              className="w-48 h-12 text-base rounded-full shadow-sm transition-all duration-300"
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
