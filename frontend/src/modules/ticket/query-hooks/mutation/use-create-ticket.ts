import { useMutation } from "@tanstack/react-query";
import { AppError } from "@/shared/errors/app-error";
import { toast } from "sonner";
import type { ICreateTicketService } from "@/modules/ticket/services/contracts/create";
import type { CreateTicketDto } from "@/modules/ticket/dto/create.dto";
import { useTranslation } from "react-i18next";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";

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

      if (response instanceof AppError) {
        throw response;
      }

      return response;
    },
    onSuccess: () => {
      toast.success(t("ticket.create.messages.success"));
      options?.onSuccess?.();
    },
    onError: handleMutationError(t("ticket.create.messages.failed")),
  });
}
