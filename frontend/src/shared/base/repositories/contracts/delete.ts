import type { AppError } from "@/shared/errors/app-error";

export interface IBaseDeleteRepository {
  execute(id: string): Promise<boolean | AppError>;
}
