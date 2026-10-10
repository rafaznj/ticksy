import type { ErrorMessage } from "@/shared/errors/contracts/error-message";

export interface APIResponse<T> {
  success: boolean;
  data: T;
  errors: ErrorMessage[];
}
