'use client';
import { updateUser, useSession } from '@/lib/auth/client';
import { Button } from '@reloop/ui/components/button';
import { Icon } from '@reloop/ui/components/icon';
import { cn } from '@reloop/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export const SelectMode = () => {
  const [mode, setMode] = useState<'dev' | 'marketing' | undefined>();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  return (
    <div className="flex flex-col gap-9 items-center">
      <div className="w-full grid grid-cols-2 gap-6">
        <button
          type="button"
          className={cn(
            'border rounded-3xl text-left relative',
            mode === 'dev' ? 'border-primary bg-foreground text-white' : '',
          )}
          onClick={() => setMode('dev')}
        >
          <div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
          <div className="p-10 grid gap-4">
            <Icon name="terminal" />
            <p className="text-xl font-medium">Developer</p>
            <p
              className={cn(
                'text-sm font-me text-balance',
                mode === 'dev' ? 'text-secondary' : 'text-muted-foreground',
              )}
            >
              Access API keys, SDK, documentation, and developer tools for
              seamless email integration into your applications.
            </p>
          </div>
        </button>
        <button
          type="button"
          className={cn(
            'border rounded-3xl text-left relative',
            mode === 'marketing'
              ? 'border-primary bg-foreground text-white'
              : '',
          )}
          onClick={() => setMode('marketing')}
        >
          <div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
          <div className="p-10 grid gap-4">
            <Icon name="workflow" />
            <p className="text-xl font-medium">
              Business Owner / Product Manager
            </p>
            <p
              className={cn(
                'text-sm font-me text-balance',
                mode === 'marketing'
                  ? 'text-secondary'
                  : 'text-muted-foreground',
              )}
            >
              Start building beautiful emails, manage subscriber lists, and
              create and analyze campaign performance.
            </p>
          </div>
        </button>
      </div>
      <Button
        isLoading={loading}
        disabled={!mode || loading}
        size="lg"
        className="w-48 h-12 text-base rounded-full"
        onClick={async () => {
          if (data?.user.activeOrganization) {
            setLoading(true);
            await updateUser({ activeMode: mode });
            push(`/${mode}/${data?.user.activeOrganization}`);
          }
        }}
      >
        Continue
      </Button>
    </div>
  );
};
