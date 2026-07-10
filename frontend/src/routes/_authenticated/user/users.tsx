import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/user/user"!</div>;
}
