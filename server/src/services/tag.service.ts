import { CreateTagDto, TagDto } from "../domain/dto/tag.dto";
import { Tag } from "../domain/entities/tag.entity";
import { BadRequestException } from "../exception/bad-request";
import { ErrorCode } from "../exception/root";
import { TagRepository } from "../repositories/tag.repository";

export class TagService{
  public tagRepository = new TagRepository();

  public mapToResponseDto(tag: Tag): TagDto {
    return {
      id: tag.id,
      name: tag.name,
      createdAt: tag.createdAt
    };
  }


  async getAllTags(): Promise<TagDto[]> {
    const tags = await this.tagRepository.findAll();
    return tags.map(tag => this.mapToResponseDto(tag as any));
  }

  async getTagById(id: string): Promise<TagDto> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new BadRequestException('Tag not found!', ErrorCode.NOT_FOUND);
    }
    return this.mapToResponseDto(tag as any);
  }

  async createTag(data: CreateTagDto): Promise<TagDto> {
    let tag = await this.tagRepository.findByName(data.name);
    if (tag) {
      throw new BadRequestException('Tag already exists!', ErrorCode.ALREADY_EXISTS);
    }

    const newTag = await this.tagRepository.create(data);
    return this.mapToResponseDto(newTag as any);
  }

  async updateTag(id: string, data: TagDto): Promise<TagDto> {
    let tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new BadRequestException('Tag not found!', ErrorCode.NOT_FOUND);
    }

    const updatedTag = await this.tagRepository.update(id, data);
    return this.mapToResponseDto(updatedTag as any);
  }

  async deleteTag(id: string): Promise<void> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new BadRequestException('Tag not found!', ErrorCode.NOT_FOUND);
    }
    await this.tagRepository.delete(id);
  }
}