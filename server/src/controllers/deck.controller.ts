import { Request, Response } from 'express';
import { DeckSchema } from '../domain/schemas/deck.schema';
import { DeckService } from '../services/deck.service';

export class DeckController {
  public deckService = new DeckService();

  getAllDecks = async (req: Request, res: Response) => {
    const decks = await this.deckService.getAllDecks();
    res.json({ decks });
  };

  getDeckById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deck = await this.deckService.getDeckById(id as string);
    res.json(deck);
  };

  createDeck = async (req: Request, res: Response) => {
    DeckSchema.parse(req.body);
    const deck = await this.deckService.createDeck(req.body);
    res.status(201).json({ deck });
  };

  updateDeck = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deck = await this.deckService.updateDeck(id as string, req.body);
    res.json({ deck });
  };

  addCardsToDeck = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cardIds } = req.body;
    await this.deckService.addCardsToDeck(id as string, cardIds);
    res.status(200).send("Cards added to deck successfully");
  };

  addCollectionToDeck = async (req: Request, res: Response) => {
    const { id, collectionId } = req.params;
    await this.deckService.addCollectionToDeck(id as string, collectionId as string);
    res.status(200).send("Collection added to deck successfully");
  };

  addTagToDeck = async (req: Request, res: Response) => {
    const { id, tagId } = req.params;
    await this.deckService.addTagToDeck(id as string, tagId as string);
    res.status(200).send("Tag added to deck successfully");
  };

  removeCardsFromDeck = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cardIds } = req.body;
    await this.deckService.removeCardsFromDeck(id as string, cardIds);
    res.status(200).send("Cards removed from deck successfully");
  };

  deleteDeck = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.deckService.deleteDeck(id as string);
    res.status(200).send("Deck deleted successfully");
  };
}
