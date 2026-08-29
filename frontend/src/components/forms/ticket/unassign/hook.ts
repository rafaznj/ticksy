import { useDialog } from "@/contexts/use-dialog";
import { container } from "@/lib/inversifyJS/index.container";
import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useTranslation } from "react-i18next";
import type { IUnassignTicketService } from "@/modules/ticket/services/contracts/unassign";
import { useUnassignTicket } from "@/modules/ticket/query-hooks/mutation/use-unassign";

export function useUnassignTicketForm() {
  const { t } = useTranslation();
  const { isOpen, data, close } = useDialog<TicketEntity>(DIALOG_KEYS.UNASSIGN_TICKET);

  const unassignTicketService = container.get<IUnassignTicketService>(
    SERVICE_TOKENS.UnassignTicketService,
  );

  const { mutateAsync: handleUnassignTicket, isPending: isSubmitting } =
    useUnassignTicket(unassignTicketService);

  const handleConfirm = async () => {
    if (!data?.id) return;
    await handleUnassignTicket(data.id);
    close();
  };

  return {
    t,
    isOpen,
    isSubmitting,
    canSubmit: Boolean(data?.id),
    assignedToName: data?.assignedToName,
    handleConfirm,
    close,
  };
}
