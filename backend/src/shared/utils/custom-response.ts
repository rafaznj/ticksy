import { CustomErrorViewModel } from "../interfaces/custom-error.vm";
import { CustomResponseViewModel } from "../interfaces/custom-response.vm";

export function customResponse<T>(
  content?: T | null,
  status?: number,
): {
  error: CustomErrorViewModel;
  data?: T | null;
  status: number;
} {
  const response: CustomResponseViewModel<T> = {
    status: status || 400,
    data: {} as T | null,
    error: {} as CustomErrorViewModel,
  };

  if (content !== undefined) {
    response.status = 200;
    response.data = content;
  }

  return response;
}
