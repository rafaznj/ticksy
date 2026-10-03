import { ListUsersPage } from "@/pages/user/ListUsers";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/users")({
  component: ListUsersPage,
});
