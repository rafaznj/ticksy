export interface ErrorMessage {
  key: string;
  params?: Record<string, unknown>;
}

export interface IErrorResponse {
  success: false;
  errors: ErrorMessage[];
  code: number;
}
