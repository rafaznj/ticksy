import type { TFunction } from "i18next";
import { z } from "zod";

export const editUserFormSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(3, t("user.edit.fields.name.validations.minLength", { min: 3 }))
      .max(80, t("user.edit.fields.name.validations.maxLength", { max: 80 })),

    email: z
      .string()
      .trim()
      .email(t("user.edit.fields.email.validations.invalid"))
      .max(254, t("user.edit.fields.email.validations.maxLength", { max: 254 }))
      .optional(),
  });
