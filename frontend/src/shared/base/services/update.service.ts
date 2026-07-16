import { injectable } from "inversify";
import type { IBaseUpdateRepository } from "../repositories/contracts/update";
import type { IBaseUpdateService } from "./contracts/update";
import { AppError } from "@/shared/errors/app-error";

@injectable()
export class BaseUpdateService<TInput, TOutput> implements IBaseUpdateService<TInput, TOutput> {
  constructor(protected readonly repository: IBaseUpdateRepository<TInput, TOutput>) {}

  async execute(id: string, data: TInput): Promise<TOutput | AppError> {
    const response = await this.repository.execute(id, data);

    if (response instanceof AppError) {
      throw response;
    }

    return response;
  }
}
