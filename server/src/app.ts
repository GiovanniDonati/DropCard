import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorMiddleware } from './middlewares/errors';
import rootRouter from './routes';

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is on!' });
});

app.use('/api/v1', rootRouter);

app.use(errorMiddleware);

export default app;