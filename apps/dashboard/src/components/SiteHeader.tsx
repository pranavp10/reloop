import { Separator } from "@reloop/ui/components/separator";
import { SidebarTrigger } from "@reloop/ui/components/sidebar";
import { Organization } from "./Organization/Index";
import { NavUser } from "./NavUser";
import UserMode from "./UserMode";

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b border-dashed transition-[width,height] ease-linear sticky top-0 bg-white z-10">
      <div className="px-4 lg:px-6 flex justify-between w-full items-center">
        <div className="flex w-full items-center gap-1 lg:gap-2 ">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Organization />
        </div>
        <div className="flex gap-2 items-center">
          <UserMode />
          <NavUser />
        </div>
      </div>
    </header>
  );
}
