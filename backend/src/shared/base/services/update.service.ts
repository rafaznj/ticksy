import { InternalServerErrorException } from "@nestjs/common";
import { IBaseUpdateRepository } from "../repositories/contracts/update";
import { IBaseUpdateService } from "./contracts/update";

export class BaseUpdateService<T> implements IBaseUpdateService<T> {
  constructor(protected readonly repository: IBaseUpdateRepository<T>) {}

  async execute(id: string, data: Partial<T>): Promise<boolean> {
    const updated = await this.repository.execute(id, data);
    if (!updated) {
      throw new InternalServerErrorException("Falha ao atualizar o registro");
    }
    return updated;
  }
}
