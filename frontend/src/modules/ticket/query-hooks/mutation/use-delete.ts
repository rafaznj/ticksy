import queryClient from "@/lib/query-client";
import type { IDeleteTicketService } from "@/modules/ticket/services/contracts/delete";
import { AppError } from "@/shared/errors/app-error";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function useDeleteTicket(deleteRoleService: IDeleteTicketService) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteRoleService.execute(id);

      if (response instanceof AppError) {
        throw response;
      }
      return response;
    },
    onSuccess: () => {
      toast.success(t("ticket.success.updated"));
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: handleMutationError(t("ticket.errors.deleteFailed")),
  });
}
