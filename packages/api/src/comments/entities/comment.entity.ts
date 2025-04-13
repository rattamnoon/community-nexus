import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsPositive,
  IsString,
} from 'class-validator';
import { User } from 'users/entities/user.entity';

export class Comment {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  postId: string;

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
}
