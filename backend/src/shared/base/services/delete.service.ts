import { InternalServerErrorException } from "@nestjs/common";
import type { IBaseDeleteRepository } from "../repositories/contracts/delete";
import type { IBaseDeleteService } from "./contracts/delete";

export class BaseDeleteService implements IBaseDeleteService {
  constructor(protected readonly repository: IBaseDeleteRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.repository.execute(id);
    if (!deleted) {
      throw new InternalServerErrorException("Falha ao excluir o registro");
    }
    return deleted;
  }
}
