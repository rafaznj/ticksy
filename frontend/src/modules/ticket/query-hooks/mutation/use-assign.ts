import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";
import queryClient from "@/lib/tanstack/query-client";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import handleMutationResponse from "@/shared/response/handle-mutation-response";
import type { IAssignTicketService } from "@/modules/ticket/services/contracts/assign";

interface AssignTicketParams {
  id: string;
  userId: string;
}

export function useAssignTicket(assignTicketService: IAssignTicketService) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ id, userId }: AssignTicketParams) => {
      const response = await assignTicketService.execute(id, userId);

      return handleMutationResponse(response);
    },
    onSuccess: async () => {
      toast.success(t("ticket.messages.assigned"));
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
      ]);
    },
    onError: handleMutationError(t("ticket.messages.errors.updateFailed")),
  });
}
