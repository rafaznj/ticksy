import { z } from "zod";
import type { TFunction } from "i18next";

export const forgotPasswordFormSchema = (t: TFunction) => {
  return z.object({
    email: z
      .email(t("auth.login.fields.email.validations.invalid"))
      .trim()
      .max(254, t("auth.login.fields.email.validations.maxLength", { max: 254 })),
  });
};
