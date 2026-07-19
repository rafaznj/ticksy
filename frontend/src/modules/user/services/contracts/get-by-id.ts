import type { IBaseGetByIdService } from "@/shared/base/services/contracts/get-by-id";
import type { UserEntity } from "../../entity/user.entity";

export type IGetUserByIdService = IBaseGetByIdService<UserEntity>;
