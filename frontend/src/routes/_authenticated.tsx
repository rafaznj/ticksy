import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import { useAuthStore } from "@/lib/zustand/use-auth";
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

            <SidebarInset className="bg-slate-50 dark:bg-background flex flex-col h-svh overflow-hidden">
              <div className="flex flex-1 flex-col min-w-0 min-h-0 p-4 md:p-6 lg:p-8">
                <Outlet />
              </div>
            </SidebarInset>
          </DialogProvider>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
