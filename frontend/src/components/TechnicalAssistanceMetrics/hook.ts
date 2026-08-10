import type { MetricCardItem } from "@/components/MetricCard";
import { container } from "@/lib/inversifyJS/index.container";
import type { IGetTicketPagedService } from "@/modules/ticket/services/contracts/get-paged";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { AlertTriangle, CheckCircle, Loader2, Ticket } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetTicketPaged } from "@/modules/ticket/query-hooks/use-get-paged";

export function useTechnicalAssistanceMetrics() {
  const { t } = useTranslation();
  const getTicketPagedService = container.get<IGetTicketPagedService>(
    SERVICE_TOKENS.GetTicketPagedService,
  );

  const { data, isLoading, isError } = useGetTicketPaged({
    getTicketPagedService,
    params: { currentPage: 1, pageSize: 9999 },
  });

  const tickets = useMemo(() => data?.result ?? [], [data]);

  const metrics: MetricCardItem[] = useMemo(() => {
    const myTicketsCount = tickets.length;

    const inProgressCount = tickets.filter(
      (ticket) => ticket.status === TicketStatusEnum.IN_PROGRESS,
    ).length;

    const resolvedCount = tickets.filter((ticket) => {
      return ticket.status === TicketStatusEnum.RESOLVED;
    }).length;

    const highPriorityCount = tickets.filter(
      (ticket) =>
        ticket.status !== TicketStatusEnum.RESOLVED &&
        (ticket.priority === TicketPriorityEnum.HIGH ||
          ticket.priority === TicketPriorityEnum.URGENT),
    ).length;

    return [
      {
        title: t("dashboard.metrics.myTickets.title"),
        value: String(myTicketsCount),
        icon: Ticket,
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-50 dark:bg-blue-950/50",
      },
      {
        title: t("dashboard.metrics.inProgress.title"),
        value: String(inProgressCount),
        icon: Loader2,
        iconColor: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-50 dark:bg-purple-950/50",
      },
      {
        title: t("dashboard.metrics.resolved.title"),
        value: String(resolvedCount),
        icon: CheckCircle,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
      },
      {
        title: t("dashboard.metrics.highPriority.title"),
        value: String(highPriorityCount),
        icon: AlertTriangle,
        iconColor: "text-red-600 dark:text-red-400",
        iconBg: "bg-red-50 dark:bg-red-950/50",
      },
    ];
  }, [tickets, t]);

  return {
    t,
    metrics,
    isLoading,
    isError,
  };
}
