import { InfiniteList } from "@/components/InfiniteList";
import { MetricCard } from "@/components/MetricCard";
import { useTechnicalAssistanceMetrics } from "@/components/TechnicalAssistanceMetrics/hook";
import { Badge } from "@/components/ui/badge";
import type { TicketPagedCurrentMonthDto } from "@/modules/ticket/dtos/paged-current-month.dto";
import { formatDate } from "@/shared/utils/format-date";

export function TechnicalAssistanceMetrics() {
  const {
    metrics,
    getTicketPagedCurrentMonthService,
    t,
    statusLabels,
    categoryLabels,
    priorityLabels,
    statusClassName,
    categoryClassName,
    priorityClassName,
  } = useTechnicalAssistanceMetrics();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-12 p-4 md:p-6 lg:p-8">
        <MetricCard metrics={metrics} className="lg:grid-cols-3" />
        <div className="grid grid-cols-1 gap-8">
          <InfiniteList<TicketPagedCurrentMonthDto>
            title={t("ticket.table.monthlyAssociatedTickets")}
            service={getTicketPagedCurrentMonthService}
            queryKey="tickets"
            hasSearch
            searchPlaceholder={t("ticket.table.searchPlaceholder")}
            pageSize={20}
            maxHeight="50vh"
            getItemKey={(ticket) => ticket.id}
            renderItem={(ticket) => (
              <div className="flex h-full flex-col gap-3 rounded-lg border border-blue-200 bg-card p-4 shadow-sm transition-shadow hover:shadow-md dark:border-blue-900/40 cursor-pointer">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-semibold text-primary">
                    #{ticket.code}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(ticket.createdAt)}
                  </span>
                </div>

                <div className="min-w-0 space-y-1">
                  <p className="line-clamp-1 text-base font-medium">{ticket.title}</p>
                  <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
                    {ticket.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-1.5">
                  <Badge
                    className={`${statusClassName[ticket.status]} px-2 py-0.5 text-xs`}
                    variant="outline"
                  >
                    {statusLabels[ticket.status]}
                  </Badge>
                  <Badge
                    className={`${priorityClassName[ticket.priority]} px-2 py-0.5 text-xs`}
                    variant="outline"
                  >
                    {priorityLabels[ticket.priority]}
                  </Badge>
                  <Badge
                    className={`${categoryClassName[ticket.category]} px-2 py-0.5 text-xs`}
                    variant="outline"
                  >
                    {categoryLabels[ticket.category]}
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
