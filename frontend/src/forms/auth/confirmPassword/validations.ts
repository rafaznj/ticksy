import { z } from "zod";
import type { TFunction } from "i18next";

export const confirmPasswordSchema = (t: TFunction) => {
  return z
    .object({
      password: z
        .string(t("auth.confirmPassword.fields.password.validations.required"))
        .trim()
        .min(8, t("auth.confirmPassword.fields.password.validations.minLength", { min: 8 }))
        .max(
          72,
          t("auth.confirmPassword.fields.password.validations.maxLength", {
            max: 72,
          }),
        ),
      confirmPassword: z
        .string(t("auth.confirmPassword.fields.confirmPassword.validations.required"))
        .min(1, t("auth.confirmPassword.fields.confirmPassword.validations.required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("auth.confirmPassword.fields.confirmPassword.validations.match"),
    });
};
