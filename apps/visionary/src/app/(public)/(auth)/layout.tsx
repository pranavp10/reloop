import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { Logo } from '@reloop/ui/components/logo';

import { getCurrentUser } from '@/lib/auth/server';
import Link from 'next/link';
import { Button } from '@reloop/ui/components/button';
export const metadata: Metadata = {
  title: 'Auth',
};

type AuthLayoutProps = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect('/onboarding');
  }

  return (
    <div>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            href="/"
            className="flex justify-center items-center gap-2 w-fit mx-auto"
          >
            <Logo className="w-8 h-8" />
            <p className="font-semibold text-2xl">ReLoop</p>
          </Link>
          <div>
            <h1 className="text-lg text-center font-medium">
              Developer Power, Marketing Automation
            </h1>
            <h2 className="text-center font-medium text-sm text-foreground/50 pt-1">
              Continue with your Apple or Google Account
            </h2>
          </div>

          <div>
            <div className="flex flex-col gap-4">
              <Button variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  fill="none"
                >
                  <path
                    fill="#4280EF"
                    d="M14.117 7.661c0-.456-.045-.926-.118-1.368H7.63v2.604h3.648a3.07 3.07 0 0 1-1.353 2.044l2.177 1.692c1.28-1.192 2.015-2.927 2.015-4.972"
                  />
                  <path
                    fill="#34A353"
                    d="M7.63 14.252c1.824 0 3.354-.604 4.472-1.633l-2.177-1.677c-.603.412-1.383.647-2.295.647-1.765 0-3.25-1.191-3.794-2.78L1.6 10.53a6.74 6.74 0 0 0 6.03 3.722"
                  />
                  <path
                    fill="#F6B704"
                    d="M3.836 8.794a4.1 4.1 0 0 1 0-2.588L1.6 4.47a6.76 6.76 0 0 0 0 6.06z"
                  />
                  <path
                    fill="#E54335"
                    d="M7.63 3.426A3.68 3.68 0 0 1 10.22 4.44L12.146 2.5A6.5 6.5 0 0 0 7.63.749a6.74 6.74 0 0 0-6.03 3.72l2.236 1.736c.544-1.603 2.03-2.78 3.794-2.78"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  fill="none"
                >
                  <path
                    fill="#1B1F23"
                    fillRule="evenodd"
                    d="M7.5.917C3.77.917.75 3.937.75 7.667a6.75 6.75 0 0 0 4.615 6.404c.338.059.464-.144.464-.321 0-.16-.008-.692-.008-1.257-1.696.312-2.135-.414-2.27-.793-.076-.194-.405-.793-.692-.954-.236-.126-.573-.439-.008-.447.531-.008.911.49 1.038.692.607 1.02 1.578.734 1.966.557.059-.439.236-.734.43-.903-1.502-.169-3.071-.751-3.071-3.333 0-.734.261-1.341.692-1.814-.068-.169-.304-.86.067-1.789 0 0 .565-.177 1.856.692a6.3 6.3 0 0 1 1.688-.228c.574 0 1.147.076 1.687.228 1.291-.877 1.857-.692 1.857-.692.37.928.135 1.62.067 1.79.43.472.692 1.07.692 1.813 0 2.59-1.578 3.164-3.08 3.333.245.21.456.616.456 1.249 0 .902-.008 1.628-.008 1.856 0 .177.126.388.464.32a6.76 6.76 0 0 0 4.598-6.403c0-3.73-3.02-6.75-6.75-6.75"
                    clipRule="evenodd"
                  />
                </svg>
                Continue with Github
              </Button>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-6 mb-4">
              <span className="relative z-10 bg-muted px-2 text-muted-foreground font-medium text-xs">
                Or Sign in with Email
              </span>
            </div>
            {children}
          </div>
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground  max-w-sm">
          Clicking continue means you accept our{' '}
          <Link href="/terms" className="text-primary underline">
            Terms of Service
          </Link>
          ,{' '}
          <Link className="text-primary underline" href="/privacy">
            Privacy Policy
          </Link>
          , and the associated{' '}
          <Link className="text-primary underline" href="/license">
            Open Source License
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
