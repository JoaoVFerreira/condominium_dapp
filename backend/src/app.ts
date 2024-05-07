import express from 'express';
import morgan from 'morgan';
import "express-async-errors";
import cors from "cors";
import helmet from 'helmet';
import multer from 'multer';

import errorMiddleware from './middlewares/errorMiddleware';
import authenticationMiddleware from './middlewares/authenticationMiddleware';
import residentRouter from './routers/residentRouter';
import topicFileRouter from './routers/topicFileRouter';
import { doLogin } from './controllers/authController';

const app = express();

app.use(morgan("tiny"));

app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(express.json());

app.post('/login', doLogin);

app.use('/residents', authenticationMiddleware , residentRouter);

const uploadMiddleware = multer({ dest: "files" });
app.use('/topicfiles', authenticationMiddleware, uploadMiddleware.single("file"), topicFileRouter);

app.use(errorMiddleware);

export default app;