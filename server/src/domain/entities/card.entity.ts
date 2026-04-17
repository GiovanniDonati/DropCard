import { Tag } from './tag.entity';

export interface CardTag {
  id: string;
  cardId: string;
  tagId: string;
  tag: Tag;
}

export interface Card {
  id: string;
  frontside: string;
  backside: string;
  createdAt: Date;
  updatedAt: Date;
  lastReviewedAt: Date | null;
  nextReviewAt: Date | null;
  ease_factor: number;
  interval: number;
  repetition: number;
  collectionId: string;
  cardTags: CardTag[];
}