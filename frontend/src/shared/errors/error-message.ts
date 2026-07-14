export interface ErrorMessage {
  key: string;
  value?: string;
  params?: Record<string, string | number>;
}

export interface IErrorResponse {
  success: false;
  errors: ErrorMessage[];
  code: number;
}
