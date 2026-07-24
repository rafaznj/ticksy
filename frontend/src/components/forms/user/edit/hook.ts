import { useEffect, useMemo } from "react";

import { useAppForm } from "@/hooks/use-form";
import { container } from "@/lib/inversifyJS/index.container";
import { UserRoleEnum } from "@/modules/user/enums/user-role.enum";
import type { UserEntity } from "@/modules/user/entity/user.entity";
import { useUpdateUser } from "@/modules/user/query-hooks/mutation/use-update-user";
import type { IUpdateUserService } from "@/modules/user/services/contracts/update";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useStore } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/contexts/use-dialog";
import type { EditUserFormProps } from "@/components/forms/user/edit/types";
import { editUserFormSchema } from "@/components/forms/user/edit/validations";

export function useEditUserForm() {
  const { t } = useTranslation();

  const { isOpen, data: selectedUser, close } = useDialog<UserEntity>(DIALOG_KEYS.UPDATE_USER);

  const updateUserService = container.get<IUpdateUserService>(SERVICE_TOKENS.UpdateUserService);

  const { mutateAsync: updateUser } = useUpdateUser(updateUserService);

  const roleOptions = useMemo(
    () => [
      { value: UserRoleEnum.EMPLOYEE, label: t("user.roles.employee") },
      {
        value: UserRoleEnum.TECHNICAL_ASSISTANCE,
        label: t("user.roles.technicalAssistance"),
      },
      { value: UserRoleEnum.ADMIN, label: t("user.roles.admin") },
    ],
    [t],
  );

  const form = useAppForm({
    defaultValues: {
      name: selectedUser?.name,
      email: selectedUser?.email,
      role: selectedUser?.role,
    } satisfies EditUserFormProps,
    validators: {
      onBlur: editUserFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      if (!selectedUser?.id) return;

      await updateUser({
        id: selectedUser.id,
        data: value,
      });

      close();
    },
  });

  useEffect(() => {
    if (isOpen && selectedUser) {
      form.reset({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      });
    }
  }, [form, isOpen, selectedUser]);

  const [canSubmit, isSubmitting, isBlurred] = useStore(form.store, (state) => [
    state.canSubmit,
    state.isSubmitting,
    state.isBlurred,
  ]);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    await form.handleSubmit();
  };

  return {
    t,
    isOpen,
    form,
    roleOptions,
    canSubmit,
    isSubmitting,
    isBlurred,
    close,
    handleSubmit,
  };
}
