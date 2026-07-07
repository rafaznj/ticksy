import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import { AppSidebar } from "@/layouts/AppSidebar";
import { AppHeader } from "@/layouts/AppHeader";
import { TooltipProvider } from "@/components/primitives/tooltip";
import { SidebarProvider } from "@/components/primitives/sidebar";

export const Route = createFileRoute("/_authenticated")({
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

              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
