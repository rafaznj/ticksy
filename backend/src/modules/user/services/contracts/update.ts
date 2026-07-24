import { IBaseUpdateService } from "../../../../shared/base/services/contracts/update";
import { UpdateUserDto } from "../../dtos/update.dto";

export type IUpdateUserService = IBaseUpdateService<UpdateUserDto>;
