import { Router } from "express";
import { errorHandler } from '../exception/error-handle';
import { authMiddleware } from "../middlewares/auth";
import { UserController } from "../controllers/user.controller";

export const userRoutes: Router = Router();

const userController = new UserController();

userRoutes.get('', 
  [authMiddleware], errorHandler(userController.getAllUsers))
userRoutes.get('/:id', 
  [authMiddleware], errorHandler(userController.getUserById))
userRoutes.post('', 
  [authMiddleware], errorHandler(userController.createUser))
userRoutes.patch('/:id', 
  [authMiddleware], errorHandler(userController.updateUser))
userRoutes.delete('/:id', 
  [authMiddleware], errorHandler(userController.deleteUser))
