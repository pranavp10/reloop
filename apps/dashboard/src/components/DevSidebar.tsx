'use client';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@reloop/ui/components/sidebar';
import { Collapsible } from '@reloop/ui/components/collapsible';
import { usePush } from '@/hooks/usePush';
import { Icon } from '@reloop/ui/components/icon';
import { cn } from '@reloop/ui/lib/utils';

export const DevSidebar = () => {
  const { push, matchRoute } = usePush();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Developers</SidebarGroupLabel>
      <SidebarMenu>
        {devItems.map((item) => {
          const isActive = matchRoute(item.url);
          return (
            <Collapsible key={item.title} asChild className="relative">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  onClick={() => push(`${item.url}`)}
                  className={cn(
                    'cursor-pointer hover:bg-sidebar-accent',
                    isActive
                      ? 'bg-sidebar-accent  text-black'
                      : 'text-black/75',
                  )}
                >
                  <div>
                    {isActive && (
                      <div className="h-[60%] w-[2.5px] bg-black absolute my-1 left-[1px] rounded-full" />
                    )}
                    <Icon
                      name={item.icon}
                      className={cn(
                        isActive ? 'text-primary' : 'text-muted-foreground',
                      )}
                    />
                    <span>{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

const devItems = [
  {
    title: 'Home',
    url: '/',
    icon: 'box',
  },
  {
    title: 'Audience',
    url: '/audience',
    icon: 'users',
  },
  {
    title: 'API Keys',
    url: '/keys',
    icon: 'coding',
  },
  {
    title: 'Webhooks',
    url: '/webhooks',
    icon: 'modules',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'gear',
  },
];
