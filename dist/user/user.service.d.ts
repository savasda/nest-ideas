import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    showAll(): Promise<Array<UserRO>>;
    login(data: UserDTO): Promise<UserRO>;
    register(data: UserDTO): Promise<UserRO>;
}
