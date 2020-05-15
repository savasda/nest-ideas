"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let AuthGuard = class AuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const jsonWebToken = request.headers.authorization;
        if (!jsonWebToken)
            return false;
        request.user = this.validateToken(jsonWebToken);
        return true;
    }
    validateToken(auth) {
        if (auth.split(' ')[0] !== 'Bearer') {
            return new common_1.HttpException('Invalid token', common_1.HttpStatus.FORBIDDEN);
        }
        const token = auth.split(' ')[1];
        try {
            const decode = jwt.verify(token, process.env.SECRET);
            return decode;
        }
        catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new common_1.HttpException(message, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
AuthGuard = __decorate([
    common_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map