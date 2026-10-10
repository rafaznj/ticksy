import type { TFunction } from "i18next";
import z from "zod";

export const assignTicketFormSchema = (t: TFunction) => {
  return z.object({
    id: z.uuid(),
    userId: z.uuid(t("ticket.fields.assignee.validations.required")),
  });
};
