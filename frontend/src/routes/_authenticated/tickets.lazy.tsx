import { TicketsPagedTable } from "@/components/tables/tickets";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated/tickets")({
  component: TicketsPagedTable,
});
