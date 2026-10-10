import type { MetricCardItem } from "@/components/dashboard/MetricCard";

import { container } from "@/lib/inversifyJS/index.container";
import type { IGetTicketPagedWithScopeService } from "@/modules/ticket/services/contracts/get-paged-with-scope";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetTicketPagedWithScope } from "@/modules/ticket/query-hooks/query/use-get-paged-with-scope";
import { LuCircleCheck, LuLoaderCircle, LuCircleAlert } from "react-icons/lu";
import type { IGetTicketPagedLastSevenDaysService } from "@/modules/ticket/services/contracts/get-paged-last-seven-days";
import { useNavigate } from "@tanstack/react-router";
import { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import { enumToLabels } from "@/shared/utils/enum-to-labels";

export function useTechnicalAssistanceMetrics() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getTicketPagedWithScopeService = container.get<IGetTicketPagedWithScopeService>(
    SERVICE_TOKENS.GetTicketPagedWithScopeService,
  );
  const getTicketPagedLastSevenDaysService = container.get<IGetTicketPagedLastSevenDaysService>(
    SERVICE_TOKENS.GetTicketPagedLastSevenDaysService,
  );

  const {
    data: dataGetTicketWithScope,
    isLoading,
    isError,
  } = useGetTicketPagedWithScope({
    getTicketPagedWithScopeService,
    params: { currentPage: 1, pageSize: 9999 },
  });

  const tickets = useMemo(() => dataGetTicketWithScope?.result ?? [], [dataGetTicketWithScope]);

  const goToTickets = (status?: TicketStatusEnum) => {
    void navigate({ to: "/tickets", search: { status } });
  };

  const metrics: MetricCardItem[] = useMemo(() => {
    const myTicketsCount = tickets.length;

    const inProgressCount = tickets.filter(
      (ticket) => ticket.status === TicketStatusEnum.IN_PROGRESS,
    ).length;

    const resolvedCount = tickets.filter((ticket) => {
      return ticket.status === TicketStatusEnum.RESOLVED;
    }).length;

    return [
      {
        title: t("dashboard.cards.assignedToMe.title"),
        description: t("dashboard.cards.assignedToMe.description"),
        value: String(myTicketsCount),
        icon: LuCircleAlert,
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-50 dark:bg-blue-950/50",
        onClick: () => goToTickets(),
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

  const statusLabels = useMemo(() => enumToLabels(TicketStatusEnum, "ticket.status", t), [t]);
  const priorityLabels = useMemo(() => enumToLabels(TicketPriorityEnum, "ticket.priority", t), [t]);
  const categoryLabels = useMemo(() => enumToLabels(TicketCategoryEnum, "ticket.category", t), [t]);

  return {
    t,
    metrics,
    isLoading,
    isError,
    getTicketPagedLastSevenDaysService,
    statusLabels,
    priorityLabels,
    categoryLabels,
  };
}
