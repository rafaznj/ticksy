import { useTechnicalAssistanceMetrics } from "@/components/dashboard/TechnicalAssistanceMetrics/hook";
import { InfiniteList } from "@/components/InfiniteList";
import { MetricCard } from "@/components/MetricCard";
import { Badge } from "@/components/ui/badge";
import type { TicketPagedLastSevenDaysDTO } from "@/modules/ticket/dtos/paged-last-seven-day";
import {
  ticketCategoryStyles,
  ticketPriorityStyles,
  ticketStatusStyles,
} from "@/shared/constants/enum-styles";
import { formatDate } from "@/shared/utils/format-date";
import { LuUser } from "react-icons/lu";

export function TechnicalAssistanceMetrics() {
  const {
    metrics,
    getTicketPagedLastSevenDaysService,
    t,
    statusLabels,
    categoryLabels,
    priorityLabels,
  } = useTechnicalAssistanceMetrics();

  return (
    <div className="flex flex-col h-full min-h-0 gap-6 pb-6">
      <MetricCard metrics={metrics} className="lg:grid-cols-3 shrink-0" />

      <div className="flex-1 min-h-0 mt-10">
        <InfiniteList<TicketPagedLastSevenDaysDTO>
          title={t("ticket.table.weeklyAssociatedTickets")}
          service={getTicketPagedLastSevenDaysService}
          queryKey="tickets"
          hasSearch
          searchPlaceholder={t("ticket.table.searchPlaceholder")}
          pageSize={20}
          maxHeight="100%"
          className="h-full min-h-0"
          listClassName="flex-1 min-h-0 pb-4"
          getItemKey={(ticket) => ticket.id}
          renderItem={(ticket) => (
            <div className="flex h-full flex-col gap-2 rounded-lg border border-blue-200 bg-card p-3 shadow-sm transition-shadow hover:shadow-md dark:border-blue-900/40 cursor-pointer">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-primary">#{ticket.code}</span>

                <span className="text-xs text-muted-foreground">
                  {formatDate(ticket.createdAt)}
                </span>
              </div>

              <div className="min-w-0 space-y-1">
                <p className="flex items-center gap-1.5 text-sm font-medium">
                  <LuUser className="size-3.5 shrink-0 text-primary" />
                  <span className="truncate">{ticket.createdByName}</span>
                </p>

                <p className="line-clamp-1 text-base font-semibold">{ticket.title}</p>

                <p className="line-clamp-2 text-sm text-foreground/70">{ticket.description}</p>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-1">
                <Badge className={`${ticketStatusStyles[ticket.status]} px-2 py-0.5 text-xs`}>
                  {t("ticket.table.columns.status")}: {statusLabels[ticket.status]}
                </Badge>

                <Badge className={`${ticketPriorityStyles[ticket.priority]} px-2 py-0.5 text-xs`}>
                  {t("ticket.table.columns.priority")}: {priorityLabels[ticket.priority]}
                </Badge>

                <Badge className={`${ticketCategoryStyles[ticket.category]} px-2 py-0.5 text-xs`}>
                  {t("ticket.table.columns.category")}: {categoryLabels[ticket.category]}
                </Badge>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
