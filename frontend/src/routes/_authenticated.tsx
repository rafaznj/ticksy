import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import { useAuthStore } from "@/lib/zustand/use-auth";
import { AppHeader } from "@/components/layouts/AppHeader";
import { AppSidebar } from "@/components/layouts/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogProvider } from "@/contexts/DialogContext";

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
          <div className="flex min-h-screen w-full">
            <DialogProvider>
              <AppSidebar />
              <main className="flex min-w-0 flex-1 flex-col">
                <AppHeader />
                <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
                  <Outlet />
                </div>
              </main>
            </DialogProvider>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
