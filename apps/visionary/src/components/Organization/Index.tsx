"use client";

import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@reloop/ui/components/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@reloop/ui/components/dropdown-menu";
import { BoringAvatar } from "@reloop/ui/components/avatar";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AddOrganization } from "./AddOrganization";
import { useQueryState } from "nuqs";
import { useSession } from "@/lib/auth/client";

export function Organization() {
  const { data } = useSession();
  const router = useRouter();
  const params = useParams<{ organizationId: string }>();
  const [organizationName] = useQueryState("orgName", {
    defaultValue: "",
  });
  const [addOrganization, setAddOrganization] =
    useState<boolean>(!!organizationName);

  if (!data?.user) return null;

  const organization: [
    {
      id?: string;
      name: string;
      logo?: string | null;
      isActive: boolean;
    },
  ] = [
    {
      name: data.user.name,
      logo: data.user.image,
      isActive: !params?.organizationId,
    },
  ];

  return (
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-3 [&>svg]:size-auto">
                <div className="flex aspect-square items-center justify-center rounded-md overflow-hidden  relative after:rounded-[inherit] after:absolute after:inset-0 after:shadow-[0_1px_2px_0_rgb(0_0_0/.05),inset_0_1px_0_0_rgb(255_255_255/.12)] after:pointer-events-none">
                  <BoringAvatar name={data.user.name} size={20} />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight">
                  <span className="truncate font-medium">
                    {data.user.name ?? "Select a Team"}
                  </span>
                </div>
                <ChevronsUpDown
                  className="ms-auto text-sidebar-foreground/50"
                  size={14}
                  aria-hidden="true"
                />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-md"
              align="start"
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuLabel className="uppercase text-muted-foreground/70 text-xs">
                Teams
              </DropdownMenuLabel>
              {organization.map((org) => (
                <DropdownMenuItem
                  key={org.name}
                  onClick={() => {
                    if (org.id) {
                      router.push(`/onboarding/${org.id}`);
                    }
                  }}
                  className="gap-2 p-2 flex items-center"
                >
                  {org.logo ? (
                    <img src={org.logo} width={36} height={36} alt={org.name} />
                  ) : (
                    <BoringAvatar name={org.name} size={36} />
                  )}
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base">{org.name}</p>
                    <Check className="w-5 h-5" />
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                className="gap-2 p-2"
                onClick={() => setAddOrganization(true)}
              >
                <CirclePlus className="text-blue-500" />
                <div className="">Add Organization</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <AddOrganization open={addOrganization} setOpen={setAddOrganization} />
    </div>
  );
}
