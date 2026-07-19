import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface DialogContextValue {
  isOpen: (key: string) => boolean;
  open: (key: string) => void;
  close: (key: string) => void;
  toggle: (key: string) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});

  const open = useCallback((key: string) => {
    setOpenDialogs((prev) => ({ ...prev, [key]: true }));
  }, []);

  const close = useCallback((key: string) => {
    setOpenDialogs((prev) => ({ ...prev, [key]: false }));
  }, []);

  const toggle = useCallback((key: string) => {
    setOpenDialogs((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const isOpen = useCallback((key: string) => Boolean(openDialogs[key]), [openDialogs]);

  return (
    <DialogContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </DialogContext.Provider>
  );
}

function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDialog(key: string) {
  const { isOpen, open, close, toggle } = useDialogContext();

  return {
    isOpen: isOpen(key),
    open: () => open(key),
    close: () => close(key),
    toggle: () => toggle(key),
  };
}
