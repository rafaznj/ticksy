import { useMemo } from "react";
import { useAdminMetrics } from "@/components/AdminMetrics/hook";
import { InfiniteList } from "@/components/InfiniteList";
import { MetricCard } from "@/components/MetricCard";
import { Badge } from "@/components/ui/badge";
import type { TicketPagedCurrentMonthDto } from "@/modules/ticket/dtos/paged-current-month.dto";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { formatDate } from "@/shared/utils/format-date";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { useTranslation } from "react-i18next";

export function AdminMetrics() {
  const { t } = useTranslation();
  const { metrics, getTicketPagedCurrentMonthService, statusClassName, priorityClassName } =
    useAdminMetrics();

  const statusLabels = useMemo(() => enumToLabels(TicketStatusEnum, "ticket.status", t), [t]);
  const priorityLabels = useMemo(() => enumToLabels(TicketPriorityEnum, "ticket.priority", t), [t]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-10 p-4 md:p-6 lg:p-8">
        <MetricCard metrics={metrics} className="sm:grid-cols-2 lg:grid-cols-4" />

        <div className="grid grid-cols-1 gap-6">
          <InfiniteList<TicketPagedCurrentMonthDto>
            service={getTicketPagedCurrentMonthService}
            queryKey="tickets"
            hasSearch
            searchPlaceholder={t("ticket.table.searchPlaceholder")}
            pageSize={20}
            maxHeight="40vh"
            getItemKey={(ticket) => ticket.id}
            renderItem={(ticket) => (
              <div className="flex items-center justify-between gap-6 rounded-md border border-blue-200 p-4 dark:border-blue-900/40">
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="truncate font-medium">{ticket.title}</p>
                  <p className="text-sm text-muted-foreground">{ticket.createdByName}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(ticket.createdAt)}</p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <Badge className={priorityClassName[ticket.priority]} variant="outline">
                    {priorityLabels[ticket.priority]}
                  </Badge>
                  <Badge className={statusClassName[ticket.status]} variant="outline">
                    {statusLabels[ticket.status]}
                  </Badge>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
