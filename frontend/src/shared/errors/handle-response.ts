import type { AxiosResponse } from "axios";
import { AppError } from "./app-error";

export function handleResponse<T>(response: AxiosResponse<T> | AppError): T | AppError {
  if (response instanceof AppError) {
    return response;
  }
  if (!response?.data) {
    return AppError.generic();
  }
  return response.data;
}
