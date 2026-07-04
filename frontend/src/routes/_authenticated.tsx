import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AppSidebar } from "@/layouts/AppSidebar";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <div className="flex h-screen">
      <AppSidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
