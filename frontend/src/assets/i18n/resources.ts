import en from "./en.json";
import pt from "./pt.json";

export const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
} as const;

export default resources;
