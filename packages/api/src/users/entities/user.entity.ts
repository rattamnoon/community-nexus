import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class User {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  securityCount: number;

  @IsString()
  image: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  deletedAt: Date;
}
