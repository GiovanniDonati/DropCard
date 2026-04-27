import { CreateDeckDto, DeckDto, UpdateDeckDto } from "../domain/dto/deck.dto";
import { Deck } from "../domain/entities/deck.entity";
import { BadRequestException } from "../exception/bad-request";
import { ErrorCode } from "../exception/root";
import { DeckRepository } from "../repositories/deck.repository";

export class DeckService {
  public deckRepository = new DeckRepository();

  public mapToResponseDto(deck: Deck): DeckDto {
    return {
      id: deck.id,
      name: deck.name,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
      deckCards: deck.deckCards.map(dc => ({
        id: dc.id,
        deckId: dc.deckId,
        cardId: dc.cardId,
        frontside: dc.card.frontside,
        backside: dc.card.backside
      }))
    };
  }

  async getAllDecks(): Promise<DeckDto[]> {
    const decks = await this.deckRepository.findAll();
    return decks.map(deck => this.mapToResponseDto(deck));
  }

  async getDeckById(id: string): Promise<DeckDto> {
    const deck = await this.deckRepository.findById(id);
    if (!deck) {
      throw new BadRequestException('Deck not found!', ErrorCode.NOT_FOUND);
    }
    return this.mapToResponseDto(deck);
  }

  async createDeck(data: CreateDeckDto): Promise<DeckDto> {
    const newDeck = await this.deckRepository.create(data);
    return this.mapToResponseDto(newDeck);
  }

  async updateDeck(id: string, data: UpdateDeckDto): Promise<DeckDto> {
    const deck = await this.deckRepository.findById(id);
    if (!deck) {
      throw new BadRequestException('Deck not found!', ErrorCode.NOT_FOUND);
    }
    const updatedDeck = await this.deckRepository.update(id, data);
    return this.mapToResponseDto(updatedDeck);
  }

  async addCardsToDeck(deckId: string, cardIds: string[]): Promise<void> {
    const deck = await this.deckRepository.findById(deckId);
    if (!deck) {
      throw new BadRequestException('Deck not found!', ErrorCode.NOT_FOUND);
    }
    await this.deckRepository.addCardsToDeck(deckId, cardIds);
  }

  async addCollectionToDeck(deckId: string, collectionId: string): Promise<void> {
    const deck = await this.deckRepository.findById(deckId);
    if (!deck) {
      throw new BadRequestException('Deck not found!', ErrorCode.NOT_FOUND);
    }
    const cardIds = await this.deckRepository.getCardIdsByCollection(collectionId);
    await this.deckRepository.addCardsToDeck(deckId, cardIds);
  }

  async addTagToDeck(deckId: string, tagId: string): Promise<void> {
    const deck = await this.deckRepository.findById(deckId);
    if (!deck) {
      throw new BadRequestException('Deck not found!', ErrorCode.NOT_FOUND);
    }
    const cardIds = await this.deckRepository.getCardIdsByTag(tagId);
    await this.deckRepository.addCardsToDeck(deckId, cardIds);
  }

  async removeCardsFromDeck(deckId: string, cardIds: string[]): Promise<void> {
    const deck = await this.deckRepository.findById(deckId);
    if (!deck) {
      throw new BadRequestException('Deck not found!', ErrorCode.NOT_FOUND);
    }
    await this.deckRepository.removeCardsFromDeck(deckId, cardIds);
  }

  async deleteDeck(id: string): Promise<void> {
    const deck = await this.deckRepository.findById(id);
    if (!deck) {
      throw new BadRequestException('Deck not found!', ErrorCode.NOT_FOUND);
    }
    await this.deckRepository.delete(id);
  }
}
