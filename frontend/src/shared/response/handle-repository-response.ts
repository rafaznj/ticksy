import { AppError } from "@/shared/errors/app-error";
import type { AxiosResponse } from "axios";

export function handleRepositoryResponse<T>(response: AxiosResponse<T> | AppError): T | AppError {
  if (response instanceof AppError) {
    return response;
  }
  if (!response?.data) {
    return AppError.generic();
  }
  return response.data;
}
