"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.rolesEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.rolesEnum = (0, pg_core_1.pgEnum)("roles", ["employee", "admin", "technical_assistance"]);
exports.user = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)({ length: 256 }).notNull(),
    email: (0, pg_core_1.varchar)({ length: 254 }).notNull(),
    password: (0, pg_core_1.text)().notNull(),
    role: (0, exports.rolesEnum)().default("employee").notNull(),
});
//# sourceMappingURL=user.schema.js.map