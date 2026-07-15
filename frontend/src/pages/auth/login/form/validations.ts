import { z } from "zod";
import type { TFunction } from "i18next";

export const loginFormSchema = (t: TFunction) => {
  return z.object({
    email: z
      .email(t("auth.login.fields.email.validations.invalid"))
      .max(254, t("auth.login.fields.email.validations.maxLength", { max: 254 })),

    password: z
      .string()
      .min(1, t("auth.login.fields.password.validations.required"))
      .max(
        72,
        t("auth.login.fields.password.validations.maxLength", {
          max: 72,
        }),
      ),
  });
};
