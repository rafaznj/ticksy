import { Inject, Injectable } from "@nestjs/common";
import { ForgotPasswordData } from "../data/forgot-password.data";
import { IForgotPasswordUserService } from "./contracts/forgot-password";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IUpdateUserService } from "./contracts/update";
import { ConfigService } from "@nestjs/config";
import { BrevoClient } from "@getbrevo/brevo";
import { AppException } from "../../../shared/exceptions/app-exception";
import type { IGetUserByEmailService } from "./contracts/get-by-email";
import * as argon2 from "argon2";

@Injectable()
export class ForgotPasswordUserService implements IForgotPasswordUserService {
  private readonly brevo: BrevoClient;

  constructor(
    private readonly config: ConfigService,
    @Inject(SERVICE_TOKENS.GetUserByEmailService)
    private readonly getUserByEmailService: IGetUserByEmailService,
    @Inject(SERVICE_TOKENS.UpdateUserService)
    private readonly updateUserService: IUpdateUserService,
  ) {
    this.brevo = new BrevoClient({
      apiKey: this.config.getOrThrow<string>("BREVO_API_KEY"),
    });
  }

  async execute(data: ForgotPasswordData): Promise<void> {
    const user = await this.getUserByEmailService.execute(data.email);

    if (!user) {
      throw AppException.notFound("general.messages.errors.recordNotFound");
    }

    const response = await this.brevo.transactionalEmails.sendTransacEmail({
      to: [{ email: data.email }],
      templateId: 4,
      params: {
        name: user.name,
        password: data.password,
      },
    });

    if (!response.messageId) {
      throw AppException.internalServerError("general.messages.errors.mailSendFailed");
    }

    const hashedPassword = await argon2.hash(data.password);

    const updatedUser = await this.updateUserService.execute(user.id, {
      password: hashedPassword,
      mustChangePassword: true,
    });

    if (!updatedUser) {
      throw AppException.internalServerError("user.messages.errors.updateFailed");
    }
  }
}
