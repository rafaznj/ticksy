import { Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { IQueryOptions } from "../../../shared/types/query-options";
import { IPagedResult } from "../../../shared/types/paged-result";
import { IGetTicketPagedWithScopeService } from "./contracts/get-paged-with-scope";
import type {
  IGetTicketPagedWithScopeRepository,
  TicketScope,
} from "../repositories/contracts/get-paged-with-scope";
import { TicketPagedModel } from "../models/ticket-paged";
import { UserModel } from "../../user/models/user-model";
import { UserRoleEnum } from "../../user/enums/roles.enum";

export class GetTicketPagedWithScopeService implements IGetTicketPagedWithScopeService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketPagedWithScopeRepository)
    private getTicketPagedRepository: IGetTicketPagedWithScopeRepository,
  ) {}

  async execute(
    options: IQueryOptions,
    currentUser: Omit<UserModel, "password">,
  ): Promise<IPagedResult<TicketPagedModel>> {
    const scope = this.buildScope(currentUser);

    return this.getTicketPagedRepository.execute(
      {
        ...options,
        columnsComparison: ["title", "description"],
        softDeleteFilter: true,
      },
      scope,
    );
  }

  private buildScope(currentUser: Omit<UserModel, "password">): TicketScope | undefined {
    switch (currentUser.role) {
      case UserRoleEnum.ADMIN:
        return undefined;
      case UserRoleEnum.TECHNICAL_ASSISTANCE:
        return { assignedToId: currentUser.id };
      case UserRoleEnum.EMPLOYEE:
        return { createdById: currentUser.id };
      default:
        return { createdById: currentUser.id };
    }
  }
}
