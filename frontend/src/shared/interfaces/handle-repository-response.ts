import { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import type { AxiosResponse } from "axios";

export function handleRepositoryResponse<T>(
  response: AxiosResponse<APIResponse<T> | AppError>,
): APIResponse<T> | AppError {
  if (response instanceof AppError) {
    return response;
  }
  if (!response?.data) {
    return AppError.generic();
  }
  return response.data;
}
