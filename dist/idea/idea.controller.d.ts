import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
export declare class IdeaController {
    private ideaService;
    private logger;
    constructor(ideaService: IdeaService);
    private lodData;
    showAllIdeas(): Promise<import("./idea.dto").IdeaRO[]>;
    createIdea(user: any, data: IdeaDTO): Promise<import("./idea.dto").IdeaRO>;
    readIdea(id: string): Promise<import("./idea.dto").IdeaRO>;
    updateIdea(id: string, user: string, data: Partial<IdeaDTO>): Promise<import("./idea.dto").IdeaRO>;
    destroyIdea(id: string, user: any): Promise<import("./idea.dto").IdeaRO>;
    bookmarkIdea(id: string, user: string): Promise<import("../user/user.dto").UserRO>;
    unBookmarkIdea(id: string, user: string): Promise<import("../user/user.dto").UserRO>;
    upvote(id: string, user: string): Promise<import("./idea.dto").IdeaRO>;
    downvote(id: string, user: string): Promise<import("./idea.dto").IdeaRO>;
}
