import { UsersPagedTable } from "@/components/tables/users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/users")({
  component: UsersPagedTable,
});
