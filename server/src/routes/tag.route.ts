import { Router } from "express";
import { errorHandler } from '../exception/error-handle';
import { authMiddleware } from "../middlewares/auth";
import { TagController } from "../controllers/tag.controller";

export const tagRoutes: Router = Router();

const tagController = new TagController();

tagRoutes.get('', 
  [authMiddleware], errorHandler(tagController.getAllTags))
tagRoutes.get('/:id', 
  [authMiddleware], errorHandler(tagController.getTagById))
tagRoutes.post('', 
  [authMiddleware], errorHandler(tagController.createTag))
tagRoutes.patch('/:id', 
  [authMiddleware], errorHandler(tagController.updateTag))
tagRoutes.delete('/:id', 
  [authMiddleware], errorHandler(tagController.deleteTag))
