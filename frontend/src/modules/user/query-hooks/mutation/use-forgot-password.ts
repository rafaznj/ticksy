import type { ForgotPasswordData } from "@/modules/user/data/forgot-password";
import type { IForgotPasswordUserService } from "@/modules/user/services/contracts/forgot-password";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import handleMutationResponse from "@/shared/interfaces/handle-mutation-response";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function useForgotPassword(forgotPasswordUserService: IForgotPasswordUserService) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const response = await forgotPasswordUserService.execute(data);

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      toast.success(t("user.messages.success.emailSent"));
      navigate({ to: "/home" });
    },
    onError: handleMutationError(t("general.errors.mailSendFailed")),
  });
}
