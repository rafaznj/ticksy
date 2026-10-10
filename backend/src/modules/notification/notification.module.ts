import { Module } from "@nestjs/common";
import { DrizzleModule } from "../../database/drizzle/drizzle.module";
import { NotificationController } from "./controllers/notification.controller";
import { CreateNotificationService } from "./services/create.service";
import { SERVICE_TOKENS } from "../../shared/di/tokens.services";
import { CreateNotificationRepository } from "./repositories/create.repository";
import { REPOSITORY_TOKENS } from "../../shared/di/tokens.repositories";
import { GetNotificationPagedService } from "./services/get-paged.service";
import { GetNotificationPagedRepository } from "./repositories/get-paged.repository";
import { GetUnreadNotificationCountService } from "./services/get-unread-count.service";
import { MarkNotificationAsReadRepository } from "./repositories/mark-as-read.repository";
import { MarkNotificationAsReadService } from "./services/mark-as-read.service";
import { GetUnreadNotificationCountRepository } from "./repositories/get-unread-count.repository";
import { NotificationHub } from "./services/notification-hub";
import { MarkAllNotificationsAsReadRepository } from "./repositories/mark-all-as-read.repository";
import { MarkAllNotificationsAsReadService } from "./services/mark-all-as-read.service";

@Module({
  imports: [DrizzleModule],
  controllers: [NotificationController],
  providers: [
    {
      provide: SERVICE_TOKENS.NotificationHub,
      useClass: NotificationHub,
    },
    {
      provide: SERVICE_TOKENS.CreateNotificationService,
      useClass: CreateNotificationService,
    },
    {
      provide: REPOSITORY_TOKENS.CreateNotificationRepository,
      useClass: CreateNotificationRepository,
    },
    {
      provide: SERVICE_TOKENS.GetNotificationPagedService,
      useClass: GetNotificationPagedService,
    },
    {
      provide: REPOSITORY_TOKENS.GetNotificationPagedRepository,
      useClass: GetNotificationPagedRepository,
    },
    {
      provide: SERVICE_TOKENS.GetUnreadNotificationCountService,
      useClass: GetUnreadNotificationCountService,
    },
    {
      provide: REPOSITORY_TOKENS.GetUnreadNotificationCountRepository,
      useClass: GetUnreadNotificationCountRepository,
    },
    {
      provide: SERVICE_TOKENS.MarkNotificationAsReadService,
      useClass: MarkNotificationAsReadService,
    },
    {
      provide: REPOSITORY_TOKENS.MarkNotificationAsReadRepository,
      useClass: MarkNotificationAsReadRepository,
    },
    {
      provide: SERVICE_TOKENS.MarkAllNotificationsAsReadService,
      useClass: MarkAllNotificationsAsReadService,
    },
    {
      provide: REPOSITORY_TOKENS.MarkAllNotificationsAsReadRepository,
      useClass: MarkAllNotificationsAsReadRepository,
    },
  ],
  exports: [SERVICE_TOKENS.CreateNotificationService],
})
export class NotificationModule {}
