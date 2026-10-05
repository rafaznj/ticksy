import {
  Controller,
  Get,
  Inject,
  MessageEvent,
  Param,
  Patch,
  Query,
  Req,
  Sse,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";
import { Observable } from "rxjs";
import type { IQueryOptions } from "../../../shared/types/query-options";
import { UserModel } from "../../user/models/user-model";
import { NotificationHub } from "../services/notification-hub";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IGetNotificationPagedService } from "../services/contracts/get-paged";
import type { IMarkNotificationAsReadService } from "../services/contracts/mark-as-read";
import type { IMarkAllNotificationsAsReadService } from "../services/contracts/mark-all-as-read";
import type { IGetUnreadNotificationCountService } from "../services/contracts/get-unread-count";

type AuthenticatedRequest = Request & { user: Omit<UserModel, "password"> };

@Controller("notifications")
@UseGuards(AuthGuard("jwt"))
export class NotificationController {
  constructor(
    @Inject(SERVICE_TOKENS.NotificationHub)
    private readonly hub: NotificationHub,
    @Inject(SERVICE_TOKENS.GetNotificationPagedService)
    private readonly getNotificationPagedService: IGetNotificationPagedService,
    @Inject(SERVICE_TOKENS.GetUnreadNotificationCountService)
    private readonly getUnreadNotificationCountService: IGetUnreadNotificationCountService,
    @Inject(SERVICE_TOKENS.MarkNotificationAsReadService)
    private readonly markNotificationAsReadService: IMarkNotificationAsReadService,
    @Inject(SERVICE_TOKENS.MarkAllNotificationsAsReadService)
    private readonly markAllNotificationsAsReadService: IMarkAllNotificationsAsReadService,
  ) {}

  @Sse("stream")
  stream(@Req() req: AuthenticatedRequest): Observable<MessageEvent> {
    return this.hub.subscribe(req.user.id);
  }

  @Get()
  paged(@Req() req: AuthenticatedRequest, @Query() query: IQueryOptions) {
    return this.getNotificationPagedService.execute(req.user.id, query);
  }

  @Get("unread-count")
  unreadCount(@Req() req: AuthenticatedRequest) {
    return this.getUnreadNotificationCountService.execute(req.user.id);
  }

  @Patch(":id/read")
  read(@Req() req: AuthenticatedRequest, @Param("id") id: string) {
    return this.markNotificationAsReadService.execute(id, req.user.id);
  }

  @Patch("read-all")
  readAll(@Req() req: AuthenticatedRequest) {
    return this.markAllNotificationsAsReadService.execute(req.user.id);
  }
}
