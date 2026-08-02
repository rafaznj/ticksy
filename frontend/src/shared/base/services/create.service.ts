import type { IBaseCreateRepository } from "@/shared/base/repositories/contracts/create";
import type { IBaseCreateService } from "@/shared/base/services/contracts/create";
import { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/response/handle-service-response";
import { injectable } from "inversify";

@injectable()
export class BaseCreateService<TInput, TOutput> implements IBaseCreateService<TInput, TOutput> {
  constructor(protected readonly repository: IBaseCreateRepository<TInput, TOutput>) {}

  async execute(data: TInput): Promise<TOutput | AppError> {
    const response = await this.repository.execute(data);

    return handleServiceResponse(response);
  }
}
