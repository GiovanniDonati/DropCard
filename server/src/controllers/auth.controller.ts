import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  public authService = new AuthService();

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.authService.login(req.body);
    res.status(200).json(result);
  };

  auth = async (req: Request, res: Response) => {
    res.json(req.user);
  };
}
