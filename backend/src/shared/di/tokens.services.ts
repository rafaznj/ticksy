export const SERVICE_TOKENS = {
  // Auth
  JwtTokenService: Symbol("JwtTokenService"),
  LoginService: Symbol("LoginService"),
  RegisterService: Symbol("RegisterService"),
  LogoutService: Symbol("LogoutService"),
  RefreshService: Symbol("RefreshService"),

  // User
  CreateDefaultUsersService: Symbol.for("CreateDefaultUsersService"),
  CreateUserService: Symbol.for("CreateUserService"),
  UpdateUserService: Symbol.for("UpdateUserService"),
  DeactivateUserService: Symbol.for("DeactivateUserService"),
  ActivateUserService: Symbol.for("ActivateUserService"),
  CloseUserService: Symbol.for("CloseUserService"),
  AssignUserToAgentService: Symbol.for("AssignUserToAgentService"),
  GetUserByIdService: Symbol.for("GetUserByIdService"),
  GetUserByEmailService: Symbol.for("GetUserByEmailService"),
  GetUserPagedService: Symbol.for("GetUserPagedService"),
  GetAssignableUsersPagedService: Symbol.for("GetAssignableUsersPagedService"),
  GetUserIdsByRoleService: Symbol.for("GetUserIdsByRoleService"),
  InviteUserService: Symbol.for("InviteUserService"),
  ConfirmPasswordService: Symbol.for("ConfirmPasswordService"),

  // Ticket
  CreateTicketService: Symbol.for("CreateTicketService"),
  GetTicketByIdService: Symbol.for("GetTicketByIdService"),
  GetTicketPagedWithScopeService: Symbol.for("GetTicketPagedWithScopeService"),
  GetTicketPagedLastSevenDaysService: Symbol.for("GetTicketPagedLastSevenDaysService"),
  UpdateTicketService: Symbol.for("UpdateTicketService"),
  DeleteTicketService: Symbol.for("DeleteTicketService"),
  AssignTicketService: Symbol.for("AssignTicketService"),
  UnassignTicketService: Symbol.for("UnassignTicketService"),
  ResolvedTicketService: Symbol.for("ResolvedTicketService"),
  GetTicketStatusCountService: Symbol.for("GetTicketStatusCountService"),

  // Notification
  NotificationHub: Symbol.for("NotificationHub"),

  CreateNotificationService: Symbol.for("CreateNotificationService"),
  GetNotificationPagedService: Symbol.for("GetNotificationPagedService"),
  GetUnreadNotificationCountService: Symbol.for("GetUnreadNotificationCountService"),
  MarkNotificationAsReadService: Symbol.for("MarkNotificationAsReadService"),
  MarkAllNotificationsAsReadService: Symbol.for("MarkAllNotificationsAsReadService"),
} as const;
