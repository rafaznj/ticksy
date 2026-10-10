import type { UserPagedDto } from "@/modules/user/dto/user-paged.dto";
import type { IBaseGetPagedRepository } from "@/shared/base/repositories/contracts/get-paged";

export interface IGetUserPagedRepository extends IBaseGetPagedRepository<UserPagedDto> {}
