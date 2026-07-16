import type { AxiosRequestTransformer } from "axios";

function convertDates(obj: Record<string, unknown>): void {
  for (const key in obj) {
    const value = obj[key];
    if (value instanceof Date) {
      obj[key] = value.toISOString();
    } else if (typeof value === "object" && value !== null) {
      convertDates(value as Record<string, unknown>);
    }
  }
}

export const transformRequest: AxiosRequestTransformer = (data) => {
  if (data && typeof data === "object") {
    convertDates(data as Record<string, unknown>);
  }
  return data;
};
