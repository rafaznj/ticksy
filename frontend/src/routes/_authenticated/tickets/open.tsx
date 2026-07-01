import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets/open")({
  component: OpenTicketsPage,
});

function OpenTicketsPage() {
  return <div>Tickets Abertos</div>;
}
