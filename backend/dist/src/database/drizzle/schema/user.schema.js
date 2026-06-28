"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.userRoleEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const roles_enum_1 = require("../../../modules/user/enums/roles.enum");
exports.userRoleEnum = (0, pg_core_1.pgEnum)("role", Object.values(roles_enum_1.UserRoleEnum));
exports.user = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.uuid)().defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)({ length: 256 }).notNull(),
    email: (0, pg_core_1.varchar)({ length: 254 }).notNull(),
    password: (0, pg_core_1.text)().notNull(),
    role: (0, exports.userRoleEnum)().default(roles_enum_1.UserRoleEnum.EMPLOYEE).notNull(),
    createdAt: (0, pg_core_1.timestamp)().defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)()
        .defaultNow()
        .$onUpdate(() => (0, drizzle_orm_1.sql) `now()`)
        .notNull(),
});
//# sourceMappingURL=user.schema.js.map