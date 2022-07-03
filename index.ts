require('dotenv').config();
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import { App } from './app';
new App(app).start();




