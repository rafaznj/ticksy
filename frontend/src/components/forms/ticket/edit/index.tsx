import { useEditTicketForm } from "@/components/forms/ticket/edit/hook";
import { ComplexDialog } from "@/components/ui/complex-dialog";

export function EditTicketForm() {
  const {
    t,
    isOpen,
    form,
    categoryOptions,
    priorityOptions,
    isBlurred,
    canSubmit,
    isSubmitting,
    close,
    handleSubmit,
  } = useEditTicketForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleSubmit}
      isConfirmDisabled={!isBlurred || !canSubmit || isSubmitting}
      title={t("ticket.edit.title")}
      description={t("ticket.edit.description")}
      cancelText={t("ticket.edit.actions.cancel")}
      confirmText={t("ticket.edit.actions.save")}
      width="lg"
    >
      <form onSubmit={handleSubmit} className="flex w-full min-w-0 flex-col gap-4">
        <form.AppField name="title">
          {(field) => (
            <field.TextField
              label={t("ticket.fields.title.label")}
              placeholder={t("ticket.fields.title.placeholder")}
              type="text"
            />
          )}
        </form.AppField>

        <form.AppField name="description">
          {(field) => (
            <field.TextareaField
              label={t("ticket.fields.description.label")}
              placeholder={t("ticket.fields.description.placeholder")}
            />
          )}
        </form.AppField>

        <div className="flex w-full min-w-0 gap-4">
          <div className="min-w-0 flex-1">
            <form.AppField name="category">
              {(field) => (
                <field.SelectField
                  label={t("ticket.fields.category.label")}
                  placeholder={t("ticket.fields.category.placeholder")}
                  options={categoryOptions}
                  required
                />
              )}
            </form.AppField>
          </div>

          <div className="min-w-0 flex-1">
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
          </div>
        </div>
      </form>
    </ComplexDialog>
  );
}
