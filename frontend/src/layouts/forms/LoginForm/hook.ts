import { useState, type FormEventHandler } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-form";
import { loginFormSchema } from "@/layouts/forms/LoginForm/validations";

export function useLoginFormHook() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      setErrorMessages([]);

      // try {
      //   await login(value);
      //   navigate({ to: "/" });
      // } catch {
      //   setErrorMessages([t("auth.login.messages.invalidCredentials")]);
      // }
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await form.handleSubmit();
  };

  return {
    form,
    t,
    navigate,
    handleSubmit,
    errorMessages,
  };
}
