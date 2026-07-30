import { useCreateTicketForm } from "@/components/forms/ticket/create/hook";
import { ComplexDialog } from "@/components/ui/complex-dialog";

export function CreateTicketForm() {
  const {
    t,
    isOpen,
    form,
    priorityOptions,
    isBlurred,
    canSubmit,
    isSubmitting,
    close,
    handleSubmit,
  } = useCreateTicketForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleSubmit}
      isConfirmDisabled={!isBlurred || !canSubmit || isSubmitting}
      title={t("ticket.create.title")}
      description={t("ticket.create.description")}
      cancelText={t("ticket.create.actions.cancel")}
      confirmText={t("ticket.create.actions.submit")}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <form.AppField name="title">
          {(field) => (
            <field.TextField
              label={t("ticket.fields.title.label")}
              placeholder={t("ticket.fields.title.placeholder")}
              type="text"
              required
            />
          )}
        </form.AppField>

        <form.AppField name="description">
          {(field) => (
            <field.TextareaField
              label={t("ticket.fields.description.label")}
              placeholder={t("ticket.fields.description.placeholder")}
              required
            />
          )}
        </form.AppField>

        <form.AppField name="priority">
          {(field) => (
            <field.SelectField
              label={t("ticket.fields.priority.label")}
              placeholder={t("ticket.fields.priority.placeholder")}
              options={priorityOptions}
              required
            />
          )}
        </form.AppField>
      </form>
    </ComplexDialog>
  );
}
