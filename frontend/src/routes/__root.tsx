import { createRootRoute, Outlet, useRouter } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";

import { NotFoundRouteComponent } from "@/components/NotFoundRoute";
import { useUser } from "@/libs/zustand/use-user";
import { Toaster } from "@/components/ui/sonner";

function RootComponent() {
  const router = useRouter();

  useEffect(() => {
    useUser.setState({
      logout: () => void router.navigate({ to: "/login" }),
    });
  }, [router]);

  return (
    <>
      <Outlet />
      <Toaster />

      <Suspense />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundRouteComponent,
});
