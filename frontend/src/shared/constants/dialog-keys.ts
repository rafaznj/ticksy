export const DIALOG_KEYS = {
  // User
  UPDATE_USER: "update-user",

  // Ticket
  CREATE_TICKET: "create-ticket",
} as const;

export type DialogKey = (typeof DIALOG_KEYS)[keyof typeof DIALOG_KEYS];
