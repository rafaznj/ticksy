import type { IBaseGetByIdRepository } from "../repositories/contracts/get-by-id";
import type { IBaseGetByIdService } from "./contracts/get-by-id";
import { AppException } from "../../../shared/exceptions/app-exception";

export class BaseGetByIdService<T> implements IBaseGetByIdService<T> {
  constructor(protected readonly repository: IBaseGetByIdRepository<T>) {}

  async execute(id: string): Promise<T> {
    const record = await this.repository.execute(id);

    if (!record) {
      throw AppException.notFound("general.errors.recordNotFound");
    }

    return record;
  }
}
