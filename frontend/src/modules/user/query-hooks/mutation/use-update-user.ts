import { useMutation } from "@tanstack/react-query";
import { AppError } from "@/shared/errors/app-error";
import type { IUpdateUserService } from "@/modules/user/services/contracts/update";
import type { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";

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
    onError: handleMutationError(t("user.errors.updateFailed")),
  });
}
