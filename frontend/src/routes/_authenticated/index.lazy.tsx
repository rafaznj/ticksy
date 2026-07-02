import { createFileRoute, createLazyFileRoute, redirect } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  beforeLoad: () => {
    const isAuthenticated = /* checa token */;
    throw redirect({ to: isAuthenticated ? "/home" : "/login" });
  },
});