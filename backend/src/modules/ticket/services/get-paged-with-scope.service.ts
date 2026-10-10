import { Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { IQueryOptions } from "../../../shared/interfaces/query-options";
import { IGetTicketPagedWithScopeService } from "./contracts/get-paged-with-scope";
import type { IGetTicketPagedWithScopeRepository } from "../repositories/contracts/get-paged-with-scope";
import { UserViewModel } from "../../user/view-models/user.vm";
import { UserRoleEnum } from "../../user/enums/role.enum";
import { TicketScopeViewModel } from "../view-models/scope.vm";
import { IPagedResult } from "../../../shared/interfaces/paged-result";
import { TicketViewModel } from "../view-models/ticket.vm";

export class GetTicketPagedWithScopeService implements IGetTicketPagedWithScopeService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketPagedWithScopeRepository)
    private getTicketPagedRepository: IGetTicketPagedWithScopeRepository,
  ) {}

  async execute(
    options: IQueryOptions,
    currentUser: UserViewModel,
  ): Promise<IPagedResult<TicketViewModel>> {
    const scope = this.buildScope(currentUser);

    return this.getTicketPagedRepository.execute(
      {
        ...options,
        columnsComparison: ["code", "title"],
        softDeleteFilter: true,
      },
      scope,
    );
  }

  private buildScope(
    currentUser: Omit<UserViewModel, "password">,
  ): TicketScopeViewModel | undefined {
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
