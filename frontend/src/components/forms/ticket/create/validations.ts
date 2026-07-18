import { z } from "zod";
import type { TFunction } from "i18next";
import { TicketPriorityEnum } from "@/modules/ticket/enums/ticket-priority.enum";

export const createTicketFormSchema = (t: TFunction) => {
  return z.object({
    title: z
      .string(t("ticket.create.fields.title.validations.required"))
      .trim()
      .min(5, t("ticket.create.fields.title.validations.minLength", { min: 5 }))
      .max(100, t("ticket.create.fields.title.validations.maxLength", { max: 100 })),

    description: z
      .string(t("ticket.create.fields.description.validations.required"))
      .min(10, t("ticket.create.fields.description.validations.minLength", { min: 10 }))
      .max(
        5000,
        t("ticket.create.fields.description.validations.maxLength", {
          max: 5000,
        }),
      ),

    priority: z.enum(TicketPriorityEnum, {
      error: () => t("ticket.create.fields.priority.validations.required"),
    }),

    createdById: z.string(),
  });
};
