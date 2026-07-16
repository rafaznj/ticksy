import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-form";
import { useLoginMutation } from "@/modules/auth/query-hooks/use-login";
import { loginFormSchema } from "@/pages/auth/login/form/validations";
import type { LoginFormProps } from "@/pages/auth/login/form/types";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { ILoginService } from "@/modules/auth/services/contracts/login";

export function useLoginFormHook() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loginService = container.get<ILoginService>(SERVICE_TOKENS.LoginService);

  const { mutate: handleLogin } = useLoginMutation(loginService);

  const form = useAppForm({
    defaultValues: {} as LoginFormProps,
    onSubmit: async (value) => {
      handleLogin(value.value);
    },
    validators: {
      onSubmit: loginFormSchema(t),
    },
  });

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    await form.handleSubmit();
  };

  return {
    form,
    t,
    navigate,
    handleSubmit,
  };
}
