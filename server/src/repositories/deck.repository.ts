import { prisma } from "../config/prisma";
import { Deck } from "../domain/entities/deck.entity";
import { CreateDeckDto, UpdateDeckDto } from "../domain/dto/deck.dto";

export class DeckRepository {
  async findAll(): Promise<Deck[]> {
    return await prisma.deck.findMany({
      include: {
        deckCards: {
          include: {
            card: true
          }
        }
      }
    }) as any;
  }

  async findById(id: string): Promise<Deck | null> {
    return await prisma.deck.findUnique({
      where: { id },
      include: {
        deckCards: {
          include: {
            card: true
          }
        }
      }
    }) as any;
  }

  async create(data: CreateDeckDto): Promise<Deck> {
    const { cardId, ...deckData } = data;
    
    const { description, ...cleanData } = deckData as any;

    return await prisma.deck.create({
      data: {
        ...cleanData,
        deckCards: cardId ? {
          create: {
            cardId: cardId
          }
        } : undefined
      },
      include: {
        deckCards: {
          include: {
            card: true
          }
        }
      }
    }) as any;
  }

  async update(id: string, data: UpdateDeckDto): Promise<Deck> {
    const { name } = data;

    return await prisma.deck.update({
      where: { id },
      data: { name },
      include: {
        deckCards: {
          include: {
            card: true
          }
        }
      }
    }) as any;
  }

  async getCardIdsByCollection(collectionId: string): Promise<string[]> {
    const cards = await prisma.card.findMany({
      where: { collectionId },
      select: { id: true }
    });
    return cards.map(c => c.id);
  }

  async getCardIdsByTag(tagId: string): Promise<string[]> {
    const cards = await prisma.card.findMany({
      where: {
        cardTags: { some: { tagId } }
      },
      select: { id: true }
    });
    return cards.map(c => c.id);
  }

  async addCardsToDeck(deckId: string, cardIds: string[]): Promise<void> {
    await prisma.deckCard.createMany({
      data: cardIds.map(cardId => ({
        deckId,
        cardId
      })),
      skipDuplicates: true
    });
  }

  async removeCardsFromDeck(deckId: string, cardIds: string[]): Promise<void> {
    await prisma.deckCard.deleteMany({
      where: {
        deckId,
        cardId: {
          in: cardIds
        }
      }
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.deck.delete({ where: { id } });
  }
}
