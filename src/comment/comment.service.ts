import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentEntity } from './comment.entity'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { IdeaEntity } from 'src/idea/idea.entity'
import { CommentDTO } from './comment.dto'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commetRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(IdeaEntity)
    private ideaREpository: Repository<IdeaEntity>,
  ) {
  }

  async show(id: string) {
    const comment = await this.commetRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    })

    return comment
  }

  async showByIdea(id: string) {
    const idea = await this.ideaREpository.findOne({ 
        where: {id},
        relations: ['comments', 'comments.author', 'comments.idea']
    });

    return idea.comments;
  }

  async showByUser(id: string) {
      const comments = this.commetRepository.find({
          where: {author: id},
          relations: ['author']
      });

      return comments;
  }

  async create(ideaId: string, userId: string, data: CommentDTO) {
    const idea = await this.ideaREpository.findOne({ where: { id: ideaId } })
    const user = await this.userRepository.findOne({ where: { id: userId } })

    const comment = await this.commetRepository.create({
      ...data,
      idea,
      author: user,
    })

    await this.commetRepository.save(comment)
    return comment
  }

  async destroy(id: string, userId: string) {
    const comment = await this.commetRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    })

    if (comment.author.id !== userId) {
      throw new HttpException(
        'You do not own this comment',
        HttpStatus.UNAUTHORIZED,
      )
    }

    await this.commetRepository.remove(comment)
    return comment
  }
}
