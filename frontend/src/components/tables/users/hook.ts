import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { usePagedQuery } from "@/components/PagedTable/hook";
import { container } from "@/lib/inversifyJS/index.container";
import type { IGetUserPagedService } from "@/modules/user/services/contracts/get-paged";
import type { UserEntity } from "@/modules/user/entity/user.entity";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { formatDate } from "@/shared/utils/format-date";
import { UserRoleEnum } from "@/modules/user/enums/user-role.enum";

export function useUsersPagedTable() {
  const { t } = useTranslation();
  const getUserPagedService = container.get<IGetUserPagedService>(
    SERVICE_TOKENS.GetUserPagedService,
  );

  const {
    data,
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    isLoading,
    isError,
    search,
    setSearch,
    sorting,
    onSortingChange,
    pageSize,
    setPageSize,
    nextPage,
    previousPage,
  } = usePagedQuery(getUserPagedService, { queryKey: "users" });

  const roleLabels = useMemo(() => enumToLabels(UserRoleEnum, "user.roles", t), [t]);

  const columns = useMemo<ColumnDef<UserEntity>[]>(
    () => [
      { accessorKey: "id", header: t("user.table.columns.id") },
      { accessorKey: "name", header: t("user.table.columns.name") },
      { accessorKey: "email", header: t("user.table.columns.email") },
      {
        accessorKey: "role",
        header: t("user.table.columns.role"),
        cell: ({ row }) => roleLabels[row.original.role] ?? row.original.role,
      },
      {
        accessorKey: "createdAt",
        header: t("user.table.columns.created_at"),
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        accessorKey: "updatedAt",
        header: t("user.table.columns.updated_at"),
        cell: ({ row }) => formatDate(row.original.updatedAt),
      },
    ],
    [t, roleLabels],
  );

  const actions = useMemo(
    () => ({
      edit: (user: UserEntity) => console.log("editar", user),
      deactivate: (user: UserEntity) => console.log("desativar", user),
    }),
    [],
  );

  return {
    data,
    columns,
    actions,
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    isLoading,
    isError,
    search,
    setSearch,
    sorting,
    onSortingChange,
    pageSize,
    setPageSize,
    nextPage,
    previousPage,
  };
}
