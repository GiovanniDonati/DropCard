import { Router } from "express";
import { errorHandler } from '../exception/error-handle';
import { authMiddleware } from "../middlewares/auth";
import { CardController } from "../controllers/card.controller";

export const cardRoutes: Router = Router();

const cardController = new CardController();

cardRoutes.get('', 
  [authMiddleware], errorHandler(cardController.getAllCards))
cardRoutes.get('/:id', 
  [authMiddleware], errorHandler(cardController.getCardById))
cardRoutes.post('', 
  [authMiddleware], errorHandler(cardController.createCard))
cardRoutes.patch('/:id', 
  [authMiddleware], errorHandler(cardController.updateCard))
cardRoutes.delete('/:id', 
  [authMiddleware], errorHandler(cardController.deleteCard))
