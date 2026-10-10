import { useDeleteTicketForm } from "@/forms/ticket/delete/hook";
import { ComplexDialog } from "@/components/ui/complex-dialog";

export function DeleteTicketForm() {
  const { t, isOpen, isSubmitting, close, handleConfirm } = useDeleteTicketForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleConfirm}
      isConfirmDisabled={isSubmitting}
      title={t("ticket.delete.title")}
      description={t("ticket.delete.description")}
      confirmText={t("general.actions.delete")}
    />
  );
}
