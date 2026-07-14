export interface ErrorMessage {
  key: string;
  value?: string;
  params?: Record<string, string | number>;
}
