import { useMutation } from "@tanstack/react-query";
import type { CreateUserDto } from "../../dto/create-user.dto";
import type { ICreateUserService } from "@/modules/user/services/contracts/create";
import { AppError } from "@/shared/errors/app-error";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";

export function useCreateUser(createUserService: ICreateUserService) {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const response = await createUserService.execute(data);

      if (response instanceof AppError) {
        throw response;
      }

      return response;
    },
    onError: handleMutationError(t("user.errors.createFailed")),
  });
}
