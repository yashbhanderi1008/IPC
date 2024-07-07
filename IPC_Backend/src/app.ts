import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import ErrorHandler from './handlers/errorHandlers';
import { userRoute } from '@routes';
import { categoryRoute } from '@routes';
import { productRoute } from '@routes';

const app = express();
app.use(cors());
app.use(express.json())
dotenv.config({ path: './config.env' });
app.use('/public', express.static(path.join(__dirname, '..', 'public')))

app.use('/user', userRoute);
app.use('/categories', categoryRoute)
app.use('/products', productRoute);

app.use(ErrorHandler.errorHandlerMiddlerWare)

export default app;