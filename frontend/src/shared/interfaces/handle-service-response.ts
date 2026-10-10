import { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export function handleServiceResponse<T>(response: APIResponse<T> | AppError): T | AppError {
  if (response instanceof AppError) {
    return response;
  }

  return response.data;
}
