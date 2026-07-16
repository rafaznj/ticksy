import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { UserEntity } from "../../entity/user.entity";

export type IGetUserByIdRepository = IBaseGetByIdRepository<UserEntity>;
