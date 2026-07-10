import { FinishedTicketsPage } from "@/pages/tickets/form/Finished";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets/finished")({
  component: FinishedTicketsPage,
});
