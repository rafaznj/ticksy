import { useRegisterFormHook } from "@/forms/auth/register/hook";
import { Separator } from "@/components/ui/separator";

export function RegisterForm() {
  const { form, t, isPending, handleSubmit } = useRegisterFormHook();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex w-full justify-center">
          <img src="/logo.png" alt="Ticksy" className="block h-24 w-24 object-contain" />
        </div>

        <Separator />

        <div className="w-full space-y-1 text-left">
          <h1 className="text-2xl font-bold tracking-tight">{t("auth.register.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("auth.register.description")}</p>
        </div>
      </div>

      <div className="space-y-3">
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label={t("auth.register.fields.name.label")}
              placeholder={t("auth.register.fields.name.placeholder")}
              type="text"
              required
            />
          )}
        </form.AppField>

        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label={t("auth.login.fields.email.label")}
              placeholder={t("auth.login.fields.email.placeholder")}
              type="email"
              required
            />
          )}
        </form.AppField>

        <form.AppField name="password">
          {(field) => (
            <field.TextField
              label={t("auth.login.fields.password.label")}
              type="password"
              required
            />
          )}
        </form.AppField>
      </div>

      <form.AppForm>
        <form.SubmitButton className="mt-1 w-full cursor-pointer py-3 text-lg">
          {isPending ? t("auth.register.actions.submitting") : t("auth.register.actions.submit")}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
