import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets/finished")({
  component: FinishedTicketsPage,
});

function FinishedTicketsPage() {
  return <div>Tickets Finalizados</div>;
}
