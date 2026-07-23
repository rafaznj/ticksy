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
  CloseUserService: Symbol.for("CloseUserService"),
  AssignUserToAgentService: Symbol.for("AssignUserToAgentService"),
  GetUserByIdService: Symbol.for("GetUserByIdService"),
  GetUserByEmailService: Symbol.for("GetUserByEmailService"),
  GetUserPagedService: Symbol.for("GetUserPagedService"),

  // Ticket
  CreateTicketService: Symbol.for("CreateTicketService"),
  GetTicketPagedService: Symbol.for("GetTicketPagedService"),
  GetTicketByIdService: Symbol.for("GetTicketByIdService"),
  UpdateTicketService: Symbol.for("UpdateTicketService"),
  DeleteTicketService: Symbol.for("DeleteTicketService"),
  AssignTicketService: Symbol.for("AssignTicketService"),
  UnassignTicketService: Symbol.for("UnassignTicketService"),
  ChangeTicketStatusService: Symbol.for("ChangeTicketStatusService"),
} as const;
