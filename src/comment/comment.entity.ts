import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { IdeaEntity } from 'src/idea/idea.entity'

@Entity('comment')
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    created: Date;
  
    @Column('text')
    comment: String;
  
    @ManyToOne(type => UserEntity)
    @JoinTable()
    author: UserEntity;
  
    @ManyToOne(type => IdeaEntity, idea => idea.comments)
    idea: IdeaEntity;
}
