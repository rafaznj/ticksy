import { pgEnum } from "drizzle-orm/pg-core";

export function toPgEnum<T extends string>(name: string, enumObject: Record<string, T>) {
  return pgEnum(name, Object.values(enumObject) as [T, ...T[]]);
}
