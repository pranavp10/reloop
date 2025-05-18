import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@reloop/ui/components/sonner';
import { IconsSprite } from '@reloop/ui/components/icon';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export const metadata: Metadata = {
  title: 'Reloop',
  description: 'Mailing Maid Easy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NuqsAdapter>
          {children}
          <Toaster />
          <IconsSprite />
        </NuqsAdapter>
      </body>
    </html>
  );
}
