import { IBaseUpdateService } from "../../../../shared/base/services/contracts/update";
import { UpdateUserDto } from "../../dto/update.dto";

export type IUpdateUserService = IBaseUpdateService<UpdateUserDto>;
