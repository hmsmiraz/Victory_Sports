import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: ['http://localhost:5173'] }));

// Application routes
app.use('/', router);

const test = (req: Request, res: Response) => {
  res.send(`Welcome Victory Sports Management System Backend`);
};
app.get('/', test);

export default app;