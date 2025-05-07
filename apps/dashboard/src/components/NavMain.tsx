"use client";

import {
  ChevronRight,
  Home,
  KeyRound,
  Settings,
  UsersRound,
  Webhook,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@reloop/ui/components/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@reloop/ui/components/collapsible";
import { usePush } from "@/hooks/usePush";

export function NavMain() {
  const { push, isDev } = usePush();
  const items = isDev ? devItems : marketingItems;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {isDev ? "Developer Platform" : "Marketing Platform"}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item?.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                onClick={() => push(`/${item.url}`)}
              >
                <div>
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const general = [
  {
    title: "General",
    url: "/general",
  },
  {
    title: "Team",
    url: "/team",
  },
  {
    title: "Billing",
    url: "/billing",
  },
  {
    title: "Limits",
    url: "/limits",
  },
];

const devItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Audience",
    url: "/audience",
    icon: UsersRound,
  },
  {
    title: "API Keys",
    url: "/keys",
    icon: KeyRound,
  },
  {
    title: "Webhooks",
    url: "/webhooks",
    icon: Webhook,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    isActive: true,
    items: general,
  },
];

const marketingItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/setting",
    icon: Settings,
    isActive: true,
    items: general,
  },
];
