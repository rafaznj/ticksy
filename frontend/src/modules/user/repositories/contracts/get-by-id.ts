import type { IBaseGetByIdRepository } from "@/shared/base/repositories/contracts/get-by-id";
import type { UserEntity } from "../../entity/user.entity";

export type IGetUserByIdRepository = IBaseGetByIdRepository<UserEntity>;
