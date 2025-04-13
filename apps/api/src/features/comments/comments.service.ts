import { Comment, CommentLike } from '@/database/entities/comment.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from '@repo/api/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '@repo/api/comments/dto/update-comment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(CommentLike)
    private readonly commentLikeRepository: Repository<CommentLike>,
  ) {}

  private readonly logger = new Logger(CommentsService.name);

  async create(createCommentDto: CreateCommentDto, userId: string) {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      userId,
    });
    return this.commentRepository.save(comment);
  }

  async findAll(postId: number) {
    return this.commentRepository.find({
      where: { postId },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return this.commentRepository.findOneBy({ id });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return this.commentRepository.softDelete(id);
  }

  async like(commentId: number, userId: string) {
    try {
      return this.commentLikeRepository.save({ commentId, userId });
    } catch (error) {
      this.logger.error(error);
      return;
    }
  }

  async unlike(commentId: number, userId: string) {
    try {
      return this.commentLikeRepository.softDelete({ commentId, userId });
    } catch (error) {
      this.logger.error(error);
      return;
    }
  }
}
