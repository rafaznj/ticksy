import { useMutation } from "@tanstack/react-query";
import { AppError } from "@/shared/errors/app-error";
import { toast } from "sonner";
import type { IUpdateUserService } from "@/modules/user/services/contracts/update";
import type { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/lib/zustand/use-auth";

interface UpdateUserParams {
  id: string;
  data: UpdateUserDto;
}

export function useUpdateUser(updateUserService: IUpdateUserService) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateUserParams) => {
      const response = await updateUserService.execute(id, data);

      if (response instanceof AppError) {
        throw response;
      }

      return response;
    },
    onSuccess: (updatedUser, { id }) => {
      const currentUser = useAuthStore.getState().user;
      const accessToken = useAuthStore.getState().accessToken;

      if (currentUser?.id === id && accessToken) {
        useAuthStore.getState().setAuth(accessToken, {
          ...currentUser,
          ...updatedUser,
        });
      }

      toast.success(t("user.success.updated"));
    },
    onError: handleMutationError(t("user.errors.updateFailed")),
  });
}
