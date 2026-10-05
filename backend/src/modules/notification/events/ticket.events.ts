import { TicketStatusEnum } from "../../ticket/enums/ticket-status.enum";

export const TICKET_EVENTS = {
  created: "ticket.created",
  assigned: "ticket.assigned",
  unassigned: "ticket.unassigned",
  statusChanged: "ticket.status-changed",
} as const;

interface TicketEventBase {
  ticketId: string;
  title: string;
  actorId: string;
}

export type TicketCreatedEvent = TicketEventBase;

export interface TicketAssignedEvent extends TicketEventBase {
  assignedToId: string;
}

export interface TicketUnassignedEvent extends TicketEventBase {
  unassignedUserId: string;
}

export interface TicketStatusChangedEvent extends TicketEventBase {
  status: TicketStatusEnum;
  createdById: string;
}
