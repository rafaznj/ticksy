import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";
import queryClient from "@/lib/tanstack/query-client";
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
    onSuccess: () => {
      toast.success(t("ticket.success.updated"));
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: handleMutationError(t("ticket.errors.updateFailed")),
  });
}
