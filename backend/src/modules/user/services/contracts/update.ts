import { IBaseUpdateService } from "../../../../shared/base/services/contracts/update";
import { UpdateUserDto } from "../../dto/update-user.dto";

export type IUpdateUserService = IBaseUpdateService<UpdateUserDto>;
