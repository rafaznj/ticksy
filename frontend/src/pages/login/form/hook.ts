// pages/login/form/hook.ts
import { useState, type FormEventHandler } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-form";
import { loginFormSchema } from "@/pages/login/form/validations";
import { useLoginMutation } from "@/query-hooks/auth/mutation/use-login";

export function useLoginFormHook() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const loginMutation = useLoginMutation();

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

      try {
        await loginMutation.mutateAsync(value);
        await navigate({ to: "/home" });
      } catch {
        setErrorMessages(["tete"]);
      }
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
