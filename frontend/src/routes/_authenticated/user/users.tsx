import { UsersTable } from "@/components/users-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/users")({
  component: UsersTable,
});
