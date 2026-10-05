import type { IGetNotificationPagedRepository } from "@/modules/notifications/repositories/contracts/get-paged";
import type { IGetUnreadNotificationCountRepository } from "@/modules/notifications/repositories/contracts/get-unread-count";
import type { IMarkNotificationAsReadRepository } from "@/modules/notifications/repositories/contracts/mark-as-read";
import { GetNotificationPagedRepository } from "@/modules/notifications/repositories/get-paged.repository";
import { GetUnreadNotificationCountRepository } from "@/modules/notifications/repositories/get-unread-count.repository";
import { MarkNotificationAsReadRepository } from "@/modules/notifications/repositories/mark-as-read.repository";
import type { IGetNotificationPagedService } from "@/modules/notifications/services/contracts/get-paged";
import type { IGetUnreadNotificationCountService } from "@/modules/notifications/services/contracts/get-unread-count";
import type { IMarkNotificationAsReadService } from "@/modules/notifications/services/contracts/mark-as-read";
import { GetNotificationPagedService } from "@/modules/notifications/services/get-paged.service";
import { GetUnreadNotificationCountService } from "@/modules/notifications/services/get-unread-count.service";
import { MarkNotificationAsReadService } from "@/modules/notifications/services/mark-as-read.service";
import type { IMarkAllNotificationsAsReadService } from "@/modules/notifications/services/contracts/mark-all-as-read";
import type { IMarkAllNotificationsAsReadRepository } from "@/modules/notifications/repositories/contracts/mark-all-as-read";
import { MarkAllNotificationsAsReadService } from "@/modules/notifications/services/mark-all-as-read.service";
import { MarkAllNotificationsAsReadRepository } from "@/modules/notifications/repositories/mark-all-as-read.repository";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

export const notificationContainerModule = new ContainerModule(
  ({ bind }: ContainerModuleLoadOptions) => {
    bind<IGetNotificationPagedService>(SERVICE_TOKENS.GetNotificationPagedService).to(
      GetNotificationPagedService,
    );
    bind<IGetNotificationPagedRepository>(REPOSITORY_TOKENS.GetNotificationPagedRepository).to(
      GetNotificationPagedRepository,
    );

    bind<IGetUnreadNotificationCountService>(SERVICE_TOKENS.GetUnreadNotificationCountService).to(
      GetUnreadNotificationCountService,
    );
    bind<IGetUnreadNotificationCountRepository>(
      REPOSITORY_TOKENS.GetUnreadNotificationCountRepository,
    ).to(GetUnreadNotificationCountRepository);

    bind<IMarkNotificationAsReadService>(SERVICE_TOKENS.MarkNotificationAsReadService).to(
      MarkNotificationAsReadService,
    );
    bind<IMarkNotificationAsReadRepository>(REPOSITORY_TOKENS.MarkNotificationAsReadRepository).to(
      MarkNotificationAsReadRepository,
    );
    bind<IMarkAllNotificationsAsReadService>(SERVICE_TOKENS.MarkAllNotificationsAsReadService).to(
      MarkAllNotificationsAsReadService,
    );
    bind<IMarkAllNotificationsAsReadRepository>(
      REPOSITORY_TOKENS.MarkAllNotificationsAsReadRepository,
    ).to(MarkAllNotificationsAsReadRepository);
  },
);
