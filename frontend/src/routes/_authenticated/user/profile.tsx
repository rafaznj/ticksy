import { EditUserPage } from "@/pages/user/EditUser";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/profile")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/home",
  }),
  component: EditUserPage,
});
