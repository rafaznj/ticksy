import type { IBaseDeleteRepository } from "../repositories/contracts/delete";
import type { IBaseDeleteService } from "./contracts/delete";
import { AppException } from "../../../shared/exceptions/app-exception";

export class BaseDeleteService implements IBaseDeleteService {
  constructor(protected readonly repository: IBaseDeleteRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.repository.execute(id);

    if (!deleted) {
      throw AppException.notFound("general.errors.recordNotFound");
    }

    return deleted;
  }
}
