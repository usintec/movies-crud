import express from 'express';
import { moviesController } from '../controller/movie';
import { authenticationMiddleware } from '../middleware/auth';
import upload from '../middleware/upload';

const MoviesRouter = express.Router();
/**
 * Add routes to MoviesRouter
 */
MoviesRouter.get('/:page', moviesController.fetchMovies);

MoviesRouter.get('/favourite/:page/:limit', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser], 
    moviesController.readFavouriteMovie);

MoviesRouter.get('/search/:param', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser],
    moviesController.fetchMovies);

MoviesRouter.post('/', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser],
    [upload.array('files')],
    moviesController.createMovie);

MoviesRouter.put('/update', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser],
    moviesController.updateMovie);

MoviesRouter.delete('/:movieId', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser],
    moviesController.removeMovieFromFavourite);


export { MoviesRouter };