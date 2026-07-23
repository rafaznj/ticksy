import { useCallback, useState, type ReactNode } from "react";
import { DialogContext, type DialogState } from "./dialog-context";

interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [dialogs, setDialogs] = useState<Record<string, DialogState>>({});

  const open = useCallback((key: string, data?: unknown) => {
    setDialogs((prev) => ({ ...prev, [key]: { isOpen: true, data } }));
  }, []);

  const close = useCallback((key: string) => {
    setDialogs((prev) => ({
      ...prev,
      [key]: { ...prev[key], isOpen: false },
    }));
  }, []);

  const toggle = useCallback((key: string) => {
    setDialogs((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isOpen: !prev[key]?.isOpen,
      },
    }));
  }, []);

  const isOpen = useCallback((key: string) => Boolean(dialogs[key]?.isOpen), [dialogs]);

  const getData = useCallback((key: string) => dialogs[key]?.data, [dialogs]);

  return (
    <DialogContext.Provider value={{ isOpen, getData, open, close, toggle }}>
      {children}
    </DialogContext.Provider>
  );
}
