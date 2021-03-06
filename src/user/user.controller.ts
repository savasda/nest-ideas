import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserDTO } from './user.dto'
import { AuthGuard } from 'src/shared/auth.guard'
import { User } from './user.decorator'
import { ValidationPipe } from 'src/shared/validation.pipe'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  @UseGuards(new AuthGuard())
  showAllUsers(@User() user) {
    return this.userService.showAll()
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data)
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data)
  }
}
