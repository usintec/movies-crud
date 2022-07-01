import { EnviromentSetup } from "../configuration/env";
import { movieService } from "../service/movieService";
import { DB } from "../model/mysql";
const Op = DB.Sequelize.Op;
const configuration = new EnviromentSetup(process.env.ENVIROMENT).enviroment;
const Movies = DB.movieModel;
class MoviesController {
    public async fetchMovies(req, res){
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
            let movie = Movies.destroy({
                where: { id: req.params.id }
            });
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
            let moviesPerPage = parseInt(req.params.limit) | configuration.moviesPerPage as number;
            let offset = moviesPerPage * req.params.page as number;
            let order: String = req.params.order.toString();
            let movies = await Movies.findAndCountAll({
                where: { userId: req.id },
                limit: parseInt(req.params.limit),
                offset: offset,
                order: [
                    [ order, 'createdAt', 'DESC']
                ]
            });
            let totalPages = (movies['count'] as number) / moviesPerPage;
            let prevPage = req.params.page as number > 1 ? 
                req.params.page as number - 1 : 
                req.params.page as number
            let nextPage = req.params.page as number < totalPages ?
                req.params.page as number + 1 :req.params.page as number
            res.status(200).send({
                sucess: true,
                message: 'fetch all favourite movies for user',
                movies: movies,
                nextPage: nextPage,
                prevPage: prevPage,
                totalPages: totalPages
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
            let image: String;
            if(req.files != undefined) image = configuration.hostAddr as string + 
                '/images/' + req.files[0].filename;
            let movie = await Movies.create({
                userId: req.id,
                movieStamp: req.body.movieStamp,
                synopsis: req.body.synopsis,
                title: req.body.title,
                yearOfRelease: req.body.yearOfRelease,
                language: req.body.language,
                movieType: req.body.movieType,
                featureImage: image ? image : req.body.featureImage
            });
            res.status(200).send({
                sucess: true,
                message: 'Movie created sucessfully',
                movies: movie
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
            let movie = await Movies.update({
                synopsis: req.body.synopsis,
                title: req.body.title,
                yearOfRelease: req.body.yearOfRelease,
                language: req.body.language,
                movieType: req.body.movieType,
                featureImage: req.body.featureImage
            },{
                where: {
                    id: req.body.id,
                    userId: req.id
                }
            });
            res.status(200).send({
                sucess: true,
                message: 'movie updated sucessfully',
                movies: movie
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
            let movies = await Movies.findAndCountAll({
                where: {
                    [Op.or]: [
                        { title: {[Op.eq]: req.params.keyword} },              
                        { yearOfRelease: {[Op.eq]: req.params.keyword} },              
                        { language: {[Op.eq]: req.params.keyword} },              
                        { movieType: {[Op.eq]: req.params.keyword} },              
                    ]
                }
            });
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
let moviesController = new MoviesController();
export { moviesController }