import { InternalServerErrorException } from "@nestjs/common";
import type { IBaseCreateRepository } from "../repositories/contracts/create";
import type { IBaseCreateService } from "./contracts/create";

export class BaseCreateService<T> implements IBaseCreateService<T> {
  constructor(protected readonly repository: IBaseCreateRepository<T>) {}

  async execute(data: T): Promise<T> {
    const created = await this.repository.execute(data);
    if (!created) {
      throw new InternalServerErrorException("Falha ao criar o registro");
    }
    return created;
  }
}
