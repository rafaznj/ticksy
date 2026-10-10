import { ErrorMessage } from "./error-message";

export interface ErrorResponseViewModel {
  success: false;
  errors: ErrorMessage[];
  code: number;
}
