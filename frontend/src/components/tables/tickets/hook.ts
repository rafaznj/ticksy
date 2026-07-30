import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { usePagedQuery } from "@/components/PagedTable/hook";
import { container } from "@/lib/inversifyJS/index.container";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { formatDate } from "@/shared/utils/format-date";
import type { IGetTicketPagedService } from "@/modules/ticket/services/contracts/get-paged";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import { useDialog } from "@/contexts/use-dialog";
import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";

export function useTicketsPagedTable() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
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

  const { open: openEditTicket } = useDialog<TicketEntity>(DIALOG_KEYS.UPDATE_TICKET);
  const { open: openDeleteTicket } = useDialog<TicketEntity>(DIALOG_KEYS.DELETE_TICKET);
  const { open: openAssignTicket } = useDialog<TicketEntity>(DIALOG_KEYS.ASSIGN_TICKET);

  const priorityLabels = useMemo(() => enumToLabels(TicketPriorityEnum, "ticket.priority", t), [t]);
  const statusLabels = useMemo(() => enumToLabels(TicketStatusEnum, "ticket.status", t), [t]);

  const isAdmin = user?.role === UserRoleEnum.ADMIN;

  const columns = useMemo<ColumnDef<TicketPagedDto>[]>(() => {
    const allColumns: (ColumnDef<TicketPagedDto> & { adminOnly?: boolean })[] = [
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
        adminOnly: true,
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
    ];

    return allColumns.filter((col) => !col.adminOnly || isAdmin);
  }, [t, priorityLabels, statusLabels, isAdmin]);

  const actions = useMemo(
    () => ({
      edit: (ticket: TicketPagedDto) => openEditTicket(ticket),
      delete: (ticket: TicketPagedDto) => openDeleteTicket(ticket),
      assign: (ticket: TicketPagedDto) => openAssignTicket(ticket),
      disableAction: {
        edit: (ticket: TicketPagedDto) => !(isAdmin || ticket.createdById === user?.id),
        delete: (ticket: TicketPagedDto) => !!ticket.assignedToName,
        assign: (ticket: TicketPagedDto) => !!ticket.assignedToName,
      },
      tooltips: {
        edit: (ticket: TicketPagedDto) =>
          isAdmin || ticket.createdById === user?.id
            ? t("general.actions.edit")
            : t("ticket.errors.editNotAllowed"),
        delete: (ticket: TicketPagedDto) =>
          ticket.assignedToName ? t("ticket.errors.deleteAssigned") : t("general.actions.delete"),
        assign: (ticket: TicketPagedDto) =>
          ticket.assignedToName ? t("ticket.errors.alreadyAssigned") : t("ticket.actions.assign"),
      },
    }),
    [isAdmin, user?.id, openDeleteTicket, openEditTicket, openAssignTicket, t],
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
