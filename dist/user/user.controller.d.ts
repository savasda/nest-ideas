import { UserService } from './user.service';
import { UserDTO } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    showAllUsers(user: any): Promise<import("./user.dto").UserRO[]>;
    login(data: UserDTO): Promise<import("./user.dto").UserRO>;
    register(data: UserDTO): Promise<import("./user.dto").UserRO>;
}
