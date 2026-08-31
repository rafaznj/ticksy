import type { MetricCardItem } from "@/components/MetricCard";
import { container } from "@/lib/inversifyJS/index.container";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuCircleCheck, LuFolderOpen, LuLoaderCircle } from "react-icons/lu";
import { FiLayers } from "react-icons/fi";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import type { IGetTicketPagedWithScopeService } from "@/modules/ticket/services/contracts/get-paged-with-scope";
import { useGetTicketPagedWithScope } from "@/modules/ticket/query-hooks/use-get-paged-with-scope";
import type { IGetTicketPagedCurrentMonthService } from "@/modules/ticket/services/contracts/get-paged-current-month";
import { useNavigate } from "@tanstack/react-router";

export function useAdminMetrics() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getTicketPagedWithScopeService = container.get<IGetTicketPagedWithScopeService>(
    SERVICE_TOKENS.GetTicketPagedWithScopeService,
  );
  const getTicketPagedCurrentMonthService = container.get<IGetTicketPagedCurrentMonthService>(
    SERVICE_TOKENS.GetTicketPagedCurrentMonthService,
  );

  const { data, isLoading, isError } = useGetTicketPagedWithScope({
    getTicketPagedWithScopeService,
    params: { currentPage: 1, pageSize: 9999 },
  });

  const tickets = useMemo(() => data?.result ?? [], [data]);

  const goToTickets = (status?: TicketStatusEnum) => {
    void navigate({ to: "/tickets", search: { status } });
  };

  const metrics: MetricCardItem[] = useMemo(() => {
    const totalTickets = tickets.length;
    const openCount = tickets.filter((ticket) => ticket.status === TicketStatusEnum.OPEN).length;
    const inProgressCount = tickets.filter(
      (ticket) => ticket.status === TicketStatusEnum.IN_PROGRESS,
    ).length;
    const resolvedCount = tickets.filter(
      (ticket) => ticket.status === TicketStatusEnum.RESOLVED,
    ).length;

    return [
      {
        title: t("dashboard.cards.totalTickets.title"),
        description: t("dashboard.cards.totalTickets.description"),
        value: String(totalTickets),
        icon: FiLayers,
        iconColor: "text-slate-600 dark:text-slate-400",
        iconBg: "bg-slate-100 dark:bg-slate-800/50",
        onClick: () => goToTickets(),
      },
      {
        title: t("dashboard.cards.openTickets.title"),
        description: t("dashboard.cards.openTickets.description"),
        value: String(openCount),
        icon: LuFolderOpen,
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-50 dark:bg-blue-950/50",
        onClick: () => goToTickets(TicketStatusEnum.OPEN),
      },
      {
        title: t("dashboard.cards.inProgressTickets.title"),
        description: t("dashboard.cards.inProgressTickets.description"),
        value: String(inProgressCount),
        icon: LuLoaderCircle,
        iconColor: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-50 dark:bg-purple-950/50",
        onClick: () => goToTickets(TicketStatusEnum.IN_PROGRESS),
      },
      {
        title: t("dashboard.cards.resolvedTickets.title"),
        description: t("dashboard.cards.resolvedTickets.description"),
        value: String(resolvedCount),
        icon: LuCircleCheck,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
        onClick: () => goToTickets(TicketStatusEnum.RESOLVED),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets, t]);

  const statusClassName: Record<TicketStatusEnum, string> = {
    [TicketStatusEnum.OPEN]: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
    [TicketStatusEnum.IN_PROGRESS]:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
    [TicketStatusEnum.RESOLVED]:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  };

  const priorityClassName: Record<TicketPriorityEnum, string> = {
    [TicketPriorityEnum.LOW]: "bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-400",
    [TicketPriorityEnum.MEDIUM]:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    [TicketPriorityEnum.HIGH]:
      "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
    [TicketPriorityEnum.URGENT]: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
  };

  return {
    t,
    metrics,
    isLoading,
    isError,
    getTicketPagedCurrentMonthService,
    statusClassName,
    priorityClassName,
  };
}
