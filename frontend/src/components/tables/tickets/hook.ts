import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { usePagedQuery } from "@/components/tables/shared/PagedTable/hook";
import { container } from "@/lib/inversifyJS/index.container";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IGetTicketPagedWithScopeService } from "@/modules/ticket/services/contracts/get-paged-with-scope";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import { useDialog } from "@/hooks/use-dialog";
import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { ticketTableColumns } from "@/components/tables/tickets/columns";
import type { IResolvedTicketService } from "@/modules/ticket/services/contracts/resolved";
import { useResolvedTicket } from "@/modules/ticket/query-hooks/mutation/use-resolved";
import { getRouteApi } from "@tanstack/react-router";
import { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";

export function useTicketsPagedTable() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const ticketsRoute = getRouteApi("/_authenticated/tickets");
  const { status: statusFromRoute } = ticketsRoute.useSearch();
  const [status, setStatus] = useState<TicketStatusEnum | "all">(statusFromRoute ?? "all");
  const [priority, setPriority] = useState<TicketPriorityEnum | "all">("all");
  const [category, setCategory] = useState<TicketCategoryEnum | "all">("all");
  // const filters = useMemo(() => (status === "all" ? {} : { status }), [status]);

  const filters = useMemo(() => {
    const filter: Record<string, unknown> = {};
    if (status !== "all") {
      filter.status = status;
    }
    if (priority !== "all") {
      filter.priority = priority;
    }
    if (category !== "all") {
      filter.category = category;
    }
    return filter;
  }, [status, priority, category]);

  const getTicketPagedWithScopeService = container.get<IGetTicketPagedWithScopeService>(
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
  } = usePagedQuery(getTicketPagedWithScopeService, {
    queryKey: TANSTACK_QUERY_KEYS.GET_TICKET_PAGED,
    filters,
  });

  const { open: openEditTicket } = useDialog<TicketDto>(DIALOG_KEYS.UPDATE_TICKET);
  const { open: openDeleteTicket } = useDialog<TicketDto>(DIALOG_KEYS.DELETE_TICKET);
  const { open: openAssignTicket } = useDialog<TicketDto>(DIALOG_KEYS.ASSIGN_TICKET);
  const { open: openUnassignTicket } = useDialog<TicketDto>(DIALOG_KEYS.UNASSIGN_TICKET);

  const resolvedTicketService = container.get<IResolvedTicketService>(
    SERVICE_TOKENS.ResolvedTicketService,
  );

  const { mutate: handleResolved } = useResolvedTicket(resolvedTicketService);

  const categoryLabels = useMemo(() => enumToLabels(TicketCategoryEnum, "ticket.category", t), [t]);
  const priorityLabels = useMemo(() => enumToLabels(TicketPriorityEnum, "ticket.priority", t), [t]);
  const statusLabels = useMemo(() => enumToLabels(TicketStatusEnum, "ticket.status", t), [t]);
  const statusFilterOptions = useMemo(
    () => Object.values(TicketStatusEnum).map((value) => ({ value, label: statusLabels[value] })),
    [statusLabels],
  );
  const priorityFilterOptions = useMemo(
    () =>
      Object.values(TicketPriorityEnum).map((value) => ({ value, label: priorityLabels[value] })),
    [priorityLabels],
  );
  const categoryFilterOptions = useMemo(
    () =>
      Object.values(TicketCategoryEnum).map((value) => ({ value, label: categoryLabels[value] })),
    [categoryLabels],
  );

  const isAdmin = user?.role === UserRoleEnum.ADMIN;
  const isTechnicalAssistance = user?.role === UserRoleEnum.TECHNICAL_ASSISTANCE;

  const columns = useMemo(
    () =>
      ticketTableColumns({
        categoryLabels,
        priorityLabels,
        statusLabels,
        isAdmin,
        isTechnicalAssistance,
      }),
    [categoryLabels, priorityLabels, statusLabels, isAdmin, isTechnicalAssistance],
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
      toggleActions: ["assign", "unassign"] as const,
      tooltips: {
        edit: () => t("general.actions.edit"),
        delete: () => t("general.actions.delete"),
        assign: () => t("general.actions.assign"),
        resolved: () => t("general.actions.resolve"),
        unassign: () => t("general.actions.unassign"),
      },
      disabledTooltips: {
        edit: (ticket: TicketPagedDto) =>
          ticket.status === TicketStatusEnum.RESOLVED
            ? t("ticket.table.unableTooltips.resolved")
            : t("ticket.table.unableTooltips.edit"),
        delete: () => t("ticket.table.unableTooltips.delete"),
        assign: (ticket: TicketPagedDto) =>
          ticket.assignedToId
            ? t("ticket.messages.errors.alreadyAssigned")
            : t("general.actions.unavailable"),
        unassign: (ticket: TicketPagedDto) =>
          ticket.status === TicketStatusEnum.RESOLVED
            ? t("ticket.table.unableTooltips.resolved")
            : ticket.assignedToId
              ? t("general.actions.unavailable")
              : t("ticket.messages.errors.unassignFailed"),
        resolved: (ticket: TicketPagedDto) =>
          ticket.status === TicketStatusEnum.RESOLVED
            ? t("ticket.table.unableTooltips.resolved")
            : !ticket.assignedToId
              ? t("ticket.table.unableTooltips.assign")
              : t("general.actions.unavailable"),
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
    priority,
    category,
    statusLabels,
    statusFilterOptions,
    priorityFilterOptions,
    categoryFilterOptions,
    setSearch,
    onSortingChange,
    setPageSize,
    nextPage,
    previousPage,
    setStatus,
    setPriority,
    setCategory,
  };
}
