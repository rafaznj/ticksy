import { PagedTable } from "@/components/tables/shared/PagedTable";
import { useNotificationsPagedTable } from "./hook";
import { Button } from "@/components/ui/button";
import { LuCheck } from "react-icons/lu";

export function NotificationsPagedTable() {
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
    unreadCount,
    isMarkingAllAsRead,
    markAllAsRead,
    t,
    setPageSize,
    onSortingChange,
    setSearch,
    nextPage,
    previousPage,
  } = useNotificationsPagedTable();

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
      emptyMessage={t("notifications.table.emptyMessage")}
      showSearch={false}
      actions={actions}
      getRowId={(notification) => notification.id}
      headerDynamicComponent={
        unreadCount > 0 && (
          <Button
            variant="default"
            disabled={unreadCount === 0 || isMarkingAllAsRead}
            onClick={() => markAllAsRead()}
          >
            {t("notifications.actions.markAllAsRead")}
            <LuCheck />
          </Button>
        )
      }
    />
  );
}
