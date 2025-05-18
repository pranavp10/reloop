import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@reloop/ui/components/sidebar";
import { SiteHeader } from "@/components/SiteHeader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <div className="">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
