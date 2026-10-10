import type { UserPagedDto } from "@/modules/user/dto/user-paged.dto";
import type { IBaseGetByIdRepository } from "@/shared/base/repositories/contracts/get-by-id";

export interface IGetUserByIdRepository extends IBaseGetByIdRepository<UserPagedDto> {}
