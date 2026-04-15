import { prisma } from "../config/prisma";
import { Collection } from "../domain/entities/collection.entity";
import { CollectionDto, CreateCollectionDto } from "../domain/dto/collection.dto";

export class CollectionRepository {
  async findAll(): Promise<Collection[]> {
    return await prisma.collection.findMany() as Collection[];
  }

  async findById(id: string): Promise<Collection | null> {
    return await prisma.collection.findUnique({ where: { id }}) as Collection | null;
  }

  async findByName(name: string): Promise<Collection | null> {
    return await prisma.collection.findFirst({ where: { name }}) as Collection | null;
  }

  async create(data: CreateCollectionDto): Promise<Collection> {
    return await prisma.collection.create({
      data: {
        name: data.name,
      }
    }) as Collection;
  }

  async update(id: string, data: CollectionDto): Promise<Collection> {
    return await prisma.collection.update({
      where: { id },
      data: {
        name: data.name,
      }
    }) as Collection;
  }

  async delete(id: string): Promise<void> {
    await prisma.collection.delete({ where: { id } });
  }
}
