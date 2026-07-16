import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { UserEntity } from "../../entity/user.entity";

export type IGetUserByIdService = IBaseGetByIdService<UserEntity>;
