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

export const MarketingSidebar = () => {
  const { push, matchRoute } = usePush();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Marketing</SidebarGroupLabel>
      <SidebarMenu>
        {marketingItems.map((item) => {
          const isActive = matchRoute(item.url);
          return (
            <Collapsible key={item.title} asChild className="relative">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  onClick={() => push(`${item.url}`)}
                  className={cn(
                    'cursor-pointer hover:bg-indigo-50 hover:text-indigo-500',
                    isActive
                      ? 'bg-indigo-50 text-indigo-500'
                      : 'text-muted-foreground',
                  )}
                >
                  <div>
                    {isActive && (
                      <div className="h-[60%] w-[2.5px] bg-indigo-500 absolute my-1 left-[1px] rounded-full" />
                    )}
                    <Icon name={item.icon} />
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

const marketingItems = [
  {
    title: 'Home',
    url: '/',
    icon: 'box',
  },
  {
    title: 'Templates',
    url: '/templates',
    icon: 'grid',
  },
  {
    title: 'Campaigns',
    url: '/campaigns',
    icon: 'mega-phone',
  },
  {
    title: 'Automation',
    url: '/automation',
    icon: 'route',
  },
  {
    title: 'Audience',
    url: '/audience',
    icon: 'users',
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: 'gear',
  },
];
