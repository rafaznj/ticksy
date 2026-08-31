import { InfiniteList } from "@/components/InfiniteList";
import { MetricCard } from "@/components/MetricCard";
import { useTechnicalAssistanceMetrics } from "@/components/TechnicalAssistanceMetrics/hook";
import { Badge } from "@/components/ui/badge";
import type { TicketPagedCurrentMonthDto } from "@/modules/ticket/dtos/paged-current-month.dto";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { formatDate } from "@/shared/utils/format-date";
import { useMemo } from "react";

export function TechnicalAssistanceMetrics() {
  const { metrics, getTicketPagedCurrentMonthService, t, statusClassName, priorityClassName } =
    useTechnicalAssistanceMetrics();

  const statusLabels = useMemo(() => enumToLabels(TicketStatusEnum, "ticket.status", t), [t]);
  const priorityLabels = useMemo(() => enumToLabels(TicketPriorityEnum, "ticket.priority", t), [t]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <MetricCard metrics={metrics} className="lg:grid-cols-3" />

        <div className="grid grid-cols-1 gap-8">
          <InfiniteList<TicketPagedCurrentMonthDto>
            service={getTicketPagedCurrentMonthService}
            queryKey="tickets"
            hasSearch
            searchPlaceholder={t("ticket.table.searchPlaceholder")}
            pageSize={20}
            maxHeight="40vh"
            getItemKey={(ticket) => ticket.id}
            renderItem={(ticket) => (
              <div className="flex items-center justify-between gap-6 rounded-md border p-4">
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
