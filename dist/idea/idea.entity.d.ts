import { UserEntity } from 'src/user/user.entity';
import { CommentEntity } from 'src/comment/comment.entity';
export declare class IdeaEntity {
    id: string;
    created: Date;
    updated: Date;
    idea: string;
    description: string;
    author: UserEntity;
    upvotes: UserEntity[];
    downvotes: UserEntity[];
    comments: CommentEntity[];
}
