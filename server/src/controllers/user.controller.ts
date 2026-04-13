import { Request, Response } from 'express';
import { SignupSchema } from '../domain/schemas/user.schema';
import { UserService } from '../services/user.service';

export class UserController {
  public userService = new UserService();

  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.json({ users });
  };

  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id as string);
    res.json(user);
  };

  createUser = async (req: Request, res: Response) => {
    SignupSchema.parse(req.body);
    const user = await this.userService.createUser(req.body);
    res.status(201).json({ user });
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.updateUser(id as string, req.body);
    res.json({ user });
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.userService.deleteUser(id as string);
    res.status(204).send();
  };
}
