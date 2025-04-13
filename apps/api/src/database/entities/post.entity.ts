import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity()
@Index(['tag'])
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Relation<Comment>[];

  @OneToMany(() => PostLike, (like) => like.post)
  likes: Relation<PostLike>[];

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @Column()
  title: string;

  @Column('text')
  content: string;
}

@Entity()
export class PostLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @Column()
  postId: number;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: 'postId' })
  post: Relation<Post>;
}
