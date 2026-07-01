"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticket = exports.ticketPriorityEnum = exports.ticketStatusEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const ticket_enum_1 = require("../../../modules/ticket/enums/ticket.enum");
const user_schema_1 = require("./user.schema");
exports.ticketStatusEnum = (0, pg_core_1.pgEnum)("ticket_status", Object.values(ticket_enum_1.TicketStatusEnum));
exports.ticketPriorityEnum = (0, pg_core_1.pgEnum)("ticket_priority", Object.values(ticket_enum_1.TicketPriorityEnum));
exports.ticket = (0, pg_core_1.pgTable)("ticket", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey(),
    title: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    description: (0, pg_core_1.text)().notNull(),
    priority: (0, exports.ticketPriorityEnum)().notNull(),
    status: (0, exports.ticketStatusEnum)().default(ticket_enum_1.TicketStatusEnum.OPEN).notNull(),
    createdById: (0, pg_core_1.uuid)()
        .references(() => user_schema_1.user.id)
        .notNull(),
    assignedToId: (0, pg_core_1.uuid)().references(() => user_schema_1.user.id),
    createdAt: (0, pg_core_1.timestamp)().defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)()
        .defaultNow()
        .$onUpdate(() => (0, drizzle_orm_1.sql) `now()`)
        .notNull(),
    closedAt: (0, pg_core_1.timestamp)(),
});
//# sourceMappingURL=ticket.schema.js.map