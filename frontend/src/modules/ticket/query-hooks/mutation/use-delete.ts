import queryClient from "@/lib/tanstack/query-client";
import type { IDeleteTicketService } from "@/modules/ticket/services/contracts/delete";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import handleMutationResponse from "@/shared/response/handle-mutation-response";
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
    onSuccess: () => {
      toast.success(t("ticket.success.updated"));
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: handleMutationError(t("ticket.errors.deleteFailed")),
  });
}
