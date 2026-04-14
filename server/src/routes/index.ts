import {Router} from 'express';
import authRoutes from './auth.route';
import { userRoutes } from './user.route';
import { tagRoutes } from './tag.route';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/users', userRoutes);
rootRouter.use('/tags', tagRoutes);

export default rootRouter;