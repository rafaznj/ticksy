import type { IBaseGetByIdRepository } from "@/shared/base/repositories/contracts/get-by-id";
import type { User } from "../../entity/user.entity";

export type IGetUserByIdRepository = IBaseGetByIdRepository<User>;
