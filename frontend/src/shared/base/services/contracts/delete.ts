import type { AppError } from "@/shared/errors/app-error";

export interface IBaseDeleteService {
  execute(id: string): Promise<boolean | AppError>;
}
