import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { IDeactivateUserRepository } from "../repositories/contracts/deactivate";
import type { IDeactivateUserService } from "./contracts/deactivate";

@injectable()
export class DeactivateUserService implements IDeactivateUserService {
  constructor(
    @inject(REPOSITORY_TOKENS.DeactivateUserRepository)
    private readonly repository: IDeactivateUserRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    return this.repository.execute(id);
  }
}
