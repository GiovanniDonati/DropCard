import { CreateCollectionDto, CollectionDto } from "../domain/dto/collection.dto";
import { Collection } from "../domain/entities/collection.entity";
import { BadRequestException } from "../exception/bad-request";
import { ErrorCode } from "../exception/root";
import { CollectionRepository } from "../repositories/collection.repository";

export class CollectionService{
  public collectionRepository = new CollectionRepository();

  public mapToResponseDto(collection: Collection): CollectionDto {
    return {
      id: collection.id,
      name: collection.name,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt
    };
  }


  async getAllCollections(): Promise<CollectionDto[]> {
    const collections = await this.collectionRepository.findAll();
    return collections.map(collection => this.mapToResponseDto(collection as any));
  }

  async getCollectionById(id: string): Promise<CollectionDto> {
    const collection = await this.collectionRepository.findById(id);
    if (!collection) {
      throw new BadRequestException('Collection not found!', ErrorCode.NOT_FOUND);
    }
    return this.mapToResponseDto(collection as any);
  }

  async createCollection(data: CreateCollectionDto): Promise<CollectionDto> {
    let collection = await this.collectionRepository.findByName(data.name);
    if (collection) {
      throw new BadRequestException('Collection already exists!', ErrorCode.ALREADY_EXISTS);
    }

    const newCollection = await this.collectionRepository.create(data);
    return this.mapToResponseDto(newCollection as any);
  }

  async updateCollection(id: string, data: CollectionDto): Promise<CollectionDto> {
    let collection = await this.collectionRepository.findById(id);
    if (!collection) {
      throw new BadRequestException('Collection not found!', ErrorCode.NOT_FOUND);
    }

    const updatedCollection = await this.collectionRepository.update(id, data);
    return this.mapToResponseDto(updatedCollection as any);
  }

  async deleteCollection(id: string): Promise<void> {
    const collection = await this.collectionRepository.findById(id);
    if (!collection) {
      throw new BadRequestException('Collection not found!', ErrorCode.NOT_FOUND);
    }
    await this.collectionRepository.delete(id);
  }
}