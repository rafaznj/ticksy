import { z } from "zod";
import type { TFunction } from "i18next";

export const registerFormSchema = (t: TFunction) => {
  return z.object({
    name: z
      .string(t("auth.register.fields.name.validations.required"))
      .trim()
      .min(1, t("auth.register.fields.name.validations.required"))
      .max(80, t("auth.register.fields.name.validations.maxLength", { max: 80 })),

    email: z
      .email(t("auth.login.fields.email.validations.invalid"))
      .trim()
      .max(254, t("auth.login.fields.email.validations.maxLength", { max: 254 })),

    password: z
      .string(t("auth.register.fields.password.validations.required"))
      .min(8, t("auth.register.fields.password.validations.minLength", { min: 8 }))
      .max(72, t("auth.register.fields.password.validations.maxLength", { max: 72 }))
      .refine((value) => /[a-z]/.test(value), {
        message: t("auth.register.fields.password.validations.lowerCaseLetter"),
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: t("auth.register.fields.password.validations.upperCaseLetter"),
      })
      .refine((value) => /\d/.test(value), {
        message: t("auth.register.fields.password.validations.number"),
      })
      .refine((value) => /[!@#$%]/.test(value), {
        message: t("auth.register.fields.password.validations.specialCharacter"),
      }),
  });
};
