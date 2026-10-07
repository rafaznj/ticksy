import { useLoginFormHook } from "@/components/forms/auth/login/hook";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  const { form, t, isPending, handleSubmit } = useLoginFormHook();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex w-full justify-center">
          <img src="/logo.png" alt="Ticksy" className="block h-24 w-24 object-contain" />
        </div>

        <Separator />

        <div className="w-full space-y-1 text-left">
          <h1 className="text-2xl font-bold tracking-tight">{t("auth.login.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("auth.login.description")}</p>
        </div>
      </div>

      <div className="space-y-3">
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
        <form.SubmitButton className="mt-1 w-full cursor-pointer py-3 text-lg">
          {isPending ? t("auth.login.actions.submitting") : t("auth.login.actions.submit")}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
