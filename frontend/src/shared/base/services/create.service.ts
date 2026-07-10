import type { IBaseCreateRepository } from "@/shared/base/repositories/contracts/create";
import type { IBaseCreateService } from "@/shared/base/services/contracts/create";
import { injectable } from "inversify";

@injectable()
export class BaseCreateService<TInput, TOutput> implements IBaseCreateService<TInput, TOutput> {
  constructor(protected readonly repository: IBaseCreateRepository<TInput, TOutput>) {}

  async execute(data: TInput): Promise<TOutput> {
    const created = await this.repository.execute(data);
    if (!created) {
      throw new Error("Falha ao criar o registro");
    }
    return created;
  }
}
