import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-form";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IUpdateUserService } from "@/modules/user/services/contracts/update";
import { useUpdateUser } from "../../../../modules/user/query-hooks/mutation/use-update-user";
import type { EditUserProps } from "@/components/forms/user/edit/types";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { editUserFormSchema } from "@/components/forms/user/edit/validations";
import { Route } from "@/routes/_authenticated/user/profile";

export function useEditUserForm() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const { t } = useTranslation();
  const updateUserService = container.get<IUpdateUserService>(SERVICE_TOKENS.UpdateUserService);

  const { mutate: handleUpdateUser, isPending } = useUpdateUser(updateUserService);

  const form = useAppForm({
    defaultValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    } as EditUserProps,
    onSubmit: async (value) => {
      handleUpdateUser(
        {
          id: user!.id,
          data: {
            name: value.value.name,
            email: value.value.email,
          },
        },
        {
          onSuccess: () => {
            navigate({
              to: redirect,
            });
          },
        },
      );
    },
    validators: {
      onBlur: editUserFormSchema(t),
    },
  });

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await form.handleSubmit();
  };

  return {
    form,
    t,
    isPending,
    redirect,
    navigate,
    handleSubmit,
  };
}
