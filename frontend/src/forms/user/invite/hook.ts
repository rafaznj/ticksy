import { useMemo } from "react";

import { useAppForm } from "@/hooks/use-app-form";
import { container } from "@/lib/inversifyJS/index.container";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import { useInviteUser } from "@/modules/user/query-hooks/mutation/use-invite";
import type { IInviteUserService } from "@/modules/user/services/contracts/invite";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useStore } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/hooks/use-dialog";
import { inviteUserFormSchema } from "@/forms/user/invite/validations";
import { generateRandomPassword } from "@/shared/utils/generate-random-password";

interface InviteUserFormValues {
  name: string;
  email: string;
  role: UserRoleEnum;
}

export function useInviteUserForm() {
  const { t } = useTranslation();

  const { isOpen, close } = useDialog(DIALOG_KEYS.INVITE_USER);

  const inviteUserService = container.get<IInviteUserService>(SERVICE_TOKENS.InviteUserService);

  const { mutateAsync: inviteUser } = useInviteUser(inviteUserService);

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
    defaultValues: {} as InviteUserFormValues,
    validators: {
      onBlur: inviteUserFormSchema(t),
    },
    onSubmit: async ({ value, formApi }) => {
      const password = generateRandomPassword();

      await inviteUser({
        name: value.name,
        email: value.email,
        role: value.role,
        password,
      });

      close();
      formApi.reset();
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
