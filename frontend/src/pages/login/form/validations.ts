import { z } from "zod";
import type { TFunction } from "i18next";

export const loginFormSchema = (t: TFunction) => {
  return z.object({
    email: z
      .email(t("auth.login.fields.email.validations.invalid"))
      .max(254, t("auth.login.fields.email.validations.maxLength")),

    password: z
      .string()
      .min(1, t("auth.login.fields.password.validations.required"))
      .min(6, t("auth.login.fields.password.validations.minLength", { min: 6 })),
  });
};
