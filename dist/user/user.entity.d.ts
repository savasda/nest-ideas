import { UserRO } from './user.dto';
import { IdeaEntity } from 'src/idea/idea.entity';
export declare class UserEntity {
    id: string;
    created: Date;
    username: string;
    password: string;
    ideas: IdeaEntity[];
    bookmarks: IdeaEntity[];
    hashPassword(): Promise<void>;
    toResponseObject(showToken?: boolean): UserRO;
    comparePassword(attempt: string): Promise<boolean>;
    private get token();
}
