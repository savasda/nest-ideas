import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { IdeaEntity } from './idea.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { IdeaDTO, IdeaRO } from './idea.dto'
import { UserEntity } from 'src/user/user.entity'

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private toResponseObject(idea: IdeaEntity): IdeaRO {
    const responseObject: any = {
      ...idea,
      author: idea.author ? idea.author.toResponseObject(false) : null,
    };

    if(responseObject.downvotes) {
      responseObject.downvotes = responseObject.downvotes.length;
    }
    if(responseObject.upvotes) {
      responseObject.upvotes = responseObject.upvotes.length;
    }

    return responseObject;
  }

  private enshureOwnership(idea: IdeaEntity, userId: string) {
    if (idea.author.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED)
    }
  }

  async showAll(): Promise<Array<IdeaRO>> {
    const ideas = await this.ideaRepository.find(
      { relations: ['author', 'upvotes', 'downvotes'] 
    })
    return ideas.map(idea => this.toResponseObject(idea))
  }

  async create(userId: string, data: IdeaDTO): Promise<IdeaRO> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    const idea = await this.ideaRepository.create({ ...data, author: user })
    await this.ideaRepository.save(idea)
    return this.toResponseObject(idea)
  }

  async read(id: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    })
    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    return this.toResponseObject(idea)
  }

  async update(
    id: string,
    userId: string,
    data: Partial<IdeaDTO>,
  ): Promise<IdeaRO> {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    })
    if (!idea) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    this.enshureOwnership(idea, userId)
    await this.ideaRepository.update({ id }, data)
    idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    })
    return this.toResponseObject(idea)
  }

  async destroy(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    })
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    this.enshureOwnership(idea, userId)
    await this.ideaRepository.delete({ id })
    return this.toResponseObject(idea)
  }

  async bookmark(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({where: {id}});
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['bookmarks']});
    if(user.bookmarks.filter(bookmark => bookmark.id === idea.id).length < 1) {
      user.bookmarks.push(idea);
      await this.userRepository.save(user);
    } else {
      throw new HttpException('Idea already bookmarked', HttpStatus.BAD_REQUEST)
    }

    return user.toResponseObject()
  }  

  

  async unbookmark(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({where: {id}});
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['bookmarks']});
    if(user.bookmarks.filter(bookmark => bookmark.id === idea.id).length < 1) {
      user.bookmarks = user.bookmarks.filter(bookmark => bookmark.id !== idea.id)
      await this.userRepository.save(user);
    } else {
      throw new HttpException('Idea already bookmarked', HttpStatus.BAD_REQUEST)
    }

    return user.toResponseObject()
  }


}
