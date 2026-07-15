import type { IBaseCreateRepository } from "../repositories/contracts/create";
import type { IBaseCreateService } from "./contracts/create";
import { AppException } from "../../../shared/exceptions/app-exception";

export class BaseCreateService<T> implements IBaseCreateService<T> {
  constructor(protected readonly repository: IBaseCreateRepository<T>) {}

  async execute(data: T): Promise<T> {
    const created = await this.repository.execute(data);

    if (!created) {
      throw AppException.internalServerError("general.errors.createFailed");
    }

    return created;
  }
}
