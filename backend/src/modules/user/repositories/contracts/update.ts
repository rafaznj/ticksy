import { IBaseUpdateRepository } from "../../../../shared/base/repositories/contracts/update";
import { UpdateUserDto } from "../../dto/update.dto";

export type IUpdateUserRepository = IBaseUpdateRepository<UpdateUserDto>;
