import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import dayjs from 'dayjs';
import { omit } from 'lodash';
import { UsersService } from '../users/users.service';
import {
  JwtPayload,
  RefreshTokenPayload,
} from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateJwtPayload(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.id);

    if (!user) {
      return;
    }

    return user;
  }

  async validateRefreshTokenPayload(payload: RefreshTokenPayload) {
    return this.usersService.validateUserSecurityCount(
      payload.id,
      payload.securityCount,
    );
  }

  async genTokenPackage(userId: string) {
    const user = await this.usersService.findOne(userId);

    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        securityCount: user.securityCount,
      },
      {
        expiresIn: '7d',
      },
    );

    return {
      token,
      refreshToken,
      expiresIn: dayjs().add(15, 'minutes').unix(),
      user: omit(user, ['password']),
    };
  }

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokenPackage = await this.genTokenPackage(user.id);

    return tokenPackage;
  }

  async signUp(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await argon2.hash(password);

    const createdUser = await this.usersService.create({
      username,
      password: passwordHash,
    });

    return omit(createdUser, ['password']);
  }
}
