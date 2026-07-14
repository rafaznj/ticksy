import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorMessage } from "../dto/error-message";

export class AppException extends HttpException {
  constructor(errors: ErrorMessage[], status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super({ success: false, errors }, status);
  }

  static unauthorized(key: string, value?: string): AppException {
    return new AppException([{ key, value }], HttpStatus.UNAUTHORIZED);
  }

  static badRequest(key: string, value?: string): AppException {
    return new AppException([{ key, value }], HttpStatus.BAD_REQUEST);
  }

  static notFound(key: string, value?: string): AppException {
    return new AppException([{ key, value }], HttpStatus.NOT_FOUND);
  }
}
