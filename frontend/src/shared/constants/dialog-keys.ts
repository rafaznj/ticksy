export const DIALOG_KEYS = {
  // User
  CREATE_USER: "create-user",
  UPDATE_USER: "update-user",
  DEACTIVATE_USER: "deactivate-user",

  // Ticket
  CREATE_TICKET: "create-ticket",
  UPDATE_TICKET: "update-ticket",
  DELETE_TICKET: "delete-ticket",
  ASSIGN_TICKET: "assign-ticket",
} as const;

export type DialogKey = (typeof DIALOG_KEYS)[keyof typeof DIALOG_KEYS];
