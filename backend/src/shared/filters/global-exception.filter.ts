import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { ErrorMessage } from "../dto/error-message";

interface ErrorResponseBody {
  success: false;
  errors: ErrorMessage[];
  code: number;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const logMessage = `[${request.method}] ${request.url} - Status: ${status}`;
    if (status >= 500) {
      this.logger.error(logMessage, (exception as Error)?.stack);
    } else {
      this.logger.warn(logMessage);
    }

    const errorResponse = this.buildErrorResponse(exception, status);
    response.status(errorResponse.code).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, status: number): ErrorResponseBody {
    if (exception instanceof HttpException) {
      const body = exception.getResponse();

      if (typeof body === "object" && body !== null && "errors" in body) {
        return {
          success: false,
          errors: (body as { errors: ErrorMessage[] }).errors,
          code: status,
        };
      }

      const rawMessage = typeof body === "string" ? body : (body as { message?: unknown }).message;
      const messages = Array.isArray(rawMessage) ? rawMessage : [rawMessage ?? "Unknown error"];

      return {
        success: false,
        errors: messages.map((msg) => ({
          key: "validation.generic",
          params: { message: String(msg) },
        })),
        code: status,
      };
    }

    return {
      success: false,
      errors: [{ key: "general.errors.unknownError" }],
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
