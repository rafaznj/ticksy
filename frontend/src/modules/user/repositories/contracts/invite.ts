import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import type { InviteUserData } from "@/modules/user/data/invite.data";

export interface IInviteUserRepository {
  execute(data: InviteUserData): Promise<APIResponse<void> | AppError>;
}
