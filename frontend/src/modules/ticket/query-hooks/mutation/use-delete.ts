import queryClient from "@/lib/tanstack/query-client";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import type { IDeleteTicketService } from "@/modules/ticket/services/contracts/delete";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import handleMutationResponse from "@/shared/interfaces/handle-mutation-response";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function useDeleteTicket(deleteRoleService: IDeleteTicketService) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteRoleService.execute(id);

      return handleMutationResponse(response);
    },
    onSuccess: async () => {
      toast.success(t("ticket.messages.deleted"));
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TICKET_PAGED],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TICKET_PAGED_WITH_SCOPE],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TICKET_PAGED_LAST_SEVEN_DAYS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_TICKET_STATUS_COUNT],
        }),
      ]);
    },
    onError: handleMutationError(t("ticket.messages.errors.deleteFailed")),
  });
}
