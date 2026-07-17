import { ResolvedTicketsPage } from "@/pages/tickets/ResolvedTicketsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets/resolved")({
  component: ResolvedTicketsPage,
});
