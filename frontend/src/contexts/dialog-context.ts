import { createContext } from "react";

export interface DialogState {
  isOpen: boolean;
  data?: unknown;
}

export interface DialogContextValue {
  isOpen: (key: string) => boolean;
  getData: (key: string) => unknown;
  open: (key: string, data?: unknown) => void;
  close: (key: string) => void;
  toggle: (key: string) => void;
}

export const DialogContext = createContext<DialogContextValue | null>(null);
