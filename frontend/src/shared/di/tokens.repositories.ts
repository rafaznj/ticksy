export const REPOSITORY_TOKENS = {
  // Auth
  LoginRepository: Symbol.for("LoginRepository"),
  RegisterRepository: Symbol.for("RegisterRepository"),
  LogoutRepository: Symbol.for("LogoutRepository"),
  RefreshRepository: Symbol.for("RefreshRepository"),

  // User
  CreateUserRepository: Symbol.for("CreateUserRepository"),
  InviteUserRepository: Symbol.for("InviteUserRepository"),
  ConfirmPasswordRepository: Symbol.for("ConfirmPasswordRepository"),
  UpdateUserRepository: Symbol.for("UpdateUserRepository"),
  ActivateUserRepository: Symbol.for("ActivateUserRepository"),
  DeactivateUserRepository: Symbol.for("DeactivateUserRepository"),
  GetUserByIdRepository: Symbol.for("GetUserByIdRepository"),
  GetUserByEmailRepository: Symbol.for("GetUserByEmailRepository"),
  GetUserPagedRepository: Symbol.for("GetUserPagedRepository"),
  GetAssignableUsersPagedRepository: Symbol.for("GetAssignableUsersPagedRepository"),

  // Ticket
  CreateTicketRepository: Symbol.for("CreateTicketRepository"),
  GetTicketPagedWithScopeRepository: Symbol.for("GetTicketPagedWithScopeRepository"),
  GetTicketPagedLastSevenDaysRepository: Symbol.for("GetTicketPagedLastSevenDaysRepository"),
  GetTicketByIdRepository: Symbol.for("GetTicketByIdRepository"),
  UpdateTicketRepository: Symbol.for("UpdateTicketRepository"),
  DeleteTicketRepository: Symbol.for("DeleteTicketRepository"),
  AssignTicketRepository: Symbol.for("AssignTicketRepository"),
  UnassignTicketRepository: Symbol.for("UnassignTicketRepository"),
  ResolvedTicketRepository: Symbol.for("ResolvedTicketRepository"),
  GetTicketStatusCountRepository: Symbol.for("GetTicketStatusCountRepository"),

  // Notification
  GetNotificationPagedRepository: Symbol.for("GetNotificationPagedRepository"),
  GetUnreadNotificationCountRepository: Symbol.for("GetUnreadNotificationCountRepository"),
  MarkNotificationAsReadRepository: Symbol.for("MarkNotificationAsReadRepository"),
  MarkAllNotificationsAsReadRepository: Symbol.for("MarkAllNotificationsAsReadRepository"),
} as const;
