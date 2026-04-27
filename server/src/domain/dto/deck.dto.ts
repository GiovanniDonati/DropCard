export interface CreateDeckDto {
  name: string;
  cardId?: string;
}

export interface UpdateDeckDto {
  name?: string;
}

export interface DeckDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deckCards: DeckCardDto[];
}

export interface DeckCardDto {
  id: string;
  deckId: string;
  cardId: string;
  frontside: string;
  backside: string;
}
