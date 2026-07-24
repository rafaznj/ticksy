import { IBaseUpdateRepository } from "../../../../shared/base/repositories/contracts/update";
import { UpdateUserDto } from "../../dtos/update.dto";

export type IUpdateUserRepository = IBaseUpdateRepository<UpdateUserDto>;
