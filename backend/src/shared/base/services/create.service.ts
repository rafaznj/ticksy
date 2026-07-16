import type { IBaseCreateRepository } from "../repositories/contracts/create";
import type { IBaseCreateService } from "./contracts/create";
import { AppException } from "../../../shared/exceptions/app-exception";

export class BaseCreateService<TInput, TOutput> implements IBaseCreateService<TInput, TOutput> {
  constructor(protected readonly repository: IBaseCreateRepository<TInput, TOutput>) {}

  async execute(data: TInput): Promise<TOutput> {
    const created = await this.repository.execute(data);

    if (!created) {
      throw AppException.internalServerError("general.errors.createFailed");
    }

    return created;
  }
}
