import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";
import type { UpdateTicketDto } from "@/modules/ticket/dtos/update.dto";
import type { IUpdateTicketService } from "@/modules/ticket/services/contracts/update";
import queryClient from "@/lib/tanstack/query-client";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import handleMutationResponse from "@/shared/response/handle-mutation-response";

interface UpdateTicketParams {
  id: string;
  data: UpdateTicketDto;
}

export function useUpdateTicket(updateTicketService: IUpdateTicketService) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateTicketParams) => {
      const response = await updateTicketService.execute(id, data);

      return handleMutationResponse(response);
    },
    onSuccess: async () => {
      toast.success(t("ticket.messages.updated"));
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
    onError: handleMutationError(t("ticket.messages.errors.updateFailed")),
  });
}
