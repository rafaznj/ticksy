import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import { useAuthStore } from "@/lib/zustand/use-auth";
import { AppHeader } from "@/components/layouts/AppHeader";
import { AppSidebar } from "@/components/layouts/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogProvider } from "@/contexts/dialog-provider";

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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <TooltipProvider delayDuration={0}>
        <SidebarProvider open={false} onOpenChange={() => {}}>
          <DialogProvider>
            <AppSidebar />

            <SidebarInset>
              <AppHeader />

              <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
                <Outlet />
              </div>
            </SidebarInset>
          </DialogProvider>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
