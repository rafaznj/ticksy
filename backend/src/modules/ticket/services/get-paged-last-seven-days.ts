import { Inject } from "@nestjs/common";
import type { IGetTicketPagedLastSevenDaysRepository } from "../repositories/contracts/get-paged-last-seven-days";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { IQueryOptions } from "../../../shared/types/query-options";
import { IPagedResult } from "../../../shared/types/paged-result";
import { TicketPagedLastSevenDaysModel } from "../models/ticket-paged-last-seven-day";
import { UserRoleEnum } from "../../user/enums/roles.enum";
import { TicketScope } from "../models/ticket-scope";
import { UserModel } from "../../user/models/user-model";
import { IGetTicketPagedLastSevenDaysService } from "./contracts/get-paged-last-seven-days";

export class GetTicketPagedLastSevenDaysService implements IGetTicketPagedLastSevenDaysService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketPagedLastSevenDaysRepository)
    private readonly getTicketPagedLastSevenDaysRepository: IGetTicketPagedLastSevenDaysRepository,
  ) {}

  async execute(
    options: IQueryOptions,
    currentUser: Omit<UserModel, "password">,
  ): Promise<IPagedResult<TicketPagedLastSevenDaysModel>> {
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
