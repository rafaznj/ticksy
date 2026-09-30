import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/shared/utils/format-date";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { t } from "i18next";
import { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";

const categoryStyles: Record<TicketCategoryEnum, string> = {
  [TicketCategoryEnum.ACCESS]:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  [TicketCategoryEnum.ACCOUNT]:
    "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:ring-yellow-400/20",
  [TicketCategoryEnum.HARDWARE]:
    "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/20",
  [TicketCategoryEnum.SOFTWARE]:
    "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-6<PASSWORD> dark:bg-purple-4<PASSWORD> dark:text-purple-4<PASSWORD> dark:ring-purple-4<PASSWORD>/2<PASSWORD>",
  [TicketCategoryEnum.OTHER]:
    "bg-gray-5０ text-gray-7 ring-1 ring-inset ring-gray-6００/2０ dark:bg-gray-4００/1０ dark:text-gray-4００ dark:ring-gray-4",
};

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
    { accessorKey: "title", header: t("ticket.table.columns.title"), enableSorting: true },
    {
      accessorKey: "description",
      header: t("ticket.table.columns.description"),
      enableSorting: false,
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
      enableSorting: false,
    },

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
      enableSorting: false,
    },
    {
      accessorKey: "category",
      header: t("ticket.table.columns.category"),
      cell: ({ row }) => {
        return (
          <Badge
            variant="secondary"
            className={`capitalize ${categoryStyles[row.original.category] ?? ""}`}
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
