import { CreateCardDto, CardDto, UpdateCardDto } from "../domain/dto/card.dto";
import { Card } from "../domain/entities/card.entity";
import { BadRequestException } from "../exception/bad-request";
import { ErrorCode } from "../exception/root";
import { CardRepository } from "../repositories/card.repository";

export class CardService{
  public cardRepository = new CardRepository();

  public mapToResponseDto(card: Card): CardDto {
    return {
      id: card.id,
      frontside: card.frontside,
      backside: card.backside,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
      lastReviewedAt: card.lastReviewedAt,
      nextReviewAt: card.nextReviewAt,
      ease_factor: card.ease_factor,
      interval: card.interval,
      repetition: card.repetition,
      collectionId: card.collectionId,
      tags: card.cardTags?.map(cardTag => ({
        id: cardTag.tag.id,
        name: cardTag.tag.name
      })) || []
    };
  }


  async getAllCards(): Promise<CardDto[]> {
    const cards = await this.cardRepository.findAll();
    return cards.map(card => this.mapToResponseDto(card as any));
  }

  async getCardById(id: string): Promise<CardDto> {
    const card = await this.cardRepository.findById(id);
    if (!card) {
      throw new BadRequestException('Card not found!', ErrorCode.NOT_FOUND);
    }
    return this.mapToResponseDto(card as any);
  }

  async createCard(data: CreateCardDto): Promise<CardDto> {
    let card = await this.cardRepository.findByQuestion(data.frontside);
    if (card) {
      throw new BadRequestException('Card already exists!', ErrorCode.ALREADY_EXISTS);
    }

    const newCard = await this.cardRepository.create(data);
    return this.mapToResponseDto(newCard as any);
  }

  async updateCard(id: string, data: UpdateCardDto): Promise<CardDto> {
    let card = await this.cardRepository.findById(id);
    if (!card) {
      throw new BadRequestException('Card not found!', ErrorCode.NOT_FOUND);
    }
    const updatedCard = await this.cardRepository.update(id, data);
    return this.mapToResponseDto(updatedCard as any);
  }

  async deleteCard(id: string): Promise<void> {
    const card = await this.cardRepository.findById(id);
    if (!card) {
      throw new BadRequestException('Card not found!', ErrorCode.NOT_FOUND);
    }
    await this.cardRepository.delete(id);
  }
}