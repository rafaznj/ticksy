import type { AxiosResponseTransformer } from "axios";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;

function convertDates(obj: Record<string, unknown>): void {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string" && isoDateRegex.test(value)) {
      obj[key] = new Date(value);
    } else if (typeof value === "object" && value !== null) {
      convertDates(value as Record<string, unknown>);
    }
  }
}

export const transformResponse: AxiosResponseTransformer = (data) => {
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === "object") {
        convertDates(parsed as Record<string, unknown>);
      }
      return parsed;
    } catch {
      return data;
    }
  }
  return data;
};
