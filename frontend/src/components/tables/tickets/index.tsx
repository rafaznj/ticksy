import { AssignTicketForm } from "@/components/forms/ticket/assign";
import { DeleteTicketForm } from "@/components/forms/ticket/delete";
import { EditTicketForm } from "@/components/forms/ticket/edit";
import { UnassignTicketForm } from "@/components/forms/ticket/unassign";
import { PagedTable } from "@/components/PagedTable";
import { useTicketsPagedTable } from "@/components/tables/tickets/hook";
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
    statusFilterOptions,
    onSortingChange,
    setPageSize,
    setSearch,
    nextPage,
    previousPage,
    setStatus,
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
        getRowId={(ticket) => ticket.id}
        actions={actions}
        filter={{
          value: status,
          onChange: (value) => setStatus(value as TicketStatusEnum | "all"),
          options: statusFilterOptions,
          placeholder: t("ticket.table.filterByStatus"),
        }}
      />

      <EditTicketForm />
      <DeleteTicketForm />
      <AssignTicketForm />
      <UnassignTicketForm />
    </>
  );
}
