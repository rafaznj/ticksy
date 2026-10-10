import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BrevoClient } from "@getbrevo/brevo";
import { AppException } from "../../../shared/exceptions/app-exception";

import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { ICreateUserService } from "../../user/services/contracts/create";
import type { IInviteUserService } from "./contracts/invite";
import type { CreateUserData } from "../data/create.data";

@Injectable()
export class InviteUserService implements IInviteUserService {
  private readonly brevo: BrevoClient;

  constructor(
    private readonly config: ConfigService,
    @Inject(SERVICE_TOKENS.CreateUserService)
    private readonly createUserService: ICreateUserService,
  ) {
    this.brevo = new BrevoClient({
      apiKey: this.config.getOrThrow<string>("BREVO_API_KEY"),
    });
  }

  async execute(data: CreateUserData): Promise<void> {
    const response = await this.brevo.transactionalEmails.sendTransacEmail({
      to: [{ email: data.email }],
      templateId: 3,
      params: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    if (!response.messageId) {
      throw AppException.internalServerError("general.messages.errors.mailSendFailed");
    }

    const user = await this.createUserService.execute({
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
      mustChangePassword: true,
    });

    if (!user) {
      throw AppException.internalServerError("user.messages.errors.creationFailed");
    }
  }
}
