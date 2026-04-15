import { Request, Response } from 'express';
import { CollectionSchema } from '../domain/schemas/collection.schema';
import { CollectionService } from '../services/collection.service';

export class CollectionController {
  public collectionService = new CollectionService();

  getAllCollections = async (req: Request, res: Response) => {
    const collections = await this.collectionService.getAllCollections();
    res.json({ collections });
  };

  getCollectionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const collection = await this.collectionService.getCollectionById(id as string);
    res.json(collection);
  };

  createCollection = async (req: Request, res: Response) => {
    CollectionSchema.parse(req.body);
    const collection = await this.collectionService.createCollection(req.body);
    res.status(201).json({ collection });
  };

  updateCollection = async (req: Request, res: Response) => {
    const { id } = req.params;
    const collection = await this.collectionService.updateCollection(id as string, req.body);
    res.json({ collection });
  };

  deleteCollection = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.collectionService.deleteCollection(id as string);
    res.status(200).send("Collection deleted successfully");
  };
}
