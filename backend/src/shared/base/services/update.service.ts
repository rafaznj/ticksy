import { NotFoundException } from "@nestjs/common";
import type { IBaseUpdateRepository } from "../repositories/contracts/update";
import type { IBaseUpdateService } from "./contracts/update";

export class BaseUpdateService<T> implements IBaseUpdateService<T> {
  constructor(protected readonly repository: IBaseUpdateRepository<T>) {}

  async execute(id: string, data: Partial<T>): Promise<boolean> {
    const updated = await this.repository.execute(id, data);
    if (!updated) {
      throw new NotFoundException("Registro não encontrado");
    }
    return updated;
  }
}
