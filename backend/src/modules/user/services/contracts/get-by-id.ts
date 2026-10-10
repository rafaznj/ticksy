import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { UserViewModel } from "../../view-models/user.vm";

export type IGetUserByIdService = IBaseGetByIdService<UserViewModel>;
