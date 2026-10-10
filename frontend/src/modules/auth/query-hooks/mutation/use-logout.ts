import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { ILogoutService } from "@/modules/auth/services/contracts/logout";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import handleMutationResponse from "@/shared/interfaces/handle-mutation-response";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async () => {
      const logoutService = container.get<ILogoutService>(SERVICE_TOKENS.LogoutService);
      const response = await logoutService.execute();

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      queryClient.clear();
      navigate({ to: "/login" });
    },
    onError: handleMutationError(t("auth.messages.errors.logoutFailed")),
  });
}
