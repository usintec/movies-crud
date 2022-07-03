require('dotenv').config();
import express, { Application } from 'express';
const app: Application = express();
import { App } from './app';
new App(app).start();




