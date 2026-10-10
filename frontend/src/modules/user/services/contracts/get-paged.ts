import type { UserPagedDto } from "@/modules/user/dto/user-paged.dto";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";

export interface IGetUserPagedService extends IBaseGetPagedService<UserPagedDto> {}
