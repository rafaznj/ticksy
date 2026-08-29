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
  CloseUserService: Symbol.for("CloseUserService"),
  AssignUserToAgentService: Symbol.for("AssignUserToAgentService"),
  GetUserByIdService: Symbol.for("GetUserByIdService"),
  GetUserByEmailService: Symbol.for("GetUserByEmailService"),
  GetUserPagedService: Symbol.for("GetUserPagedService"),
  GetAssignableUsersPagedService: Symbol.for("GetAssignableUsersPagedService"),

  // Ticket
  CreateTicketService: Symbol.for("CreateTicketService"),
  GetTicketByIdService: Symbol.for("GetTicketByIdService"),
  GetTicketPagedService: Symbol.for("GetTicketPagedService"),
  UpdateTicketService: Symbol.for("UpdateTicketService"),
  DeleteTicketService: Symbol.for("DeleteTicketService"),
  AssignTicketService: Symbol.for("AssignTicketService"),
  UnassignTicketService: Symbol.for("UnassignTicketService"),
  ResolvedTicketService: Symbol.for("ResolvedTicketService"),
} as const;
