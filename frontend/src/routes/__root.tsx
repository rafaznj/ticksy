import { createRootRoute, Outlet, useRouter } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";

import { NotFoundRouteComponent } from "@/routes/NotFoundRoute";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { ThemeProvider } from "next-themes";

function RootComponent() {
  const router = useRouter();

  useEffect(() => {
    useAuthStore.setState({
      logout: () => void router.navigate({ to: "/login" }),
    });
  }, [router]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Outlet />
      <Toaster />
      <Suspense />
    </ThemeProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundRouteComponent,
});
