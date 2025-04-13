import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class Auth {
  @IsString()
  token: string;

  @IsString()
  refreshToken: string;

  @IsNumber()
  expiresIn: number;

  @IsObject()
  @Type(() => User)
  user: User;
}
