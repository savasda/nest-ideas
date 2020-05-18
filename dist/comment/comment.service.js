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
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("./comment.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const idea_entity_1 = require("../idea/idea.entity");
let CommentService = class CommentService {
    constructor(commetRepository, userRepository, ideaREpository) {
        this.commetRepository = commetRepository;
        this.userRepository = userRepository;
        this.ideaREpository = ideaREpository;
    }
    async show(id) {
        const comment = await this.commetRepository.findOne({
            where: { id },
            relations: ['author', 'idea'],
        });
        return comment;
    }
    async showByIdea(id) {
        const idea = await this.ideaREpository.findOne({
            where: { id },
            relations: ['comments', 'comments.author', 'comments.idea']
        });
        return idea.comments;
    }
    async showByUser(id) {
        const comments = this.commetRepository.find({
            where: { author: id },
            relations: ['author']
        });
        return comments;
    }
    async create(ideaId, userId, data) {
        const idea = await this.ideaREpository.findOne({ where: { id: ideaId } });
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const comment = await this.commetRepository.create(Object.assign(Object.assign({}, data), { idea, author: user }));
        await this.commetRepository.save(comment);
        return comment;
    }
    async destroy(id, userId) {
        const comment = await this.commetRepository.findOne({
            where: { id },
            relations: ['author', 'idea'],
        });
        if (comment.author.id !== userId) {
            throw new common_1.HttpException('You do not own this comment', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.commetRepository.remove(comment);
        return comment;
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(comment_entity_1.CommentEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __param(2, typeorm_1.InjectRepository(idea_entity_1.IdeaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map