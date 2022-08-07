import path from 'path';
import express, { Express, Request, Response } from 'express';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => console.log("Listening at: " + port));

app.use('/', express.static(path.join(__dirname, '../client')));