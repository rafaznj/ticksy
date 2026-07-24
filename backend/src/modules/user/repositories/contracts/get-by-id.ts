import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { UserModel } from "../../models/user-model";

export type IGetUserByIdRepository = IBaseGetByIdRepository<UserModel>;
