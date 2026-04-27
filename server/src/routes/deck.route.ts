import { Router } from "express";
import { errorHandler } from '../exception/error-handle';
import { authMiddleware } from "../middlewares/auth";
import { DeckController } from "../controllers/deck.controller";

export const deckRoutes: Router = Router();

const deckController = new DeckController();

deckRoutes.get('', 
  [authMiddleware], errorHandler(deckController.getAllDecks))
deckRoutes.get('/:id', 
  [authMiddleware], errorHandler(deckController.getDeckById))
deckRoutes.post('', 
  [authMiddleware], errorHandler(deckController.createDeck))
deckRoutes.patch('/:id', 
  [authMiddleware], errorHandler(deckController.updateDeck))
deckRoutes.post('/:id/cards', 
  [authMiddleware], errorHandler(deckController.addCardsToDeck))
deckRoutes.post('/:id/collection/:collectionId', 
  [authMiddleware], errorHandler(deckController.addCollectionToDeck));
deckRoutes.post('/:id/tag/:tagId', 
  [authMiddleware], errorHandler(deckController.addTagToDeck));
deckRoutes.delete('/:id/cards', 
  [authMiddleware], errorHandler(deckController.removeCardsFromDeck))
deckRoutes.delete('/:id', 
  [authMiddleware], errorHandler(deckController.deleteDeck))
