import { Inject } from "@nestjs/common";
import type { IGetTicketPagedLastSevenDaysRepository } from "../repositories/contracts/get-paged-last-seven-days";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { IQueryOptions } from "../../../shared/interfaces/query-options";
import { TicketPagedLastSevenDaysViewModel } from "../view-models/paged-last-seven-day.vm";
import { UserRoleEnum } from "../../user/enums/role.enum";
import { TicketScopeViewModel } from "../view-models/scope.vm";
import { UserViewModel } from "../../user/view-models/user.vm";
import { IGetTicketPagedLastSevenDaysService } from "./contracts/get-paged-last-seven-days";
import { IPagedResult } from "../../../shared/interfaces/paged-result";

export class GetTicketPagedLastSevenDaysService implements IGetTicketPagedLastSevenDaysService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketPagedLastSevenDaysRepository)
    private readonly getTicketPagedLastSevenDaysRepository: IGetTicketPagedLastSevenDaysRepository,
  ) {}

  async execute(
    options: IQueryOptions,
    currentUser: Omit<UserViewModel, "password">,
  ): Promise<IPagedResult<TicketPagedLastSevenDaysViewModel>> {
    const scope = this.buildScope(currentUser);

    return this.getTicketPagedLastSevenDaysRepository.execute(
      {
        ...options,
        columnsComparison: ["createdByName", "title"],
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
