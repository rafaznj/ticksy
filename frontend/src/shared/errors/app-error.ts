import type { ErrorMessage } from "./error-message";

export class AppError {
  constructor(
    public readonly errors: ErrorMessage[],
    public readonly translatedErrors: string[],
    public readonly statusCode?: number,
  ) {}

  static generic(message = "Ocorreu um erro inesperado"): AppError {
    return new AppError([{ key: "general.errors.unknown", value: message }], [message]);
  }
}
