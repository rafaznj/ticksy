import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorMessage } from "../dto/error-message";

export class AppException extends HttpException {
  constructor(errors: ErrorMessage[], status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super({ success: false, errors }, status);
  }

  hasKey(key: string): boolean {
    const response = this.getResponse() as { errors?: ErrorMessage[] };
    return response.errors?.some((e) => e.key === key) ?? false;
  }

  static unauthorized(key: string): AppException {
    return new AppException([{ key }], HttpStatus.UNAUTHORIZED);
  }

  static badRequest(key: string): AppException {
    return new AppException([{ key }], HttpStatus.BAD_REQUEST);
  }

  static notFound(key: string): AppException {
    return new AppException([{ key }], HttpStatus.NOT_FOUND);
  }

  static internalServerError(key: string): AppException {
    return new AppException([{ key }], HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static conflict(key: string): AppException {
    return new AppException([{ key }], HttpStatus.CONFLICT);
  }
}
