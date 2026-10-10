import type { UserPagedDto } from "@/modules/user/dto/user-paged.dto";
import type { IBaseGetByIdService } from "@/shared/base/services/contracts/get-by-id";

export interface IGetUserByIdService extends IBaseGetByIdService<UserPagedDto> {}
