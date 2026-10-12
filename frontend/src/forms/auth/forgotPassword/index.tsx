import { Separator } from "@/components/ui/separator";
import { useForgotPasswordFormHook } from "@/forms/auth/forgotPassword/hook";

export function ForgotPasswordForm() {
  const { form, t, isPending, handleSubmit } = useForgotPasswordFormHook();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-4 rounded-2xl border bg-card p-6 text-card-foreground shadow-xl shadow-primary/5 sm:p-10"
    >
      <div className="flex flex-col gap-2">
        <div className="flex w-full justify-center">
          <img src="/logo.png" alt="Ticksy" className="block h-24 w-24 object-contain" />
        </div>

        <Separator />

        <div className="w-full space-y-1 text-left">
          <h1 className="text-2xl font-bold tracking-tight">{t("auth.forgotPassword.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("auth.forgotPassword.description")}</p>
        </div>
      </div>

      <div className="space-y-3">
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label={t("general.fields.email.label")}
              placeholder={t("general.fields.email.placeholder")}
              type="email"
              autoComplete="email"
              required
            />
          )}
        </form.AppField>
      </div>

      <form.AppForm>
        <form.SubmitButton className="mt-1 w-full cursor-pointer py-3 text-lg">
          {isPending ? t("general.actions.submitting") : t("general.actions.submit")}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
