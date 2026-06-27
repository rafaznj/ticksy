import { NotFoundException } from "@nestjs/common";
import type { IBaseGetByIdRepository } from "../repositories/contracts/get-by-id";
import type { IBaseGetByIdService } from "./contracts/get-by-id";

export class BaseGetByIdService<T> implements IBaseGetByIdService<T> {
  constructor(protected readonly repository: IBaseGetByIdRepository<T>) {}

  async execute(id: string): Promise<T> {
    const record = await this.repository.execute(id);
    if (!record) {
      throw new NotFoundException("Registro não encontrado");
    }
    return record;
  }
}
