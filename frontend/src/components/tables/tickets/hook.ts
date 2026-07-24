import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { usePagedQuery } from "@/components/PagedTable/hook";
import { container } from "@/lib/inversifyJS/index.container";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { formatDate } from "@/shared/utils/format-date";
import type { IGetTicketPagedService } from "@/modules/ticket/services/contracts/get-paged";
import { TicketPriorityEnum } from "@/modules/ticket/enums/ticket-priority.enum";
import { TicketStatusEnum } from "@/modules/ticket/enums/ticket-status.enum";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";

export function useTicketsPagedTable() {
  const { t } = useTranslation();
  const getTicketPagedService = container.get<IGetTicketPagedService>(
    SERVICE_TOKENS.GetTicketPagedService,
  );

  const {
    data,
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    isLoading,
    isError,
    search,
    setSearch,
    sorting,
    onSortingChange,
    pageSize,
    setPageSize,
    nextPage,
    previousPage,
  } = usePagedQuery(getTicketPagedService, { queryKey: "tickets" });

  const priorityLabels = useMemo(() => enumToLabels(TicketPriorityEnum, "ticket.priority", t), [t]);
  const statusLabels = useMemo(() => enumToLabels(TicketStatusEnum, "ticket.status", t), [t]);

  const columns = useMemo<ColumnDef<TicketPagedDto>[]>(
    () => [
      { accessorKey: "id", header: t("ticket.table.columns.id") },
      { accessorKey: "title", header: t("ticket.table.columns.title") },
      { accessorKey: "description", header: t("ticket.table.columns.description") },
      {
        accessorKey: "priority",
        header: t("ticket.table.columns.priority"),
        cell: ({ row }) => priorityLabels[row.original.priority] ?? row.original.priority,
      },
      {
        accessorKey: "status",
        header: t("ticket.table.columns.status"),
        cell: ({ row }) => statusLabels[row.original.status] ?? row.original.status,
      },
      {
        accessorKey: "createdByName",
        header: t("ticket.table.columns.createdByName"),
        cell: ({ row }) => row.original.createdByName,
      },
      {
        accessorKey: "assignedToName",
        header: t("ticket.table.columns.assignedToName"),
        cell: ({ row }) => row.original.assignedToName,
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
    ],
    [t, priorityLabels, statusLabels],
  );

  const actions = useMemo(
    () => ({
      edit: (ticket: TicketPagedDto) => console.log("editar", ticket),
      deactivate: (ticket: TicketPagedDto) => console.log("desativar", ticket),
    }),
    [],
  );

  return {
    data,
    columns,
    actions,
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    isLoading,
    isError,
    search,
    setSearch,
    sorting,
    onSortingChange,
    pageSize,
    setPageSize,
    nextPage,
    previousPage,
  };
}
