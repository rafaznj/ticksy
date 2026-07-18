export const DIALOG_KEYS = {
  CREATE_TICKET: "create-ticket",
} as const;

export type DialogKey = (typeof DIALOG_KEYS)[keyof typeof DIALOG_KEYS];
