import { injectable } from "inversify";
import type { IBaseGetByIdRepository } from "../repositories/contracts/get-by-id";
import type { IBaseGetByIdService } from "./contracts/get-by-id";

@injectable()
export class BaseGetByIdService<TOutput> implements IBaseGetByIdService<TOutput> {
  constructor(protected readonly repository: IBaseGetByIdRepository<TOutput>) {}

  async execute(id: string): Promise<TOutput> {
    const item = await this.repository.execute(id);
    if (!item) {
      throw new Error("Registro não encontrado");
    }
    return item;
  }
}
