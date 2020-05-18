import { UserEntity } from 'src/user/user.entity';
import { IdeaEntity } from 'src/idea/idea.entity';
export declare class CommentEntity {
    id: string;
    created: Date;
    comment: String;
    author: UserEntity;
    idea: IdeaEntity;
}
