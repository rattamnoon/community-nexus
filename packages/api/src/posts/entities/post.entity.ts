import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsPositive,
  IsString,
} from 'class-validator';
import { Comment } from 'comments/entities/comment.entity';
import { User } from 'users/entities/user.entity';

export class Post {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

  @IsDate()
  @IsNotEmpty()
  deletedAt: Date;

  @IsNotEmpty()
  @IsObject()
  @Type(() => User)
  user: User;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  commentCount: number;

  @IsNotEmpty()
  @IsArray()
  @IsObject({ each: true })
  comments: Comment[];
}
