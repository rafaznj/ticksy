import { z } from "zod";
import type { TFunction } from "i18next";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";

export const editUserFormSchema = (t: TFunction) => {
  return z.object({
    name: z
      .string()
      .trim()
      .min(3, t("user.fields.name.validations.minLength", { min: 3 }))
      .max(80, t("user.fields.name.validations.maxLength", { max: 80 })),

    email: z
      .email(t("user.fields.email.validations.invalid"))
      .trim()
      .max(254, t("user.fields.email.validations.maxLength", { max: 254 })),

    role: z.enum(UserRoleEnum),
  });
};
