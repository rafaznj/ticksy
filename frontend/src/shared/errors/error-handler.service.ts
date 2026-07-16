import { injectable } from "inversify";
import type { AxiosError } from "axios";

import { AppError } from "./app-error";
import type { IErrorResponse } from "./contracts/error-message";
import type { IErrorHandlerService } from "@/shared/errors/contracts/error";

@injectable()
export class ErrorHandlerService implements IErrorHandlerService {
  handle(error: unknown): AppError {
    const axiosError = error as AxiosError<IErrorResponse>;
    const body = axiosError?.response?.data;

    if (!body?.errors || body.errors.length === 0) {
      return AppError.generic();
    }

    return new AppError(body.errors, body.code);
  }
}
