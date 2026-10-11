import type { IBaseUpdateService } from "@/shared/base/services/contracts/update";
import type { UpdateUserData } from "../../data/update.data";

export interface IUpdateUserService extends IBaseUpdateService<UpdateUserData> {}
