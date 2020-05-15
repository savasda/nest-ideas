import { UserRO } from 'src/user/user.dto';
export declare class IdeaDTO {
    idea: string;
    description: string;
}
export declare class IdeaRO {
    id?: string;
    updated: Date;
    created: Date;
    idea: string;
    description: string;
    author: UserRO;
    upvotes?: number;
    downvotes?: number;
}
