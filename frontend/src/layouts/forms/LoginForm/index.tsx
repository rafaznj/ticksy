import { useLoginFormHook } from "@/layouts/forms/LoginForm/hook";

export function LoginForm() {
  const { form, t, handleSubmit, errorMessages } = useLoginFormHook();

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="flex w-full flex-col gap-4">
        {errorMessages && errorMessages.length > 0 && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
            <ul className="space-y-1">
              {errorMessages.map((message, index) => (
                <li key={index} className="text-sm text-destructive">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}

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

        <form.AppForm>
          <form.SubmitButton className="mt-4">{t("auth.login.actions.submit")}</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}
