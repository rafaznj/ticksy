import { TotalTicketsPage } from "@/pages/tickets/TicketsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets/total")({
  component: TotalTicketsPage,
});
