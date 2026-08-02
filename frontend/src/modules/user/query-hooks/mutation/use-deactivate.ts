import type { IDeactivateUserService } from "@/modules/user/services/contracts/deactivate";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import handleMutationResponse from "@/shared/response/handle-mutation-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export function useDeactivateUser(deactivateUserService: IDeactivateUserService) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deactivateUserService.execute(id);

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "paged"] });
    },
    onError: handleMutationError(t("user.errors.deactivateFailed")),
  });
}
