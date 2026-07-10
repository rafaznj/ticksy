import { injectable } from "inversify";
import type { IBaseUpdateRepository } from "../repositories/contracts/update";
import type { IBaseUpdateService } from "./contracts/update";

@injectable()
export class BaseUpdateService<TInput, TOutput> implements IBaseUpdateService<TInput, TOutput> {
  constructor(protected readonly repository: IBaseUpdateRepository<TInput, TOutput>) {}

  async execute(id: string, data: TInput): Promise<TOutput> {
    const updated = await this.repository.execute(id, data);
    if (!updated) {
      throw new Error("Falha ao atualizar o registro");
    }
    return updated;
  }
}
