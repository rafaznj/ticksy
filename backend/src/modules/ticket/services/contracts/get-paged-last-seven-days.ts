import { IPagedResult } from "../../../../shared/interfaces/paged-result";
import { IQueryOptions } from "../../../../shared/interfaces/query-options";
import { UserData } from "../../../user/data/user.data";
import { TicketPagedLastSevenDaysViewModel } from "../../view-models/paged-last-seven-day.vm";

export interface IGetTicketPagedLastSevenDaysService {
  execute(
    options: IQueryOptions,
    currentUser: UserData,
  ): Promise<IPagedResult<TicketPagedLastSevenDaysViewModel>>;
}
