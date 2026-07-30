import { useMutation } from "@tanstack/react-query";
import { AppError } from "@/shared/errors/app-error";
import { toast } from "sonner";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";
import type { UpdateTicketDto } from "@/modules/ticket/dtos/update.dto";
import type { IUpdateTicketService } from "@/modules/ticket/services/contracts/update";
import queryClient from "@/lib/query-client";

interface UpdateTicketParams {
  id: string;
  data: UpdateTicketDto;
}

export function useUpdateTicket(updateTicketService: IUpdateTicketService) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateTicketParams) => {
      const response = await updateTicketService.execute(id, data);

      if (response instanceof AppError) {
        throw response;
      }

      return response;
    },
    onSuccess: () => {
      toast.success(t("ticket.success.updated"));
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: handleMutationError(t("ticket.errors.updateFailed")),
  });
}
