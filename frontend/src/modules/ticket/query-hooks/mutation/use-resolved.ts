import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";
import queryClient from "@/lib/tanstack/query-client";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import handleMutationResponse from "@/shared/interfaces/handle-mutation-response";
import type { IResolvedTicketService } from "@/modules/ticket/services/contracts/resolved";

export function useResolvedTicket(resolvedTicketService: IResolvedTicketService) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await resolvedTicketService.execute(id);

      return handleMutationResponse(response);
    },
    onSuccess: async () => {
      toast.success(t("ticket.messages.resolved"));
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
    onError: handleMutationError(t("ticket.messages.errors.resolveFailed")),
  });
}
