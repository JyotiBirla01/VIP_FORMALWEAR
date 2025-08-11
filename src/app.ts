import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { swaggerUiMiddleware, swaggerUiSetup } from './config/swagger'; 
import routes from './routes';

dotenv.config();
const app = express();

app.use(express.json());//If you're sending a JSON request body, you need:
// app.use(express.urlencoded({ extended: true }));//If you're sending a form URL-encoded body (like from HTML forms), you need:
app.use(cors());

const API_PREFIX = '/api/v1';


// Swagger
app.use('/api-docs', swaggerUiMiddleware, swaggerUiSetup);

app.use(API_PREFIX, routes);

export default app;
