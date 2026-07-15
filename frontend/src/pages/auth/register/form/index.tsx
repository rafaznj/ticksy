import { useRegisterFormHook } from "@/pages/auth/register/form/hook";

export function RegisterForm() {
  const { form, t, handleSubmit, errorMessages } = useRegisterFormHook();

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
              label={t("auth.register.fields.email.label")}
              placeholder={t("auth.register.fields.email.placeholder")}
              type="email"
              required
            />
          )}
        </form.AppField>

        <form.AppField name="password">
          {(field) => (
            <field.TextField
              label={t("auth.register.fields.password.label")}
              placeholder={t("auth.register.fields.password.placeholder")}
              type="password"
              required
            />
          )}
        </form.AppField>

        <form.AppForm>
          <form.SubmitButton className="mt-4">
            {t("auth.register.actions.submit")}
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}
