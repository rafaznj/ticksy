import { useUnassignTicketForm } from "./hook";
import { ComplexDialog } from "@/components/ui/complex-dialog";

export function UnassignTicketForm() {
  const { t, isOpen, isSubmitting, canSubmit, assignedToName, handleConfirm, close } =
    useUnassignTicketForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleConfirm}
      isConfirmDisabled={!canSubmit || isSubmitting}
      title={t("ticket.unassign.title")}
      description={t("ticket.unassign.description", { user: assignedToName })}
      confirmText={t("general.actions.unassign")}
    />
  );
}
