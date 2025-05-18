'use client';
import { updateUser, useSession } from '@/lib/auth/client';
import { Button } from '@reloop/ui/components/button';
import { Icon } from '@reloop/ui/components/icon';
import { cn } from '@reloop/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'motion/react';

export const SelectMode = () => {
  const [mode, setMode] = useState<'dev' | 'marketing' | undefined>();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleContinue = async () => {
    if (!mode || !data?.user.activeOrganization) return;

    setLoading(true);
    try {
      await updateUser({ activeMode: mode });
      push(`/${mode}/${data?.user.activeOrganization}`);
    } catch (error) {
      console.error('Failed to update user mode:', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Choose your way to send emails
      </h1>
      <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
        change your modes when ever you need
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
        <motion.button
          type="button"
          className={cn(
            'border rounded-3xl text-left relative p-6 md:p-10 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-md cursor-pointer',
            mode === 'dev'
              ? 'border-primary bg-foreground text-white scale-[1.02]'
              : 'hover:border-gray-400',
          )}
          onClick={() => setMode('dev')}
          whileTap={{ scale: 0.98 }}
          animate={{
            y: mode === 'dev' ? -5 : 0,
          }}
        >
          <div className="flex justify-between items-start">
            <Icon
              name="terminal"
              className={cn(
                'w-8 h-8 transition-colors',
                mode === 'dev' ? 'text-white' : 'text-black',
              )}
            />
            {mode === 'dev' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Icon name="checkbox-circle" className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </div>

          <div className="grid gap-4 mt-4">
            <p className="text-xl font-semibold">Developer</p>
            <p
              className={cn(
                'text-sm',
                mode === 'dev' ? 'text-secondary' : 'text-muted-foreground',
              )}
            >
              Instant APIs, drop‑in SDKs, and lucid docs—integrate bullet‑proof
              email before your coffee cools.
            </p>
          </div>
        </motion.button>

        <motion.button
          type="button"
          className={cn(
            'border rounded-3xl text-left relative p-6 md:p-10 flex flex-col gap-2.5 transition-all duration-300 hover:border-black cursor-pointer',
            mode === 'marketing'
              ? 'border-primary bg-foreground text-white scale-[1.02]'
              : 'hover:border-gray-400',
          )}
          onClick={() => setMode('marketing')}
          whileTap={{ scale: 0.98 }}
          animate={{
            y: mode === 'marketing' ? -5 : 0,
          }}
        >
          <div className="flex justify-between items-start">
            <Icon
              name="mega-phone"
              className={cn(
                'w-8 h-8 transition-colors',
                mode === 'marketing' ? 'text-white' : 'text-black',
              )}
            />
            {mode === 'marketing' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Icon name="checkbox-circle" className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </div>

          <div className="grid gap-4 mt-4">
            <p className="text-xl font-semibold">
              Business Owner / Product Manager
            </p>
            <p
              className={cn(
                'text-sm',
                mode === 'marketing'
                  ? 'text-secondary'
                  : 'text-muted-foreground',
              )}
            >
              Craft captivating emails, grow dedicated audiences, and watch
              real‑time analytics turn campaigns into revenue—no code required.
            </p>
          </div>
        </motion.button>
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: mode ? 1 : 0.5,
            y: 0,
            scale: mode ? 1 : 0.98,
          }}
          transition={{ duration: 0.3 }}
        >
          <Button
            isLoading={loading}
            disabled={!mode || loading}
            size="lg"
            className="w-48 h-12 text-base rounded-full shadow-sm transition-all duration-300"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
