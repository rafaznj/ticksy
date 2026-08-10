import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/shared/utils/format-date";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { t } from "i18next";

const priorityStyles: Record<TicketPriorityEnum, string> = {
  [TicketPriorityEnum.LOW]:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  [TicketPriorityEnum.MEDIUM]:
    "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:ring-yellow-400/20",
  [TicketPriorityEnum.HIGH]:
    "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/20",
  [TicketPriorityEnum.URGENT]:
    "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-400 dark:ring-rose-400/20",
};

const statusStyles: Record<TicketStatusEnum, string> = {
  [TicketStatusEnum.OPEN]:
    "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/20",
  [TicketStatusEnum.IN_PROGRESS]:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/20",
  [TicketStatusEnum.RESOLVED]:
    "bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20 dark:bg-teal-400/10 dark:text-teal-400 dark:ring-teal-400/20",
};

interface ticketTableColumnsParams {
  priorityLabels: Record<string, string>;
  statusLabels: Record<string, string>;
  isAdmin: boolean;
}

export function ticketTableColumns({
  priorityLabels,
  statusLabels,
  isAdmin,
}: ticketTableColumnsParams): ColumnDef<TicketPagedDto>[] {
  const allColumns: (ColumnDef<TicketPagedDto> & { adminOnly?: boolean })[] = [
    { accessorKey: "title", header: t("ticket.table.columns.title") },
    { accessorKey: "description", header: t("ticket.table.columns.description") },
    {
      accessorKey: "priority",
      header: t("ticket.table.columns.priority"),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`capitalize ${priorityStyles[row.original.priority] ?? ""}`}
        >
          {priorityLabels[row.original.priority] ?? row.original.priority}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: t("ticket.table.columns.status"),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`capitalize ${statusStyles[row.original.status] ?? ""}`}
        >
          {statusLabels[row.original.status] ?? row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "createdByName",
      header: t("ticket.table.columns.createdByName"),
      cell: ({ row }) => row.original.createdByName,
      adminOnly: true,
    },
    {
      accessorKey: "assignedToName",
      header: t("ticket.table.columns.assignedToName"),
      cell: ({ row }) => row.original.assignedToName ?? t("ticket.table.unassigned"),
    },
    {
      accessorKey: "createdAt",
      header: t("user.table.columns.created_at"),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "updatedAt",
      header: t("user.table.columns.updated_at"),
      cell: ({ row }) => formatDate(row.original.updatedAt),
    },
  ];

  return allColumns.filter((col) => !col.adminOnly || isAdmin);
}
