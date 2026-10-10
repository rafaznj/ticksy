import { Inject, Injectable } from "@nestjs/common";
import type { NotificationViewModel } from "../view-models/notification.vm";
import type { ICreateNotificationService } from "./contracts/create";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { CreateNotificationData } from "../data/create-notification.data";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { ICreateNotificationRepository } from "../repositories/contracts/create";
import { NotificationHub } from "./notification-hub";

@Injectable()
export class CreateNotificationService implements ICreateNotificationService {
  constructor(
    @Inject(SERVICE_TOKENS.NotificationHub)
    private readonly hub: NotificationHub,
    @Inject(REPOSITORY_TOKENS.CreateNotificationRepository)
    private readonly createNotificationRepository: ICreateNotificationRepository,
  ) {}

  async execute(data: CreateNotificationData): Promise<NotificationViewModel | null> {
    const userIds = [...new Set(data.userIds)];

    if (userIds.length === 0) return null;

    const notification = await this.createNotificationRepository.execute({ ...data, userIds });

    for (const userId of userIds) {
      this.hub.publish(userId, { ...notification, read: false });
    }

    return notification;
  }
}
