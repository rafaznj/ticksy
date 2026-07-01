import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets/waiting")({
  component: WaitingTicketsPage,
});

function WaitingTicketsPage() {
  return <div>Tickets em Espera</div>;
}
