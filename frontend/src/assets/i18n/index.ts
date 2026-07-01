import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en.json";
import translationPT from "./pt.json";

void i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: translationPT },
    en: { translation: translationEN },
  },
  lng: "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
