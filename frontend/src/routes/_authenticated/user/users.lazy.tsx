import { UsersPagedTable } from "@/components/tables/users";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/user/users")({
  component: UsersPagedTable,
});
