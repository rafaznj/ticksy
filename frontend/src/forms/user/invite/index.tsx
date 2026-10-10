import { useInviteUserForm } from "@/forms/user/invite/hook";
import { ComplexDialog } from "@/components/ui/complex-dialog";

export function InviteUserForm() {
  const { t, isOpen, form, roleOptions, isBlurred, canSubmit, isSubmitting, close, handleSubmit } =
    useInviteUserForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleSubmit}
      isConfirmDisabled={!isBlurred || !canSubmit || isSubmitting}
      title={t("user.invite.title")}
      description={t("user.invite.description")}
      confirmText={t("general.actions.invite")}
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
            <field.TextField
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
              required
            />
          )}
        </form.AppField>
      </form>
    </ComplexDialog>
  );
}
