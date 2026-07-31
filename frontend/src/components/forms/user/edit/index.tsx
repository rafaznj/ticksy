import { useEditUserForm } from "@/components/forms/user/edit/hook";
import { ComplexDialog } from "@/components/ui/complex-dialog";

export function EditUserForm() {
  const { t, isOpen, form, roleOptions, isBlurred, canSubmit, isSubmitting, close, handleSubmit } =
    useEditUserForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleSubmit}
      isConfirmDisabled={!isBlurred || !canSubmit || isSubmitting}
      title={t("user.edit.title")}
      description={t("user.edit.description")}
      cancelText={t("user.edit.actions.cancel")}
      confirmText={t("user.edit.actions.save")}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label={t("user.fields.name.label")}
              placeholder={t("user.fields.name.placeholder")}
              type="text"
            />
          )}
        </form.AppField>

        <form.AppField name="email">
          {(field) => (
            <field.TextareaField
              label={t("user.fields.email.label")}
              placeholder={t("user.fields.email.placeholder")}
            />
          )}
        </form.AppField>

        <form.AppField name="role">
          {(field) => (
            <field.SelectField
              label={t("user.fields.role.label")}
              placeholder={t("user.fields.role.placeholder")}
              options={roleOptions}
            />
          )}
        </form.AppField>
      </form>
    </ComplexDialog>
  );
}
