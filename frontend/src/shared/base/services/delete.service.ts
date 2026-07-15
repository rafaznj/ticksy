import { injectable } from "inversify";
import type { IBaseDeleteRepository } from "../repositories/contracts/delete";
import type { IBaseDeleteService } from "./contracts/delete";
import { AppError } from "@/shared/errors/app-error";

@injectable()
export class BaseDeleteService implements IBaseDeleteService {
  constructor(protected readonly repository: IBaseDeleteRepository) {}

  async execute(id: string): Promise<boolean | AppError> {
    const response = await this.repository.execute(id);

    if (response instanceof AppError) {
      throw response;
    }

    return response;
  }
}
