import { User } from '@/database/entities/user.entity';
import { CurrentUser } from '@/decorators/decorators';
import { Public } from '@/decorators/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from '@repo/api/posts/dto/create-post.dto';
import { UpdatePostDto } from '@repo/api/posts/dto/update-post.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postsService.create(createPostDto, user.id);
  }

  @Public()
  @Get()
  async findAll(
    @Query('tag') tag: string,
    @Query('searchText') searchText: string,
  ) {
    return this.postsService.findAll(tag, searchText);
  }

  @Public()
  @Get('/paginate')
  async paginate(
    @Query() options: IPaginationOptions,
    @Query('tag') tag: string,
    @Query('searchText') searchText: string,
  ) {
    return this.postsService.findAllPaginated(options, tag, searchText);
  }

  @Get('/our-posts')
  async ourPosts(
    @Query('tag') tag: string,
    @Query('searchText') searchText: string,
    @CurrentUser() user: User,
  ) {
    return this.postsService.findAll(tag, searchText, user.id);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
