import type { IBaseUpdateService } from "@/shared/base/services/contracts/update";
import type { UpdateUserDto } from "../../dto/update.dto";

export type IUpdateUserService = IBaseUpdateService<UpdateUserDto>;
