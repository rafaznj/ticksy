import { toast } from "sonner";
import { AppError } from "@/shared/errors/app-error";

function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }
  return AppError.generic();
}

export function handleMutationError(fallbackMessage?: string, onError?: (error: AppError) => void) {
  return (error: unknown) => {
    const appError = toAppError(error);
    const isGenericError = appError.errors[0]?.key === "general.errors.unknownError";

    const message = isGenericError && fallbackMessage ? fallbackMessage : appError.message;

    toast.error(message);
    onError?.(appError);
  };
}
