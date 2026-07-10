import type { IBaseGetByIdService } from "@/shared/base/services/contracts/get-by-id";
import type { User } from "../../entity/user.entity";

export type IGetUserByIdService = IBaseGetByIdService<User>;
