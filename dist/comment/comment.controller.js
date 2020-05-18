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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const auth_guard_1 = require("../shared/auth.guard");
const validation_pipe_1 = require("../shared/validation.pipe");
const user_decorator_1 = require("../user/user.decorator");
const comment_dto_1 = require("./comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    showCommentsByIdea(idea) {
        return this.commentService.showByIdea(idea);
    }
    showCommentsBUser(user) {
        return this.commentService.showByUser(user);
    }
    createComment(idea, user, data) {
        return this.commentService.create(idea, user, data);
    }
    showComment(id) {
        return this.commentService.show(id);
    }
    destroyComment(id, user) {
        return this.commentService.destroy(id, user);
    }
};
__decorate([
    common_1.Get('idea/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "showCommentsByIdea", null);
__decorate([
    common_1.Get('user/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "showCommentsBUser", null);
__decorate([
    common_1.Post('idea/:id'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    common_1.UsePipes(new validation_pipe_1.ValidationPipe()),
    __param(0, common_1.Param('id')),
    __param(1, user_decorator_1.User('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, comment_dto_1.CommentDTO]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "createComment", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "showComment", null);
__decorate([
    common_1.Delete('id'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "destroyComment", null);
CommentController = __decorate([
    common_1.Controller('api/comments'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map