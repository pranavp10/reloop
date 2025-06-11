'use client';
import { useTabs } from '@/hooks/useTabs';
import { Icon } from '@reloop/ui/components/icon';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@reloop/ui/components/tabs';

export const SettingsTab = () => {
  const { activePath, onTabChange } = useTabs({ basePath: '/settings' });
  return (
    <Tabs value={activePath}>
      <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full justify-start">
        {tabs.map(({ icon, path, title }) => (
          <div key={title}>
            <TabsTrigger
              value={path}
              onClick={() => onTabChange(path)}
              className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-[6.5px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none w-fit"
            >
              <Icon name={icon} className="me-0.5 opacity-60" />
              {title}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
    </Tabs>
  );
};

const tabs = [
  {
    title: 'General',
    icon: 'home-3',
    path: 'general',
  },
  {
    title: 'Teams',
    icon: 'users',
    path: 'teams',
  },
  {
    title: 'Usage',
    icon: 'chart-pie',
    path: 'usage',
  },
  {
    title: 'Billing',
    icon: 'invoice',
    path: 'billing',
  },
];
