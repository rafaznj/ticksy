import type { EditUserFormProps } from "@/components/forms/user/Edit/types";
import { editUserFormSchema } from "@/components/forms/user/Edit/validations";
import { useDialog } from "@/contexts/DialogContext";
import { useAppForm } from "@/hooks/use-form";
import { container } from "@/lib/inversifyJS/index.container";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { UserRoleEnum } from "@/modules/user/enums/user-role.enum";
import { useUpdateUser } from "@/modules/user/query-hooks/mutation/use-update-user";
import type { IUpdateUserService } from "@/modules/user/services/contracts/update";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useStore } from "@tanstack/react-form";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useEditUserForm() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { isOpen, close } = useDialog(DIALOG_KEYS.UPDATE_USER);

  const updateUserService = container.get<IUpdateUserService>(SERVICE_TOKENS.UpdateUserService);

  const { mutateAsync: updateUser } = useUpdateUser(updateUserService);

  const roleOptions = useMemo(
    () => [
      {
        value: UserRoleEnum.EMPLOYEE,
        label: t("user.roles.employee"),
      },
      {
        value: UserRoleEnum.TECHNICAL_ASSISTANCE,
        label: t("user.roles.technicalAssistance"),
      },
      {
        value: UserRoleEnum.ADMIN,
        label: t("user.roles.admin"),
      },
    ],
    [t],
  );

  const form = useAppForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      role: user?.role,
    } satisfies EditUserFormProps,
    validators: {
      onBlur: editUserFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      if (!user?.id) return;

      await updateUser({
        id: user.id,
        data: value,
      });

      close();
    },
  });

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
