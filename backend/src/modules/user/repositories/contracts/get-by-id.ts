import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { UserViewModel } from "../../view-models/user.vm";

export interface IGetUserByIdRepository extends IBaseGetByIdRepository<UserViewModel> {}
