import { container } from "@/lib/inversifyJS/index.container";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/contexts/use-dialog";
import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { IDeleteTicketService } from "@/modules/ticket/services/contracts/delete";
import { useDeleteTicket } from "@/modules/ticket/query-hooks/mutation/use-delete";

export function useDeleteTicketForm() {
  const { t } = useTranslation();

  const {
    isOpen,
    data: selectedTicket,
    close,
  } = useDialog<TicketEntity>(DIALOG_KEYS.DELETE_TICKET);

  const deleteTicketService = container.get<IDeleteTicketService>(
    SERVICE_TOKENS.DeleteTicketService,
  );

  const { mutateAsync: deleteTicket, isPending: isSubmitting } =
    useDeleteTicket(deleteTicketService);

  const handleConfirm = async () => {
    if (!selectedTicket?.id) return;

    await deleteTicket(selectedTicket.id);
    close();
  };

  return {
    t,
    isOpen,
    selectedTicket,
    isSubmitting,
    close,
    handleConfirm,
  };
}
