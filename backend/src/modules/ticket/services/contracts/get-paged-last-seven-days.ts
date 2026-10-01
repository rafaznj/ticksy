import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { UserModel } from "../../../user/models/user-model";
import { TicketPagedLastSevenDaysModel } from "../../models/ticket-paged-last-seven-day";

export interface IGetTicketPagedLastSevenDaysService {
  execute(
    options: IQueryOptions,
    currentUser: Omit<UserModel, "password">,
  ): Promise<IPagedResult<TicketPagedLastSevenDaysModel>>;
}
