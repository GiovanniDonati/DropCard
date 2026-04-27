import { Card } from "./card.entity";

export interface DeckCard {
  id: string;
  deckId: string;
  cardId: string;
  card: Card;
}

export interface Deck {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deckCards: DeckCard[];
}
