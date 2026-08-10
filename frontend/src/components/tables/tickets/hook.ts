import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { usePagedQuery } from "@/components/PagedTable/hook";
import { container } from "@/lib/inversifyJS/index.container";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IGetTicketPagedService } from "@/modules/ticket/services/contracts/get-paged";
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

  const resolvedTicketService = container.get<IResolvedTicketService>(
    SERVICE_TOKENS.ResolvedTicketService,
  );

  const { mutate: handleResolved } = useResolvedTicket(resolvedTicketService);

  const priorityLabels = useMemo(() => enumToLabels(TicketPriorityEnum, "ticket.priority", t), [t]);
  const statusLabels = useMemo(() => enumToLabels(TicketStatusEnum, "ticket.status", t), [t]);

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
      resolved: (ticket: TicketPagedDto) => handleResolved(ticket.id),
      visibilityAction: {
        edit: (ticket: TicketPagedDto) =>
          (ticket.createdById === user?.id || isAdmin) &&
          ticket.status !== TicketStatusEnum.RESOLVED,
        delete: (ticket: TicketPagedDto) =>
          !ticket.assignedToName || ticket.status !== TicketStatusEnum.RESOLVED,
        assign: (ticket: TicketPagedDto) => !ticket.assignedToName && isAdmin,
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
      },
    };
  }, [openEditTicket, openDeleteTicket, openAssignTicket, handleResolved, user?.id, isAdmin, t]);

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
