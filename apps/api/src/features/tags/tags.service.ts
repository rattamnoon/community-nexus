import { Tag } from '@/database/entities/tag.enntity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '@repo/api/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@repo/api/tags/dto/update-tag.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  async findAll() {
    return this.tagRepository.find({
      select: ['id', 'name'],
    });
  }

  async findOne(id: number) {
    return this.tagRepository.findOneBy({ id });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagRepository.findOneBy({ id });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return this.tagRepository.update(id, updateTagDto);
  }

  async remove(id: number) {
    const tag = await this.tagRepository.findOneBy({ id });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return this.tagRepository.softDelete(id);
  }
}
