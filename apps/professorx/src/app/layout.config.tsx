import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@reloop/ui/components/avatar';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import IconImage from '@/app/icon.png';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Avatar className="cursor-pointer w-6 h-6">
          <AvatarImage referrerPolicy="no-referrer" src={IconImage.src} />
          <AvatarFallback className="text-sm">RT</AvatarFallback>
        </Avatar>
        RT Stack
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
  githubUrl: 'https://github.com/nktnet1/rt-stack',
};
