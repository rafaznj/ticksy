import { AppError } from "./app-error";

export function handleResponseService<T>(response: T | AppError): T | AppError {
  if (response instanceof AppError) {
    throw response;
  }

  return response;
}
