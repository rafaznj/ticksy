import { TicketsPagedTable } from "@/components/tables/tickets";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tickets")({
  validateSearch: (search: Record<string, unknown>) => ({
    status: Object.values(TicketStatusEnum).includes(search.status as TicketStatusEnum)
      ? (search.status as TicketStatusEnum)
      : undefined,
  }),
  component: TicketsPagedTable,
});
