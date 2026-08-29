import { useUserProfileEditForm } from "@/components/forms/user/profile-edit/hook";
import { Button } from "@/components/ui/button";

export function UserProfileEditForm() {
  const { form, t, isPending, handleSubmit, navigate } = useUserProfileEditForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
            className="h-12 text-base"
            label={t("user.fields.email.label")}
            placeholder={t("user.fields.email.placeholder")}
            type="email"
          />
        )}
      </form.AppField>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="min-w-32 cursor-pointer py-6 border-destructive text-base text-destructive hover:text-white hover:bg-destructive"
          onClick={() => navigate({ to: "/home" })}
        >
          {t("general.actions.cancel")}
        </Button>

        <form.AppForm>
          <form.SubmitButton className="min-w-48 cursor-pointer py-6 text-base">
            {isPending ? t("user.edit.actions.saving") : t("user.edit.actions.save")}
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}
