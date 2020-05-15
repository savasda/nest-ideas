import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  UseGuards,
  Logger
} from '@nestjs/common'
import { IdeaService } from './idea.service'
import { IdeaDTO } from './idea.dto'
import { ValidationPipe } from '../shared/validation.pipe'
import { AuthGuard } from 'src/shared/auth.guard'
import { User } from 'src/user/user.decorator'

@Controller('api/idea')
export class IdeaController {
  private logger = new Logger(IdeaController.name)

  constructor(private ideaService: IdeaService) {}

  private lodData(options: any) {
    options.user && this.logger.log(`USER ${JSON.stringify(options.user)}`)
    options.data && this.logger.log(`BODY ${JSON.stringify(options.data)}`)
    options.id && this.logger.log(`IDEA ${JSON.stringify(options.id)}`)
  }

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll()
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createIdea(@User('id') user, @Body() data: IdeaDTO) {
    this.lodData({ user, data })
    return this.ideaService.create(user, data)
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id)
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateIdea(
    @Param('id') id: string,
    @User('id') user: string,
    @Body() data: Partial<IdeaDTO>,
  ) {
    this.lodData({ id, user, data })
    return this.ideaService.update(id, user, data)
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyIdea(@Param('id') id: string, @User('id') user) {
    this.lodData({ id, user })
    return this.ideaService.destroy(id, user)
  }

  @Post(':id/bookmark')
  @UseGuards(new AuthGuard())
  bookmarkIdea(@Param('id') id: string, @User('id') user: string){
    this.lodData({id, user});
  }

  @Delete(':id/bookmark')
  @UseGuards(new AuthGuard())
  unBookmarkIdea(@Param('id') id: string, @User('id') user: string){
    this.lodData({id, user});
  }

}
