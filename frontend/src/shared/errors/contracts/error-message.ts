import type { TranslationKey } from "@/shared/utils/translation-key";

export interface ErrorMessage {
  key: TranslationKey;
  params?: Record<string, unknown>;
}

export interface IErrorResponse {
  success: false;
  errors: ErrorMessage[];
  code: number;
}
