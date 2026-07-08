import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  beforeLoad: () => {
    const isAuthenticated = true;

    throw redirect({
      to: isAuthenticated ? "/home" : "/login",
    });
  },
});
