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
import type { IQueryOptions } from "../../../shared/interfaces/query-options";
import { UserViewModel } from "../../user/view-models/user.vm";
import { NotificationHub } from "../services/notification-hub";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IGetNotificationPagedService } from "../services/contracts/get-paged";
import type { IMarkNotificationAsReadService } from "../services/contracts/mark-as-read";
import type { IMarkAllNotificationsAsReadService } from "../services/contracts/mark-all-as-read";
import type { IGetUnreadNotificationCountService } from "../services/contracts/get-unread-count";
import { customResponse } from "../../../shared/utils/custom-response";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

type AuthenticatedRequest = Request & { user: Omit<UserViewModel, "password"> };

@ApiTags("Notifications")
@ApiBearerAuth()
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

  @Sse("/stream")
  @ApiOperation({
    summary: "Subscribe to real-time notifications",
  })
  async stream(@Req() req: AuthenticatedRequest): Promise<Observable<MessageEvent>> {
    const response = await this.hub.subscribe(req.user.id);
    return response;
  }

  @Get("/get-paged")
  @ApiOperation({ summary: "List paged notifications" })
  async paged(@Req() req: AuthenticatedRequest, @Query() query: IQueryOptions) {
    const response = await this.getNotificationPagedService.execute(req.user.id, query);
    return customResponse(response);
  }

  @Get("/unread-count")
  @ApiOperation({ summary: "Count unread notifications" })
  async unreadCount(@Req() req: AuthenticatedRequest) {
    const response = await this.getUnreadNotificationCountService.execute(req.user.id);
    return customResponse(response);
  }

  @Patch(":id/read")
  @ApiOperation({ summary: "Mark a notification as read" })
  async read(@Req() req: AuthenticatedRequest, @Param("id") id: string) {
    const response = await this.markNotificationAsReadService.execute(id, req.user.id);
    return customResponse(response);
  }

  @Patch("/read-all")
  @ApiOperation({ summary: "Mark all notifications as read" })
  async readAll(@Req() req: AuthenticatedRequest) {
    const response = await this.markAllNotificationsAsReadService.execute(req.user.id);
    return customResponse(response);
  }
}
