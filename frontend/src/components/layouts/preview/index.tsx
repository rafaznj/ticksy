import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import type { ColumnDef } from "@tanstack/react-table";
import { LuCircleCheck, LuFolderOpen, LuLoaderCircle, LuTicket } from "react-icons/lu";

import { MetricCard, type MetricCardItem } from "@/components/MetricCard";
import { PagedTable } from "@/components/PagedTable";
import { PreviewAssignDialog } from "@/components/layouts/preview/dialog";
import {
  PRIORITY_STYLES,
  STATUS_STYLES,
  type PreviewTicket,
} from "@/components/layouts/preview/types";
import { usePreviewPagedQuery } from "@/components/layouts/preview/use-paged";
import { PreviewToast } from "@/components/layouts/preview/toast";
import { PreviewSidebar } from "@/components/layouts/preview/sidebar";
import { usePreview } from "@/components/layouts/preview/hook";

const STATUS_VALUES: PreviewTicket["status"][] = ["open", "inProgress", "resolved"];

export function Preview() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<"home" | "tickets">("tickets");
  const [statusFilter, setStatusFilter] = useState<PreviewTicket["status"] | "all">("all");

  const {
    tickets,
    step,
    activeTicket,
    selectedUserId,
    toastMessage,
    openAssignFor,
    selectUser,
    confirmAssign,
    closeDialog,
    dismissToast,
    createTicket,
  } = usePreview();

  const pagedQuery = usePreviewPagedQuery(tickets, { pageSize: 5, statusFilter });

  const statusFilterOptions = useMemo(
    () => STATUS_VALUES.map((value) => ({ value, label: t(`ticket.status.${value}`) })),
    [t],
  );

  const metrics: MetricCardItem[] = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((ticket) => ticket.status === "open").length;
    const inProgress = tickets.filter((ticket) => ticket.status === "inProgress").length;
    const resolved = tickets.filter((ticket) => ticket.status === "resolved").length;

    return [
      {
        title: t("dashboard.cards.totalTickets.title"),
        value: String(total),
        icon: LuTicket,
        iconColor: "text-slate-600 dark:text-slate-400",
        iconBg: "bg-slate-100 dark:bg-slate-800/50",
      },
      {
        title: t("dashboard.cards.openTickets.title"),
        value: String(open),
        icon: LuFolderOpen,
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-50 dark:bg-blue-950/50",
      },
      {
        title: t("dashboard.cards.inProgressTickets.title"),
        value: String(inProgress),
        icon: LuLoaderCircle,
        iconColor: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-50 dark:bg-purple-950/50",
      },
      {
        title: t("dashboard.cards.resolvedTickets.title"),
        value: String(resolved),
        icon: LuCircleCheck,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
      },
    ];
  }, [tickets, t]);

  const columns = useMemo<ColumnDef<PreviewTicket>[]>(
    () => [
      {
        accessorKey: "title",
        header: t("ticket.fields.title.label"),
        cell: ({ row }) => (
          <div className="line-clamp-2 min-w-0 wrap-break-word" title={row.original.title}>
            {row.original.title}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: t("ticket.table.columns.status"),
        cell: ({ row }) => (
          <span
            className={`rounded-full px-2 py-0.5 text-xs whitespace-nowrap ${STATUS_STYLES[row.original.status]}`}
          >
            {t(`ticket.status.${row.original.status}`)}
          </span>
        ),
      },
      {
        accessorKey: "priority",
        header: t("ticket.table.columns.priority"),
        cell: ({ row }) => (
          <span className={`text-xs whitespace-nowrap ${PRIORITY_STYLES[row.original.priority]}`}>
            {t(`ticket.priority.${row.original.priority}`)}
          </span>
        ),
      },
      {
        accessorKey: "assignedToName",
        header: t("ticket.fields.assignee.label"),
        cell: ({ row }) => (
          <div className="max-w-30 truncate" title={row.original.assignedToName ?? ""}>
            {row.original.assignedToName ?? "—"}
          </div>
        ),
      },
    ],
    [t],
  );

  return (
    <div className="relative mx-auto flex h-144 w-full overflow-hidden rounded-xl border border-slate-200 bg-background text-sm shadow-2xl dark:border-slate-800">
      <PreviewSidebar
        activeHref={activeView === "home" ? "/home" : "/tickets"}
        onNavigate={(href) => setActiveView(href === "/home" ? "home" : "tickets")}
        onCreateTicket={createTicket}
      />

      <div className="relative flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {activeView === "home" ? (
            <motion.div
              key="home-metrics"
              className="h-full overflow-y-auto"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <MetricCard metrics={metrics} className="grid-cols-2 gap-3" />{" "}
            </motion.div>
          ) : (
            <motion.div
              key="tickets-table"
              className="h-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <PagedTable
                columns={columns}
                data={pagedQuery.data}
                search={pagedQuery.search}
                pageSize={pagedQuery.pageSize}
                currentPage={pagedQuery.currentPage}
                totalPages={pagedQuery.totalPages}
                hasPrevious={pagedQuery.hasPrevious}
                hasNext={pagedQuery.hasNext}
                onSearchChange={pagedQuery.setSearch}
                onNextPage={pagedQuery.nextPage}
                onPreviousPage={pagedQuery.previousPage}
                getRowId={(row) => row.id}
                actions={{ assign: (item) => openAssignFor(item.id) }}
                filter={{
                  value: statusFilter,
                  onChange: (value) => setStatusFilter(value as PreviewTicket["status"] | "all"),
                  options: statusFilterOptions,
                  placeholder: t("ticket.table.filterByStatus"),
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <PreviewAssignDialog
        ticket={activeTicket}
        selectedUserId={selectedUserId}
        step={step}
        onSelectUser={selectUser}
        onConfirm={confirmAssign}
        onClose={closeDialog}
      />

      <PreviewToast message={toastMessage} onDismiss={dismissToast} />
    </div>
  );
}
