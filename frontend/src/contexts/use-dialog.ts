import { useContext } from "react";
import { DialogContext } from "./dialog-context";

function useDialogContext() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  return context;
}

export function useDialog<T = unknown>(key: string) {
  const { isOpen, getData, open, close, toggle } = useDialogContext();

  return {
    isOpen: isOpen(key),
    data: getData(key) as T | undefined,
    open: (data?: T) => open(key, data),
    close: () => close(key),
    toggle: () => toggle(key),
  };
}
