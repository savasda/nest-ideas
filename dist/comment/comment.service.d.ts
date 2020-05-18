import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { IdeaEntity } from 'src/idea/idea.entity';
import { CommentDTO } from './comment.dto';
export declare class CommentService {
    private commetRepository;
    private userRepository;
    private ideaREpository;
    constructor(commetRepository: Repository<CommentEntity>, userRepository: Repository<UserEntity>, ideaREpository: Repository<IdeaEntity>);
    show(id: string): Promise<CommentEntity>;
    showByIdea(id: string): Promise<CommentEntity[]>;
    showByUser(id: string): Promise<CommentEntity[]>;
    create(ideaId: string, userId: string, data: CommentDTO): Promise<CommentEntity>;
    destroy(id: string, userId: string): Promise<CommentEntity>;
}
