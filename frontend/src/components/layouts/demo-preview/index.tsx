import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import type { ColumnDef } from "@tanstack/react-table";

import { LuCheck } from "react-icons/lu";
import {
  PRIORITY_STYLES,
  STATUS_STYLES,
  type DemoTicket,
} from "@/components/layouts/demo-preview/types";
import { useMockPagedQuery } from "@/components/layouts/demo-preview/paged";
import { PagedTable } from "@/components/PagedTable";
import { DemoAssignDialog } from "@/components/layouts/demo-preview/dialog";
import { DemoSidebar } from "@/components/layouts/demo-preview/sidebar";
import { useDemoPreview } from "@/components/layouts/demo-preview/hook";

export function DemoPreview() {
  const { t } = useTranslation();
  const {
    tickets,
    step,
    activeTicket,
    selectedUserId,
    openAssignFor,
    selectUser,
    confirmAssign,
    closeDialog,
  } = useDemoPreview();

  const pagedQuery = useMockPagedQuery(tickets, { pageSize: 5 });

  const columns = useMemo<ColumnDef<DemoTicket>[]>(
    () => [
      { accessorKey: "title", header: t("ticket.fields.title.label") },
      {
        accessorKey: "status",
        header: t("ticket.fields.priority.label"),
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
        header: t("ticket.fields.priority.label"),
        cell: ({ row }) => (
          <span className={`text-xs whitespace-nowrap ${PRIORITY_STYLES[row.original.priority]}`}>
            {t(`ticket.priority.${row.original.priority}`)}
          </span>
        ),
      },
      {
        accessorKey: "assignedToName",
        header: t("ticket.fields.assignee.label"),
        cell: ({ row }) => row.original.assignedToName ?? "—",
      },
    ],
    [t],
  );

  return (
    <div className="mx-auto flex h-96 w-full max-w-2xl overflow-hidden rounded-xl border bg-background text-sm shadow-2xl">
      <DemoSidebar activeHref="/tickets" onInteract={() => {}} />

      <div className="relative flex-1 overflow-hidden p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key="tickets-table"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <PagedTable
              columns={columns}
              data={pagedQuery.data}
              search={pagedQuery.search}
              currentPage={pagedQuery.currentPage}
              totalPages={pagedQuery.totalPages}
              hasPrevious={pagedQuery.hasPrevious}
              hasNext={pagedQuery.hasNext}
              onSearchChange={pagedQuery.setSearch}
              onNextPage={pagedQuery.nextPage}
              onPreviousPage={pagedQuery.previousPage}
              getRowId={(row) => row.id}
              actions={{
                assign: (item) => openAssignFor(item.id),
              }}
              headerButtons={undefined}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {step === "assigned" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white shadow-lg"
            >
              <LuCheck className="size-4" />
              {t("ticket.assign.messages.success")}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DemoAssignDialog
        ticket={activeTicket}
        selectedUserId={selectedUserId}
        step={step}
        onSelectUser={selectUser}
        onConfirm={confirmAssign}
        onClose={closeDialog}
      />
    </div>
  );
}
