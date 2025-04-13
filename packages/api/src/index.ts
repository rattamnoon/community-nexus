import { Auth } from './auth/entities/auth.entity';
import { Comment } from './comments/entities/comment.entity';
import { PostPaginate } from './posts/entities/post-paginate.entity';
import { Post } from './posts/entities/post.entity';
import { Tag } from './tags/entities/tag.entity';
import { User } from './users/entities/user.entity';

import { CreateAuthDto } from './auth/dto/create-auth.dto';
import { UpdateAuthDto } from './auth/dto/update-auth.dto';
import { CreateCommentDto } from './comments/dto/create-comment.dto';
import { UpdateCommentDto } from './comments/dto/update-comment.dto';
import { CreatePostDto } from './posts/dto/create-post.dto';
import { UpdatePostDto } from './posts/dto/update-post.dto';
import { CreateTagDto } from './tags/dto/create-tag.dto';
import { UpdateTagDto } from './tags/dto/update-tag.dto';
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

export const tags = {
  dto: {
    CreateTagDto,
    UpdateTagDto,
  },
  entities: {
    Tag,
  },
};

export const posts = {
  dto: {
    CreatePostDto,
    UpdatePostDto,
  },
  entities: {
    Post,
    PostPaginate,
  },
};

export const comments = {
  dto: {
    CreateCommentDto,
    UpdateCommentDto,
  },
  entities: {
    Comment,
  },
};
