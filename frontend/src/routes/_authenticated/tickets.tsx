import { TicketsPagedTable } from "@/components/tables/tickets";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets")({
  component: TicketsPagedTable,
});
