import { Request, Response } from 'express';
import { CardSchema } from '../domain/schemas/card.schema';
import { CardService } from '../services/card.service';

export class CardController {
  public cardService = new CardService();

  getAllCards = async (req: Request, res: Response) => {
    const cards = await this.cardService.getAllCards();
    res.json({ cards });
  };

  getCardById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const card = await this.cardService.getCardById(id as string);
    res.json(card);
  };

  createCard = async (req: Request, res: Response) => {
    CardSchema.parse(req.body);
    console.log("Request body:", req.body);
    const card = await this.cardService.createCard(req.body);
    res.status(201).json({ card });
  };

  updateCard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const card = await this.cardService.updateCard(id as string, req.body);
    res.json({ card });
  };

  deleteCard = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.cardService.deleteCard(id as string);
    res.status(200).send("Card deleted successfully");
  };
}
