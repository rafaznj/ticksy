import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/shared/utils/format-date";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import { t } from "i18next";
import {
  ticketCategoryStyles,
  ticketPriorityStyles,
  ticketStatusStyles,
} from "@/shared/constants/enum-styles";

interface ticketTableColumnsParams {
  categoryLabels: Record<string, string>;
  priorityLabels: Record<string, string>;
  statusLabels: Record<string, string>;
  isAdmin: boolean;
  isTechnicalAssistance: boolean;
}

export function ticketTableColumns({
  categoryLabels,
  priorityLabels,
  statusLabels,
  isAdmin,
  isTechnicalAssistance,
}: ticketTableColumnsParams): ColumnDef<TicketPagedDto>[] {
  const allColumns: (ColumnDef<TicketPagedDto> & { disabled?: boolean })[] = [
    { accessorKey: "code", header: t("ticket.table.columns.code"), enableSorting: true },
    {
      accessorKey: "title",
      header: t("ticket.table.columns.title"),
      enableSorting: true,
      cell: ({ row }) => row.original.title,
    },
    {
      accessorKey: "description",
      header: t("ticket.table.columns.description"),
      enableSorting: false,
      cell: ({ row }) => row.original.description,
    },
    {
      accessorKey: "status",
      header: t("ticket.table.columns.status"),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`capitalize ${ticketStatusStyles[row.original.status] ?? ""}`}
        >
          {statusLabels[row.original.status] ?? row.original.status}
        </Badge>
      ),
      enableSorting: false,
    },

    {
      accessorKey: "priority",
      header: t("ticket.table.columns.priority"),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`capitalize ${ticketPriorityStyles[row.original.priority] ?? ""}`}
        >
          {priorityLabels[row.original.priority] ?? row.original.priority}
        </Badge>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "category",
      header: t("ticket.table.columns.category"),
      cell: ({ row }) => {
        return (
          <Badge
            variant="secondary"
            className={`capitalize ${ticketCategoryStyles[row.original.category] ?? ""}`}
          >
            {categoryLabels[row.original.category] ?? row.original.category}
          </Badge>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "createdByName",
      header: t("ticket.table.columns.createdByName"),
      cell: ({ row }) => row.original.createdByName,
      enableSorting: false,
      disabled: !isAdmin && !isTechnicalAssistance,
    },
    {
      accessorKey: "assignedToName",
      header: t("ticket.table.columns.assignedToName"),
      cell: ({ row }) => row.original.assignedToName ?? t("ticket.table.unassigned"),
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      header: t("user.table.columns.created_at"),
      cell: ({ row }) => formatDate(row.original.createdAt),
      enableSorting: true,
      disabled: !isAdmin,
    },
    {
      accessorKey: "updatedAt",
      header: t("user.table.columns.updated_at"),
      cell: ({ row }) => formatDate(row.original.updatedAt),
      enableSorting: true,
      disabled: !isAdmin,
    },
  ];

  return allColumns.filter((col) => !col.disabled);
}
