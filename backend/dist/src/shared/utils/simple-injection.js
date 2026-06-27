"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleInjection = void 0;
const common_1 = require("@nestjs/common");
const simpleInjection = (token, cls, scope = common_1.Scope.DEFAULT) => {
    return {
        scope,
        provide: token,
        useClass: cls,
    };
};
exports.simpleInjection = simpleInjection;
//# sourceMappingURL=simple-injection.js.map