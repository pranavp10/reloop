import { Separator } from "@reloop/ui/components/separator";
import { SidebarTrigger } from "@reloop/ui/components/sidebar";
import { Organization } from "./Organization/Index";
import { NavUser } from "./NavUser";
import { Button } from "@reloop/ui";

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
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
          <Button
            size="sm"
            variant="link"
            className="text-muted-foreground font-normal p-0"
          >
            Docs
          </Button>
          <NavUser />
        </div>
      </div>
    </header>
  );
}
