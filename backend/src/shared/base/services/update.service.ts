import type { IBaseUpdateRepository } from "../repositories/contracts/update";
import type { IBaseUpdateService } from "./contracts/update";
import { AppException } from "../../../shared/exceptions/app-exception";

export class BaseUpdateService<T> implements IBaseUpdateService<T> {
  constructor(protected readonly repository: IBaseUpdateRepository<T>) {}

  async execute(id: string, data: Partial<T>): Promise<T> {
    const updated = await this.repository.execute(id, data);

    if (!updated) {
      throw AppException.notFound("general.errors.recordNotFound");
    }

    return updated;
  }
}
