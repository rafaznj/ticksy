import { defineRelations } from "drizzle-orm";
import * as schema from "../schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    refreshTokens: r.many.refreshTokens(),

    createdTickets: r.many.tickets({
      alias: "ticket_created_by",
    }),

    assignedTickets: r.many.tickets({
      alias: "ticket_assigned_to",
    }),

    notificationRecipients: r.many.notificationRecipients(),

    notifications: r.many.notifications({
      from: r.users.id.through(r.notificationRecipients.userId),
      to: r.notifications.id.through(r.notificationRecipients.notificationId),
    }),
  },

  refreshTokens: {
    user: r.one.users({
      from: r.refreshTokens.userId,
      to: r.users.id,
      optional: false,
    }),
  },

  tickets: {
    createdBy: r.one.users({
      from: r.tickets.createdById,
      to: r.users.id,
      alias: "ticket_created_by",
      optional: false,
    }),

    assignedTo: r.one.users({
      from: r.tickets.assignedToId,
      to: r.users.id,
      alias: "ticket_assigned_to",
    }),

    notifications: r.many.notifications(),
  },

  notifications: {
    ticket: r.one.tickets({
      from: r.notifications.ticketId,
      to: r.tickets.id,
    }),

    recipients: r.many.notificationRecipients(),

    users: r.many.users(),
  },

  notificationRecipients: {
    notification: r.one.notifications({
      from: r.notificationRecipients.notificationId,
      to: r.notifications.id,
      optional: false,
    }),

    user: r.one.users({
      from: r.notificationRecipients.userId,
      to: r.users.id,
      optional: false,
    }),
  },
}));
