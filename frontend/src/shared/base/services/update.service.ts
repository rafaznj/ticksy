import { injectable } from "inversify";
import type { IBaseUpdateRepository } from "../repositories/contracts/update";
import type { IBaseUpdateService } from "./contracts/update";
import { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/response/handle-service-response";

@injectable()
export class BaseUpdateService<T> implements IBaseUpdateService<T> {
  constructor(protected readonly repository: IBaseUpdateRepository<T>) {}

  async execute(id: string, data: T): Promise<T | AppError> {
    const response = await this.repository.execute(id, data);

    return handleServiceResponse(response);
  }
}
