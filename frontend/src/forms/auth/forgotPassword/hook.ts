import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-app-form";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { ForgotPasswordFormProps } from "@/forms/auth/forgotPassword/types";
import { forgotPasswordFormSchema } from "@/forms/auth/forgotPassword/validations";
import type { IForgotPasswordUserService } from "@/modules/user/services/contracts/forgot-password";
import { useForgotPassword } from "@/modules/user/query-hooks/mutation/use-forgot-password";
import { generateRandomPassword } from "@/shared/utils/generate-random-password";

export function useForgotPasswordFormHook() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const forgotPasswordUserService = container.get<IForgotPasswordUserService>(
    SERVICE_TOKENS.ForgotPasswordUserService,
  );

  const { mutate: handleForgotPassword, isPending } = useForgotPassword(forgotPasswordUserService);

  const form = useAppForm({
    defaultValues: {
      email: "",
    } as ForgotPasswordFormProps,
    onSubmit: async ({ value }) => {
      const password = generateRandomPassword();

      handleForgotPassword({
        email: value.email,
        password,
      });
    },
    validators: {
      onChange: forgotPasswordFormSchema(t),
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
    isPending,
    navigate,
    handleSubmit,
  };
}
