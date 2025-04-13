import { Auth } from './auth/entities/auth.entity';
import { User } from './users/entities/user.entity';

import { CreateAuthDto } from './auth/dto/create-auth.dto';
import { UpdateAuthDto } from './auth/dto/update-auth.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';

export const users = {
  dto: {
    CreateUserDto,
    UpdateUserDto,
  },
  entities: {
    User,
  },
};

export const auth = {
  dto: {
    CreateAuthDto,
    UpdateAuthDto,
  },
  entities: {
    Auth,
  },
};
