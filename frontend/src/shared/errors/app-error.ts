import type { ErrorMessage } from "@/shared/errors/contracts/error-message";

export class AppError {
  constructor(
    public readonly errors: ErrorMessage[],
    public readonly translatedErrors: string[],
    public readonly statusCode?: number,
  ) {}

  static generic(message = "An unexpected error occurred"): AppError {
    return new AppError([{ key: "general.errors.unknown" }], [message]);
  }
}
