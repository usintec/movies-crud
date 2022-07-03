import { movieService } from "../service/movieService";

class MoviesController {
    
    public async fetchMoviesFromThirdParty(req, res){
        try{
            let data = await movieService.fetchMovies(req.params.page);
            res.status(200).send({
                data: data,
                success: true,
                message: 'fetched movies'
            });
        }catch(err){
            res.status(403).send({
                success: false,
                message: err.message
            });
        }
    }

    public async removeMovieFromFavourite(req, res){
        try{
            let movie = await movieService.deleteMovie(req.params.movieId)
            res.status(200).send({
                sucess: true,
                message: 'Movie removed from database',
                movies: movie
            });
        }catch(err){
            res.status(403).send({
                sucess: false,
                message: err.message
            });
        }
    }
    public async readFavouriteMovie(req, res){
        try{
            let data = await movieService.readMovie(req.params.page as number,
                    parseInt(req.params.limit), req.params.rank,
                    req.params.order, req.userId as number);
            res.status(200).send({
                sucess: true,
                message: 'fetch all favourite movies for user',
                movies: data.movies,
                nextPage: data.nextPage,
                prevPage: data.prevPage,
                totalPages: data.totalPages
            });
        }catch(err){
            res.status(403).send({
                sucess: false,
                message: err.message
            });
        }
    }
    public async createMovie(req, res){
        try{
            let data = movieService.createMovie(
                req.body.synopsis, req.body.movieStamp,
                req.body.title, req.body.yearOfRelease,
                req.body.language, req.body.movieType,
                req.body.featureImage, req.userId,
                req.files);
            res.status(200).send({
                sucess: true,
                message: 'Movie created sucessfully',
                movies: data
            });
        }catch(err){
            res.status(403).send({
                sucess: false,
                message: err.message
            });
        }
    }
    public async addMovieToFavourite(req, res){
        try{
            let data = await movieService.addToFavourite(
                req.body.synopsis, req.body.movieStamp,
                req.body.title, req.body.yearOfRelease,
                req.body.language, req.body.movieType,
                req.body.featureImage, req.userId,
                req.files
            );
            res.status(200).send({
                sucess: true,
                message: 'Movie created sucessfully',
                movies: data
            });
        }catch(err){
            res.status(403).send({
                sucess: false,
                message: err.message
            });
        }
    }
    public async updateMovie(req, res){
        try{
            let data = movieService.updateMovie(
                req.body.synopsis, req.body.movieStamp,
                req.body.title, req.body.yearOfRelease,
                req.body.language, req.body.movieType,
                req.body.featureImage, req.userId,
                req.files, req.body.movieId
            );
            res.status(200).send({
                sucess: true,
                message: 'Movie updated sucessfully',
                movies: data
            });
        }catch(err){
            res.status(403).send({
                sucess: false,
                message: err.message
            });
        }
    }
    public async search(req, res){
        try{
            let movies = await movieService.search(req.params.keyword);
            res.status(200).send({
                sucess: true,
                message: 'movies fetched',
                movies: movies
            });
        }catch(err){
            res.status(403).send({
                sucess: false,
                message: err.message
            })
        }
    }
}
const moviesController = new MoviesController();
export { moviesController }