"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var IdeaController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const idea_service_1 = require("./idea.service");
const idea_dto_1 = require("./idea.dto");
const validation_pipe_1 = require("../shared/validation.pipe");
const auth_guard_1 = require("../shared/auth.guard");
const user_decorator_1 = require("../user/user.decorator");
let IdeaController = IdeaController_1 = class IdeaController {
    constructor(ideaService) {
        this.ideaService = ideaService;
        this.logger = new common_1.Logger(IdeaController_1.name);
    }
    lodData(options) {
        options.user && this.logger.log(`USER ${JSON.stringify(options.user)}`);
        options.data && this.logger.log(`BODY ${JSON.stringify(options.data)}`);
        options.id && this.logger.log(`IDEA ${JSON.stringify(options.id)}`);
    }
    showAllIdeas() {
        return this.ideaService.showAll();
    }
    createIdea(user, data) {
        this.lodData({ user, data });
        return this.ideaService.create(user, data);
    }
    readIdea(id) {
        return this.ideaService.read(id);
    }
    updateIdea(id, user, data) {
        this.lodData({ id, user, data });
        return this.ideaService.update(id, user, data);
    }
    destroyIdea(id, user) {
        this.lodData({ id, user });
        return this.ideaService.destroy(id, user);
    }
    bookmarkIdea(id, user) {
        this.lodData({ id, user });
    }
    unBookmarkIdea(id, user) {
        this.lodData({ id, user });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "showAllIdeas", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, user_decorator_1.User('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, idea_dto_1.IdeaDTO]),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "createIdea", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "readIdea", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "updateIdea", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "destroyIdea", null);
__decorate([
    common_1.Post(':id/bookmark'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "bookmarkIdea", null);
__decorate([
    common_1.Delete(':id/bookmark'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], IdeaController.prototype, "unBookmarkIdea", null);
IdeaController = IdeaController_1 = __decorate([
    common_1.Controller('api/idea'),
    __metadata("design:paramtypes", [idea_service_1.IdeaService])
], IdeaController);
exports.IdeaController = IdeaController;
//# sourceMappingURL=idea.controller.js.map