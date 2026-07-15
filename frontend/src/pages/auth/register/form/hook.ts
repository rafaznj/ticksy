import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-form";
import { useLoginMutation } from "@/query-hooks/auth/mutation/use-login";
import { registerFormSchema } from "@/pages/auth/register/form/validations";
import type { RegisterFormProps } from "@/pages/auth/register/form/types";

export function useRegisterFormHook() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const { mutate: handleLogin } = useLoginMutation();

  const form = useAppForm({
    defaultValues: {} as RegisterFormProps,
    onSubmit: async (value) => {
      handleLogin(value.value);
    },
    validators: {
      onSubmit: registerFormSchema(t),
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
