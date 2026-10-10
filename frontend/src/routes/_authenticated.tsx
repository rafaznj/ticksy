import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { useAuthStore } from "@/lib/zustand/use-auth";
import { AppSidebar } from "@/components/layouts/Sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogProvider } from "@/providers/dialog-provider";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState();

    if (!accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider open={false} onOpenChange={() => {}}>
        <DialogProvider>
          <AppSidebar />

          <SidebarInset className="flex h-svh min-w-0 flex-col overflow-hidden bg-background">
            <div className="flex min-h-10 shrink-0 items-center px-3 pt-2 md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-3 sm:p-4 md:overflow-hidden md:p-6 lg:p-8">
              <Outlet />
            </div>
          </SidebarInset>
        </DialogProvider>
      </SidebarProvider>
    </TooltipProvider>
  );
}
