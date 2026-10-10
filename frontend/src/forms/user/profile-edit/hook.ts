import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-app-form";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IUpdateUserService } from "@/modules/user/services/contracts/update";
import { useUpdateUser } from "../../../modules/user/query-hooks/mutation/use-update";
import { useAuthStore } from "@/lib/zustand/use-auth";
import type { UserProfileEditProps } from "@/forms/user/profile-edit/types";
import { userProfileEditFormSchema } from "@/forms/user/profile-edit/validations";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import type { UserDto } from "@/modules/user/dto/user.dto";
import { useDialog } from "@/hooks/use-dialog";
import { useStore } from "@tanstack/react-form";

export function useUserProfileEditForm() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isOpen, close } = useDialog<UserDto>(DIALOG_KEYS.PROFILE_EDIT);

  const updateUserService = container.get<IUpdateUserService>(SERVICE_TOKENS.UpdateUserService);

  const { mutateAsync: handleUpdateUser, isPending } = useUpdateUser(updateUserService);

  const form = useAppForm({
    defaultValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    } as UserProfileEditProps,
    onSubmit: async (value) => {
      handleUpdateUser({
        id: user!.id,
        data: {
          name: value.value.name,
          email: value.value.email,
        },
      });
      close();
    },
    validators: {
      onBlur: userProfileEditFormSchema(t),
    },
  });

  const [canSubmit, isSubmitting, isBlurred, isDirty] = useStore(form.store, (state) => [
    state.canSubmit,
    state.isSubmitting,
    state.isBlurred,
    state.isDirty,
  ]);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    await form.handleSubmit();
  };

  return {
    form,
    t,
    isPending,
    isOpen,
    isBlurred,
    canSubmit,
    isSubmitting,
    isDirty,
    navigate,
    handleSubmit,
    close,
  };
}
