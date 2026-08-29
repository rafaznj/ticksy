import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { usePagedQuery } from "@/components/PagedTable/hook";
import { container } from "@/lib/inversifyJS/index.container";
import type { IGetUserPagedService } from "@/modules/user/services/contracts/get-paged";
import type { UserEntity } from "@/modules/user/entity/user.entity";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import { useDialog } from "@/contexts/use-dialog";
import { userTableColumns } from "@/components/tables/users/columns";

export function useUsersPagedTable() {
  const { t } = useTranslation();

  const getUserPagedService = container.get<IGetUserPagedService>(
    SERVICE_TOKENS.GetUserPagedService,
  );

  const { open: openEditUser } = useDialog<UserEntity>(DIALOG_KEYS.UPDATE_USER);
  const { open: openActivateUser } = useDialog<UserEntity>(DIALOG_KEYS.ACTIVATE_USER);
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

  const columns = useMemo(() => userTableColumns({ roleLabels }), [roleLabels]);

  const actions = useMemo(
    () => ({
      edit: (user: UserEntity) => openEditUser(user),
      activate: (user: UserEntity) => openActivateUser(user),
      deactivate: (user: UserEntity) => openDeactivateUser(user),
      visibilityAction: {
        activate: (user: UserEntity) => user.deleted === true,
        deactivate: (user: UserEntity) => user.deleted === false,
      },
      tooltips: {
        edit: t("user.table.actions.edit"),
        activate: t("user.table.actions.activate"),
        deactivate: t("user.table.actions.deactivate"),
      },
    }),
    [openActivateUser, openDeactivateUser, openEditUser, t],
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
    sorting,
    pageSize,
    setSearch,
    onSortingChange,
    setPageSize,
    nextPage,
    previousPage,
  };
}
