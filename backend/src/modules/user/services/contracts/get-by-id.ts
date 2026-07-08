import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { CreateUserDto } from "../../dto/create-user.dto";

export type IGetUserByIdService = IBaseGetByIdService<CreateUserDto>;
