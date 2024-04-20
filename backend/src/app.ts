import express from 'express';
import morgan from 'morgan';
import "express-async-errors";
import cors from "cors";
import helmet from 'helmet';
import errorMiddleware from './middlewares/errorMiddleware';
import residentRouter from './routers/residentRouter';
import { doLogin } from './controllers/authController';

const app = express();

app.use(morgan("tiny"));

app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json());

app.post('/login', doLogin);

app.use('/residents', residentRouter);

app.use(errorMiddleware);

export default app;