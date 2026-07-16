import i18n from "@/assets/i18n";
import type { ErrorMessage } from "./contracts/error-message";

export class AppError {
  constructor(
    public readonly errors: ErrorMessage[],
    public readonly statusCode?: number,
  ) {}

  get translatedErrors(): string[] {
    return this.errors.map(({ key, params }) => i18n.t(key, params));
  }

  get message(): string {
    return this.translatedErrors[0] ?? "";
  }

  static generic(): AppError {
    return new AppError([{ key: "general.errors.unknownError" }]);
  }
}
