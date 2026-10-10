import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-app-form";
import { useConfirmPassword } from "@/modules/user/query-hooks/mutation/use-confirm-password";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IConfirmPasswordService } from "@/modules/user/services/contracts/confirm-password";
import type { ConfirmPasswordFormProps } from "./types";
import { confirmPasswordSchema } from "./validations";

export function useConfirmPasswordFormHook() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const confirmPasswordService = container.get<IConfirmPasswordService>(
    SERVICE_TOKENS.ConfirmPasswordService,
  );
  const { mutate: handleConfirmPassword } = useConfirmPassword(confirmPasswordService);

  const form = useAppForm({
    defaultValues: { password: "", confirmPassword: "" } as ConfirmPasswordFormProps,
    onSubmit: async (value) => {
      handleConfirmPassword(value.value.password);
    },
    validators: {
      onChange: confirmPasswordSchema(t),
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
