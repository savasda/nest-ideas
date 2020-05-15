import { UserEntity } from 'src/user/user.entity';
export declare class IdeaEntity {
    id: string;
    created: Date;
    updated: Date;
    idea: string;
    description: string;
    author: UserEntity;
    upvotes: UserEntity[];
    downvotes: UserEntity[];
}
