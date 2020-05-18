import { CommentService } from './comment.service';
import { CommentDTO } from './comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    showCommentsByIdea(idea: string): Promise<import("./comment.entity").CommentEntity[]>;
    showCommentsBUser(user: string): Promise<import("./comment.entity").CommentEntity[]>;
    createComment(idea: string, user: any, data: CommentDTO): Promise<import("./comment.entity").CommentEntity>;
    showComment(id: string): Promise<import("./comment.entity").CommentEntity>;
    destroyComment(id: string, user: string): Promise<import("./comment.entity").CommentEntity>;
}
