"use client";

import * as React from "react";
import { Terminal, Workflow } from "lucide-react";

import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@reloop/ui/components/sidebar";
import Link from "next/link";
import { Logo } from "@reloop/ui/components/logo";
import UserMode from "./UserMode";
import { Badge } from "@reloop/ui/components/badge";

import cn from "@reloop/ui/utils/cn";
import { usePush } from "@/hooks/usePush";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMarketing, mode } = usePush();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex justify-between">
              <Link
                href="/"
                className="flex gap-2 px-2 md:pt-0 pt-3 items-center"
              >
                <Logo className="w-[26px] h-[26px]" />
                <span className="text-base font-semibold">ReLoop</span>
              </Link>
              <Badge
                className={cn(
                  "rounded-full capitalize text-xs",
                  isMarketing ? "bg-blue-500" : "",
                )}
              >
                {isMarketing ? (
                  <Workflow className="w-3 h-3" />
                ) : (
                  <Terminal className="w-3 h-3" />
                )}
                {mode}
              </Badge>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary />
      </SidebarContent>
      <SidebarFooter>
        <UserMode />
      </SidebarFooter>
    </Sidebar>
  );
}
