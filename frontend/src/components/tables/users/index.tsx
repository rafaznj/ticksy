import { PagedTable } from "@/components/tables/shared/PagedTable";
import { useUsersPagedTable } from "./hook";
import { EditUserForm } from "@/forms/user/edit";
import { DeactivateUserForm } from "@/forms/user/deactivate";
import { ActivateUserForm } from "@/forms/user/activate";
import type { UserRoleEnum } from "@/modules/user/enums/role.enum";
import { InviteUserForm } from "@/forms/user/invite";
import { LuMail } from "react-icons/lu";

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
    roleFilter,
    deletedFilter,
    roleFilterOptions,
    deletedFilterOptions,
    setPageSize,
    onSortingChange,
    setSearch,
    nextPage,
    previousPage,
    setRoleFilter,
    setDeletedFilter,
    openCreateUser,
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
        emptyMessage={t("user.table.emptyMessage")}
        isLoading={isLoading}
        isError={isError}
        getRowId={(user) => user.id}
        actions={actions}
        filters={[
          {
            value: roleFilter,
            onChange: (value) => setRoleFilter(value as UserRoleEnum | "all"),
            options: roleFilterOptions,
            allLabel: t("user.table.filterByRole"),
          },
          {
            value: deletedFilter,
            onChange: (value) => setDeletedFilter(value as "all" | "true" | "false"),
            options: deletedFilterOptions,
            allLabel: t("user.table.filterByStatus"),
          },
        ]}
        headerButtons={[
          {
            icon: <LuMail />,
            label: t("user.table.actions.invite"),
            onClick: () => openCreateUser(),
          },
        ]}
      />

      <InviteUserForm />
      <EditUserForm />
      <ActivateUserForm />
      <DeactivateUserForm />
    </>
  );
}
