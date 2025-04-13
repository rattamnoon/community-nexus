import { User } from '@/database/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@repo/api/users/dto/create-user.dto';
import { UpdateUserDto } from '@repo/api/users/dto/update-user.dto';
import * as argon2 from 'argon2';
import { join } from 'node:path';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password);
    }

    const updatedUser = this.usersRepository.create({
      ...user,
      ...updateUserDto,
    });

    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.remove(user);
  }

  async validateUserSecurityCount(userId: string, securityCount: number) {
    const user = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      return;
    }

    if (user.securityCount !== securityCount) {
      return;
    }

    return user;
  }

  async upload(id: string, file: Express.Multer.File) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.image = file.originalname;

    await this.usersRepository.save(user);

    return user;
  }

  async getImage(id: string): Promise<string> {
    const user = await this.usersRepository.findOneBy({ id });
    return join(__dirname, '..', '..', '..', 'uploads', user.image);
  }
}
