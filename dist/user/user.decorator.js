"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.User = common_1.createParamDecorator((data, context) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
});
//# sourceMappingURL=user.decorator.js.map