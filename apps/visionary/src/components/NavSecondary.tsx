'use client';

import { Icon } from '@reloop/ui/components/icon';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@reloop/ui/components/sidebar';

export function NavSecondary() {
  const items = [
    {
      title: 'Get Help',
      url: '#',
      icon: <Icon name="search" />,
    },
    {
      title: 'Search',
      url: '#',
      icon: <Icon name="search" />,
    },
  ];
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
