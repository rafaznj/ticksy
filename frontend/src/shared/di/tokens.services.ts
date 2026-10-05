export const SERVICE_TOKENS = {
  // Auth
  LoginService: Symbol.for("LoginService"),
  RegisterService: Symbol.for("RegisterService"),
  LogoutService: Symbol.for("LogoutService"),
  RefreshService: Symbol.for("RefreshService"),

  // User
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

  // Ticket
  CreateTicketService: Symbol.for("CreateTicketService"),
  GetTicketPagedWithScopeService: Symbol.for("GetTicketPagedWithScopeService"),
  GetTicketPagedLastSevenDaysService: Symbol.for("GetTicketPagedLastSevenDaysService"),
  GetTicketByIdService: Symbol.for("GetTicketByIdService"),
  UpdateTicketService: Symbol.for("UpdateTicketService"),
  DeleteTicketService: Symbol.for("DeleteTicketService"),
  AssignTicketService: Symbol.for("AssignTicketService"),
  UnassignTicketService: Symbol.for("UnassignTicketService"),
  ResolvedTicketService: Symbol.for("ResolvedTicketService"),
  GetTicketStatusCountService: Symbol.for("GetTicketStatusCountService"),

  // Notification
  GetNotificationPagedService: Symbol.for("GetNotificationPagedService"),
  GetUnreadNotificationCountService: Symbol.for("GetUnreadNotificationCountService"),
  MarkNotificationAsReadService: Symbol.for("MarkNotificationAsReadService"),
  MarkAllNotificationsAsReadService: Symbol.for("MarkAllNotificationsAsReadService"),
} as const;
