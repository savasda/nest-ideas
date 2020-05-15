import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { type } from 'os'

@Entity('ideas')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date

  @Column('text')
  idea: string

  @Column('text')
  description: string

  @ManyToOne(type => UserEntity, autor => autor.ideas)
  author: UserEntity;

  @ManyToMany(type => UserEntity, {cascade: true})
  @JoinTable()
  upvotes: UserEntity[];

  @ManyToMany(type => UserEntity, {cascade: true})
  @JoinTable()
  downvotes: UserEntity[];


}
