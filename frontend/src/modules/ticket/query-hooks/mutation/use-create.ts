import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ICreateTicketService } from "@/modules/ticket/services/contracts/create";
import type { CreateTicketDto } from "@/modules/ticket/dtos/create.dto";
import { useTranslation } from "react-i18next";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import queryClient from "@/lib/tanstack/query-client";
import handleMutationResponse from "@/shared/response/handle-mutation-response";

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
    onSuccess: () => {
      toast.success(t("ticket.create.messages.success"));
      options?.onSuccess?.();

      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: handleMutationError(t("ticket.create.messages.failed")),
  });
}
