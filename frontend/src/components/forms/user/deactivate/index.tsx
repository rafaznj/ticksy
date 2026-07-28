import { useDeactivateUserForm } from "@/components/forms/user/deactivate/hook";
import { ComplexDialog } from "@/components/ui/complex-dialog";

export function DeactivateUserForm() {
  const { t, isOpen, selectedUser, isSubmitting, close, handleConfirm } = useDeactivateUserForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleConfirm}
      isConfirmDisabled={isSubmitting}
      title={t("user.deactivate.title")}
      description={t("user.deactivate.description", { name: selectedUser?.name })}
      cancelText={t("user.deactivate.actions.cancel")}
      confirmText={t("user.deactivate.actions.confirm")}
    />
  );
}
