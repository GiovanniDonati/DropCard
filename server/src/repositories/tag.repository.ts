import { prisma } from "../config/prisma";
import { Tag } from "../domain/entities/tag.entity";
import { CreateTagDto, TagDto } from "../domain/dto/tag.dto";

export class TagRepository {
  async findAll(): Promise<Tag[]> {
    return await prisma.tag.findMany() as Tag[];
  }

  async findById(id: string): Promise<Tag | null> {
    return await prisma.tag.findUnique({ where: { id }}) as Tag | null;
  }

  async findByName(name: string): Promise<Tag | null> {
    return await prisma.tag.findFirst({ where: { name }}) as Tag | null;
  }

  async create(data: CreateTagDto): Promise<Tag> {
    return await prisma.tag.create({
      data: {
        name: data.name,
      }
    }) as Tag;
  }

  async update(id: string, data: TagDto): Promise<Tag> {
    return await prisma.tag.update({
      where: { id },
      data: {
        name: data.name,
      }
    }) as Tag;
  }

  async delete(id: string): Promise<void> {
    await prisma.tag.delete({ where: { id } });
  }
}
