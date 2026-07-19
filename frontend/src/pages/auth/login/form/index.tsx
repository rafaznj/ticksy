import { useLoginFormHook } from "@/pages/auth/login/form/hook";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  const { form, t, isPending, handleSubmit } = useLoginFormHook();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex w-full justify-center">
          <img src="/logo.png" alt="Ticksy" className="h-40 w-40 object-contain block -my-8" />
        </div>

        <Separator />

        <div className="w-full space-y-2 text-left pt-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("auth.login.title")}</h1>
          <p className="text-base text-muted-foreground">{t("auth.login.description")}</p>
        </div>
      </div>

      <div className="space-y-5">
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
          {isPending ? t("auth.login.actions.submitting") : t("auth.login.actions.submit")}
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
