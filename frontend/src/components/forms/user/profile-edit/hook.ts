import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-form";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IUpdateUserService } from "@/modules/user/services/contracts/update";
import { useUpdateUser } from "../../../../modules/user/query-hooks/mutation/use-update-user";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { Route } from "@/routes/_authenticated/user/profile";
import type { UserProfileEditProps } from "@/components/forms/user/profile-edit/types";
import { userProfileEditFormSchema } from "@/components/forms/user/profile-edit/validations";

export function useUserProfileEditForm() {
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
    } as UserProfileEditProps,
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
      onBlur: userProfileEditFormSchema(t),
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
