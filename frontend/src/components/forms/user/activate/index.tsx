import { useActivateUserForm } from "@/components/forms/user/activate/hook";
import { ComplexDialog } from "@/components/ui/complex-dialog";

export function ActivateUserForm() {
  const { t, isOpen, selectedUser, isSubmitting, close, handleConfirm } = useActivateUserForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleConfirm}
      isConfirmDisabled={isSubmitting}
      title={t("user.activate.title")}
      description={t("user.activate.description", { user: selectedUser?.name })}
      cancelText={t("user.activate.actions.cancel")}
      confirmText={t("user.activate.actions.confirm")}
    />
  );
}
