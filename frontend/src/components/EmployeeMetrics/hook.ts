import type { MetricCardItem } from "@/components/MetricCard";
import { container } from "@/lib/inversifyJS/index.container";
import type { IGetTicketPagedService } from "@/modules/ticket/services/contracts/get-paged";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetTicketPaged } from "@/modules/ticket/query-hooks/use-get-paged";

export function useEmployeeMetrics() {
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
    const openCount = tickets.filter((ticket) => ticket.status === TicketStatusEnum.OPEN).length;

    const inProgressCount = tickets.filter(
      (ticket) => ticket.status === TicketStatusEnum.IN_PROGRESS,
    ).length;

    const resolved = tickets.filter((ticket) => {
      return ticket.status === TicketStatusEnum.RESOLVED;
    }).length;

    return [
      {
        title: t("dashboard.employee.metrics.open.title"),
        value: String(openCount),
        description: t("dashboard.employee.metrics.open.description"),
        icon: AlertCircle,
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-50 dark:bg-blue-950/50",
      },
      {
        title: t("dashboard.employee.metrics.inProgress.title"),
        value: String(inProgressCount),
        description: t("dashboard.employee.metrics.inProgress.description"),
        icon: Loader2,
        iconColor: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-50 dark:bg-purple-950/50",
      },
      {
        title: t("dashboard.employee.metrics.resolved.title"),
        value: String(resolved),
        description: t("dashboard.employee.metrics.resolved.description"),
        icon: CheckCircle,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
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
