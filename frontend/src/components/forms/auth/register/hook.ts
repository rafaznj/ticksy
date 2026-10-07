import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-form";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IRegisterService } from "@/modules/auth/services/contracts/register";
import { useRegister } from "@/modules/auth/query-hooks/mutation/use-register";
import type { RegisterFormProps } from "@/components/forms/auth/register/types";
import { registerFormSchema } from "@/components/forms/auth/register/validations";

export function useRegisterFormHook() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const registerService = container.get<IRegisterService>(SERVICE_TOKENS.RegisterService);

  const { mutate: handleRegister, isPending } = useRegister(registerService);

  const form = useAppForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    } as RegisterFormProps,
    onSubmit: async (value) => {
      handleRegister(value.value, {
        onSuccess: () => {
          navigate({ to: "/home" });
        },
      });
    },
    validators: {
      onChange: registerFormSchema(t),
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
