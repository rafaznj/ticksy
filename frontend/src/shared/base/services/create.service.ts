import type { IBaseCreateRepository } from "@/shared/base/repositories/contracts/create";
import type { IBaseCreateService } from "@/shared/base/services/contracts/create";
import { AppError } from "@/shared/errors/app-error";
import { injectable } from "inversify";

@injectable()
export class BaseCreateService<TInput, TOutput> implements IBaseCreateService<TInput, TOutput> {
  constructor(protected readonly repository: IBaseCreateRepository<TInput, TOutput>) {}

  async execute(data: TInput): Promise<TOutput | AppError> {
    const response = await this.repository.execute(data);
    if (response instanceof AppError) {
      throw response;
    }

    return response;
  }
}
