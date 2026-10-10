import type { IDeactivateUserService } from "@/modules/user/services/contracts/deactivate";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import handleMutationResponse from "@/shared/interfaces/handle-mutation-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";

export function useDeactivateUser(deactivateUserService: IDeactivateUserService) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deactivateUserService.execute(id);

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      toast.success(t("user.messages.success.deactivated"));

      queryClient.invalidateQueries({ queryKey: [TANSTACK_QUERY_KEYS.GET_USER_PAGED] });
    },
    onError: handleMutationError(t("user.messages.errors.deactivateFailed")),
  });
}
