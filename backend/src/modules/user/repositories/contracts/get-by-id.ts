import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { CreateUserDto } from "../../dto/create-user.dto";

export type IGetUserByIdRepository = IBaseGetByIdRepository<CreateUserDto>;
