// hook.ts
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

import { useAppForm } from "@/hooks/use-form";
import type { UserPreferencesProps } from "./types";
import { useDialog } from "@/contexts/use-dialog";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { useStore } from "@tanstack/react-form";

export function useUserPreferencesForm() {
  const { isOpen, close } = useDialog(DIALOG_KEYS.PREFERENCES);

  const { t, i18n } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();

  const currentValues: UserPreferencesProps = {
    theme: resolvedTheme === "dark" ? "dark" : "light",
    language: i18n.language.startsWith("pt") ? "pt" : "en",
  };

  const form = useAppForm({
    defaultValues: currentValues,
    onSubmit: async ({ value }) => {
      setTheme(value.theme);
      await i18n.changeLanguage(value.language);
      close();
    },
  });

  // Ao abrir, o rascunho volta a refletir o estado real (o tema pode ter mudado pelo header)
  useEffect(() => {
    if (isOpen) form.reset(currentValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const [canSubmit, isSubmitting, isDirty] = useStore(form.store, (state) => [
    state.canSubmit,
    state.isSubmitting,
    state.isDirty,
  ]);

  const handleSubmit = async (event?: React.SyntheticEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    await form.handleSubmit();
  };

  return { form, t, isOpen, canSubmit, isSubmitting, isDirty, close, handleSubmit };
}
