import { useMutation } from "@tanstack/react-query";
import type { IRegisterService } from "@/modules/auth/services/contracts/register";
import handleMutationResponse from "@/shared/interfaces/handle-mutation-response";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { t } from "i18next";
import { toast } from "sonner";
import type { CreateUserData } from "@/modules/user/data/create.data";

export function useRegister(registerService: IRegisterService) {
  return useMutation({
    mutationFn: async (data: CreateUserData) => {
      const response = await registerService.execute(data);

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      toast.success(t("auth.messages.registered"));
    },
    onError: handleMutationError(t("auth.messages.errors.registerFailed")),
  });
}
