import { EditUserPage } from "@/pages/user/EditUser";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/user/profile")({
  component: EditUserPage,
});
