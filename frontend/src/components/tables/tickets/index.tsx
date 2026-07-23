import { PagedTable } from "@/components/PagedTable";
import { useTicketsPagedTable } from "@/components/tables/tickets/hook";

export function TicketsPagedTable() {
  const {
    data,
    columns,
    actions,
    search,
    setSearch,
    sorting,
    onSortingChange,
    pageSize,
    setPageSize,
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    nextPage,
    previousPage,
    isLoading,
    isError,
  } = useTicketsPagedTable();

  return (
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
    />
  );
}
