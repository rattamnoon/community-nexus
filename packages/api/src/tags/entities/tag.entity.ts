import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Tag {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsDate()
  deletedAt: Date;
}
