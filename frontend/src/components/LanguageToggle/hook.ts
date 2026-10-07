import usePersistedState from "@/hooks/persisted-state";
import { useTranslation } from "react-i18next";

export function useLanguageToggle() {
  const { i18n, t } = useTranslation();
  type Language = "en" | "pt";

  const [language, setLanguage] = usePersistedState<Language>(
    "lang",
    i18n.language === "pt" ? "pt" : "en",
  );

  const toggleLanguage = () => {
    const newLanguage = language === "pt" ? "en" : "pt";
    setLanguage(newLanguage);
    void i18n.changeLanguage(newLanguage);
  };

  const currentLanguage =
    language === "pt" ? t("general.language.options.pt") : t("general.language.options.en");

  return { language, toggleLanguage, currentLanguage };
}
