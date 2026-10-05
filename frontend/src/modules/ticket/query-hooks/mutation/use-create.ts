import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ICreateTicketService } from "@/modules/ticket/services/contracts/create";
import type { CreateTicketDto } from "@/modules/ticket/dtos/create.dto";
import { useTranslation } from "react-i18next";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import queryClient from "@/lib/tanstack/query-client";
import handleMutationResponse from "@/shared/response/handle-mutation-response";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";

interface UseCreateTicketOptions {
  onSuccess?: () => void;
}

export function useCreateTicket(
  createTicketService: ICreateTicketService,
  options?: UseCreateTicketOptions,
) {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (data: CreateTicketDto) => {
      const response = await createTicketService.execute(data);

      return handleMutationResponse(response);
    },
    onSuccess: async () => {
      toast.success(t("ticket.messages.created"));
      options?.onSuccess?.();

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
    onError: handleMutationError(t("ticket.messages.errors.createFailed")),
  });
}
