import { Post, PostLike } from '@/database/entities/post.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '@repo/api/posts/dto/create-post.dto';
import { UpdatePostDto } from '@repo/api/posts/dto/update-post.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
  ) {}

  private readonly logger = new Logger(PostsService.name);

  async create(createPostDto: CreatePostDto, userId: string) {
    const post = this.postRepository.create({
      ...createPostDto,
      userId,
    });
    return this.postRepository.save(post);
  }

  async findAll(tag: string, searchText: string, userId?: string) {
    const wheres: FindOptionsWhere<Post>[] = [];

    if (searchText) {
      wheres.push({ title: Like(`%${searchText}%`) });
      wheres.push({ content: Like(`%${searchText}%`) });
    }

    if (tag) {
      if (wheres.length > 0) {
        wheres.forEach((where) => {
          where.tag = tag;
        });
      } else {
        wheres.push({ tag });
      }
    }

    if (userId) {
      if (wheres.length > 0) {
        wheres.forEach((where) => {
          where.userId = userId;
        });
      } else {
        wheres.push({ userId });
      }
    }

    const posts = await this.postRepository.find({
      where: wheres,
      order: { createdAt: 'DESC' },
      relations: ['user', 'comments'],
    });

    return posts.map((post) => ({
      ...post,
      commentCount: post.comments.length,
    }));
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments'],
    });

    return {
      ...post,
      commentCount: post.comments.length,
    };
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Post>> {
    return paginate<Post>(this.postRepository, options);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.postRepository.softDelete(id);
  }

  async like(postId: number, userId: string) {
    try {
      return this.postLikeRepository.save({ postId, userId });
    } catch (error) {
      this.logger.error(error);
      return;
    }
  }

  async unlike(postId: number, userId: string) {
    try {
      return this.postLikeRepository.softDelete({ postId, userId });
    } catch (error) {
      this.logger.error(error);
      return;
    }
  }

  async getLikes(postId: number) {
    return this.postLikeRepository.findBy({ postId });
  }

  async getLikedPosts(userId: string) {
    return this.postLikeRepository.find({
      where: { userId },
      relations: ['post'],
    });
  }
}
