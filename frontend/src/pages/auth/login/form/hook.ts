import { useState, type FormEventHandler } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-form";
import { useLoginMutation } from "@/query-hooks/auth/mutation/use-login";
import { loginFormSchema } from "@/pages/auth/login/form/validations";

export function useLoginFormHook() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const { mutate: handleLogin } = useLoginMutation();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      handleLogin(value.value);
    },
    validators: {
      onSubmit: loginFormSchema(t),
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
