import { User } from './users/entities/user.entity';

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
