import type resources from "@/assets/i18n/resources";

type TranslationResources = (typeof resources)["en"]["translation"];

type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K;
}[keyof T & string];

export type TranslationKey = NestedKeyOf<TranslationResources>;
