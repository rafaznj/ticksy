import { OpenTicketsPage } from "@/pages/tickets/form/Open";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets/open")({
  component: OpenTicketsPage,
});
