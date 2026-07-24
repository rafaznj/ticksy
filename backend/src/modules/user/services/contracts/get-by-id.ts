import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { UserModel } from "../../models/user-model";

export type IGetUserByIdService = IBaseGetByIdService<UserModel>;
