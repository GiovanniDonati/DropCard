import {Router} from 'express';
import authRoutes from './auth.route';
import { userRoutes } from './user.route';
import { tagRoutes } from './tag.route';
import { collectionRoutes } from './collection.route';
import { cardRoutes } from './card.route';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/users', userRoutes);
rootRouter.use('/tags', tagRoutes);
rootRouter.use('/collections', collectionRoutes);
rootRouter.use('/cards', cardRoutes);

export default rootRouter;