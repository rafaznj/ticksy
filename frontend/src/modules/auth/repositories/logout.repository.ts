import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { ILogoutRepository } from "@/modules/auth/repositories/contracts/logout";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";

@injectable()
export class LogoutRepository implements ILogoutRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(): Promise<void> {
    await this.axiosSingleton.client.post(`${this.basePath}/logout`);
  }
}
