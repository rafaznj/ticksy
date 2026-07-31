import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { usePagedQuery } from "@/components/PagedTable/hook";
import { container } from "@/lib/inversifyJS/index.container";
import type { IGetUserPagedService } from "@/modules/user/services/contracts/get-paged";
import type { UserEntity } from "@/modules/user/entity/user.entity";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { formatDate } from "@/shared/utils/format-date";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import { useDialog } from "@/contexts/use-dialog";

export function useUsersPagedTable() {
  const { t } = useTranslation();

  const getUserPagedService = container.get<IGetUserPagedService>(
    SERVICE_TOKENS.GetUserPagedService,
  );

  const { open: openEditUser } = useDialog<UserEntity>(DIALOG_KEYS.UPDATE_USER);
  const { open: openDeactivateUser } = useDialog<UserEntity>(DIALOG_KEYS.DEACTIVATE_USER);

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
      {
        accessorKey: "isActive",
        header: t("user.table.columns.isActive"),
        cell: ({ row }) =>
          row.original.deleted ? t("user.status.disabled") : t("user.status.enabled"),
      },
    ],
    [t, roleLabels],
  );

  const actions = useMemo(
    () => ({
      edit: (user: UserEntity) => openEditUser(user),
      deactivate: (user: UserEntity) => openDeactivateUser(user),
      tooltips: {
        edit: t("user.table.actions.edit"),
        deactivate: t("user.table.actions.deactivate"),
      },
    }),
    [openDeactivateUser, openEditUser, t],
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
