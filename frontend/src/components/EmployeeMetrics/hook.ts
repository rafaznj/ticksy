import type { MetricCardItem } from "@/components/MetricCard";
import { container } from "@/lib/inversifyJS/index.container";
import type { IGetTicketPagedWithScopeService } from "@/modules/ticket/services/contracts/get-paged-with-scope";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetTicketPagedWithScope } from "@/modules/ticket/query-hooks/use-get-paged-with-scope";
import { LuCircleCheck, LuLoaderCircle, LuFolderOpen } from "react-icons/lu";
import { useNavigate } from "@tanstack/react-router";

export function useEmployeeMetrics() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getTicketPagedWithScopeService = container.get<IGetTicketPagedWithScopeService>(
    SERVICE_TOKENS.GetTicketPagedWithScopeService,
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
    const openCount = tickets.filter((ticket) => ticket.status === TicketStatusEnum.OPEN).length;

    const inProgressCount = tickets.filter(
      (ticket) => ticket.status === TicketStatusEnum.IN_PROGRESS,
    ).length;

    const resolved = tickets.filter((ticket) => {
      return ticket.status === TicketStatusEnum.RESOLVED;
    }).length;

    return [
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
        value: String(resolved),
        icon: LuCircleCheck,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
        onClick: () => goToTickets(TicketStatusEnum.RESOLVED),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets, t]);

  return {
    t,
    metrics,
    isLoading,
    isError,
  };
}
