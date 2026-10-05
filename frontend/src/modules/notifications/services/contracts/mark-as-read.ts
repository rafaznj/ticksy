import type { AppError } from "@/shared/errors/app-error";

export interface IMarkNotificationAsReadService {
  execute: (id: string) => Promise<boolean | AppError>;
}
