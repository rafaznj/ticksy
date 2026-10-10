import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { UserViewModel } from "../../view-models/user.vm";

export type IGetUserByIdRepository = IBaseGetByIdRepository<UserViewModel>;
