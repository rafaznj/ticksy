import { useAdminMetrics } from "@/components/AdminMetrics/hook";
import { InfiniteList } from "@/components/InfiniteList";
import { MetricCard } from "@/components/MetricCard";
import { Badge } from "@/components/ui/badge";
import type { TicketPagedLastSevenDaysDTO } from "@/modules/ticket/dtos/paged-last-seven-day";
import { TicketStatusChart } from "@/components/TicketStatusChart";
import { formatDate } from "@/shared/utils/format-date";
import { t } from "i18next";
import { LuUser } from "react-icons/lu";

export function AdminMetrics() {
  const {
    metrics,
    getTicketPagedLastSevenDaysService,
    statusClassName,
    priorityClassName,
    categoryClassName,
    statusCount,
    isStatusCountLoading,
    statusLabels,
    priorityLabels,
    categoryLabels,
  } = useAdminMetrics();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-10 p-4 md:p-6 lg:p-8">
        <MetricCard metrics={metrics} className="sm:grid-cols-2 lg:grid-cols-4" />

        <TicketStatusChart data={statusCount} isLoading={isStatusCountLoading} />

        <div className="grid grid-cols-1 gap-6">
          <InfiniteList<TicketPagedLastSevenDaysDTO>
            title={t("ticket.table.monthlyCreatedTickets")}
            service={getTicketPagedLastSevenDaysService}
            queryKey="tickets"
            hasSearch
            pageSize={20}
            maxHeight="40vh"
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

                <div className="min-w-0 space-y-1.5">
                  <p className="flex items-center gap-1.5 text-sm font-medium">
                    <LuUser className="size-3.5 shrink-0 text-primary" />
                    <span className="truncate">{ticket.createdByName}</span>
                  </p>
                  <p className="line-clamp-1 text-base font-semibold">{ticket.title}</p>
                  <p className="line-clamp-2 min-h-10 text-sm text-foreground/70">
                    {ticket.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-1.5">
                  <Badge
                    className={`${statusClassName[ticket.status]} px-2 py-0.5 text-xs`}
                    variant="outline"
                  >
                    {t("ticket.table.columns.status")}: {statusLabels[ticket.status]}
                  </Badge>
                  <Badge
                    className={`${priorityClassName[ticket.priority]} px-2 py-0.5 text-xs`}
                    variant="outline"
                  >
                    {t("ticket.table.columns.priority")}: {priorityLabels[ticket.priority]}
                  </Badge>
                  <Badge
                    className={`${categoryClassName[ticket.category]} px-2 py-0.5 text-xs`}
                    variant="outline"
                  >
                    {t("ticket.table.columns.category")}: {categoryLabels[ticket.category]}
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
