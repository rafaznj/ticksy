import type { AppError } from "../app-error";

export interface IErrorHandlerService {
  handle(error: unknown): AppError;
}
