import { AppError } from "@/shared/errors/app-error";

export default function handleMutationResponse<T>(response: T | AppError) {
  if (response instanceof AppError || response instanceof Error) {
    throw response;
  }

  return response;
}
