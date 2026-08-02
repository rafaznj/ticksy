import { injectable } from "inversify";
import type { IBaseGetByIdRepository } from "../repositories/contracts/get-by-id";
import type { IBaseGetByIdService } from "./contracts/get-by-id";
import { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/response/handle-service-response";

@injectable()
export class BaseGetByIdService<TOutput> implements IBaseGetByIdService<TOutput> {
  constructor(protected readonly repository: IBaseGetByIdRepository<TOutput>) {}

  async execute(id: string): Promise<TOutput | AppError> {
    const response = await this.repository.execute(id);

    return handleServiceResponse(response);
  }
}
