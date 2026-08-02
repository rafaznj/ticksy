import { AppError } from "@/shared/errors/app-error";

export function handleServiceResponse<T>(response: T | AppError): T | AppError {
  if (response instanceof AppError) {
    throw response;
  }

  return response;
}
