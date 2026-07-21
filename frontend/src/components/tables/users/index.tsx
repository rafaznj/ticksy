import { PagedTable } from "@/components/PagedTable";
import { useUsersPagedTable } from "./hook";

export function UsersPagedTable() {
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
  } = useUsersPagedTable();

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
      getRowId={(user) => user.id}
      actions={actions}
      searchPlaceholder="Buscar usuário..."
      emptyMessage="Nenhum usuário encontrado."
    />
  );
}
