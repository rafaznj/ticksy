"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketPriorityEnum = exports.TicketStatusEnum = void 0;
var TicketStatusEnum;
(function (TicketStatusEnum) {
    TicketStatusEnum["OPEN"] = "OPEN";
    TicketStatusEnum["IN_PROGRESS"] = "IN_PROGRESS";
    TicketStatusEnum["WAITING_CUSTOMER"] = "WAITING_CUSTOMER";
    TicketStatusEnum["RESOLVED"] = "RESOLVED";
    TicketStatusEnum["CLOSED"] = "CLOSED";
})(TicketStatusEnum || (exports.TicketStatusEnum = TicketStatusEnum = {}));
var TicketPriorityEnum;
(function (TicketPriorityEnum) {
    TicketPriorityEnum["LOW"] = "LOW";
    TicketPriorityEnum["MEDIUM"] = "MEDIUM";
    TicketPriorityEnum["HIGH"] = "HIGH";
    TicketPriorityEnum["URGENT"] = "URGENT";
})(TicketPriorityEnum || (exports.TicketPriorityEnum = TicketPriorityEnum = {}));
//# sourceMappingURL=ticket.enum.js.map