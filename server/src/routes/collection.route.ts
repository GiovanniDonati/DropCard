import { Router } from "express";
import { errorHandler } from '../exception/error-handle';
import { authMiddleware } from "../middlewares/auth";
import { CollectionController } from "../controllers/collection.controller";

export const collectionRoutes: Router = Router();

const collectionController = new CollectionController();

collectionRoutes.get('', 
  [authMiddleware], errorHandler(collectionController.getAllCollections))
collectionRoutes.get('/:id', 
  [authMiddleware], errorHandler(collectionController.getCollectionById))
collectionRoutes.post('', 
  [authMiddleware], errorHandler(collectionController.createCollection))
collectionRoutes.patch('/:id', 
  [authMiddleware], errorHandler(collectionController.updateCollection))
collectionRoutes.delete('/:id', 
  [authMiddleware], errorHandler(collectionController.deleteCollection))
