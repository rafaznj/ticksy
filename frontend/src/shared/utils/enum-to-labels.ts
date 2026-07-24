import type { TFunction } from "i18next";

const toCamelCase = (value: string) => {
  const normalized = value.toUpperCase();

  return normalized.toLowerCase().replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());
};

export function enumToLabels<E extends Record<string, string>>(
  enumObject: E,
  translationPrefix: string,
  t: TFunction,
): Record<E[keyof E], string> {
  const translate = t as unknown as (key: string) => string;

  return Object.values(enumObject).reduce(
    (acc, value) => {
      const key = `${translationPrefix}.${toCamelCase(value)}`;
      acc[value as E[keyof E]] = translate(key);
      return acc;
    },
    {} as Record<E[keyof E], string>,
  );
}
