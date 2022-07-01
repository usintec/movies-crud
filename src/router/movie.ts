import express from 'express';
import { moviesController } from '../controller/movie';
import { authenticationMiddleware } from '../middleware/auth';
import { movieValidationMiddleware } from '../middleware/movie';
import upload from '../middleware/upload';

const MoviesRouter = express.Router();
/**
 * Add routes to MoviesRouter
 */
MoviesRouter.get('/:page', moviesController.fetchMoviesFromThirdParty);

MoviesRouter.get('/favourite/:page/:limit?/:rank?/:order?', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser,
    movieValidationMiddleware.favouriteMovieValidation], 
    moviesController.readFavouriteMovie);

MoviesRouter.get('/search/:keyword', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser,
    movieValidationMiddleware.keywordValidation],
    moviesController.search);

MoviesRouter.post('/', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser,
    movieValidationMiddleware.moviesValidation],
    [upload.array('files')],
    moviesController.createMovie);

MoviesRouter.put('/update', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser,
    movieValidationMiddleware.moviesValidation],
    [upload.array('files')],
    moviesController.updateMovie);

MoviesRouter.delete('/:movieId', [
    authenticationMiddleware.verifyToken, 
    authenticationMiddleware.verifyUser,
    movieValidationMiddleware.movieIdValidation],
    moviesController.removeMovieFromFavourite);


export { MoviesRouter };