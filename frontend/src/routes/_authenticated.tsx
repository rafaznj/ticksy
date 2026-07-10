import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import { useAuthStore } from "@/lib/zustand/use-auth";
import { AppHeader } from "@/components/layouts/AppHeader";
import { AppSidebar } from "@/components/layouts/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    const { accessToken, isHydrated } = useAuthStore.getState();

    if (!isHydrated) return;

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
        <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex flex-1 flex-col">
              <AppHeader />
              <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
                <Outlet />
              </div>
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
