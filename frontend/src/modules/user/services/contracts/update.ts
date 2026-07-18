import type { IBaseUpdateService } from "@/shared/base/services/contracts/update";
import type { UpdateUserDto } from "../../dto/update-user.dto";

export type IUpdateUserService = IBaseUpdateService<UpdateUserDto>;
