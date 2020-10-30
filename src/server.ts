import dotenv from 'dotenv';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';
import './database';

dotenv.config();

const app = express();

app.use(express.json());
app.get('/', async (req, res) => {
  return res.send().status(200);
});
app.use(routes);
console.log(process.env.DATABASE_URL);
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);
app.listen(process.env.PORT || 3333, () => {
  console.log('Server started!');
});
