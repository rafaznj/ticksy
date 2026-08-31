import { PagedTable } from "@/components/PagedTable";
import { useUsersPagedTable } from "./hook";
import { EditUserForm } from "@/components/forms/user/edit";
import { DeactivateUserForm } from "@/components/forms/user/deactivate";
import { ActivateUserForm } from "@/components/forms/user/activate";

export function UsersPagedTable() {
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
    deletedFilter,
    deletedFilterOptions,
    setPageSize,
    onSortingChange,
    setSearch,
    nextPage,
    previousPage,
    setDeletedFilter,
  } = useUsersPagedTable();

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
        getRowId={(user) => user.id}
        actions={actions}
        filter={{
          value: deletedFilter,
          onChange: (value) => setDeletedFilter(value as "all" | "true" | "false"),
          options: deletedFilterOptions,
          placeholder: t("user.table.filterByStatus"),
        }}
      />

      <EditUserForm />
      <ActivateUserForm />
      <DeactivateUserForm />
    </>
  );
}
