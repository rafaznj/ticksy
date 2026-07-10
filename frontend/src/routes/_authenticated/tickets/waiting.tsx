import { WaitingTicketsPage } from "@/pages/tickets/Waiting";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets/waiting")({
  component: WaitingTicketsPage,
});
