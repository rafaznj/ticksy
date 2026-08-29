import type { IActivateUserService } from "@/modules/user/services/contracts/activate";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import handleMutationResponse from "@/shared/response/handle-mutation-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export function useActivateUser(activateUserService: IActivateUserService) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await activateUserService.execute(id);

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "paged"] });
    },
    onError: handleMutationError(t("user.errors.activateFailed")),
  });
}
