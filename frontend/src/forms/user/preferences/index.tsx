import { LuLanguages, LuMoon, LuSun } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { ComplexDialog } from "@/components/ui/complex-dialog";
import { useUserPreferencesForm } from "./hook";

export function UserPreferencesForms() {
  const { form, t, isOpen, canSubmit, isSubmitting, isDirty, handleSubmit, close } =
    useUserPreferencesForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleSubmit}
      isConfirmDisabled={!canSubmit || isSubmitting || !isDirty}
      title={t("user.preferences.title")}
      description={t("user.preferences.description")}
      width="sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <form.Field name="theme">
          {(field) => (
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("user.preferences.theme.label")}</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={field.state.value === "light" ? "default" : "outline"}
                  className="flex-1 cursor-pointer"
                  onClick={() => field.handleChange("light")}
                >
                  <LuSun className="size-4" />
                  {t("user.preferences.theme.options.light")}
                </Button>
                <Button
                  type="button"
                  variant={field.state.value === "dark" ? "default" : "outline"}
                  className="flex-1 cursor-pointer"
                  onClick={() => field.handleChange("dark")}
                >
                  <LuMoon className="size-4" />
                  {t("user.preferences.theme.options.dark")}
                </Button>
              </div>
            </div>
          )}
        </form.Field>

        <form.Field name="language">
          {(field) => (
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("user.preferences.language.label")}</p>
              <div className="flex gap-2">
                {(["pt", "en"] as const).map((lang) => (
                  <Button
                    key={lang}
                    type="button"
                    variant={field.state.value === lang ? "default" : "outline"}
                    className="flex-1 cursor-pointer"
                    onClick={() => field.handleChange(lang)}
                  >
                    <LuLanguages className="size-4" />
                    {lang === "pt" ? "Português" : "English"}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </form.Field>
      </form>
    </ComplexDialog>
  );
}
