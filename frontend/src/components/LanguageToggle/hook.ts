import usePersistedState from "@/hooks/persisted-state";
import { useTranslation } from "react-i18next";

type Language = "pt" | "en";

export default function useLanguageToggle() {
  const { i18n } = useTranslation();

  const [language, setLanguage] = usePersistedState<Language>(
    "lang",
    i18n.language === "pt" ? "pt" : "en",
  );

  const toggleLanguage = () => {
    const next = language === "pt" ? "en" : "pt";

    setLanguage(next);
    i18n.changeLanguage(next);
  };

  return {
    language,
    toggleLanguage,
  };
}
