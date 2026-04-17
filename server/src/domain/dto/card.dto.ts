export interface CreateCardDto {
  frontside: string;
  backside: string;
  collectionId: string;
  tagsId?: string[];
}

export interface UpdateCardDto {
  frontside?: string;
  backside?: string;
  updatedAt?: Date;
  lastReviewedAt?: Date | null;
  nextReviewAt?: Date | null;
  ease_factor?: number;
  interval?: number;
  repetition?: number;
  tagsId?: string[];
  collectionId?: string;
}

export interface CardDto {
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
  tags?: {
    id: string;
    name: string;
  }[]; 
}