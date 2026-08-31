import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { usePagedQuery } from "@/components/PagedTable/hook";
import { container } from "@/lib/inversifyJS/index.container";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IGetTicketPagedWithScopeService } from "@/modules/ticket/services/contracts/get-paged-with-scope";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import { useDialog } from "@/contexts/use-dialog";
import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { ticketTableColumns } from "@/components/tables/tickets/columns";
import type { IResolvedTicketService } from "@/modules/ticket/services/contracts/resolved";
import { useResolvedTicket } from "@/modules/ticket/query-hooks/mutation/use-resolved";
import { getRouteApi } from "@tanstack/react-router";

export function useTicketsPagedTable() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const ticketsRoute = getRouteApi("/_authenticated/tickets");
  const { status: statusFromRoute } = ticketsRoute.useSearch();
  const [status, setStatus] = useState<TicketStatusEnum | "all">(statusFromRoute ?? "all");
  const filters = useMemo(() => (status === "all" ? {} : { status }), [status]);

  const getTicketPagedService = container.get<IGetTicketPagedWithScopeService>(
    SERVICE_TOKENS.GetTicketPagedWithScopeService,
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
    sorting,
    pageSize,
    setSearch,
    onSortingChange,
    setPageSize,
    nextPage,
    previousPage,
  } = usePagedQuery(getTicketPagedService, { queryKey: "tickets", filters });

  const { open: openEditTicket } = useDialog<TicketEntity>(DIALOG_KEYS.UPDATE_TICKET);
  const { open: openDeleteTicket } = useDialog<TicketEntity>(DIALOG_KEYS.DELETE_TICKET);
  const { open: openAssignTicket } = useDialog<TicketEntity>(DIALOG_KEYS.ASSIGN_TICKET);
  const { open: openUnassignTicket } = useDialog<TicketEntity>(DIALOG_KEYS.UNASSIGN_TICKET);

  const resolvedTicketService = container.get<IResolvedTicketService>(
    SERVICE_TOKENS.ResolvedTicketService,
  );

  const { mutate: handleResolved } = useResolvedTicket(resolvedTicketService);

  const priorityLabels = useMemo(() => enumToLabels(TicketPriorityEnum, "ticket.priority", t), [t]);
  const statusLabels = useMemo(() => enumToLabels(TicketStatusEnum, "ticket.status", t), [t]);
  const statusFilterOptions = useMemo(
    () => Object.values(TicketStatusEnum).map((value) => ({ value, label: statusLabels[value] })),
    [statusLabels],
  );

  const isAdmin = user?.role === UserRoleEnum.ADMIN;

  const columns = useMemo(
    () => ticketTableColumns({ priorityLabels, statusLabels, isAdmin }),
    [priorityLabels, statusLabels, isAdmin],
  );

  const actions = useMemo(() => {
    return {
      edit: (ticket: TicketPagedDto) => openEditTicket(ticket),
      delete: (ticket: TicketPagedDto) => openDeleteTicket(ticket),
      assign: (ticket: TicketPagedDto) => openAssignTicket(ticket),
      unassign: (ticket: TicketPagedDto) => openUnassignTicket(ticket),
      resolved: (ticket: TicketPagedDto) => handleResolved(ticket.id),
      visibilityAction: {
        edit: (ticket: TicketPagedDto) =>
          (ticket.createdById === user?.id || isAdmin) &&
          ticket.status !== TicketStatusEnum.RESOLVED,
        delete: (ticket: TicketPagedDto) => !ticket.assignedToId,
        assign: (ticket: TicketPagedDto) => isAdmin && ticket.assignedToId === null,
        unassign: (ticket: TicketPagedDto) =>
          isAdmin && ticket.assignedToId !== null && ticket.status !== TicketStatusEnum.RESOLVED,
        resolved: (ticket: TicketPagedDto) =>
          ticket.status !== TicketStatusEnum.RESOLVED &&
          (ticket.assignedToId === user?.id || isAdmin) &&
          ticket.assignedToId !== null,
      },
      tooltips: {
        edit: () => t("general.actions.edit"),
        delete: () => t("general.actions.delete"),
        assign: () => t("general.actions.assign"),
        resolved: () => t("general.actions.resolved"),
        unassign: () => t("general.actions.unassign"),
      },
    };
  }, [
    openEditTicket,
    openDeleteTicket,
    openAssignTicket,
    openUnassignTicket,
    handleResolved,
    user?.id,
    isAdmin,
    t,
  ]);

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
    sorting,
    pageSize,
    t,
    status,
    statusLabels,
    statusFilterOptions,
    setSearch,
    onSortingChange,
    setPageSize,
    nextPage,
    previousPage,
    setStatus,
  };
}
