import { Separator } from "@/components/ui/separator";
import { useRegisterFormHook } from "@/pages/auth/register/form/hook";

export function RegisterForm() {
  const { form, t, handleSubmit } = useRegisterFormHook();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex w-full justify-center">
          <img src="/logo.png" alt="Ticksy" className="h-40 w-40 object-contain block -my-8" />
        </div>

        <Separator />

        <div className="w-full space-y-2 text-left pt-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("auth.register.title")}</h1>
          <p className="text-base text-muted-foreground">{t("auth.register.description")}</p>
        </div>
      </div>

      <div className="space-y-5">
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
              placeholder={t("auth.login.fields.password.placeholder")}
              type="password"
              required
            />
          )}
        </form.AppField>
      </div>

      <form.AppForm>
        <form.SubmitButton className="mt-2 w-full py-3 text-lg cursor-pointer">
          {t("auth.login.actions.submit")}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
