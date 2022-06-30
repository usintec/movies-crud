import express from 'express';
import { moviesController } from '../controller/movie';
const MoviesRouter = express.Router();
/**
 * Add routes to MoviesRouter
 */
MoviesRouter.get('/', moviesController.fetchMovies);

export { MoviesRouter };