import type { AppError } from "@/shared/errors/app-error";
import type { InviteUserData } from "@/modules/user/data/invite.data";

export interface IInviteUserService {
  execute(data: InviteUserData): Promise<void | AppError>;
}
