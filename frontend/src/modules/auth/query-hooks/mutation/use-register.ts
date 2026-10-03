import { useMutation } from "@tanstack/react-query";
import type { IRegisterService } from "@/modules/auth/services/contracts/register";
import type { CreateUserDto } from "@/modules/user/dto/create.dto";
import handleMutationResponse from "@/shared/response/handle-mutation-response";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { t } from "i18next";
import { toast } from "sonner";

export function useRegister(registerService: IRegisterService) {
  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const response = await registerService.execute(data);

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      toast.success(t("auth.messages.registered"));
    },
    onError: handleMutationError(t("auth.messages.errors.registerFailed")),
  });
}
