import { useUserProfileEditForm } from "@/components/forms/user/profile-edit/hook";
import { Button } from "@/components/ui/button";

export function UserProfileEditForm() {
  const { form, t, isPending, redirect, handleSubmit, navigate } = useUserProfileEditForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <form.AppField name="name">
        {(field) => (
          <field.TextField
            label={t("auth.register.fields.name.label")}
            placeholder={t("auth.register.fields.name.placeholder")}
            type="text"
          />
        )}
      </form.AppField>

      <form.AppField name="email">
        {(field) => (
          <field.TextField
            className="h-12 text-base"
            label={t("auth.login.fields.email.label")}
            placeholder={t("auth.login.fields.email.placeholder")}
            type="email"
          />
        )}
      </form.AppField>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="min-w-32 cursor-pointer py-6 border-destructive text-base text-destructive hover:text-white hover:bg-destructive"
          onClick={() => navigate({ to: redirect })}
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
