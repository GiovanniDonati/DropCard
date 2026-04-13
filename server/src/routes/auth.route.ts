import {Router} from 'express';
import { errorHandler } from '../exception/error-handle';
import { AuthController } from '../controllers/auth.controller';

const authRoutes:Router = Router();

const authController = new AuthController()

authRoutes.post('/login', 
  errorHandler(authController.login));

export default authRoutes;