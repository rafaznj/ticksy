import { AssignTicketForm } from "@/forms/ticket/assign";
import { DeleteTicketForm } from "@/forms/ticket/delete";
import { EditTicketForm } from "@/forms/ticket/edit";
import { UnassignTicketForm } from "@/forms/ticket/unassign";
import { PagedTable } from "@/components/tables/shared/PagedTable";
import { useTicketsPagedTable } from "@/components/tables/tickets/hook";
import type { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import type { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";

export function TicketsPagedTable() {
  const {
    data,
    columns,
    actions,
    search,
    sorting,
    pageSize,
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    isLoading,
    isError,
    t,
    status,
    priority,
    category,
    statusFilterOptions,
    priorityFilterOptions,
    categoryFilterOptions,
    onSortingChange,
    setPageSize,
    setSearch,
    nextPage,
    previousPage,
    setStatus,
    setPriority,
    setCategory,
  } = useTicketsPagedTable();

  return (
    <>
      <PagedTable
        columns={columns}
        data={data}
        search={search}
        onSearchChange={setSearch}
        sorting={sorting}
        onSortingChange={onSortingChange}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
        isLoading={isLoading}
        isError={isError}
        emptyMessage={t("ticket.table.emptyMessage")}
        getRowId={(ticket) => ticket.id}
        actions={actions}
        filters={[
          {
            value: status,
            onChange: (value) => setStatus(value as TicketStatusEnum | "all"),
            options: statusFilterOptions,
            allLabel: t("ticket.table.filterByStatus"),
          },
          {
            value: priority,
            onChange: (value) => setPriority(value as TicketPriorityEnum | "all"),
            options: priorityFilterOptions,
            allLabel: t("ticket.table.filterByPriority"),
          },
          {
            value: category,
            onChange: (value) => setCategory(value as TicketCategoryEnum | "all"),
            options: categoryFilterOptions,
            allLabel: t("ticket.table.filterByCategory"),
          },
        ]}
      />

      <EditTicketForm />
      <DeleteTicketForm />
      <AssignTicketForm />
      <UnassignTicketForm />
    </>
  );
}
