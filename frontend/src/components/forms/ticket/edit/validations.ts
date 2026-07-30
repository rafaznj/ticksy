import { z } from "zod";
import type { TFunction } from "i18next";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";

export const editTicketFormSchema = (t: TFunction) => {
  return z.object({
    title: z
      .string(t("ticket.fields.title.validations.required"))
      .trim()
      .min(5, t("ticket.fields.title.validations.minLength", { min: 5 }))
      .max(100, t("ticket.fields.title.validations.maxLength", { max: 100 })),

    description: z
      .string(t("ticket.fields.description.validations.required"))
      .min(10, t("ticket.fields.description.validations.minLength", { min: 10 }))
      .max(
        5000,
        t("ticket.fields.description.validations.maxLength", {
          max: 5000,
        }),
      ),

    priority: z.enum(TicketPriorityEnum, {
      error: () => t("ticket.fields.priority.validations.required"),
    }),
  });
};
