import { useAssignTicketForm } from "./hook";
import { ComplexDialog } from "@/components/ui/complex-dialog";

export function AssignTicketForm() {
  const {
    t,
    form,
    getAssignableUsersPagedService,
    isOpen,
    isBlurred,
    canSubmit,
    isSubmitting,
    handleSubmit,
    close,
  } = useAssignTicketForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleSubmit}
      isConfirmDisabled={!isBlurred || !canSubmit || isSubmitting}
      title={t("ticket.assign.title")}
      description={t("ticket.assign.description")}
      cancelText={t("ticket.assign.actions.cancel")}
      confirmText={t("ticket.assign.actions.confirm")}
    >
      <form>
        <form.AppField name="userId">
          {(field) => (
            <field.AsyncSelectField
              service={getAssignableUsersPagedService}
              bindValue="id"
              bindLabel="name"
              label={t("ticket.fields.assignee.label")}
              placeholder={t("ticket.fields.assignee.placeholder")}
              required
            />
          )}
        </form.AppField>
      </form>
    </ComplexDialog>
  );
}
