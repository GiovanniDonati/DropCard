import { prisma } from "../config/prisma";
import { Card } from "../domain/entities/card.entity";
import { CreateCardDto, UpdateCardDto } from "../domain/dto/card.dto";

export class CardRepository {
  async findAll(): Promise<Card[]> {
    return await prisma.card.findMany({
      include: { cardTags: { include: { tag: true } } }
    }) as any;
  }

  async findById(id: string): Promise<Card | null> {
    return await prisma.card.findUnique({ 
      where: { id },
      include: { cardTags: { include: { tag: true } } }
    }) as any;
  }

  async findByQuestion(frontside: string): Promise<Card | null> {
    return await prisma.card.findFirst({ where: { frontside } }) as any;
  }

  async create(data: CreateCardDto): Promise<Card> {
    const { tagsId, ...cardData } = data;
    return await prisma.card.create({
      data: {
        ...cardData,
        cardTags: tagsId ? {
          create: tagsId.map(id => ({
            tag: { connect: { id } }
          }))
        } : undefined
      },
      include: { cardTags: { include: { tag: true } } }
    }) as any;
  }

  async update(id: string, data: UpdateCardDto): Promise<Card> {
    const { tagsId, ...cardData } = data;

    return await prisma.card.update({
      where: { id },
      data: {
        ...cardData,
        cardTags: tagsId ? {
          deleteMany: {},
          create: tagsId.map(tagId => ({
            tagId: tagId
          }))
        } : undefined
      },
      include: { cardTags: { include: { tag: true } } }
    }) as any;
  }

  async delete(id: string): Promise<void> {
    await prisma.$transaction([
      prisma.cardTag.deleteMany({ where: { cardId: id } }),
      prisma.card.delete({ where: { id } })
    ]);
  }
}