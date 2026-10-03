import { useMemo } from "react";

import { useAppForm } from "@/hooks/use-form";
import { container } from "@/lib/inversifyJS/index.container";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import { useCreateUser } from "@/modules/user/query-hooks/mutation/use-create";
import type { ICreateUserService } from "@/modules/user/services/contracts/create";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useStore } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/contexts/use-dialog";
import { createUserFormSchema } from "@/components/forms/user/create/validations";
import { generateRandomPassword } from "@/shared/utils/generate-random-password";

interface CreateUserFormValues {
  name: string;
  email: string;
  role: UserRoleEnum;
}

export function useCreateUserForm() {
  const { t } = useTranslation();

  const { isOpen, close } = useDialog(DIALOG_KEYS.CREATE_USER);

  const createUserService = container.get<ICreateUserService>(SERVICE_TOKENS.CreateUserService);

  const { mutateAsync: createUser } = useCreateUser(createUserService);

  const roleOptions = useMemo(
    () => [
      { value: UserRoleEnum.employee, label: t("user.roles.employee") },
      {
        value: UserRoleEnum.technical_assistance,
        label: t("user.roles.technicalAssistance"),
      },
      { value: UserRoleEnum.admin, label: t("user.roles.admin") },
    ],
    [t],
  );

  const form = useAppForm({
    defaultValues: {} as CreateUserFormValues,
    validators: {
      onBlur: createUserFormSchema(t),
    },
    onSubmit: async ({ value, formApi }) => {
      const password = generateRandomPassword();

      await createUser({
        name: value.name,
        email: value.email,
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
